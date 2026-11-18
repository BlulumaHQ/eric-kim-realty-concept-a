// ddf-sync — CREA DDF → realtor_cms (Bluluma Realtor CMS)
// Deployed to Supabase project uzdjwpkgldzhnoxjeyrw. See SPEC.md.
//
// Called by pg_cron every 5 minutes (POST, no body). Each call works ~90s, then stops and
// stores a cursor; a full area cycle spans several calls.
//
// GET ?mode=probe&realtor=eric-kim        → token test + Member search + sample Property keys
// GET ?cancel=<token>                     → "not sold" link from the email to the realtor
//
// Secrets: per-feed client id/secret (names in ddf_feeds), RESEND_API_KEY,
// SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (built in).

import { createClient } from "npm:@supabase/supabase-js@2";
import postgres from "npm:postgres@3.4.5";

const TOKEN_URL = "https://identity.crea.ca/connect/token";
const API = "https://ddfapi.realtor.ca/odata/v1";
const TIME_BUDGET_MS = 90_000;
const PAGE = 100;
const PHOTO_BUCKET = "listing-photos";
const MAX_OWN_PHOTOS = 30;

// Storage via supabase-js; all table access via direct Postgres (realtor_cms is not an API schema).
const storage = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!).storage;
const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { max: 2, prepare: false });

type Row = Record<string, unknown>;
type Feed = {
  realtor_id: string;
  client_id_secret: string;
  client_secret_secret: string;
  agent_keys: string[];
  area_cities: string[];
  notify_email: string | null;
  sold_grace_days: number;
  last_sync_stats: Row | null;
};

// ---------- CREA ----------
async function getToken(feed: Feed): Promise<string> {
  const id = Deno.env.get(feed.client_id_secret);
  const secret = Deno.env.get(feed.client_secret_secret);
  if (!id || !secret) throw new Error(`missing secrets ${feed.client_id_secret}/${feed.client_secret_secret}`);
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: id, client_secret: secret, grant_type: "client_credentials", scope: "DDFApi_Read",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) throw new Error(`token ${res.status}: ${JSON.stringify(data)}`);
  return data.access_token as string;
}

async function ddf(token: string, url: string): Promise<{ value: Row[]; next?: string }> {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
  const text = await res.text();
  if (!res.ok) throw new Error(`ddf ${res.status} ${url}: ${text.slice(0, 400)}`);
  const data = JSON.parse(text);
  return { value: (data.value ?? []) as Row[], next: data["@odata.nextLink"] as string | undefined };
}

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

// ---------- mapping ----------
const s = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : (typeof v === "string" && v && !isNaN(+v) ? +v : null));
const first = (r: Row, ...keys: string[]) => {
  for (const k of keys) if (r[k] !== undefined && r[k] !== null && r[k] !== "") return r[k];
  return null;
};

function photoUrls(r: Row): string[] {
  const media = (r.Media ?? []) as Row[];
  return [...media]
    .sort((a, b) => (n(a.Order) ?? 0) - (n(b.Order) ?? 0))
    .map((m) => s(m.MediaURL) ?? s(m.MediaUrl))
    .filter((u): u is string => !!u);
}

function mapProperty(r: Row) {
  const photos = photoUrls(r);
  const lease = s(first(r, "LeaseAmount", "TotalActualRent"));
  const unit = s(r.UnitNumber);
  const street = s(first(r, "UnparsedAddress")) ??
    [r.StreetNumber, r.StreetName, r.StreetSuffix].filter(Boolean).join(" ");
  const subtype = Array.isArray(r.PropertySubType) ? (r.PropertySubType as string[]).join(", ") : s(r.PropertySubType);
  const structure = Array.isArray(r.StructureType) ? (r.StructureType as string[]).join(", ") : s(r.StructureType);
  return {
    ddf_listing_key: String(r.ListingKey),
    mls_number: s(r.ListingId),
    status: s(r.StandardStatus) ?? "Active",
    property_type: s(first(r, "PropertyType")) ?? structure,
    property_subtype: subtype ?? structure,
    transaction_type: lease && !n(r.ListPrice) ? "For Lease" : "For Sale",
    price: n(r.ListPrice),
    lease_rate: lease,
    address: street || null,
    unit,
    city: s(r.City),
    postal_code: s(r.PostalCode),
    neighbourhood: s(first(r, "SubdivisionName", "CommunityName")),
    beds: n(first(r, "BedroomsTotal")),
    baths: n(first(r, "BathroomsTotalInteger", "BathroomsTotal")),
    sqft: n(first(r, "LivingArea", "BuildingAreaTotal")),
    lot_size: s(first(r, "LotSizeDimensions")) ?? (n(r.LotSizeArea) ? `${r.LotSizeArea} ${r.LotSizeUnits ?? ""}`.trim() : null),
    year_built: n(r.YearBuilt) ? String(r.YearBuilt) : null,
    latitude: n(r.Latitude),
    longitude: n(r.Longitude),
    description: s(r.PublicRemarks),
    primary_image_url: photos[0] ?? null,
    photo_urls: photos,
    listing_office: s(first(r, "ListOfficeName")),
    listing_agent: s(first(r, "ListAgentFullName")),
    listed_at: s(first(r, "OriginalEntryTimestamp", "ListingContractDate")),
    ddf_modified_at: s(r.ModificationTimestamp),
    agentKeys: [r.ListAgentKey, r.CoListAgentKey].filter(Boolean).map(String),
  };
}
type Mapped = ReturnType<typeof mapProperty>;

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

