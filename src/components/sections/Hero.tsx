import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
        {/* Very subtle overlay gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="container-x flex min-h-[78vh] md:min-h-[86vh] items-center py-28 md:py-36">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-gold">
              Eric Kim · REALTOR®
            </span>
          </div>

          <h1 className="mt-7 font-display text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.04] font-medium text-balance">
            Vancouver Real Estate, <em className="not-italic text-gold">Elevated</em>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 text-pretty">
            Helping buyers and sellers navigate Metro Vancouver&apos;s residential, commercial,
            and presale market with clarity and confidence.
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
      </div>
    </section>
  );
}
