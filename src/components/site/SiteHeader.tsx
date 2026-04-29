import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
import logo from "@/assets/eric-kim-logo.png";
import { useI18n, type Lang } from "@/lib/i18n";

const navItems = [
  { to: "/", labelKey: "nav.home" },
  { to: "/services", labelKey: "nav.services" },
  { to: "/commercial", labelKey: "nav.commercial" },
  { to: "/presale", labelKey: "nav.presale" },
  { to: "/listings", labelKey: "nav.listings" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/contact", labelKey: "nav.contact" },
] as const;

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();
  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "ko", label: "한국어" },
  ];
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-white/20 ${
        compact ? "p-0.5" : "p-1"
      }`}
      role="group"
      aria-label="Language"
    >
      {!compact && <Globe className="h-3.5 w-3.5 text-white/70 ml-1.5" />}
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-full transition-colors ${
            lang === l.code
              ? "bg-white text-navy"
              : "text-white/80 hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background transition-shadow duration-300 ${
        scrolled
          ? "shadow-soft border-b border-border"
          : "border-b border-border/60"
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-navy text-white">
        <div className="container-x flex h-9 items-center justify-between gap-6 text-[12px]">
          <p className="text-white/70 tracking-wide">{t("top.tagline")}</p>
          <div className="flex items-center gap-5">
            <a
              href="tel:+17788388993"
              className="inline-flex items-center gap-1.5 text-white/85 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              (778) 838-8993
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gold px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy hover:bg-gold/90 transition-colors"
            >
              {t("cta.bookShort")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-x flex h-[72px] md:h-[84px] items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
          aria-label="Eric Kim, REALTOR® — Home"
        >
          <img
            src={logo}
            alt="Eric Kim REALTOR®"
            className="h-11 md:h-14 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain"
            width={1199}
            height={258}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-medium tracking-wide text-charcoal/75 hover:text-navy transition-colors"
              activeProps={{ className: "text-navy" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-navy"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base font-medium text-charcoal hover:text-navy hover:bg-muted rounded-md"
                activeProps={{ className: "text-navy bg-muted" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 pt-3 border-t border-border">
              <a
                href="tel:+17788388993"
                className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-charcoal"
              >
                <Phone className="h-4 w-4 text-gold" />
                (778) 838-8993
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-medium text-navy-foreground"
              >
                {t("cta.book")}
              </Link>
              <div className="flex items-center justify-between px-2 pt-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t("top.language")}
                </span>
                <div className="bg-navy rounded-full">
                  <LanguageSwitcher compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
