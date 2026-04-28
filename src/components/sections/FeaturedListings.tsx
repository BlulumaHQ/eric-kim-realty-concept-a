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
    desc: "Retail / Office / Investment",
    cta: "Contact for Details",
  },
  {
    img: presaleImg,
    tag: "Presale",
    title: "Presale Opportunity",
    location: "Greater Vancouver",
    desc: "New Development",
    cta: "Request Information",
  },
  {
    img: residentialImg,
    tag: "Residential",
    title: "Residential Opportunity",
    location: "Metro Vancouver",
    desc: "Buyer / Seller Guidance",
    cta: "Speak With Eric",
  },
];

export function FeaturedListings() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeading
        eyebrow="Opportunities"
        title="Current & Featured Opportunities"
        description="A curated look at the categories Eric works in across Metro Vancouver."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <article
            key={l.title}
            className="group flex flex-col overflow-hidden rounded-3xl bg-card border border-border hover:shadow-elegant transition-all duration-300"
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
              <span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium uppercase tracking-wider text-navy">
                {l.tag}
              </span>
            </div>
            <div className="flex flex-col flex-1 p-6">
              <h3 className="font-display text-xl text-navy">{l.title}</h3>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-gold" /> {l.location}
              </p>
              <p className="mt-3 text-sm text-charcoal/80 flex-1">{l.desc}</p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-navy hover:bg-navy hover:text-navy-foreground transition-colors"
              >
                {l.cta} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        For the latest available listings and private opportunities, please{" "}
        <Link to="/contact" className="text-navy underline underline-offset-4 hover:text-gold">
          contact Eric directly
        </Link>
        .
      </p>
    </section>
  );
}
