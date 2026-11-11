// Netlify Function: contact
// Sends website inquiries to Eric Kim via Resend.
// Required Netlify env var: RESEND_API_KEY (Sending access, domain send.erickimrealty.com)

const TO = "erickim.realtor@outlook.com";
const FROM = "Eric Kim Realty Website <noreply@send.erickimrealty.com>";

const json = (status: number, body: unknown) => ({
  statusCode: status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body),
});

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Event = { httpMethod: string; body: string | null };

export const handler = async (event: Event) => {
  if (event.httpMethod !== "POST") return json(405, { ok: false, error: "method_not_allowed" });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY missing");
    return json(500, { ok: false, error: "not_configured" });
  }

  let d: Record<string, unknown>;
  try {
    d = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  const s = (k: string, max = 2000) => String(d[k] ?? "").trim().slice(0, max);
  if (s("website")) return json(200, { ok: true }); // honeypot

  const name = s("name", 100);
  const email = s("email", 255);
  const message = s("message");
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { ok: false, error: "invalid_input" });
  }

  const rows: [string, string][] = [
    ["Form", s("source", 200) || "Contact"],
    ["Name", name],
    ["Email", email],
    ["Phone", s("phone", 40) || "—"],
    ["Interest", s("interest", 100) || "—"],
    ["Preferred contact", s("method", 50) || "—"],
    ["Page", s("page", 300) || "—"],
  ];
  const html = `<div style="font-family:Arial,sans-serif;color:#222">
    <h2 style="margin:0 0 12px">New website inquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="font-weight:bold;padding-right:16px">${k}</td><td>${esc(v)}</td></tr>`)
      .join("")}</table>
    <h3>Message</h3><p style="white-space:pre-wrap">${esc(message)}</p></div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New inquiry from ${name} — erickimrealty.com`,
      html,
    }),
  });
  if (!res.ok) {
    console.error("Resend failed", res.status, await res.text());
    return json(502, { ok: false, error: "delivery_failed" });
  }
  return json(200, { ok: true });
};
