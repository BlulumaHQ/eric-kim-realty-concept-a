import { createFileRoute } from "@tanstack/react-router";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { RecentlySold } from "@/components/sections/RecentlySold";
import { CTABand } from "@/components/site/CTABand";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/listings/")({
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
  const { t } = useI18n();
  return (
    <>
      <FeaturedListings />
      <RecentlySold />
      <CTABand
        title={t("li.cta.title")}
        description={t("li.cta.desc")}
      />
    </>
  );
}

