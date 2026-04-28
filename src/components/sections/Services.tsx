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
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    desc: "Support for business owners, investors, and commercial clients looking at retail, office, mixed-use, and investment opportunities.",
    cta: "Commercial Opportunities",
    to: "/commercial" as const,
  },
  {
    icon: Sparkles,
    title: "Presale Real Estate",
    desc: "Explore upcoming projects and new development opportunities with professional guidance before making a commitment.",
    cta: "Explore Presales",
    to: "/presale" as const,
  },
];

export function Services() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeading
        eyebrow="Services"
        title="Real Estate Services Built Around Your Goals"
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, desc, cta, to }) => (
          <article
            key={title}
            className="group relative flex flex-col rounded-3xl bg-card border border-border p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-navy text-navy-foreground shadow-card">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-2xl text-navy">{title}</h3>
            <p className="mt-3 text-muted-foreground flex-1">{desc}</p>
            <Link
              to={to}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold"
            >
              {cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
