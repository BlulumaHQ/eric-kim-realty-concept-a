import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Maximize2 } from "lucide-react";
import { useListings, formatPrice, type Listing } from "@/lib/listings";

function isLease(l: Listing) {
  return /lease/i.test(l.transactionType || "");
}

function priceLabel(l: Listing) {
  if (l.status === "sold") {
    const p = l.soldPrice ?? l.price;
    return !p || p <= 0 ? "Price upon request" : formatPrice(p);
  }
  if (isLease(l)) {
    return l.leaseRate ? l.leaseRate : "Contact for lease rate";
  }
  if (!l.price || l.price <= 0) return "Price upon request";
  return formatPrice(l.price);
}

function badgeLabel(l: Listing) {
  if (l.status === "sold") return "Sold";
  return isLease(l) ? "For Lease" : "For Sale";
}

function locationLine(l: Listing) {
  return l.address ? `${l.address}, ${l.city}` : l.city;
}

function StatusBadge({ isSold, label }: { isSold: boolean; label: string }) {
  return (
    <span
      className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-soft ${
        isSold ? "bg-red-600 text-white" : "bg-gold text-gold-foreground"
      }`}
    >
      {label}
    </span>
  );
}

function StatsRow({ l, className = "" }: { l: Listing; className?: string }) {
  const items: React.ReactNode[] = [];
  if (l.sqft > 0)
    items.push(
      <span key="s" className="inline-flex items-center gap-1.5">
        <Maximize2 className="h-4 w-4 text-gold" /> {l.sqft.toLocaleString()} sqft
      </span>
    );
  if (l.propertyType)
    items.push(
      <span key="t" className="text-muted-foreground">
        {l.propertyType}
      </span>
    );
  if (items.length === 0) return null;
  return (
    <div className={`flex flex-wrap items-center gap-5 text-sm text-foreground/75 border-t border-border pt-5 ${className}`}>
      {items}
    </div>
  );
}

function CommercialCard({ l }: { l: Listing }) {
  const isSold = l.status === "sold";
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-background border border-border hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={l.image}
          alt={`${l.title} — ${locationLine(l)}`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = l.fallbackImage;
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <StatusBadge isSold={isSold} label={badgeLabel(l)} />
        {l.mls && (
          <span className="absolute bottom-4 left-4 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground">
            MLS® {l.mls}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-7">
        <span className="font-display text-2xl text-foreground">{priceLabel(l)}</span>
        <h3 className="mt-2 font-display text-lg text-foreground leading-snug">{l.title}</h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {locationLine(l)}
        </p>
        <StatsRow l={l} className="mt-5" />
        <Link
          to="/listings/$id"
          params={{ id: l.id }}
          className="mt-6 inline-flex items-center justify-between text-sm font-medium uppercase tracking-[0.16em] text-foreground hover:text-gold transition-colors"
        >
          Inquire <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function SpotlightCommercialCard({ l }: { l: Listing }) {
  const isSold = l.status === "sold";
  return (
    <article className="group grid md:grid-cols-2 overflow-hidden rounded-2xl bg-background border border-border hover:shadow-elegant transition-all duration-300">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden bg-muted">
        <img
          src={l.image}
          alt={`${l.title} — ${locationLine(l)}`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = l.fallbackImage;
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <StatusBadge isSold={isSold} label={badgeLabel(l)} />
        {l.mls && (
          <span className="absolute bottom-4 left-4 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground">
            MLS® {l.mls}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center p-8 md:p-10">
        <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
          Featured Opportunity
        </span>
        <span className="mt-3 font-display text-3xl text-foreground">{priceLabel(l)}</span>
        <h3 className="mt-2 font-display text-2xl text-foreground leading-snug">{l.title}</h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {locationLine(l)}
        </p>
        <StatsRow l={l} className="mt-6" />
        <Link
          to="/listings/$id"
          params={{ id: l.id }}
          className="mt-7 inline-flex items-center gap-2 self-start rounded-none bg-foreground px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-background hover:bg-foreground/85 transition"
        >
          Inquire About This Property <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-background border border-border">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-7 space-y-4">
        <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

export function CommercialFeature() {
  const { loading, commercial } = useListings();

  if (!loading && commercial.length === 0) return null;

  const count = commercial.length;

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
              Commercial
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-[2.85rem] text-foreground text-balance leading-[1.1]">
            Commercial Real Estate Opportunities
          </h2>
          <p className="mt-6 text-muted-foreground text-pretty leading-relaxed text-lg">
            Business locations, investment properties, retail and office spaces — represented with the same attentive process Eric brings to every transaction.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : count === 1 ? (
          <div className="mt-14">
            <SpotlightCommercialCard l={commercial[0]} />
          </div>
        ) : count === 2 ? (
          <div className="mt-14 grid gap-7 grid-cols-1 md:grid-cols-2">
            {commercial.map((l) => (
              <CommercialCard key={l.id} l={l} />
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {commercial.map((l) => (
              <CommercialCard key={l.id} l={l} />
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-none bg-foreground px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-background hover:bg-foreground/85 transition"
          >
            Discuss a Commercial Opportunity <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