// ---------- own listings ----------
async function copyPhotos(listingId: string, key: string, urls: string[]) {
  const [{ c }] = await sql`select count(*)::int c from realtor_cms.listing_photos where listing_id = ${listingId}`;
  if (c >= Math.min(urls.length, MAX_OWN_PHOTOS)) return null;
  await sql`delete from realtor_cms.listing_photos where listing_id = ${listingId}`;
  let cover: string | null = null;
  for (const [i, url] of urls.slice(0, MAX_OWN_PHOTOS).entries()) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const blob = await res.blob();
      const path = `ddf/${key}/${String(i).padStart(2, "0")}.jpg`;
      const up = await storage.from(PHOTO_BUCKET).upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
      if (up.error) continue;
      const pub = storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
      cover ??= pub;
      await sql`insert into realtor_cms.listing_photos (listing_id, image_url, sort_order) values (${listingId}, ${pub}, ${i})`;
    } catch { /* skip photo */ }
  }
  return cover;
}

async function upsertOwn(feed: Feed, m: Mapped, now: string) {
  // Match by DDF key, or adopt a manual CMS row with the same MLS® number
  const [existing] = await sql`select id, status, features, sold_review from realtor_cms.listings
    where realtor_id = ${feed.realtor_id}
      and (ddf_listing_key = ${m.ddf_listing_key}
        or (ddf_listing_key is null and ${m.mls_number}::text is not null and mls_number = ${m.mls_number}))
    order by (ddf_listing_key is not null) desc limit 1`;

  // BC MLS®: C-prefixed numbers are commercial; also catch commercial subtypes
  const category = /^C/i.test(m.mls_number ?? "") ||
      /commercial|office|retail|industrial|business/i.test(`${m.property_type} ${m.property_subtype}`)
    ? "commercial" : "residential";
  const features = {
    ...((existing?.features as Row) ?? {}),
    neighborhood: m.neighbourhood, postal_code: m.postal_code, year_built: m.year_built,
    lease_rate: m.lease_rate, building_type: m.property_subtype, unit: m.unit,
    latitude: m.latitude, longitude: m.longitude, listed_at: m.listed_at,
  };
  const f = {
    title: m.address ?? m.mls_number ?? "Listing",
    address: [m.unit, m.address].filter(Boolean).join(" - ") || m.address,
    city: m.city, price: m.price, category, transaction_type: m.transaction_type,
    beds: m.beds, baths: m.baths, sqft: m.sqft, lot_size: m.lot_size,
    property_type: m.property_subtype ?? m.property_type, mls_number: m.mls_number,
    description: m.description,
  };

  let id: string;
  if (existing) {
    id = existing.id;
    const revive = existing.status !== "active" && existing.sold_review !== "published";
    await sql`update realtor_cms.listings set
      title=${f.title}, address=${f.address}, city=${f.city}, price=${f.price}, category=${f.category},
      transaction_type=${f.transaction_type}, beds=${f.beds}, baths=${f.baths}, sqft=${f.sqft},
      lot_size=${f.lot_size}, property_type=${f.property_type}, mls_number=${f.mls_number},
      description=${f.description}, features=${sql.json(features)}, ddf_last_seen_at=${now}, updated_at=${now},
      ddf_listing_key=${m.ddf_listing_key}, listing_type='ddf',
      status = case when ${revive} then 'active' else status end,
      off_market_at = case when ${revive} then null else off_market_at end,
      sold_publish_at = case when ${revive} then null else sold_publish_at end,
      sold_review = case when ${revive} then null else sold_review end,
      sold_notified_at = case when ${revive} then null else sold_notified_at end
      where id = ${id}`;
  } else {
    const slug = slugify(`${m.address ?? ""}-${m.city ?? ""}-${m.mls_number ?? m.ddf_listing_key}`);
    const [row] = await sql`insert into realtor_cms.listings
      (realtor_id, slug, status, listing_type, ddf_listing_key, featured, show_in_sold,
       title, address, city, price, category, transaction_type, beds, baths, sqft, lot_size,
       property_type, mls_number, description, features, primary_image_url,
       ddf_last_seen_at, created_at, updated_at)
      values (${feed.realtor_id}, ${slug}, 'active', 'ddf', ${m.ddf_listing_key}, true, false,
       ${f.title}, ${f.address}, ${f.city}, ${f.price}, ${f.category}, ${f.transaction_type},
       ${f.beds}, ${f.baths}, ${f.sqft}, ${f.lot_size}, ${f.property_type}, ${f.mls_number},
       ${f.description}, ${sql.json(features)}, ${m.primary_image_url}, ${now}, ${now}, ${now})
      returning id`;
    id = row.id;
  }
  const cover = await copyPhotos(id, m.ddf_listing_key, m.photo_urls);
  if (cover) await sql`update realtor_cms.listings set primary_image_url = ${cover} where id = ${id}`;
}

