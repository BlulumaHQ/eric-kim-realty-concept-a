import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";
import commercialImg from "@/assets/listing-commercial.jpg";
import presaleImg from "@/assets/listing-presale.jpg";
import residentialImg from "@/assets/listing-residential.jpg";

const listings = [
  {
    img: commercialImg,
    tag: "Commercial",
    title: "Commercial Opportunity",
    location: "Metro Vancouver",
    desc: "Retail, office, mixed-use, and investment property guidance for business owners and investors.",
    cta: "Contact for Details",
  },
  {
    img: presaleImg,
    tag: "Presale",
    title: "Presale Opportunity",
    location: "Greater Vancouver",
    desc: "Upcoming developments and presale projects with timeline, deposit, and floorplan review.",
    cta: "Request Information",
  },
  {
    img: residentialImg,
    tag: "Residential",
    title: "Residential Opportunity",
    location: "Metro Vancouver",
    desc: "Buyer and seller guidance with a clear, step-by-step approach across Metro Vancouver.",
    cta: "Speak With Eric",
  },
];

export function FeaturedListings() {
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow="Opportunities"
        title="Current & Featured Opportunity Categories"
        description="A curated look at the categories Eric works in across Metro Vancouver. Contact Eric for current availability."
      />

      <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <article
            key={l.title}
            className="group flex flex-col overflow-hidden rounded-3xl bg-card border border-border hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={l.img}
                alt={l.title}
                width={1024}
                height={768}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy shadow-soft">
                {l.tag}
              </span>
            </div>
            <div className="flex flex-col flex-1 p-7">
              <h3 className="font-display text-xl text-navy">{l.title}</h3>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-gold" /> {l.location}
              </p>
              <p className="mt-4 text-sm text-charcoal/80 leading-relaxed flex-1">
                {l.desc}
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-navy hover:bg-navy hover:text-navy-foreground hover:border-navy transition-colors"
              >
                {l.cta} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        For current available listings and private opportunities, please{" "}
        <Link
          to="/contact"
          className="text-navy underline underline-offset-4 hover:text-gold"
        >
          contact Eric directly
        </Link>
        .
      </p>
    </section>
  );
}
