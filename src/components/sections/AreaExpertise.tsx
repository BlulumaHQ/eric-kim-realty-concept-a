import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";

const areas = [
  {
    name: "Vancouver",
    desc: "West Side, East Van, and Downtown — character homes, condos, and family neighbourhoods.",
    image:
      "https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Burnaby",
    desc: "Brentwood, Metrotown, and North Burnaby — modern towers and established residential streets.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Richmond",
    desc: "Steveston, Brighouse, and Terra Nova — family homes, townhomes, and waterfront living.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Coquitlam",
    desc: "North Coquitlam and Burke Mountain — SkyTrain access, parks, and growing family communities.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Surrey",
    desc: "South Surrey, Cloverdale, and Fleetwood — detached homes, townhomes, and new developments.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
  },
];

export function AreaExpertise() {
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow="Local Expertise"
        title="Neighbourhoods Eric Knows Inside Out"
        description="Greater Vancouver is a collection of distinct communities. Eric helps clients understand the lifestyle, value, and long-term potential of each area."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a, i) => (
          <Link
            key={a.name}
            to="/contact"
            className={`group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-elegant transition-all duration-300 ${
              i === 0 ? "lg:row-span-2 lg:col-span-1" : ""
            }`}
          >
            <div
              className={`relative ${i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[4/3]"} overflow-hidden bg-muted`}
            >
              <img
                src={a.image}
                alt={`${a.name} residential neighbourhood`}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                      Greater Vancouver
                    </p>
                    <h3 className="mt-2 font-display text-2xl md:text-3xl text-white leading-tight">
                      {a.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-md">
                      {a.desc}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
