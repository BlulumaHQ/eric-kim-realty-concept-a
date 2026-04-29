import { Link } from "@tanstack/react-router";
import { ArrowRight, Home, Building2, Sparkles } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";

const services = [
  {
    icon: Home,
    title: "Residential Real Estate",
    desc: "Buy or sell with clear guidance, market insight, and a step-by-step process designed to reduce confusion and help you move with confidence.",
    cta: "Residential Guidance",
    to: "/services" as const,
    featured: false,
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    desc: "Support for business owners, investors, and commercial clients across retail, office, mixed-use, business asset, and lease opportunities.",
    cta: "Commercial Opportunities",
    to: "/commercial" as const,
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Presale Real Estate",
    desc: "Explore upcoming projects and new development opportunities with professional guidance before making a commitment.",
    cta: "Explore Presales",
    to: "/presale" as const,
    featured: false,
  },
];

export function Services() {
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow="Services"
        title="Real Estate Services Built Around Your Goals"
        description="A focused practice across the three areas Metro Vancouver clients ask about most."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {services.map(({ icon: Icon, title, desc, cta, to, featured }) => (
          <article
            key={title}
            className={`group relative flex flex-col rounded-3xl p-8 md:p-10 transition-all duration-300 ${
              featured
                ? "bg-gradient-navy text-navy-foreground shadow-elegant lg:-translate-y-2 lg:scale-[1.02] border border-navy/40"
                : "bg-card border border-border hover:shadow-elegant hover:-translate-y-1"
            }`}
          >
            {featured && (
              <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-foreground shadow-card">
                Specialty Focus
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
              className={`mt-7 font-display text-2xl md:text-[1.65rem] ${
                featured ? "text-navy-foreground" : "text-navy"
              }`}
            >
              {title}
            </h3>
            <p
              className={`mt-3 flex-1 leading-relaxed ${
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
                  : "text-navy hover:text-gold"
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
