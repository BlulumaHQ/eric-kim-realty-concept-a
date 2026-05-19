import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function AreaExpertise() {
  const { t } = useI18n();
  const areas = [
    { name: "Vancouver", descKey: "ae.vancouver.desc", image: "https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=1200&q=80" },
    { name: "Burnaby", descKey: "ae.burnaby.desc", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80" },
    { name: "Richmond", descKey: "ae.richmond.desc", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80" },
    { name: "Coquitlam", descKey: "ae.coquitlam.desc", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80" },
    { name: "Surrey", descKey: "ae.surrey.desc", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80" },
  ];
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading
        eyebrow={t("ae.eyebrow")}
        title={t("ae.title")}
        description={t("ae.desc")}
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a, i) => (
          <Link
            key={a.name}
            to="/contact"
            className={`group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-elegant transition-all duration-300 ${
              i === 0 ? "lg:row-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className={`relative ${i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[4/3]"} overflow-hidden bg-muted`}>
              <img src={a.image} alt={a.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">{t("ae.greater")}</p>
                    <h3 className="mt-2 font-display text-2xl md:text-3xl text-white leading-tight">{a.name}</h3>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-md">{t(a.descKey)}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
