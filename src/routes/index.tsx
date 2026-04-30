import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { ConversionBar } from "@/components/sections/ConversionBar";
import { Services } from "@/components/sections/Services";
import { CommercialFeature } from "@/components/sections/CommercialFeature";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { WhyEric, Process } from "@/components/sections/WhyAndProcess";
import { AboutSection, InstagramSection } from "@/components/sections/AboutAndInstagram";
import { ClientExperiences } from "@/components/sections/ClientExperiences";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ConversionBar />
      <Services />
      <CommercialFeature />
      <FeaturedListings />
      <WhyEric />
      <Process />
      <AboutSection />
      <ClientExperiences />
      <InstagramSection />
      <ContactSection />
    </>
  );
}
