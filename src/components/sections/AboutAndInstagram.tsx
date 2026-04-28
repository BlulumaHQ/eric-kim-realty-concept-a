import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import portrait from "@/assets/eric-portrait.jpg";
import commercialImg from "@/assets/listing-commercial.jpg";
import presaleImg from "@/assets/listing-presale.jpg";
import residentialImg from "@/assets/listing-residential.jpg";
import initiaLogo from "@/assets/initia-logo.png";

export function AboutSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative max-w-md mx-auto lg:mx-0 w-full">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={portrait}
              alt="Eric Kim, REALTOR® at Initia Real Estate"
              width={1024}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-5 py-4 shadow-elegant border border-border">
            <img src={initiaLogo} alt="Initia Real Estate" className="h-8 w-auto" />
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-charcoal/70">Brokerage</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="gold-divider" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">About</span>
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance">
            Meet Eric Kim
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            Eric Kim is a REALTOR® with Initia Real Estate serving clients across Metro Vancouver. His work covers residential, commercial, and presale real estate, helping clients explore opportunities with a practical and client-focused approach.
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {[
              ["Name", "Eric Kim"],
              ["Title", "REALTOR®"],
              ["Company", "Initia Real Estate"],
              ["Specialties", "Residential / Commercial / Presale"],
              ["Location", "Metro Vancouver, BC"],
            ].map(([k, v]) => (
              <div key={k} className="border-l-2 border-gold pl-4">
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-medium text-navy">{v}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition shadow-card"
          >
            Contact Eric <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const igPosts = [
  { img: commercialImg, label: "Commercial Spotlight" },
  { img: presaleImg, label: "Presale Update" },
  { img: residentialImg, label: "Market Note" },
  { img: commercialImg, label: "Featured Listing" },
];

export function InstagramSection() {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="gold-divider" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Instagram</span>
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance">
            Follow Eric&apos;s Latest Real Estate Updates
          </h2>
          <p className="mt-4 text-muted-foreground">
            See current real estate updates, property opportunities, market content, and featured posts on Instagram.
          </p>
          <a
            href="https://www.instagram.com/erickim.realtor"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/20 px-6 py-3 text-sm font-medium text-navy hover:bg-navy hover:text-navy-foreground transition"
          >
            <Instagram className="h-4 w-4" /> @erickim.realtor
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {igPosts.map((p, i) => (
            <a
              key={i}
              href="https://www.instagram.com/erickim.realtor"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={p.img}
                alt={p.label}
                width={512}
                height={512}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-colors flex items-end p-3">
                <span className="text-xs font-medium text-navy-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.label}
                </span>
              </div>
              <Instagram className="absolute top-3 right-3 h-4 w-4 text-navy-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
