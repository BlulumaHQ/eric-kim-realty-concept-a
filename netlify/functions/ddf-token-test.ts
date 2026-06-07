// Netlify Function: ddf-token-test
// Requests an OAuth2 client_credentials token from CREA DDF.
// Required Netlify env vars:
//   DDF_CLIENT_ID, DDF_CLIENT_SECRET
//   DDF_TOKEN_URL   (default: https://identity.crea.ca/connect/token)
//   DDF_SCOPE       (default: DDFApi_Read)

type NetlifyEvent = { queryStringParameters?: Record<string, string | undefined> | null };

const json = (status: number, body: unknown) => ({
  statusCode: status,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  body: JSON.stringify(body),
});

export const handler = async (event: NetlifyEvent) => {
  const clientId = process.env.DDF_CLIENT_ID;
  const clientSecret = process.env.DDF_CLIENT_SECRET;
  const tokenUrl = process.env.DDF_TOKEN_URL || "https://identity.crea.ca/connect/token";
  const scope = process.env.DDF_SCOPE || "DDFApi_Read";

  if (!clientId || !clientSecret) {
    return json(500, {
      success: false,
      error: "Missing DDF_CLIENT_ID or DDF_CLIENT_SECRET in Netlify environment variables.",
    });
  }

  // Debug mode exposes the access_token. Only allowed when explicitly enabled via env var.
  const debugRequested = event.queryStringParameters?.debug === "1";
  const debugAllowed = process.env.DDF_ALLOW_TOKEN_DEBUG === "1";
  const includeToken = debugRequested && debugAllowed;

  try {
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
      scope,
    });

    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const text = await res.text();
    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return json(res.status, {
        success: false,
        status: res.status,
        error: (data.error as string) || "token_request_failed",
        error_description: data.error_description ?? null,
      });
    }

    return json(200, {
      success: true,
      token_type: data.token_type ?? null,
      expires_in: data.expires_in ?? null,
      scope: data.scope ?? scope,
      ...(includeToken ? { access_token: data.access_token } : {}),
    });
  } catch (err) {
    return json(500, {
      success: false,
      error: "token_request_exception",
      message: err instanceof Error ? err.message : String(err),
    });
  }
};
