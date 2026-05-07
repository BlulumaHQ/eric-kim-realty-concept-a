import { Link } from "@tanstack/react-router";
import { Phone, Mail, Instagram, MapPin } from "lucide-react";
import initiaxLogo from "@/assets/initiax-logo.png";
import mlsBadge from "@/assets/mls-reciprocity.gif";
import erickimLogo from "@/assets/eric-kim-logo.png";
import ericHeadshot from "@/assets/eric-kim-headshot.png";

export function SiteFooter() {
  return (
    <footer className="bg-[#2B2B2B] text-white/85">
      {/* Top gold accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container-x py-20">
        {/* Featured agent block */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-center pb-14 border-b border-white/10">
          {/* Headshot */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/40 to-transparent blur-sm" />
              <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full overflow-hidden bg-white ring-2 ring-gold/40">
                <img
                  src={ericHeadshot}
                  alt="Eric Kim, REALTOR®"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Name + tagline */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
              Your Trusted Realtor
            </p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl text-white leading-tight">
              Eric Kim
              <span className="block text-base md:text-lg font-sans font-normal tracking-[0.18em] uppercase text-white/60 mt-2">
                REALTOR® · Metro Vancouver
              </span>
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-md mx-auto lg:mx-0">
              Residential, commercial, and presale real estate guidance —
              delivered with discretion, market intelligence, and a commitment
              to long-term client relationships.
            </p>
          </div>

          {/* Brokerage card */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                Proudly Represented By
              </p>
              <div className="mt-4 flex items-center justify-center rounded-md bg-white px-5 py-4">
                <img
                  src={initiaxLogo}
                  alt="INITIA-X Luxury Real Estate"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="rounded-md bg-white px-2 py-1.5">
                  <img src={mlsBadge} alt="MLS® Reciprocity" className="h-7 w-auto" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                  MLS® Member
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower grid */}
        <div className="grid gap-12 md:grid-cols-3 pt-14">
          {/* Brand mark */}
          <div>
            <div className="inline-flex rounded-md bg-white px-5 py-4">
              <img
                src={erickimLogo}
                alt="Eric Kim REALTOR®"
                className="h-12 w-auto max-w-[220px] object-contain"
              />
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold">
              <MapPin className="h-3.5 w-3.5" /> Metro Vancouver · BC
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-base text-white">Navigation</h4>
            <span className="mt-3 inline-block h-px w-8 bg-gold" />
            <ul className="mt-5 grid grid-cols-2 gap-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/listings", label: "Listings" },
                { to: "/services", label: "Services" },
                { to: "/commercial", label: "Commercial" },
                { to: "/contact", label: "Contact" },
              ].map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="text-white/70 hover:text-gold transition-colors"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base text-white">Get in Touch</h4>
            <span className="mt-3 inline-block h-px w-8 bg-gold" />
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+17788388993"
                  className="inline-flex items-center gap-2.5 text-white/80 hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold" /> (778) 838-8993
                </a>
              </li>
              <li>
                <a
                  href="mailto:erickim.realtor@outlook.com"
                  className="inline-flex items-start gap-2.5 text-white/80 hover:text-gold transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>erickim.realtor@outlook.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/erickim.realtor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-white/80 hover:text-gold transition-colors"
                >
                  <Instagram className="h-4 w-4 text-gold" /> @erickim.realtor
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/55">
            © 2026 Eric Kim, REALTOR®. All rights reserved.{" "}
            <span className="text-gold">·</span> Information should be verified
            independently.
          </p>
        </div>
      </div>
    </footer>
  );
}
