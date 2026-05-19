import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { useListings, formatPrice, type Listing } from "@/lib/listings";
import { useI18n } from "@/lib/i18n";

function locationLine(l: Listing) {
  if (l.neighborhood) return `${l.neighborhood}, ${l.city}`;
  return l.address ? `${l.address}, ${l.city}` : l.city;
}

function useStatsText() {
  const { t } = useI18n();
  return (l: Listing) => {
    const parts: string[] = [];
    if (l.beds > 0) parts.push(`${l.beds} ${t("fl.bed")}`);
    if (l.baths > 0) parts.push(`${l.baths} ${t("fl.bath")}`);
    if (l.sqft > 0) parts.push(`${l.sqft.toLocaleString()} sqft`);
    if (l.propertyType) parts.push(l.propertyType);
    return parts.join(" · ");
  };
}

function usePriceLabel() {
  const { t } = useI18n();
  return (l: Listing) => {
    const p = l.soldPrice ?? l.price;
    if (!p || p <= 0) return t("ld.priceOnRequest");
    return formatPrice(p);
  };
}

function SoldCard({ l }: { l: Listing }) {
  const { t } = useI18n();
  const stats = useStatsText()(l);
  const priceLabel = usePriceLabel();
  return (
    <Link
      to="/listings/$id"
      params={{ id: l.id }}
      className="group block overflow-hidden rounded-2xl bg-background border border-border hover:shadow-elegant transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={l.image}
          alt={locationLine(l)}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = l.fallbackImage;
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-4 left-4 rounded-full bg-red-600 text-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
          {t("fl.badge.sold")}
        </span>
      </div>
      <div className="p-6">
        <p className="font-display text-xl text-foreground">{priceLabel(l)}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {locationLine(l)}
        </p>
        {stats && <p className="mt-3 text-xs text-muted-foreground">{stats}</p>}
      </div>
    </Link>
  );
}

function SpotlightSoldCard({ l }: { l: Listing }) {
  const { t } = useI18n();
  const stats = useStatsText()(l);
  const priceLabel = usePriceLabel();
  return (
    <Link
      to="/listings/$id"
      params={{ id: l.id }}
      className="group grid md:grid-cols-2 overflow-hidden rounded-2xl bg-background border border-border hover:shadow-elegant transition-all duration-300"
    >
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden bg-muted">
        <img
          src={l.image}
          alt={locationLine(l)}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = l.fallbackImage;
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-4 left-4 rounded-full bg-red-600 text-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
          {t("fl.badge.sold")}
        </span>
      </div>
      <div className="flex flex-col justify-center p-8 md:p-10">
        <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
          {t("rs.recentResult")}
        </span>
        <p className="mt-3 font-display text-3xl text-foreground">{priceLabel(l)}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {locationLine(l)}
        </p>
        {stats && <p className="mt-4 text-sm text-muted-foreground">{stats}</p>}
      </div>
    </Link>
  );
}

function SkeletonSoldCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-background border border-border">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-5 w-1/2 bg-muted animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

export function RecentlySold() {
  const { loading, recentlySold } = useListings();
  const { t } = useI18n();

  if (!loading && recentlySold.length === 0) return null;

  const count = recentlySold.length;

  return (
    <section className="bg-stone py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
                {t("rs.eyebrow")}
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-[2.75rem] text-foreground text-balance leading-[1.1]">
              {t("rs.title")}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {t("rs.desc")}
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-foreground hover:text-gold transition-colors"
            >
              {t("rs.requestVal")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            {loading ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <SkeletonSoldCard key={i} />
                ))}
              </div>
            ) : count === 1 ? (
              <SpotlightSoldCard l={recentlySold[0]} />
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {recentlySold.map((l) => (
                  <SoldCard key={l.id} l={l} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
