import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Props = {
  title?: string;
  description?: string;
  primaryLabel?: string;
};

export function CTABand({ title, description, primaryLabel }: Props) {
  const { t } = useI18n();
  const titleFinal = title ?? t("cta.title");
  const descFinal = description ?? t("cta.desc");
  const ctaFinal = primaryLabel ?? t("cta.book");
  return (
    <section className="container-x py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-navy px-8 py-14 md:px-16 md:py-20 shadow-elegant">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1.5fr_auto] md:items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">{t("cta.eyebrow")}</span>
            <h3 className="mt-3 font-display text-3xl md:text-4xl text-navy-foreground text-balance">
              {titleFinal}
            </h3>
            <p className="mt-4 text-navy-foreground/75 max-w-xl">{descFinal}</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-gold-foreground hover:opacity-90 transition"
            >
              {ctaFinal}
            </Link>
            <a
              href="tel:+17788388993"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-foreground/25 px-7 py-3.5 text-sm font-medium text-navy-foreground hover:bg-navy-foreground/10 transition"
            >
              <Phone className="h-4 w-4" /> (778) 838-8993
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
