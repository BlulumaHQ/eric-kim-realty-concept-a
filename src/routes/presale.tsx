import { createFileRoute } from "@tanstack/react-router";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Sparkles, Calendar, Layers, ShieldCheck } from "lucide-react";
import presaleImg from "@/assets/listing-presale.jpg";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/presale")({
  head: () => ({
    meta: [
      { title: "Presale Real Estate Vancouver | Eric Kim REALTOR®" },
      {
        name: "description",
        content:
          "Explore Metro Vancouver presale and new development opportunities with guidance from Eric Kim, REALTOR® at Initia Real Estate.",
      },
      { property: "og:title", content: "Presale Real Estate Vancouver | Eric Kim REALTOR®" },
      {
        property: "og:description",
        content:
          "Explore Metro Vancouver presale and new development opportunities with guidance from Eric Kim, REALTOR® at Initia Real Estate.",
      },
      { property: "og:image", content: presaleImg },
    ],
  }),
  component: PresalePage,
});

function PresalePage() {
  const { t } = useI18n();
  const items = [
    { icon: Sparkles, title: t("pp.i1.title"), desc: t("pp.i1.desc") },
    { icon: Calendar, title: t("pp.i2.title"), desc: t("pp.i2.desc") },
    { icon: Layers, title: t("pp.i3.title"), desc: t("pp.i3.desc") },
    { icon: ShieldCheck, title: t("pp.i4.title"), desc: t("pp.i4.desc") },
  ];
  return (
    <>
      <section className="bg-cream pt-16 pb-8 md:pt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("nav.presale")}
            title={t("pp.title")}
            description={t("pp.desc")}
          />
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={presaleImg} alt="Presale residential development" width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-navy text-balance">{t("pp.h2")}</h2>
            <p className="mt-4 text-muted-foreground">
              {t("pp.p")}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {items.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-border bg-background p-5">
                  <Icon className="h-6 w-6 text-gold" />
                  <h4 className="mt-3 font-display text-lg text-navy">{title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs italic text-muted-foreground">
              {t("pp.disclaimer")}
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title={t("pp.cta.title")}
        description={t("pp.cta.desc")}
        primaryLabel={t("pp.cta.btn")}
      />
    </>
  );
}

