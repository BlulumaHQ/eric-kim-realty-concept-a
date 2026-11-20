// realtor-request — applies whitelisted listing changes requested by a realtor by email.
// Called by n8n (Gmail → Claude → here). The AI only picks an action; this function
// validates the sender, the listing ownership and the action before changing anything.
//
// POST { op: "context", sender }                       → realtor + their listings
// POST { op: "apply", sender, subject, action, listing_id, value? } → apply one action
// Header: x-automation-token (sha256 checked against realtor_cms.automation_tokens)

import postgres from "npm:postgres@3.4.5";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { max: 2, prepare: false });

const ACTIONS = [
  "hide", "show", "hero_on", "hero_off", "feature", "unfeature",
  "mark_sold", "not_sold", "set_sold_price",
] as const;
type Action = (typeof ACTIONS)[number];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function authorized(req: Request) {
  const token = req.headers.get("x-automation-token") ?? "";
  if (!token) return false;
  const [row] = await sql`select 1 from realtor_cms.automation_tokens where token_sha256 = ${await sha256(token)}`;
  return !!row;
}

const cleanEmail = (s: string) => (s.match(/[^\s<>"]+@[^\s<>"]+/)?.[0] ?? "").toLowerCase();

async function realtorFor(sender: string) {
  const [r] = await sql`select r.id, r.name from realtor_cms.realtor_senders s
    join realtor_cms.realtors r on r.id = s.realtor_id where s.email = ${cleanEmail(sender)}`;
  return r as { id: string; name: string } | undefined;
}

async function apply(realtorId: string, action: Action, listingId: string, value: unknown) {
  const [l] = await sql`select id, title, city, status, sold_review, hero_featured, features
    from realtor_cms.listings where id = ${listingId} and realtor_id = ${realtorId}`;
  if (!l) return { ok: false, summary: "Listing not found for this realtor" };
  const name = `${l.title}${l.city ? ", " + l.city : ""}`;

  switch (action) {
    case "hide":
      await sql`update realtor_cms.listings set status = 'hidden', hero_featured = false, hero_sort = null,
        sold_review = case when sold_review = 'pending' then 'cancelled' else sold_review end,
        updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `${name} is now hidden from your website.` };
    case "show":
      await sql`update realtor_cms.listings set status = 'active', updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `${name} is now showing on your website.` };
    case "hero_on": {
      const [{ n }] = await sql`select count(*)::int n from realtor_cms.listings
        where realtor_id = ${realtorId} and hero_featured and id <> ${l.id}`;
      if (n >= 3) return { ok: false, summary: "The homepage slider already has 3 properties" };
      if (l.status !== "active" && l.status !== "presale") return { ok: false, summary: "Only active listings can go in the homepage slider" };
      await sql`update realtor_cms.listings set hero_featured = true, hero_sort = ${n + 1}, updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `${name} is now featured in your homepage slider.` };
    }
    case "hero_off":
      await sql`update realtor_cms.listings set hero_featured = false, hero_sort = null, updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `${name} has been removed from your homepage slider.` };
    case "feature":
      await sql`update realtor_cms.listings set featured = true, updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `${name} is now a featured listing.` };
    case "unfeature":
      await sql`update realtor_cms.listings set featured = false, updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `${name} is no longer a featured listing.` };
    case "mark_sold":
      await sql`update realtor_cms.listings set status = 'sold', show_in_sold = true, sold_review = 'published',
        featured = false, hero_featured = false, hero_sort = null, updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `${name} has been moved to your Sold listings.` };
    case "not_sold":
      await sql`update realtor_cms.listings set status = 'hidden', show_in_sold = false,
        sold_review = 'cancelled', updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `${name} has been removed from your Sold listings.` };
    case "set_sold_price": {
      const price = Number(String(value ?? "").replace(/[^0-9.]/g, ""));
      if (!price || price < 1000) return { ok: false, summary: "Sold price missing or invalid" };
      await sql`update realtor_cms.listings set features = coalesce(features, '{}'::jsonb) ||
        jsonb_build_object('sold_price', ${price}::numeric), updated_at = now() where id = ${l.id}`;
      return { ok: true, summary: `Sold price for ${name} set to $${price.toLocaleString("en-CA")}.` };
    }
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  if (!(await authorized(req))) return json({ error: "unauthorized" }, 401);
  const body = await req.json().catch(() => ({}));
  const realtor = body.op === "send" ? undefined : await realtorFor(String(body.sender ?? ""));
  if (body.op !== "send" && !realtor) return json({ ok: false, known_sender: false, summary: "Sender is not a registered realtor" });

  if (body.op === "context" && realtor) {
    const listings = await sql`select id, title, city, mls_number, status, featured, hero_featured
      from realtor_cms.listings where realtor_id = ${realtor.id} and status <> 'off_market'
      order by status, title`;
    return json({ ok: true, known_sender: true, realtor: realtor.name, listings });
  }

  if (body.op === "apply" && realtor) {
    const action = String(body.action ?? "") as Action;
    let result: { ok: boolean; summary: string };
    if (!ACTIONS.includes(action)) result = { ok: false, summary: `Unsupported request (${action || "none"})` };
    else if (!body.listing_id) result = { ok: false, summary: "Could not identify the listing" };
    else result = await apply(realtor.id, action, String(body.listing_id), body.value);
    await sql`insert into realtor_cms.request_log (sender, subject, action, listing_id, detail, ok)
      values (${cleanEmail(String(body.sender))}, ${String(body.subject ?? "").slice(0, 300)}, ${action},
        ${/^[0-9a-f-]{36}$/i.test(String(body.listing_id ?? "")) ? String(body.listing_id) : null},
        ${sql.json({ value: body.value ?? null, summary: result.summary } as never)}, ${result.ok})`;
    return json({ ...result, known_sender: true, realtor: realtor.name });
  }

  // Send an email through Resend (HTTPS) — Railway blocks SMTP. Only to the realtor or to Sony.
  if (body.op === "send") {
    const to = cleanEmail(String(body.to ?? ""));
    const allowed = to === "sony@bluluma.com" || !!(await realtorFor(to));
    if (!allowed) return json({ ok: false, summary: "Recipient not allowed" });
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: body.from_name === "automation" ? "Bluluma Automation <sony@send.bluluma.com>" : "Sony Lin <sony@send.bluluma.com>",
        to: [to], cc: body.cc ? ["sony@bluluma.com"] : undefined, // cc only ever goes to Sony
        reply_to: "sony@bluluma.com",
        subject: String(body.subject ?? "").slice(0, 200), text: String(body.text ?? "").slice(0, 20000),
      }),
    });
    const out = await res.json().catch(() => ({}));
    return json({ ok: res.ok, status: res.status, result: out });
  }

  return json({ error: "unknown op" }, 400);
});