async function syncOwn(feed: Feed, token: string, now: string) {
  if (!feed.agent_keys.length) return { own: 0, note: "no agent_keys yet" };
  const flt = feed.agent_keys.map((k) => `ListAgentKey eq ${q(k)} or CoListAgentKey eq ${q(k)}`).join(" or ");
  let url: string | undefined = `${API}/Property?$filter=${encodeURIComponent(flt)}&$top=${PAGE}`;
  let count = 0;
  while (url) {
    const page = await ddf(token, url);
    for (const r of page.value) { await upsertOwn(feed, mapProperty(r), now); count++; }
    url = page.next;
  }
  // Own DDF listings not returned this run → went off market → pending sold review
  const gone = await sql`update realtor_cms.listings set
      status = 'off_market', off_market_at = ${now}, sold_review = 'pending',
      sold_publish_at = ${now}::timestamptz + make_interval(days => ${feed.sold_grace_days}),
      sold_cancel_token = gen_random_uuid()
    where realtor_id = ${feed.realtor_id} and listing_type = 'ddf' and status = 'active'
      and ddf_last_seen_at < ${now}
    returning id`;
  return { own: count, went_off_market: gone.length };
}

// ---------- sold automation ----------
async function processSold(feed: Feed, fnUrl: string) {
  const [realtor] = await sql`select name from realtor_cms.realtors where id = ${feed.realtor_id}`;
  const toNotify = await sql`select id, title, city, mls_number, sold_publish_at, sold_cancel_token
    from realtor_cms.listings where realtor_id = ${feed.realtor_id}
      and sold_review = 'pending' and sold_notified_at is null`;
  const key = Deno.env.get("RESEND_API_KEY");
  let notified = 0;
  for (const l of toNotify) {
    if (!key || !feed.notify_email) break;
    const cancel = `${fnUrl}?cancel=${l.sold_cancel_token}`;
    const date = new Date(l.sold_publish_at).toLocaleDateString("en-CA", { month: "long", day: "numeric" });
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: Deno.env.get("DDF_NOTIFY_FROM") ?? "Bluluma Listings <listings@bluluma.com>",
        to: [feed.notify_email],
        subject: `Listing off market: ${l.title}`,
        html: `<p>Hi ${String(realtor?.name ?? "").split(" ")[0]},</p>
<p><b>${l.title}, ${l.city ?? ""}</b> (MLS® ${l.mls_number ?? "-"}) is no longer on the market.</p>
<p>It will be added to the <b>Sold</b> section of your website on <b>${date}</b> automatically.</p>
<p>If this property did <b>not</b> sell, click here and it will be removed instead:<br>
<a href="${cancel}">This listing did not sell</a></p>
<p>— Bluluma</p>`,
      }),
    });
    if (res.ok) {
      notified++;
      await sql`update realtor_cms.listings set sold_notified_at = now() where id = ${l.id}`;
    }
  }
  const published = await sql`update realtor_cms.listings set
      status = 'sold', show_in_sold = true, sold_review = 'published', featured = false,
      features = coalesce(features, '{}'::jsonb) || jsonb_build_object('sold_date', to_char(off_market_at, 'YYYY-MM-DD'))
    where realtor_id = ${feed.realtor_id} and sold_review = 'pending' and sold_publish_at <= now()
    returning id`;
  return { pending_found: toNotify.length, notified, published: published.length };
}

