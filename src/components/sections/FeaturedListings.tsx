import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";
import {
  activeResidential,
  soldResidential,
  formatPrice,
  type Listing,
} from "@/lib/listings";

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
            isSold
              ? "bg-foreground text-background"
              : "bg-gold text-gold-foreground"
          }`}
        >
          {isSold ? "Sold" : "For Sale"}
        </span>
        <span className="absolute bottom-4 left-4 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground">
          MLS® {listing.mls}
        </span>
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

export function FeaturedListings() {
  const featured = [...activeResidential, ...soldResidential].slice(0, 3);

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow="Featured Homes"
        title="Current & Recently Sold Residential Listings"
        description="A live look at homes Eric is currently representing across Greater Vancouver. Contact Eric for full details, private showings, and the latest off-market opportunities."
      />

      <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}

        <article className="flex flex-col justify-between rounded-2xl border border-dashed border-border bg-cream p-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
              Off-Market Access
            </p>
            <h3 className="mt-3 font-display text-2xl text-foreground leading-snug">
              Looking for something specific?
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Eric works with families across Vancouver, Burnaby, Coquitlam,
              Richmond, and Surrey to find the right home — including private
              and pre-MLS opportunities.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-none bg-foreground px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-background hover:bg-foreground/85 transition"
          >
            Start a Home Search <ArrowUpRight className="h-4 w-4" />
          </Link>
        </article>
      </div>
    </section>
  );
}
