import { createFileRoute } from "@tanstack/react-router";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { RecentlySold } from "@/components/sections/RecentlySold";
import { CTABand } from "@/components/site/CTABand";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "Current & Sold Listings | Eric Kim Vancouver REALTOR®" },
      {
        name: "description",
        content:
          "Current residential listings and recently sold homes represented by Eric Kim across Greater Vancouver. Contact for full details and private showings.",
      },
      { property: "og:title", content: "Current & Sold Listings | Eric Kim Vancouver REALTOR®" },
      {
        property: "og:description",
        content:
          "Current residential listings and recently sold homes across Greater Vancouver.",
      },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  return (
    <>
      <FeaturedListings />
      <RecentlySold />
      <CTABand
        title="Don't See What You're Looking For?"
        description="Tell Eric what kind of home you have in mind and he'll share matching active and off-market opportunities."
      />
    </>
  );
}
