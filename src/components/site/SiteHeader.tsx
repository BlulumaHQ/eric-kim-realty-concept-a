import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
import logo from "@/assets/eric-kim-logo.png";
import { useI18n, type Lang } from "@/lib/i18n";

const navItems = [
  { to: "/", labelKey: "nav.home" },
  { to: "/listings", labelKey: "nav.listings" },
  { to: "/services", labelKey: "nav.services" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/commercial", labelKey: "nav.commercial" },
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
      className={`inline-flex items-center gap-1 rounded-full border border-border ${
        compact ? "p-0.5" : "p-1"
      }`}
      role="group"
      aria-label="Language"
    >
      {!compact && <Globe className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />}
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-full transition-colors ${
            lang === l.code
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
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
      {/* Top bar — light, refined */}
      <div className="hidden md:block bg-cream border-b border-border">
        <div className="container-x flex h-9 items-center justify-between gap-6 text-[12px]">
          <p className="text-muted-foreground tracking-wide">{t("top.tagline")}</p>
          <div className="flex items-center gap-5">
            <a
              href="tel:+17788388993"
              className="inline-flex items-center gap-1.5 text-foreground/85 hover:text-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              (778) 838-8993
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-none bg-foreground px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-background hover:bg-foreground/85 transition-colors"
            >
              {t("top.bookShort")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-x flex h-[84px] md:h-[104px] items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
          aria-label="Eric Kim, REALTOR® — Home"
        >
          <img
            src={logo}
            alt="Eric Kim REALTOR®"
            className="h-16 md:h-20 w-auto max-w-[260px] sm:max-w-[320px] md:max-w-[400px] object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[12px] font-medium uppercase tracking-[0.18em] text-foreground/65 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.labelKey)}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 inline-flex items-center justify-center rounded-none border border-foreground bg-foreground px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-background hover:bg-transparent hover:text-foreground transition-colors"
          >
            {t("nav.contactEric")}
          </Link>
        </nav>

        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher compact />
          <button
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-cream rounded-md"
                activeProps={{ className: "text-foreground bg-cream" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 pt-3 border-t border-border">
              <a
                href="tel:+17788388993"
                className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-foreground"
              >
                <Phone className="h-4 w-4 text-gold" />
                (778) 838-8993
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-none bg-foreground px-5 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-background"
              >
                {t("nav.contactEric")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
