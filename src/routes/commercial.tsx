import { createFileRoute } from "@tanstack/react-router";
import { CommercialFeature } from "@/components/sections/CommercialFeature";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Building2, TrendingUp, Users, FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Real Estate Vancouver | Eric Kim REALTOR®" },
      {
        name: "description",
        content:
          "Commercial real estate guidance for business owners, investors, retail, office, mixed-use, business asset, lease, and purchase opportunities across Metro Vancouver.",
      },
      { property: "og:title", content: "Commercial Real Estate Vancouver | Eric Kim REALTOR®" },
      {
        property: "og:description",
        content:
          "Commercial real estate guidance for business owners, investors, retail, office, mixed-use, business asset, lease, and purchase opportunities across Metro Vancouver.",
      },
    ],
  }),
  component: CommercialPage,
});

function CommercialPage() {
  const { t } = useI18n();
  const focus = [
    { icon: Building2, title: t("cpg.f1.title"), desc: t("cpg.f1.desc") },
    { icon: TrendingUp, title: t("cpg.f2.title"), desc: t("cpg.f2.desc") },
    { icon: Users, title: t("cpg.f3.title"), desc: t("cpg.f3.desc") },
    { icon: FileText, title: t("cpg.f4.title"), desc: t("cpg.f4.desc") },
  ];
  return (
    <>
      <section className="bg-cream pt-16 pb-8 md:pt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("cf.eyebrow")}
            title={t("cpg.title")}
            description={t("cpg.desc")}
          />
        </div>
      </section>
      <CommercialFeature split />
      <section className="container-x py-20 md:py-28">
        <SectionHeading title={t("cpg.focusTitle")} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {focus.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <Icon className="h-7 w-7 text-gold" />
              <h4 className="mt-4 font-display text-lg text-navy">{title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <CTABand
        title={t("cpg.cta.title")}
        description={t("cpg.cta.desc")}
        primaryLabel={t("cpg.cta.title")}
      />
    </>
  );
}

