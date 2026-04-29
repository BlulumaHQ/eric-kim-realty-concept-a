import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import heroImg from "@/assets/hero-vancouver.jpg";
import portrait from "@/assets/eric-portrait.jpg";

const trustBadges = [
  "Residential Property",
  "Commercial Property",
  "Business Asset / Lease",
  "Presale VIP",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-10 bg-grid-faint opacity-60" />

      <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_1fr] items-center pt-16 pb-24 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        {/* LEFT — Copy */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-navy/15 bg-background/70 backdrop-blur px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Initia Real Estate · Metro Vancouver
          </div>

          <h1 className="mt-7 font-display text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] xl:leading-[1.04] font-medium text-navy text-balance">
            Metro Vancouver Real Estate Guidance for{" "}
            <em className="not-italic text-navy/65">
              Buyers, Sellers, Investors
            </em>{" "}
            &amp; Business Owners
          </h1>

          <p className="mt-7 text-lg text-charcoal/75 max-w-xl text-pretty leading-relaxed">
            Work with{" "}
            <span className="text-navy font-medium">Eric Kim, REALTOR®</span>{" "}
            for residential, commercial, business asset / lease, and presale
            real estate opportunities across Metro Vancouver.
          </p>

          {/* Trust badges */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {trustBadges.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-background/80 px-3.5 py-1.5 text-xs font-medium text-charcoal"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition shadow-elegant"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 bg-background/60 px-7 py-4 text-sm font-medium text-navy hover:bg-navy hover:text-navy-foreground transition"
            >
              View Current Opportunities
            </Link>
          </div>

          <p className="mt-7 text-sm text-charcoal/70">
            Call or text Eric directly at{" "}
            <a
              href="tel:+17788388993"
              className="inline-flex items-center gap-1.5 font-medium text-navy hover:text-gold transition-colors"
            >
              <Phone className="h-3.5 w-3.5" /> (778) 838-8993
            </a>
          </p>
        </div>

        {/* RIGHT — Premium portrait composition */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          {/* Skyline backdrop */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elegant">
            <img
              src={heroImg}
              alt="Metro Vancouver skyline"
              width={1536}
              height={1920}
              className="h-full w-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/85 via-navy/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/60" />

            {/* Eyebrow tag inside image */}
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-background/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              REALTOR® · Metro Vancouver
            </div>

            {/* Portrait positioned bottom-right inside frame */}
            <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between gap-4">
              <div className="text-white max-w-[55%]">
                <p className="font-display text-2xl md:text-3xl leading-tight">
                  Eric Kim
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gold/90">
                  REALTOR® · Initia Real Estate
                </p>
              </div>
              <img
                src={portrait}
                alt="Eric Kim, REALTOR®"
                width={220}
                height={220}
                className="h-28 w-28 md:h-32 md:w-32 rounded-2xl object-cover ring-4 ring-white/90 shadow-elegant"
              />
            </div>
          </div>

          {/* Stat card — single, intentional */}
          <div className="hidden md:block absolute -left-6 top-10 rounded-2xl bg-background border border-border shadow-card px-5 py-4 max-w-[210px]">
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-medium">
              Specialties
            </p>
            <p className="mt-1.5 font-display text-base text-navy leading-snug">
              Residential · Commercial · Presale
            </p>
          </div>

          <div className="hidden md:block absolute -right-4 bottom-24 rounded-2xl bg-navy text-navy-foreground shadow-elegant px-5 py-4 max-w-[210px]">
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-medium">
              Brokerage
            </p>
            <p className="mt-1.5 font-display text-base leading-snug">
              Initia Real Estate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
