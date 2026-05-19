import { Link } from "@tanstack/react-router";
import { Home, Key, Sprout, MessageSquare, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ConversionBar() {
  const { t } = useI18n();
  const items = [
    { icon: Home, titleKey: "cb.buy.title", descKey: "cb.buy.desc", to: "/services" as const },
    { icon: Key, titleKey: "cb.sell.title", descKey: "cb.sell.desc", to: "/services" as const },
    { icon: Sprout, titleKey: "cb.first.title", descKey: "cb.first.desc", to: "/services" as const },
    { icon: MessageSquare, titleKey: "cb.free.title", descKey: "cb.free.desc", to: "/contact" as const },
  ];
  return (
    <section className="container-x pt-16 md:pt-20 pb-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl bg-background p-4 md:p-5 shadow-soft border border-border">
        {items.map(({ icon: Icon, titleKey, descKey, to }) => (
          <Link
            key={titleKey}
            to={to}
            className="group rounded-xl p-5 hover:bg-cream transition-colors flex flex-col"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg text-foreground leading-snug">{t(titleKey)}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground flex-1 leading-relaxed">{t(descKey)}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold group-hover:gap-2 transition-all">
              {t("cb.learn")} <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
