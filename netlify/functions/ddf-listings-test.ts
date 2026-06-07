// Netlify Function: ddf-listings-test
// Acquires an access token internally and fetches a small batch of listings
// from the CREA DDF Web API. Returns only safe public fields.
//
// Env vars (same as ddf-token-test) plus optional:
//   DDF_API_BASE  (default: https://ddfapi.realtor.ca)

const json = (status: number, body: unknown) => ({
  statusCode: status,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  body: JSON.stringify(body),
});

async function getAccessToken(): Promise<{ token: string } | { error: string; status: number; description?: unknown }> {
  const clientId = process.env.DDF_CLIENT_ID;
  const clientSecret = process.env.DDF_CLIENT_SECRET;
  const tokenUrl = process.env.DDF_TOKEN_URL || "https://identity.crea.ca/connect/token";
  const scope = process.env.DDF_SCOPE || "DDFApi_Read";

  if (!clientId || !clientSecret) {
    return { error: "missing_credentials", status: 500 };
  }

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

  if (!res.ok || !data.access_token) {
    return {
      error: (data.error as string) || "token_request_failed",
      description: data.error_description ?? data.raw ?? null,
      status: res.status || 500,
    };
  }
  return { token: data.access_token as string };
}

type DDFProperty = Record<string, unknown>;

// Pick a small, safe subset of fields. CREA DDF uses RESO Web API field names.
function pickListing(p: DDFProperty) {
  const media = Array.isArray(p.Media) ? (p.Media as Array<Record<string, unknown>>) : [];
  const primary =
    media.find((m) => m?.PreferredPhotoYN === true || m?.Order === 1) || media[0];
  const photo = primary?.MediaURL ?? null;

  return {
    mlsNumber: p.ListingKey ?? p.ListingId ?? null,
    listPrice: p.ListPrice ?? null,
    address:
      (p.UnparsedAddress ??
      [p.StreetNumber, p.StreetName, p.StreetSuffix].filter(Boolean).join(" ")) ||
      null,
    city: p.City ?? null,
    bedrooms: p.BedroomsTotal ?? null,
    bathrooms: p.BathroomsTotalInteger ?? null,
    interiorSize: p.LivingArea ?? p.BuildingAreaTotal ?? null,
    propertyType: p.PropertyType ?? p.PropertySubType ?? null,
    status: p.StandardStatus ?? p.MlsStatus ?? null,
    officeName: p.ListOfficeName ?? null,
    photo,
  };
}

export const handler = async () => {
  const auth = await getAccessToken();
  if ("error" in auth) {
    return json(auth.status, {
      success: false,
      error: auth.error,
      error_description: auth.description ?? null,
    });
  }

  const apiBase = (process.env.DDF_API_BASE || "https://ddfapi.realtor.ca").replace(/\/+$/, "");
  // CREA DDF Web API property endpoint: /property/property
  // Keep it simple for the first test: top 5, expand media, no filters.
  const url = `${apiBase}/property/property?$top=5&$expand=Media`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: "application/json",
      },
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
        error: "ddf_request_failed",
        debug_url: url,
        message:
          (data as { error?: { message?: string } }).error?.message ||
          (typeof data.raw === "string" ? data.raw.slice(0, 500) : null) ||
          res.statusText,
      });
    }

    const value = Array.isArray((data as { value?: unknown[] }).value)
      ? ((data as { value: DDFProperty[] }).value)
      : [];
    const listings = value.map(pickListing);

    return json(200, {
      success: true,
      debug_url: url,
      count: listings.length,
      listings,
    });
  } catch (err) {
    return json(500, {
      success: false,
      error: "ddf_request_exception",
      message: err instanceof Error ? err.message : String(err),
    });
  }
};
