import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Building2, Sparkles, Home } from "lucide-react";
import heroImg from "@/assets/hero-vancouver.jpg";
import portrait from "@/assets/eric-portrait.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center py-16 md:py-24 lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-charcoal">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Initia Real Estate · Metro Vancouver
          </div>

          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl text-navy text-balance leading-[1.05]">
            Metro Vancouver Real Estate Guidance for{" "}
            <span className="italic text-gold">Buyers, Sellers, Investors</span> &amp;
            Business Owners
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">
            Work with Eric Kim, REALTOR®, for residential, commercial, and presale real
            estate opportunities across Metro Vancouver.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-charcoal/80">
            {["Residential", "Commercial", "Presale", "Metro Vancouver"].map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" />}
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition shadow-elegant"
            >
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-medium text-navy hover:bg-navy hover:text-navy-foreground transition"
            >
              View Current Opportunities
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Call or text Eric directly at{" "}
            <a
              href="tel:+17788388993"
              className="inline-flex items-center gap-1 font-medium text-navy hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5" /> (778) 838-8993
            </a>
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={heroImg}
              alt="Metro Vancouver skyline at golden hour"
              width={1536}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-background/90 backdrop-blur p-4 shadow-card">
              <img
                src={portrait}
                alt="Eric Kim, REALTOR®"
                width={64}
                height={64}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-display text-lg text-navy leading-tight">Eric Kim</p>
                <p className="text-xs uppercase tracking-[0.16em] text-gold">
                  REALTOR® · Initia Real Estate
                </p>
              </div>
            </div>
          </div>

          <FloatingCard
            className="hidden md:flex absolute -left-6 top-12"
            icon={<Building2 className="h-4 w-4" />}
            label="Commercial Properties"
          />
          <FloatingCard
            className="hidden md:flex absolute -right-4 top-1/3"
            icon={<Sparkles className="h-4 w-4" />}
            label="Presale Opportunities"
          />
          <FloatingCard
            className="hidden md:flex absolute -left-4 bottom-32"
            icon={<Home className="h-4 w-4" />}
            label="Buyer & Seller Guidance"
          />
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  icon,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`items-center gap-2.5 rounded-full bg-background px-4 py-2.5 shadow-card border border-border ${className}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold">
        {icon}
      </span>
      <span className="text-sm font-medium text-navy whitespace-nowrap">{label}</span>
    </div>
  );
}