// ---------- area pool (resumable) ----------
const AREA_COLS = [
  "realtor_id", "ddf_listing_key", "mls_number", "status", "property_type", "property_subtype",
  "transaction_type", "price", "lease_rate", "address", "unit", "city", "postal_code", "neighbourhood",
  "beds", "baths", "sqft", "lot_size", "year_built", "latitude", "longitude", "description",
  "primary_image_url", "photo_urls", "listing_office", "listing_agent", "listed_at", "ddf_modified_at",
  "last_seen_at",
] as const;
const AREA_UPDATE_SET = AREA_COLS.filter((c) => c !== "realtor_id" && c !== "ddf_listing_key")
  .map((c) => `${c} = excluded.${c}`).join(", ");

async function syncArea(feed: Feed, token: string, deadline: number) {
  const st = (feed.last_sync_stats ?? {}) as Row;
  let cycleStart = (st.cycle_start as string) ?? new Date().toISOString();
  let cityIdx = typeof st.city_idx === "number" ? st.city_idx : 0;
  let next = (st.next as string | undefined) ?? undefined;
  let upserted = 0;
  const own = new Set(feed.agent_keys);

  while (cityIdx < feed.area_cities.length && Date.now() < deadline) {
    const city = feed.area_cities[cityIdx];
    const url = next ?? `${API}/Property?$filter=${encodeURIComponent(`City eq ${q(city)}`)}&$top=${PAGE}`;
    const page = await ddf(token, url);
    const seen = new Date().toISOString();
    const rows = page.value.map(mapProperty)
      .filter((m) => !m.agentKeys.some((k) => own.has(k)))
      .map(({ agentKeys: _a, ...m }) => ({ ...m, realtor_id: feed.realtor_id, last_seen_at: seen }));
    if (rows.length) {
      await sql`insert into realtor_cms.area_listings ${sql(rows, ...AREA_COLS)}
        on conflict (realtor_id, ddf_listing_key) do update set ${sql.unsafe(AREA_UPDATE_SET)}`;
      upserted += rows.length;
    }
    if (page.next) next = page.next;
    else { next = undefined; cityIdx++; }
  }

  let removed = 0;
  let cycleDone = false;
  if (cityIdx >= feed.area_cities.length) {
    const del = await sql`delete from realtor_cms.area_listings
      where realtor_id = ${feed.realtor_id} and last_seen_at < ${cycleStart} returning ddf_listing_key`;
    removed = del.length;
    cycleDone = true;
    cycleStart = new Date().toISOString();
    cityIdx = 0;
  }
  return { upserted, removed, cycleDone, cursor: { cycle_start: cycleStart, city_idx: cityIdx, next: next ?? null } };
}

// ---------- handlers ----------
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body, null, 2), { status, headers: { "Content-Type": "application/json" } });

async function loadFeeds(slug?: string): Promise<Feed[]> {
  const rows = slug
    ? await sql`select f.* from realtor_cms.ddf_feeds f join realtor_cms.realtors r on r.id = f.realtor_id
        where f.enabled and r.slug = ${slug}`
    : await sql`select * from realtor_cms.ddf_feeds where enabled`;
  return rows as unknown as Feed[];
}

const saveStats = (realtorId: string, status: string, stats: Row | null) =>
  stats
    ? sql`update realtor_cms.ddf_feeds set last_sync_at = now(), last_sync_status = ${status},
        last_sync_stats = ${sql.json(stats as never)} where realtor_id = ${realtorId}`
    : sql`update realtor_cms.ddf_feeds set last_sync_at = now(), last_sync_status = ${status}
        where realtor_id = ${realtorId}`;

