import { Link } from "@tanstack/react-router";
import { MapPin, Megaphone, TrendingUp, FileText, ArrowRight } from "lucide-react";
import commercialImg from "@/assets/listing-commercial.jpg";

const benefits = [
  { icon: MapPin, title: "Business Location Search", desc: "Identify suitable spaces for your operations." },
  { icon: Megaphone, title: "Commercial Listing Exposure", desc: "Position your property in front of qualified buyers." },
  { icon: TrendingUp, title: "Investor-Focused Guidance", desc: "Review opportunities with a long-term lens." },
  { icon: FileText, title: "Lease & Purchase Opportunities", desc: "Navigate options across retail, office, and mixed-use." },
];

export function CommercialFeature() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-border shadow-elegant">
            <img
              src={commercialImg}
              alt="Modern commercial building in Metro Vancouver"
              width={1024}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 md:-right-6 max-w-[280px] rounded-xl bg-background text-foreground p-6 shadow-elegant border border-border">
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
              For Business Owners
            </p>
            <p className="mt-2 font-display text-xl text-foreground leading-snug">
              Commercial-grade guidance with personal attention.
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
              Commercial
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-[2.85rem] text-foreground text-balance leading-[1.1]">
            Commercial Real Estate Support for Business Owners &amp; Investors
          </h2>
          <p className="mt-6 text-muted-foreground text-pretty leading-relaxed text-lg">
            Whether you are looking for a business location, investment property, retail space, office opportunity, business asset / lease, or commercial listing, Eric helps you understand the opportunity, location, numbers, and next steps before you move forward.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-background p-5 hover:shadow-card transition-shadow"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 font-display text-lg text-foreground">{title}</h4>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-7 text-xs text-muted-foreground italic leading-relaxed max-w-xl">
            All property decisions should be reviewed with the appropriate legal, financial, and professional advisors before completion.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-none bg-foreground px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-background hover:bg-foreground/85 transition"
          >
            Discuss a Commercial Opportunity <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
