import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { ConversionBar } from "@/components/sections/ConversionBar";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { CommercialFeature } from "@/components/sections/CommercialFeature";
import { RecentlySold } from "@/components/sections/RecentlySold";
import { AreaExpertise } from "@/components/sections/AreaExpertise";
import { Services } from "@/components/sections/Services";
import { WhyEric, Process } from "@/components/sections/WhyAndProcess";
import { AboutSection, InstagramSection } from "@/components/sections/AboutAndInstagram";
import { ClientExperiences } from "@/components/sections/ClientExperiences";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eric Kim — Trusted Vancouver Residential REALTOR®" },
      {
        name: "description",
        content:
          "Helping families buy and sell homes across Greater Vancouver — Vancouver, Burnaby, Richmond, Coquitlam, and Surrey. Trusted residential REALTOR® with Initia Real Estate.",
      },
      { property: "og:title", content: "Eric Kim — Trusted Vancouver Residential REALTOR®" },
      {
        property: "og:description",
        content:
          "Residential real estate guidance for Greater Vancouver families. Buyers, sellers, and first-time homeowners.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ConversionBar />
      <FeaturedListings />
      <CommercialFeature />
      <RecentlySold />
      <AreaExpertise />
      <Services />
      <WhyEric />
      <Process />
      <AboutSection />
      <ClientExperiences />
      <InstagramSection />
      <ContactSection />
    </>
  );
}
