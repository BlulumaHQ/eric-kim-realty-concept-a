import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/ddf-test")({
  head: () => ({
    meta: [
      { title: "DDF Integration Test (Admin) — Eric Kim Realty" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DdfTestPage,
});

type TokenResult = {
  success: boolean;
  token_type?: string | null;
  expires_in?: number | null;
  scope?: string | null;
  error?: string;
  error_description?: unknown;
  message?: string;
};

type ListingItem = {
  mlsNumber: string | null;
  listPrice: number | null;
  address: string | null;
  city: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  interiorSize: number | null;
  propertyType: string | null;
  status: string | null;
  officeName: string | null;
  photo: string | null;
};

type ListingsResult = {
  success: boolean;
  count?: number;
  listings?: ListingItem[];
  error?: string;
  message?: string;
  error_description?: unknown;
  status?: number;
};

function fmtPrice(n: number | null) {
  if (typeof n !== "number" || !Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

function DdfTestPage() {
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenResult, setTokenResult] = useState<TokenResult | null>(null);

  const [listingsLoading, setListingsLoading] = useState(false);
  const [listingsResult, setListingsResult] = useState<ListingsResult | null>(null);

  const testToken = async () => {
    setTokenLoading(true);
    setTokenResult(null);
    try {
      const res = await fetch("/.netlify/functions/ddf-token-test");
      const data = (await res.json()) as TokenResult;
      setTokenResult(data);
    } catch (err) {
      setTokenResult({
        success: false,
        error: "network_error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setTokenLoading(false);
    }
  };

  const fetchListings = async () => {
    setListingsLoading(true);
    setListingsResult(null);
    try {
      const res = await fetch("/.netlify/functions/ddf-listings-test");
      const data = (await res.json()) as ListingsResult;
      setListingsResult(data);
    } catch (err) {
      setListingsResult({
        success: false,
        error: "network_error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setListingsLoading(false);
    }
  };

  return (
    <section className="bg-cream min-h-screen py-16">
      <div className="container-x max-w-5xl">
        <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">
          Internal · Not linked from public nav
        </p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl text-navy">
          CREA DDF Integration Test
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
          Phase 1 connection check. These buttons call Netlify Functions that
          authenticate with CREA DDF using server-side env vars. Credentials
          are never exposed to the browser.
        </p>

        {/* Token test */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl text-navy">1. Test DDF Token</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Calls <code>/.netlify/functions/ddf-token-test</code>
              </p>
            </div>
            <button
              onClick={testToken}
              disabled={tokenLoading}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground hover:bg-navy/90 disabled:opacity-60"
            >
              {tokenLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Test DDF Token
            </button>
          </div>
          {tokenResult && (
            <div className="mt-5 rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                {tokenResult.success ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-emerald-700">Success</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-700">Failed</span>
                  </>
                )}
              </div>
              <pre className="mt-3 overflow-x-auto rounded bg-muted p-3 text-xs text-foreground">
                {JSON.stringify(tokenResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Listings test */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl text-navy">2. Fetch Test Listings</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Calls <code>/.netlify/functions/ddf-listings-test</code> · top 5
              </p>
            </div>
            <button
              onClick={fetchListings}
              disabled={listingsLoading}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground hover:bg-navy/90 disabled:opacity-60"
            >
              {listingsLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Fetch Test Listings
            </button>
          </div>

          {listingsResult && (
            <div className="mt-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                {listingsResult.success ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-emerald-700">
                      Success — {listingsResult.count ?? 0} listing
                      {listingsResult.count === 1 ? "" : "s"} returned
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-700">Failed</span>
                  </>
                )}
              </div>

              {!listingsResult.success && (
                <pre className="mt-3 overflow-x-auto rounded bg-muted p-3 text-xs text-foreground">
                  {JSON.stringify(listingsResult, null, 2)}
                </pre>
              )}

              {listingsResult.success && (listingsResult.listings?.length ?? 0) > 0 && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {listingsResult.listings!.map((l, i) => (
                    <div
                      key={l.mlsNumber || i}
                      className="overflow-hidden rounded-xl border border-border bg-background"
                    >
                      <div className="aspect-[4/3] bg-muted">
                        {l.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={l.photo}
                            alt={l.address ?? "Listing photo"}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            No photo
                          </div>
                        )}
                      </div>
                      <div className="p-4 text-sm">
                        <div className="font-display text-lg text-navy">
                          {fmtPrice(l.listPrice)}
                        </div>
                        <div className="mt-1 text-foreground">{l.address ?? "—"}</div>
                        <div className="text-muted-foreground">{l.city ?? ""}</div>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span>MLS® {l.mlsNumber ?? "—"}</span>
                          <span>{l.bedrooms ?? 0} bd</span>
                          <span>{l.bathrooms ?? 0} ba</span>
                          {l.interiorSize ? <span>{l.interiorSize} sqft</span> : null}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {l.propertyType ?? ""} {l.status ? `· ${l.status}` : ""}
                        </div>
                        {l.officeName && (
                          <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                            {l.officeName}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Listing data is provided through CREA DDF and is subject to applicable
          board and CREA display rules. Information is deemed reliable but not
          guaranteed.
        </p>
      </div>
    </section>
  );
}
