import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import heroImg from "@/assets/hero-vancouver.jpg";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-width property image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Luxury Metro Vancouver home at golden hour with mountains and ocean"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        {/* Soft overlays for legibility — keeps image bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="container-x grid min-h-[80vh] md:min-h-[88vh] items-center gap-12 py-24 md:py-32 lg:grid-cols-12">
        {/* LEFT — Headline */}
        <div className="lg:col-span-7 text-white">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-gold">
              Eric Kim · REALTOR®
            </span>
          </div>

          <h1 className="mt-7 font-display text-4xl sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1.04] font-medium text-balance">
            Vancouver Real Estate, <em className="not-italic text-gold">Elevated</em>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 text-pretty">
            Helping buyers and sellers navigate the market with clarity, expertise, and results.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/listings"
              className="group inline-flex items-center justify-center gap-2 rounded-none border border-white/30 bg-white/95 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-foreground hover:bg-white transition"
            >
              View Listings
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-none border border-white/40 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white hover:bg-white hover:text-foreground transition"
            >
              Contact Eric
            </Link>
          </div>
        </div>

        {/* RIGHT — Google Reviews Trust Card */}
        <div className="lg:col-span-5 lg:justify-self-end w-full max-w-md">
          <div className="rounded-lg bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5 p-7">
            <div className="flex items-center gap-3">
              {/* Google "G" mark */}
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
                Google Reviews
              </div>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-5xl font-medium text-foreground leading-none">
                5.0
              </span>
              <div
                className="flex items-center gap-0.5"
                aria-label="Rated 5 out of 5"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill="#FBBC05"
                    stroke="#FBBC05"
                  />
                ))}
              </div>
            </div>

            <p className="mt-3 text-sm text-foreground/75">
              Based on <span className="font-semibold text-foreground">100+</span> Google Reviews
            </p>

            <div className="mt-5 h-px w-full bg-border" />

            <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
              Trusted by Vancouver home buyers &amp; sellers across the West Side, Burnaby, and Metro Vancouver.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
