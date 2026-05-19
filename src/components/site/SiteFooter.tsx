import { Link } from "@tanstack/react-router";
import { Phone, Mail, Instagram, MapPin } from "lucide-react";
import initiaxLogo from "@/assets/initiax-logo.png";
import mlsBadge from "@/assets/mls-reciprocity.gif";
import erickimLogo from "@/assets/eric-kim-logo.png";
import ericHeadshot from "@/assets/eric-kim-headshot.png";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  const navLinks = [
    { to: "/" as const, label: t("nav.home") },
    { to: "/about" as const, label: t("nav.about") },
    { to: "/listings" as const, label: t("nav.listings") },
    { to: "/services" as const, label: t("nav.services") },
    { to: "/commercial" as const, label: t("nav.commercial") },
    { to: "/contact" as const, label: t("nav.contact") },
  ];
  return (
    <footer className="bg-[#2B2B2B] text-white/85">
      {/* Top gold accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container-x py-20">
        {/* Featured agent block */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Headshot */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/40 to-transparent blur-sm" />
              <div className="relative h-44 w-44 md:h-52 md:w-52 rounded-full overflow-hidden bg-white ring-2 ring-gold/40">
                <img
                  src={ericHeadshot}
                  alt="Eric Kim, REALTOR®"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Name + tagline + dual logos */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
              {t("ft.your")}
            </p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl text-white leading-tight">
              Eric Kim
              <span className="block text-sm md:text-base font-sans font-normal tracking-[0.2em] uppercase text-white/60 mt-2">
                {t("ft.subtitle")}
              </span>
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-md mx-auto lg:mx-0">
              {t("ft.bio")}
            </p>

            {/* Dual logos lock-up */}
            <div className="mt-7 inline-flex items-center gap-4 rounded-md bg-white px-5 py-4">
              <img
                src={erickimLogo}
                alt="Eric Kim REALTOR®"
                className="h-11 w-auto max-w-[170px] object-contain"
              />
              <span className="h-10 w-px bg-foreground/15" />
              <img
                src={initiaxLogo}
                alt="INITIA-X Luxury Real Estate"
                className="h-11 w-auto max-w-[170px] object-contain"
              />
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-7">
              <h4 className="font-display text-lg text-white">{t("ft.getInTouch")}</h4>
              <span className="mt-3 inline-block h-px w-10 bg-gold" />
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a
                    href="tel:+17788388993"
                    className="inline-flex items-center gap-3 text-white/85 hover:text-gold transition-colors"
                  >
                    <Phone className="h-4 w-4 text-gold" /> (778) 838-8993
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:erickim.realtor@outlook.com"
                    className="inline-flex items-start gap-3 text-white/85 hover:text-gold transition-colors break-all"
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
                    className="inline-flex items-center gap-3 text-white/85 hover:text-gold transition-colors"
                  >
                    <Instagram className="h-4 w-4 text-gold" /> @erickim.realtor
                  </a>
                </li>
                <li className="inline-flex items-start gap-3 text-white/70">
                  <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>{t("ft.location")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation strip */}
        <nav className="mt-16 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] uppercase tracking-[0.18em]">
            {navLinks.map((i) => (
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
        </nav>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-white p-1.5">
              <img src={mlsBadge} alt="MLS® Reciprocity" className="h-7 w-auto" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
              {t("ft.mlsMember")}
            </span>
          </div>
          <p className="text-xs text-white/55 text-center">
            {t("ft.rights")}
          </p>
          <p className="text-xs text-white/55">
            {t("ft.webDesign")}{" "}
            <a
              href="https://bluluma.com/realtor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-white transition-colors"
            >
              Bluluma.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
