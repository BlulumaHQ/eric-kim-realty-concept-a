import { createFileRoute } from "@tanstack/react-router";
import { AboutSection, InstagramSection } from "@/components/sections/AboutAndInstagram";
import { WhyEric } from "@/components/sections/WhyAndProcess";
import { CTABand } from "@/components/site/CTABand";
import portrait from "@/assets/eric-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Eric Kim — REALTOR® at Initia Real Estate | Metro Vancouver" },
      {
        name: "description",
        content:
          "Eric Kim is a REALTOR® with Initia Real Estate serving Metro Vancouver across residential, commercial, and presale real estate.",
      },
      { property: "og:title", content: "About Eric Kim, REALTOR®" },
      {
        property: "og:description",
        content:
          "REALTOR® with Initia Real Estate serving Metro Vancouver across residential, commercial, and presale real estate.",
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
