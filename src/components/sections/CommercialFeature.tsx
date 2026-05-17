import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Maximize2 } from "lucide-react";
import { useListings, formatPrice, type Listing } from "@/lib/listings";

function gridColsFor(count: number) {
  if (count <= 1) return "grid-cols-1 max-w-xl mx-auto";
  if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}

function CommercialCard({ l }: { l: Listing }) {
  const isSold = l.status === "sold";
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-background border border-border hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={l.image}
          alt={`${l.title} — ${l.address}, ${l.city}`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = l.fallbackImage;
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-soft ${
            isSold ? "bg-foreground text-background" : "bg-gold text-gold-foreground"
          }`}
        >
          {isSold ? "Sold" : "Available"}
        </span>
        {l.mls && (
          <span className="absolute bottom-4 left-4 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground">
            MLS® {l.mls}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-7">
        <span className="font-display text-2xl text-foreground">
          {formatPrice(isSold && l.soldPrice ? l.soldPrice : l.price)}
        </span>
        <h3 className="mt-2 font-display text-lg text-foreground leading-snug">{l.title}</h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {l.address}, {l.city}
        </p>
        {l.sqft > 0 && (
          <div className="mt-5 flex items-center gap-5 text-sm text-foreground/75 border-t border-border pt-5">
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="h-4 w-4 text-gold" /> {l.sqft.toLocaleString()} sqft
            </span>
            {l.propertyType && (
              <span className="text-muted-foreground">{l.propertyType}</span>
            )}
          </div>
        )}
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center justify-between text-sm font-medium uppercase tracking-[0.16em] text-foreground hover:text-gold transition-colors"
        >
          Inquire <ArrowUpRight className="h-4 w-4" />
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

  const count = loading ? 3 : commercial.length;

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

        <div className={`mt-14 grid gap-7 ${gridColsFor(count)}`}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : commercial.map((l) => <CommercialCard key={l.id} l={l} />)}
        </div>

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
