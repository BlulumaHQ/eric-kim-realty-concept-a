import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/commercial", label: "Commercial" },
  { to: "/presale", label: "Presale" },
  { to: "/listings", label: "Listings" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-display text-lg md:text-xl font-medium tracking-tight text-navy">
            Eric Kim <span className="text-gold">REALTOR®</span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Initia Real Estate
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-charcoal/80 hover:text-navy transition-colors"
              activeProps={{ className: "text-navy" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+17788388993"
            className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-navy"
          >
            <Phone className="h-4 w-4 text-gold" />
            (778) 838-8993
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition-colors shadow-card"
          >
            Book a Consultation
          </Link>
        </div>

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
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-border">
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
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
