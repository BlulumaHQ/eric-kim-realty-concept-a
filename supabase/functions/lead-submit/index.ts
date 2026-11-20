// lead-submit — shared contact/valuation form endpoint for all Bluluma realtor sites.
// POST { realtor: "<slug>", source, name, email, phone?, propertyAddress?, propertyType?, interest?, message?, company? }
// Stores the lead in realtor_cms.leads, emails the realtor and sends the client a confirmation via Resend.
// `company` is a honeypot: bots that fill it get a fake success.
import postgres from "npm:postgres@3.4.5";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { max: 2, prepare: false });
const RESEND = Deno.env.get("RESEND_API_KEY");
const FALLBACK_FROM = "website@send.bluluma.com";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "") || null;
const LABEL: Record<string, [string, string]> = {
  valuation: ["Free valuation request", "property valuation request"],
  alerts: ["Market alerts signup", "market alerts signup"],
  contact: ["Website enquiry", "enquiry"],
};

async function send(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`resend ${res.status} ${await res.text()}`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json({ error: "bad json" }, 400); }
  if (b.company) return json({ success: true, emailSent: true });

  const email = str(b.email, 255);
  const source = String(b.source || "contact");
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !LABEL[source]) return json({ error: "invalid" }, 400);

  const [r] = await sql`select id, name, brokerage_name, phone, email, lead_notify_email, lead_from_email
                        from realtor_cms.realtors where slug = ${String(b.realtor || "")}`;
  if (!r) return json({ error: "unknown realtor" }, 404);

  // basic flood guard: max 5 leads per email per realtor per hour
  const [{ n }] = await sql`select count(*)::int n from realtor_cms.leads
                            where realtor_id=${r.id} and email=${email} and created_at > now() - interval '1 hour'`;
  if (n >= 5) return json({ error: "too many" }, 429);

  const lead = {
    name: str(b.name, 100), phone: str(b.phone, 40), property_address: str(b.propertyAddress, 300),
    property_type: str(b.propertyType, 40), interest: str(b.interest, 100), message: str(b.message, 2000),
  };
  const [row] = await sql`insert into realtor_cms.leads
      (realtor_id, source, name, email, phone, property_address, property_type, interest, message, page_url)
      values (${r.id}, ${source}, ${lead.name}, ${email}, ${lead.phone}, ${lead.property_address},
              ${lead.property_type}, ${lead.interest}, ${lead.message}, ${req.headers.get("referer")})
      returning id`;

  if (!RESEND) return json({ success: true, emailSent: false });
  const from = r.lead_from_email || FALLBACK_FROM;
  const notify = r.lead_notify_email || r.email;
  const [subject, noun] = LABEL[source];
  const line = (k: string, v: string | null) => `${k}: ${v || "Not provided"}`;
  const details = [
    line("Source", source), line("Name", lead.name), line("Email", email), line("Phone", lead.phone),
    line("Property address", lead.property_address), line("Property type", lead.property_type),
    line("Interest", lead.interest), line("Message", lead.message),
  ].join("\n");

  const results = await Promise.allSettled([
    send({
      from: `${r.name} Website <${from}>`, to: [notify], reply_to: email,
      subject: `${subject} — ${lead.name || email}`,
      text: `A new lead was submitted.\n\n${details}\n\nLead ID: ${row.id}`,
    }),
    send({
      from: `${r.name} <${from}>`, to: [email], reply_to: r.email,
      subject: `Your ${noun} has been received — ${r.name}`,
      text: `Hi ${lead.name || "there"},\n\nThank you for reaching out. Your ${noun} has been received and ${r.name.split(" ")[0]} will be in touch shortly.\n\n` +
        `For time-sensitive questions or to book a consultation, call ${r.phone}.\n\n${r.name}, REALTOR®\n${r.brokerage_name || ""}`,
    }),
  ]);
  const failed = results.filter((x) => x.status === "rejected") as PromiseRejectedResult[];
  if (failed.length) console.error("lead email failed", failed.map((f) => String(f.reason)));
  await sql`update realtor_cms.leads set email_sent=${failed.length === 0} where id=${row.id}`;
  return json({ success: true, emailSent: failed.length === 0 });
});
