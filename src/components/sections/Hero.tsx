import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
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
      <div className="absolute inset-0 -z-10 bg-grid-faint opacity-50" />

      <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-center pt-14 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        {/* LEFT — Copy */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-navy/15 bg-background/80 backdrop-blur px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Initia Real Estate · Metro Vancouver
          </div>

          <h1 className="mt-7 font-display text-[2.4rem] leading-[1.06] sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem] xl:leading-[1.04] font-medium text-navy text-balance">
            Metro Vancouver Real Estate Guidance for{" "}
            <span className="text-navy/65">Buyers, Sellers, Investors</span>{" "}
            &amp; Business Owners
          </h1>

          <p className="mt-7 text-lg text-charcoal/75 max-w-xl text-pretty leading-relaxed">
            Work with{" "}
            <span className="text-navy font-medium">Eric Kim, REALTOR®</span>{" "}
            for residential, commercial, business asset / lease, and presale
            real estate opportunities across Metro Vancouver.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {trustBadges.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-background/90 px-3.5 py-1.5 text-xs font-medium text-charcoal"
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 bg-background/70 px-7 py-4 text-sm font-medium text-navy hover:bg-navy hover:text-navy-foreground transition"
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

        {/* RIGHT — Clean portrait, no overlays */}
        <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
          <div className="relative">
            {/* Decorative gold frame offset */}
            <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] border border-gold/40 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 pointer-events-none" />
            {/* Portrait */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elegant ring-1 ring-navy/10 bg-cream">
              <img
                src={portrait}
                alt="Eric Kim, REALTOR® at Initia Real Estate"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Name plate BELOW portrait — no overlap */}
          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-background border border-border px-5 py-4 shadow-soft">
            <div>
              <p className="font-display text-2xl text-navy leading-tight">
                Eric Kim
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                REALTOR® · Initia Real Estate
              </p>
            </div>
            <a
              href="tel:+17788388993"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-navy/5 hover:bg-navy hover:text-navy-foreground transition px-4 py-2 text-xs font-medium text-navy"
            >
              <Phone className="h-3.5 w-3.5" />
              (778) 838-8993
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
