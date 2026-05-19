import { createFileRoute } from "@tanstack/react-router";
import { CommercialFeature } from "@/components/sections/CommercialFeature";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Building2, TrendingUp, Users, FileText } from "lucide-react";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Real Estate Vancouver | Eric Kim REALTOR®" },
      {
        name: "description",
        content:
          "Commercial real estate guidance for business owners, investors, retail, office, mixed-use, business asset, lease, and purchase opportunities across Metro Vancouver.",
      },
      { property: "og:title", content: "Commercial Real Estate Vancouver | Eric Kim REALTOR®" },
      {
        property: "og:description",
        content:
          "Commercial real estate guidance for business owners, investors, retail, office, mixed-use, business asset, lease, and purchase opportunities across Metro Vancouver.",
      },
    ],
  }),
  component: CommercialPage,
});

const focus = [
  { icon: Building2, title: "Retail & Office Spaces", desc: "Street-front retail, professional office, and mixed-use opportunities." },
  { icon: TrendingUp, title: "Investment Properties", desc: "Income-producing assets reviewed against your investment thesis." },
  { icon: Users, title: "Owner-User Locations", desc: "Operational locations for businesses with growth in mind." },
  { icon: FileText, title: "Lease Opportunities", desc: "Lease terms and locations evaluated alongside purchase options." },
];

function CommercialPage() {
  return (
    <>
      <section className="bg-cream pt-16 pb-8 md:pt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Commercial"
            title="Commercial Real Estate in Metro Vancouver"
            description="Working with business owners and investors on retail, office, mixed-use, and investment opportunities."
          />
        </div>
      </section>
      <CommercialFeature split />
      <section className="container-x py-20 md:py-28">
        <SectionHeading title="Areas of Commercial Focus" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {focus.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <Icon className="h-7 w-7 text-gold" />
              <h4 className="mt-4 font-display text-lg text-navy">{title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <CTABand
        title="Discuss a Commercial Opportunity"
        description="Speak directly with Eric about your business location, investment property, or commercial listing."
        primaryLabel="Discuss a Commercial Opportunity"
      />
    </>
  );
}
