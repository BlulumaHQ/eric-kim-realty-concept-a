import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { soldResidential, formatPrice } from "@/lib/listings";

export function RecentlySold() {
  if (soldResidential.length === 0) return null;

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
                Track Record
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-[2.75rem] text-foreground text-balance leading-[1.1]">
              Recently Sold Across Greater Vancouver
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Real homes, real outcomes. A look at Eric&apos;s recent residential
              transactions — every client receives the same attentive process.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-foreground hover:text-gold transition-colors"
            >
              Request a Home Valuation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            {soldResidential.map((l) => (
              <article
                key={l.id}
                className="group overflow-hidden rounded-2xl bg-background border border-border hover:shadow-elegant transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={l.image}
                    alt={`Sold — ${l.address}, ${l.city}`}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = l.fallbackImage;
                    }}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-foreground text-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Sold
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-display text-xl text-foreground">
                    {formatPrice(l.soldPrice ?? l.price)}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-gold" /> {l.neighborhood}, {l.city}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {l.beds} Bed · {l.baths} Bath · {l.sqft.toLocaleString()} sqft · {l.propertyType}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
