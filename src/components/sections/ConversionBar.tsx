import { Link } from "@tanstack/react-router";
import { Home, Key, Sprout, MessageSquare, ArrowUpRight } from "lucide-react";

const items = [
  {
    icon: Home,
    title: "Buying a Home",
    desc: "Find the right home for your family across Greater Vancouver.",
    to: "/services" as const,
  },
  {
    icon: Key,
    title: "Selling a Home",
    desc: "List with a clear pricing, marketing, and negotiation strategy.",
    to: "/services" as const,
  },
  {
    icon: Sprout,
    title: "First-Time Buyers",
    desc: "Patient guidance through every step of your first purchase.",
    to: "/services" as const,
  },
  {
    icon: MessageSquare,
    title: "Free Consultation",
    desc: "Book a no-pressure conversation about your home goals.",
    to: "/contact" as const,
  },
];

export function ConversionBar() {
  return (
    <section className="container-x pt-16 md:pt-20 pb-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl bg-background p-4 md:p-5 shadow-soft border border-border">
        {items.map(({ icon: Icon, title, desc, to }) => (
          <Link
            key={title}
            to={to}
            className="group rounded-xl p-5 hover:bg-cream transition-colors flex flex-col"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg text-foreground leading-snug">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground flex-1 leading-relaxed">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold group-hover:gap-2 transition-all">
              Learn More <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
