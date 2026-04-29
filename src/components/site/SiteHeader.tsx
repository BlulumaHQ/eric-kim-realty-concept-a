import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/eric-kim-logo.png";

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
      className={`sticky top-0 z-50 w-full bg-background transition-shadow duration-300 ${
        scrolled
          ? "shadow-soft border-b border-border"
          : "border-b border-border/60"
      }`}
    >
      <div className="container-x flex h-[88px] md:h-[96px] items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
          aria-label="Eric Kim, REALTOR® — Home"
        >
          <img
            src={logo}
            alt="Eric Kim REALTOR®"
            className="h-11 md:h-14 w-auto"
            width={560}
            height={160}
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
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+17788388993"
            className="hidden xl:inline-flex items-center gap-2 text-[13px] font-medium text-charcoal/80 hover:text-navy transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-gold" />
            (778) 838-8993
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-[13px] font-medium text-navy-foreground hover:bg-navy/90 transition-colors shadow-soft"
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
