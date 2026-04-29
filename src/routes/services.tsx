import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/WhyAndProcess";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/SectionHeading";

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
  return (
    <>
      <section className="bg-cream pt-16 pb-8 md:pt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Services"
            title="Real Estate Services for Every Stage"
            description="Eric helps clients move forward across residential, commercial, and presale real estate in Metro Vancouver."
          />
        </div>
      </section>
      <Services />
      <Process />
      <CTABand />
    </>
  );
}
