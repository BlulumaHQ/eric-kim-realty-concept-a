import { createFileRoute } from "@tanstack/react-router";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Sparkles, Calendar, Layers, ShieldCheck } from "lucide-react";
import presaleImg from "@/assets/listing-presale.jpg";

export const Route = createFileRoute("/presale")({
  head: () => ({
    meta: [
      { title: "Presale Real Estate Vancouver | Eric Kim REALTOR®" },
      {
        name: "description",
        content:
          "Explore Metro Vancouver presale and new development opportunities with guidance from Eric Kim, REALTOR® at Initia Real Estate.",
      },
      { property: "og:title", content: "Presale Real Estate Vancouver | Eric Kim REALTOR®" },
      {
        property: "og:description",
        content:
          "Explore Metro Vancouver presale and new development opportunities with guidance from Eric Kim, REALTOR® at Initia Real Estate.",
      },
      { property: "og:image", content: presaleImg },
    ],
  }),
  component: PresalePage,
});

const items = [
  { icon: Sparkles, title: "Project Overview", desc: "Understand the developer, location, and product mix." },
  { icon: Calendar, title: "Timeline & Deposit Structure", desc: "Review key dates and deposit milestones before committing." },
  { icon: Layers, title: "Floorplan & Unit Selection", desc: "Compare layouts, exposures, and pricing tiers." },
  { icon: ShieldCheck, title: "Documentation Review", desc: "Walk through documentation with appropriate professional advisors." },
];

function PresalePage() {
  return (
    <>
      <section className="bg-cream pt-16 pb-8 md:pt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Presale"
            title="New Developments & Presale Opportunities"
            description="Explore upcoming projects across Metro Vancouver with practical, client-focused guidance."
          />
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={presaleImg} alt="Presale residential development" width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-navy text-balance">A Practical Approach to Presale Real Estate</h2>
            <p className="mt-4 text-muted-foreground">
              Presale opportunities can be exciting, but they require careful review. Eric helps clients understand the project, timeline, and decision points before moving forward.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {items.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-border bg-background p-5">
                  <Icon className="h-6 w-6 text-gold" />
                  <h4 className="mt-3 font-display text-lg text-navy">{title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs italic text-muted-foreground">
              All property decisions should be reviewed with the appropriate legal, financial, and professional advisors before completion.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Looking at a Presale Opportunity?"
        description="Eric can help you review the project, timeline, and next step before you commit."
        primaryLabel="Request Presale Information"
      />
    </>
  );
}
