export async function sendInquiry(data: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, page: typeof window !== "undefined" ? window.location.href : "" }),
    });
    const json = await res.json().catch(() => ({}));
    return res.ok && json?.ok === true;
  } catch {
    return false;
  }
}

export const SEND_ERROR =
  "Sorry, your message could not be sent. Please call or email Eric directly at erickim.realtor@outlook.com.";
