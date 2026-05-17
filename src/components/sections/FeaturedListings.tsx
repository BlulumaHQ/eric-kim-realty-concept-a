import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";
import { useListings, formatPrice, type Listing } from "@/lib/listings";

function gridColsFor(count: number) {
  if (count <= 1) return "grid-cols-1 max-w-xl mx-auto";
  if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}

function ListingCard({ listing }: { listing: Listing }) {
  const isSold = listing.status === "sold";
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={`${listing.title} — ${listing.address}, ${listing.city}`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = listing.fallbackImage;
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-soft ${
            isSold ? "bg-foreground text-background" : "bg-gold text-gold-foreground"
          }`}
        >
          {isSold ? "Sold" : "For Sale"}
        </span>
        {listing.mls && (
          <span className="absolute bottom-4 left-4 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground">
            MLS® {listing.mls}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-7">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-2xl text-foreground">
            {isSold && listing.soldPrice
              ? formatPrice(listing.soldPrice)
              : formatPrice(listing.price)}
          </span>
          {isSold && listing.soldPrice && listing.price !== listing.soldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(listing.price)}
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display text-lg text-foreground leading-snug">
          {listing.title}
        </h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {listing.address}, {listing.city}
        </p>

        <div className="mt-5 flex items-center gap-5 text-sm text-foreground/75 border-t border-border pt-5">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-gold" /> {listing.beds} Bed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gold" /> {listing.baths} Bath
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Maximize2 className="h-4 w-4 text-gold" /> {listing.sqft.toLocaleString()} sqft
          </span>
        </div>

        <Link
          to="/contact"
          className="mt-6 inline-flex items-center justify-between text-sm font-medium uppercase tracking-[0.16em] text-foreground hover:text-gold transition-colors"
        >
          {isSold ? "View Sold Details" : "Request Showing"}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
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

  const count = loading ? 3 : featuredResidential.length;

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow="Featured Homes"
        title="Current Residential Listings"
        description="A live look at homes Eric is currently representing across Greater Vancouver. Contact Eric for full details, private showings, and the latest off-market opportunities."
      />

      <div className={`mt-16 grid gap-7 ${gridColsFor(count)}`}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : featuredResidential.map((l) => <ListingCard key={l.id} listing={l} />)}
      </div>
    </section>
  );
}
