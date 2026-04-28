import { createFileRoute } from "@tanstack/react-router";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { CTABand } from "@/components/site/CTABand";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "Featured Opportunities — Eric Kim REALTOR® | Metro Vancouver" },
      {
        name: "description",
        content:
          "Browse current and featured residential, commercial, and presale opportunities across Metro Vancouver with Eric Kim, REALTOR®.",
      },
      { property: "og:title", content: "Featured Opportunities — Eric Kim REALTOR®" },
      {
        property: "og:description",
        content: "Residential, commercial, and presale opportunities across Metro Vancouver.",
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
