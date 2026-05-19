import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import heroImg from "@/assets/hero-vancouver.jpg";
import { formatPrice, useListings, type Listing } from "@/lib/listings";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { featuredResidential } = useListings();
  const { t } = useI18n();
  const featured = featuredResidential[0];
  const slideCount = featured ? 2 : 1;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slideCount < 2) return;
    const t2 = setInterval(() => setIndex((i) => (i + 1) % slideCount), 7000);
    return () => clearInterval(t2);
  }, [slideCount]);

  useEffect(() => {
    if (index >= slideCount) setIndex(0);
  }, [index, slideCount]);

  const go = (delta: number) =>
    setIndex((i) => ((i + delta) % slideCount + slideCount) % slideCount);

  return (
    <section className="relative isolate overflow-hidden">
      <div key={index} className="animate-in fade-in duration-700">
        {index === 0 || !featured ? <GenericSlide /> : <ListingSlide listing={featured} />}
      </div>

      {slideCount > 1 && (
        <>
          <button
            type="button"
            aria-label={t("hero.cta.view")}
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 hidden md:inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={t("hero.cta.view")}
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 hidden md:inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-4 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function GenericSlide() {
  const { t } = useI18n();
  return (
    <>
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Modern Greater Vancouver residential home at golden hour"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="container-x grid min-h-[80vh] md:min-h-[88vh] items-center gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-7 text-white">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-gold">
              {t("hero.eyebrow")}
            </span>
          </div>

          <h1 className="mt-7 font-display text-4xl sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1.04] font-medium text-balance">
            {t("hero.title.a")} <em className="not-italic text-gold">{t("hero.title.home")}</em> {t("hero.title.b")}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 text-pretty">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-none bg-gold px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-foreground hover:bg-gold/90 transition"
            >
              {t("hero.cta.book")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-none border border-white/40 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white hover:bg-white hover:text-foreground transition"
            >
              {t("hero.cta.view")}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 lg:justify-self-end w-full max-w-md">
          <div className="rounded-lg bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5 p-7">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-black/10 font-display text-[18px] font-semibold leading-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, #4285F4 0 25%, #34A853 25% 50%, #FBBC05 50% 75%, #EA4335 75% 100%)",
                  color: "transparent",
                }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-foreground">
                  G
                </span>
              </span>
              <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("hero.reviews")}
              </div>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-5xl font-medium text-foreground leading-none">
                5.0
              </span>
              <div className="flex items-center gap-0.5" aria-label={t("hero.ratedAria")}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-5 w-5" fill="#FBBC05" stroke="#FBBC05" />
                ))}
              </div>
            </div>

            <p className="mt-3 text-sm text-foreground/75">
              {t("hero.verified")} <span className="font-semibold text-foreground">{t("hero.reviews")}</span>
            </p>

            <div className="mt-5 h-px w-full bg-border" />

            <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
              {t("hero.reviewsNote")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function ListingSlide({ listing }: { listing: Listing }) {
  const { t } = useI18n();
  const location = [listing.neighborhood, listing.city].filter(Boolean).join(", ") || listing.city;
  return (
    <>
      <div className="absolute inset-0 -z-10">
        <img
          src={listing.image}
          alt={listing.title}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = listing.fallbackImage;
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>

      <div className="container-x grid min-h-[80vh] md:min-h-[88vh] items-center gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-8 text-white">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-gold">
              {t("hero.featured")}
            </span>
          </div>

          <h1 className="mt-7 font-display text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.04] font-medium text-balance">
            {listing.title}
          </h1>

          <p className="mt-6 text-lg text-white/85">{location}</p>

          <p className="mt-5 font-display text-3xl sm:text-4xl text-gold">
            {listing.price > 0 ? formatPrice(listing.price) : t("hero.priceOnRequest")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/listings/$id"
              params={{ id: listing.id }}
              className="group inline-flex items-center justify-center gap-2 rounded-none bg-gold px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-foreground hover:bg-gold/90 transition"
            >
              {t("hero.viewListing")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-none border border-white/40 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white hover:bg-white hover:text-foreground transition"
            >
              {t("hero.bookViewing")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
