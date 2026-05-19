import { MessageCircle, Layers, MapPinned, Compass } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function WhyEric() {
  const { t } = useI18n();
  const points = [
    { icon: MessageCircle, titleKey: "we.p1.title", descKey: "we.p1.desc" },
    { icon: Layers, titleKey: "we.p2.title", descKey: "we.p2.desc" },
    { icon: MapPinned, titleKey: "we.p3.title", descKey: "we.p3.desc" },
    { icon: Compass, titleKey: "we.p4.title", descKey: "we.p4.desc" },
  ];
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-3 justify-center">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs uppercase tracking-[0.22em] text-gold font-medium">{t("we.eyebrow")}</span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
            {t("we.title")}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="rounded-xl border border-border bg-background p-7 hover:shadow-card transition-shadow">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h4 className="mt-5 font-display text-lg text-foreground">{t(titleKey)}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useI18n();
  const steps = [
    { n: "01", titleKey: "pr.s1.title", descKey: "pr.s1.desc" },
    { n: "02", titleKey: "pr.s2.title", descKey: "pr.s2.desc" },
    { n: "03", titleKey: "pr.s3.title", descKey: "pr.s3.desc" },
    { n: "04", titleKey: "pr.s4.title", descKey: "pr.s4.desc" },
  ];
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeading eyebrow={t("pr.eyebrow")} title={t("pr.title")} />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-3xl border border-border bg-card p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-4xl text-gold">{s.n}</span>
              {i < steps.length - 1 && (
                <span className="hidden lg:block h-px w-10 bg-border" />
              )}
            </div>
            <h4 className="mt-4 font-display text-xl text-navy">{t(s.titleKey)}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{t(s.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
