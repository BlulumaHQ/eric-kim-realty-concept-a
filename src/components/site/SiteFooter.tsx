import { Link } from "@tanstack/react-router";
import { Phone, Mail, Instagram } from "lucide-react";
import initiaLogo from "@/assets/initia-logo.png";
import mlsBadge from "@/assets/mls-reciprocity.gif";
import erickimLogo from "@/assets/eric-kim-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-[#2B2B2B] text-white/85">
      {/* Top gold accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container-x py-20">
        <div className="grid gap-14 md:grid-cols-4">
          {/* Col 1 — Logo + tagline */}
          <div className="md:col-span-1">
            <div className="inline-flex rounded-md bg-white px-5 py-4">
              <img
                src={erickimLogo}
                alt="Eric Kim REALTOR®"
                className="h-14 w-auto max-w-[220px] object-contain"
              />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Residential, commercial, and presale real estate guidance across Metro Vancouver.
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-gold">
              Metro Vancouver · BC
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="font-display text-base text-white">Navigation</h4>
            <span className="mt-3 inline-block h-px w-8 bg-gold" />
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/listings", label: "Listings" },
                { to: "/services", label: "Services" },
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

          {/* Col 3 — Contact */}
          <div>
            <h4 className="font-display text-base text-white">Contact</h4>
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

          {/* Col 4 — Brokerage / MLS */}
          <div>
            <h4 className="font-display text-base text-white">Brokerage</h4>
            <span className="mt-3 inline-block h-px w-8 bg-gold" />
            <div className="mt-5 flex items-center gap-3">
              <div className="rounded-md bg-white px-3 py-2">
                <img src={initiaLogo} alt="Initia Real Estate" className="h-7 w-auto" />
              </div>
              <div className="rounded-md bg-white p-1.5">
                <img src={mlsBadge} alt="MLS® Reciprocity" className="h-8 w-auto" />
              </div>
            </div>
            <a
              href="https://www.instagram.com/erickim.realtor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eric Kim on Instagram"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-gold hover:border-gold transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/55">
            © 2026 Eric Kim, REALTOR®. All rights reserved. <span className="text-gold">·</span>{" "}
            Information should be verified independently.
          </p>
        </div>
      </div>
    </footer>
  );
}
