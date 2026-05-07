import { Link } from "@tanstack/react-router";
import { ArrowRight, Home, Key, Sprout, Building2 } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";

const services = [
  {
    icon: Home,
    title: "Buying a Home",
    desc: "From neighbourhood discovery to closing day — Eric helps you understand the market, evaluate homes, and write a confident offer.",
    cta: "Start Your Home Search",
    to: "/services" as const,
    featured: true,
  },
  {
    icon: Key,
    title: "Selling a Home",
    desc: "Pricing strategy, professional marketing, and skilled negotiation — designed to position your home for the strongest possible result.",
    cta: "Request a Home Valuation",
    to: "/services" as const,
    featured: false,
  },
  {
    icon: Sprout,
    title: "First-Time Buyers",
    desc: "A patient, no-pressure approach for first-time buyers — clear answers about budgeting, mortgages, deposits, and long-term value.",
    cta: "First-Time Buyer Guide",
    to: "/services" as const,
    featured: false,
  },
  {
    icon: Building2,
    title: "Investment & Commercial",
    desc: "Residential investment guidance and commercial real estate support for clients building a long-term portfolio.",
    cta: "Explore Investment Options",
    to: "/commercial" as const,
    featured: false,
  },
];

export function Services() {
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow="Services"
        title="Residential Real Estate, Built Around Your Family"
        description="A focused practice helping Greater Vancouver buyers, sellers, and first-time homeowners — with quiet expertise across investment and commercial when needed."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
        {services.map(({ icon: Icon, title, desc, cta, to, featured }) => (
          <article
            key={title}
            className={`group relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
              featured
                ? "bg-gradient-navy text-navy-foreground shadow-elegant lg:-translate-y-2 border border-foreground/40"
                : "bg-card border border-border hover:shadow-elegant hover:-translate-y-1"
            }`}
          >
            {featured && (
              <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-foreground shadow-card">
                Most Requested
              </span>
            )}
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-card ${
                featured
                  ? "bg-gold text-gold-foreground"
                  : "bg-gradient-navy text-navy-foreground"
              }`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3
              className={`mt-7 font-display text-xl md:text-2xl ${
                featured ? "text-navy-foreground" : "text-foreground"
              }`}
            >
              {title}
            </h3>
            <p
              className={`mt-3 flex-1 leading-relaxed text-sm ${
                featured ? "text-navy-foreground/80" : "text-muted-foreground"
              }`}
            >
              {desc}
            </p>
            <Link
              to={to}
              className={`mt-7 inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                featured
                  ? "text-gold hover:text-gold/80"
                  : "text-foreground hover:text-gold"
              }`}
            >
              {cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
