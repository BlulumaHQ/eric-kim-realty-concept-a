import { Link } from "@tanstack/react-router";
import { Phone, Mail, Instagram } from "lucide-react";
import initiaLogo from "@/assets/initia-logo.png";
import mlsBadge from "@/assets/mls-reciprocity.gif";
import erickimLogo from "@/assets/eric-kim-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <img
              src={erickimLogo}
              alt="Eric Kim REALTOR®"
              className="h-9 w-auto brightness-0 invert"
              width={420}
              height={120}
            />
            <p className="mt-5 text-sm text-navy-foreground/80">
              Residential • Commercial • Presale
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-navy-foreground/60">
              Metro Vancouver, BC
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="rounded-md bg-white px-3 py-2">
                <img src={initiaLogo} alt="Initia Real Estate" className="h-7 w-auto" />
              </div>
              <div className="rounded-md bg-white p-1.5">
                <img src={mlsBadge} alt="MLS® Reciprocity" className="h-8 w-auto" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold">Navigation</h4>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/commercial", label: "Commercial" },
                { to: "/presale", label: "Presale" },
                { to: "/listings", label: "Listings" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="text-navy-foreground/75 hover:text-gold transition-colors"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+17788388993"
                  className="inline-flex items-center gap-2 text-navy-foreground/85 hover:text-gold"
                >
                  <Phone className="h-4 w-4" /> (778) 838-8993
                </a>
              </li>
              <li>
                <a
                  href="mailto:erickim.realtor@outlook.com"
                  className="inline-flex items-center gap-2 text-navy-foreground/85 hover:text-gold break-all"
                >
                  <Mail className="h-4 w-4" /> erickim.realtor@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/erickim.realtor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-navy-foreground/85 hover:text-gold"
                >
                  <Instagram className="h-4 w-4" /> @erickim.realtor
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-navy-foreground/15 pt-8 grid gap-4 md:grid-cols-[1fr_auto] text-xs text-navy-foreground/60">
          <p className="max-w-3xl leading-relaxed">
            This website is for general information only. Real estate information should be
            verified independently. Please consult appropriate legal, financial, and
            professional advisors before making real estate decisions.
          </p>
          <p className="md:text-right">
            © 2026 Eric Kim. All rights reserved. <span className="text-gold">|</span> Website by Bluluma
          </p>
        </div>
      </div>
    </footer>
  );
}
