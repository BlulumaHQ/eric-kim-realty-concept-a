import { Link } from "@tanstack/react-router";
import { Building2, Home, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";

const items = [
  {
    icon: Building2,
    title: "Commercial Real Estate",
    desc: "Business owners, investors, retail, office, and lease opportunities.",
    to: "/commercial" as const,
  },
  {
    icon: Home,
    title: "Residential Buying & Selling",
    desc: "Guidance for buyers and sellers across Metro Vancouver.",
    to: "/services" as const,
  },
  {
    icon: Sparkles,
    title: "Presale Projects",
    desc: "New developments and presale VIP opportunities.",
    to: "/presale" as const,
  },
  {
    icon: MessageSquare,
    title: "Private Consultation",
    desc: "Speak directly with Eric about your goals.",
    to: "/contact" as const,
  },
];

export function ConversionBar() {
  return (
    <section className="container-x -mt-14 md:-mt-20 relative z-10 pb-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 rounded-3xl bg-background p-4 md:p-5 shadow-elegant border border-border">
        {items.map(({ icon: Icon, title, desc, to }) => (
          <Link
            key={title}
            to={to}
            className="group rounded-2xl p-5 hover:bg-cream transition-colors flex flex-col"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-navy-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg text-navy leading-snug">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground flex-1 leading-relaxed">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold group-hover:gap-2 transition-all">
              Learn More <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
