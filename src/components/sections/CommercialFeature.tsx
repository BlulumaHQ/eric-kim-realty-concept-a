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
    <section className="bg-cream py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={commercialImg}
              alt="Modern commercial building in Metro Vancouver"
              width={1024}
              height={768}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 md:-right-6 max-w-[260px] rounded-2xl bg-navy text-navy-foreground p-6 shadow-elegant">
            <p className="text-xs uppercase tracking-[0.18em] text-gold">For Business Owners</p>
            <p className="mt-2 font-display text-xl">Commercial-grade guidance with personal attention.</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="gold-divider" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Commercial</span>
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance">
            Commercial Real Estate Support for Business Owners &amp; Investors
          </h2>
          <p className="mt-5 text-muted-foreground text-pretty">
            Whether you are looking for a business location, investment property, retail space, office opportunity, or commercial listing, Eric helps you understand the opportunity, location, numbers, and next steps before you move forward.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-background p-5 shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-3 font-display text-lg text-navy">{title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground italic">
            All property decisions should be reviewed with the appropriate legal, financial, and professional advisors before completion.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition shadow-card"
          >
            Discuss a Commercial Opportunity <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
