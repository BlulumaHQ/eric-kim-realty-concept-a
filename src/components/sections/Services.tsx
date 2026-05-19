import { Link } from "@tanstack/react-router";
import { ArrowRight, Home, Key, Sprout, Building2 } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function Services() {
  const { t } = useI18n();
  const services = [
    { icon: Home, titleKey: "sv.buy.title", descKey: "sv.buy.desc", ctaKey: "sv.buy.cta", to: "/services" as const, featured: true },
    { icon: Key, titleKey: "sv.sell.title", descKey: "sv.sell.desc", ctaKey: "sv.sell.cta", to: "/services" as const, featured: false },
    { icon: Sprout, titleKey: "sv.first.title", descKey: "sv.first.desc", ctaKey: "sv.first.cta", to: "/services" as const, featured: false },
    { icon: Building2, titleKey: "sv.inv.title", descKey: "sv.inv.desc", ctaKey: "sv.inv.cta", to: "/commercial" as const, featured: false },
  ];
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow={t("sv.eyebrow")}
        title={t("sv.title")}
        description={t("sv.desc")}
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
        {services.map(({ icon: Icon, titleKey, descKey, ctaKey, to, featured }) => (
          <article
            key={titleKey}
            className={`group relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
              featured
                ? "bg-gradient-navy text-navy-foreground shadow-elegant lg:-translate-y-2 border border-foreground/40"
                : "bg-card border border-border hover:shadow-elegant hover:-translate-y-1"
            }`}
          >
            {featured && (
              <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-foreground shadow-card">
                {t("sv.mostRequested")}
              </span>
            )}
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-card ${featured ? "bg-gold text-gold-foreground" : "bg-gradient-navy text-navy-foreground"}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className={`mt-7 font-display text-xl md:text-2xl ${featured ? "text-navy-foreground" : "text-foreground"}`}>{t(titleKey)}</h3>
            <p className={`mt-3 flex-1 leading-relaxed text-sm ${featured ? "text-navy-foreground/80" : "text-muted-foreground"}`}>{t(descKey)}</p>
            <Link
              to={to}
              className={`mt-7 inline-flex items-center gap-2 text-sm font-medium transition-colors ${featured ? "text-gold hover:text-gold/80" : "text-foreground hover:text-gold"}`}
            >
              {t(ctaKey)} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
