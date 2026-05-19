import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, BedDouble, Bath, Maximize2, Sparkles } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";
import { useListings, formatPrice, type Listing } from "@/lib/listings";
import { useI18n } from "@/lib/i18n";

function priceLabel(l: Listing) {
  const p = l.status === "sold" && l.soldPrice ? l.soldPrice : l.price;
  if (!p || p <= 0) return "Price upon request";
  return formatPrice(p);
}

function Stats({ l, className = "" }: { l: Listing; className?: string }) {
  const items: React.ReactNode[] = [];
  if (l.beds > 0)
    items.push(
      <span key="b" className="inline-flex items-center gap-1.5">
        <BedDouble className="h-4 w-4 text-gold" /> {l.beds} Bed
      </span>
    );
  if (l.baths > 0)
    items.push(
      <span key="ba" className="inline-flex items-center gap-1.5">
        <Bath className="h-4 w-4 text-gold" /> {l.baths} Bath
      </span>
    );
  if (l.sqft > 0)
    items.push(
      <span key="s" className="inline-flex items-center gap-1.5">
        <Maximize2 className="h-4 w-4 text-gold" /> {l.sqft.toLocaleString()} sqft
      </span>
    );
  if (items.length === 0) return null;
  return (
    <div className={`flex flex-wrap items-center gap-5 text-sm text-foreground/75 border-t border-border pt-5 ${className}`}>
      {items}
    </div>
  );
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

function locationLine(l: Listing) {
  return l.address ? `${l.address}, ${l.city}` : l.city;
}

function ListingCard({ listing }: { listing: Listing }) {
  const isSold = listing.status === "sold";
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={`${listing.title} — ${locationLine(listing)}`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = listing.fallbackImage;
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
        <StatusBadge isSold={isSold} label={isSold ? "Sold" : "For Sale"} />
        {listing.mls && (
          <span className="absolute bottom-4 left-4 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground">
            MLS® {listing.mls}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-7">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-2xl text-foreground">{priceLabel(listing)}</span>
          {isSold && listing.soldPrice && listing.price > 0 && listing.price !== listing.soldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(listing.price)}
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display text-lg text-foreground leading-snug">{listing.title}</h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {locationLine(listing)}
        </p>

        <Stats l={listing} className="mt-5" />

        <span className="mt-6 inline-flex items-center justify-between text-sm font-medium uppercase tracking-[0.16em] text-foreground group-hover:text-gold transition-colors">
          {isSold ? "View Sold Details" : "Request Showing"}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}


function SpotlightCard({ listing }: { listing: Listing }) {
  const isSold = listing.status === "sold";
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group grid md:grid-cols-2 overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant transition-all duration-300"
    >
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={`${listing.title} — ${locationLine(listing)}`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = listing.fallbackImage;
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
        <StatusBadge isSold={isSold} label={isSold ? "Sold" : "For Sale"} />
        {listing.mls && (
          <span className="absolute bottom-4 left-4 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground">
            MLS® {listing.mls}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center p-8 md:p-10">
        <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
          Spotlight Listing
        </span>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <span className="font-display text-3xl text-foreground">{priceLabel(listing)}</span>
        </div>
        <h3 className="mt-2 font-display text-2xl text-foreground leading-snug">{listing.title}</h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {locationLine(listing)}
        </p>
        <Stats l={listing} className="mt-6" />
        <span className="mt-7 inline-flex items-center gap-2 self-start rounded-none bg-foreground px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-background group-hover:bg-foreground/85 transition">
          {isSold ? "View Sold Details" : "Request Private Showing"}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}


function OffMarketCard() {
  return (
    <Link
      to="/contact"
      className="group flex flex-col items-start justify-center rounded-2xl border-2 border-dashed border-border bg-transparent p-8 hover:border-gold hover:bg-cream/40 transition-colors min-h-[360px]"
    >
      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
        <Sparkles className="h-4 w-4" /> Off-Market Access
      </span>
      <h3 className="mt-4 font-display text-2xl text-foreground leading-snug">
        Looking for something specific?
      </h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Eric regularly works with quiet listings and pre-market opportunities that never reach the
        MLS. Share what you&apos;re searching for and get matched first.
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-foreground group-hover:text-gold transition-colors">
        Start a Private Search <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-card border border-border">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-7 space-y-4">
        <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        <div className="h-px bg-border" />
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

export function FeaturedListings() {
  const { loading, featuredResidential } = useListings();

  if (!loading && featuredResidential.length === 0) return null;

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow="Featured Homes"
        title="Current Residential Listings"
        description="A live look at homes Eric is currently representing across Greater Vancouver. Contact Eric for full details, private showings, and the latest off-market opportunities."
      />

      {loading ? (
        <div className="mt-16 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : featuredResidential.length === 1 ? (
        <div className="mt-16 grid gap-7 grid-cols-1 lg:grid-cols-2">
          <SpotlightCard listing={featuredResidential[0]} />
          <OffMarketCard />
        </div>
      ) : featuredResidential.length === 2 ? (
        <div className="mt-16 grid gap-7 grid-cols-1 md:grid-cols-3">
          {featuredResidential.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
          <OffMarketCard />
        </div>
      ) : (
        <div className="mt-16 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredResidential.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
          <OffMarketCard />
        </div>
      )}
    </section>
  );
}