async function probe(feed: Feed) {
  const token = await getToken(feed);
  const [realtor] = await sql`select name from realtor_cms.realtors where id = ${feed.realtor_id}`;
  const [firstName, ...rest] = String(realtor?.name ?? "").split(" ");
  const mf = `MemberFirstName eq ${q(firstName)} and MemberLastName eq ${q(rest.join(" "))}`;
  const members = await ddf(token, `${API}/Member?$filter=${encodeURIComponent(mf)}&$top=20`)
    .catch((e) => ({ value: [] as Row[], error: String(e) }));
  const sample = await ddf(token, `${API}/Property?$top=1`);
  const detailed = [];
  for (const m of members.value) {
    const office = m.OfficeKey
      ? await ddf(token, `${API}/Office?$filter=${encodeURIComponent(`OfficeKey eq ${q(String(m.OfficeKey))}`)}`)
        .then((o) => o.value[0]?.OfficeName ?? null).catch(() => null)
      : null;
    const k = q(String(m.MemberKey));
    const listings = await ddf(token,
      `${API}/Property?$filter=${encodeURIComponent(`ListAgentKey eq ${k} or CoListAgentKey eq ${k}`)}&$top=${PAGE}`)
      .then((p) => p.value.map((r) => `${r.UnparsedAddress ?? ""}, ${r.City ?? ""} (${r.ListingId ?? ""})`))
      .catch((e) => [String(e)]);
    detailed.push({
      MemberKey: m.MemberKey, name: `${m.MemberFirstName} ${m.MemberLastName}`,
      office_key: m.OfficeKey, office, city: m.MemberCity, status: m.MemberStatus, listings,
    });
  }
  return {
    token: "ok",
    members: detailed,
    member_error: (members as { error?: string }).error ?? null,
    property_fields: Object.keys(sample.value[0] ?? {}),
    sample: sample.value[0] ? { ...sample.value[0], Media: ((sample.value[0].Media ?? []) as Row[]).slice(0, 1) } : null,
  };
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const fnUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/ddf-sync`;
  try {
    const cancel = url.searchParams.get("cancel");
    if (cancel) {
      const rows = /^[0-9a-f-]{36}$/i.test(cancel)
        ? await sql`update realtor_cms.listings set status = 'hidden', sold_review = 'cancelled'
            where sold_cancel_token = ${cancel} and sold_review = 'pending' returning title`
        : [];
      const ok = rows.length > 0;
      return new Response(
        `<html><body style="font-family:system-ui;padding:40px;max-width:520px">
<h2>${ok ? "Got it — removed" : "Already handled"}</h2>
<p>${ok ? `${rows[0].title} will not be shown as sold.` : "This listing was already updated."}</p></body></html>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    if (url.searchParams.get("mode") === "probe") {
      const [feed] = await loadFeeds(url.searchParams.get("realtor") ?? "eric-kim");
      if (!feed) return json({ error: "no feed" }, 404);
      try {
        const result = await probe(feed);
        await sql`update realtor_cms.ddf_feeds set last_sync_status = 'probe ok',
          last_sync_stats = coalesce(last_sync_stats, '{}'::jsonb) || ${sql.json({ probe: result } as never)}
          where realtor_id = ${feed.realtor_id}`;
        return json({ ok: true, members: result.members, member_error: result.member_error });
      } catch (e) {
        await saveStats(feed.realtor_id, `probe error: ${String(e).slice(0, 500)}`, null);
        return json({ ok: false, error: String(e) }, 500);
      }
    }

    const deadline = Date.now() + TIME_BUDGET_MS;
    const out: Row[] = [];
    for (const feed of await loadFeeds()) {
      const now = new Date().toISOString();
      try {
        const token = await getToken(feed);
        const own = await syncOwn(feed, token, now);
        const sold = await processSold(feed, fnUrl);
        const area = await syncArea(feed, token, deadline);
        const stats = {
          ...area.cursor, own, sold,
          area: { upserted: area.upserted, removed: area.removed, cycleDone: area.cycleDone },
          probe: (feed.last_sync_stats as Row | null)?.probe ?? null,
        };
        await saveStats(feed.realtor_id, "ok", stats);
        out.push({ realtor_id: feed.realtor_id, ...stats, probe: undefined });
      } catch (e) {
        await saveStats(feed.realtor_id, `error: ${String(e).slice(0, 500)}`, null);
        out.push({ realtor_id: feed.realtor_id, error: String(e) });
      }
    }
    return json({ ok: true, feeds: out });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
});
