import { createFileRoute } from "@tanstack/react-router";
import { AboutSection, InstagramSection } from "@/components/sections/AboutAndInstagram";
import { WhyEric } from "@/components/sections/WhyAndProcess";
import { CTABand } from "@/components/site/CTABand";
import portrait from "@/assets/eric-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Eric Kim REALTOR® | 1NE Collective Realty" },
      {
        name: "description",
        content:
          "Meet Eric Kim, REALTOR® with 1NE Collective Realty, serving Metro Vancouver clients in residential, commercial, and presale real estate.",
      },
      { property: "og:title", content: "About Eric Kim REALTOR® | 1NE Collective Realty" },
      {
        property: "og:description",
        content:
          "Meet Eric Kim, REALTOR® with 1NE Collective Realty, serving Metro Vancouver clients in residential, commercial, and presale real estate.",
      },
      { property: "og:image", content: portrait },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <AboutSection />
      <WhyEric />
      <InstagramSection />
      <CTABand />
    </>
  );
}
