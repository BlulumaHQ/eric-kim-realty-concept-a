import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/WhyAndProcess";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Real Estate Services | Eric Kim REALTOR®" },
      {
        name: "description",
        content:
          "Explore residential, commercial, business asset / lease, and presale real estate services with Eric Kim, REALTOR® serving Metro Vancouver.",
      },
      { property: "og:title", content: "Real Estate Services | Eric Kim REALTOR®" },
      {
        property: "og:description",
        content:
          "Explore residential, commercial, business asset / lease, and presale real estate services with Eric Kim, REALTOR® serving Metro Vancouver.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="bg-cream pt-16 pb-8 md:pt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("sv.eyebrow")}
            title={t("spg.title")}
            description={t("spg.desc")}
          />
        </div>
      </section>
      <Services />
      <Process />
      <CTABand />
    </>
  );
}

