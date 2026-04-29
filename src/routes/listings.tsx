import { createFileRoute } from "@tanstack/react-router";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { CTABand } from "@/components/site/CTABand";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "Current Real Estate Opportunities | Eric Kim REALTOR®" },
      {
        name: "description",
        content:
          "View current residential, commercial, and presale real estate opportunity categories across Metro Vancouver and contact Eric Kim for details.",
      },
      { property: "og:title", content: "Current Real Estate Opportunities | Eric Kim REALTOR®" },
      {
        property: "og:description",
        content:
          "View current residential, commercial, and presale real estate opportunity categories across Metro Vancouver and contact Eric Kim for details.",
      },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  return (
    <>
      <FeaturedListings />
      <CTABand
        title="Looking for a Specific Type of Property?"
        description="Tell Eric what you're looking for and he'll share the most relevant available opportunities."
      />
    </>
  );
}
