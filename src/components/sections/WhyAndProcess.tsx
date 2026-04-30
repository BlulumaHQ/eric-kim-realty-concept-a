import { MessageCircle, Layers, MapPinned, Compass } from "lucide-react";
import { SectionHeading } from "../site/SectionHeading";

const points = [
  { icon: MessageCircle, title: "Direct advisor communication", desc: "You speak directly with Eric — not a call center or assistant." },
  { icon: Layers, title: "Residential, commercial & presale knowledge", desc: "Coverage across the most common Metro Vancouver opportunities." },
  { icon: MapPinned, title: "Metro Vancouver market focus", desc: "Local context shapes every recommendation and search." },
  { icon: Compass, title: "Practical guidance, start to next step", desc: "Clear direction from the first conversation through closing." },
];

export function WhyEric() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-3 justify-center">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs uppercase tracking-[0.22em] text-gold font-medium">Why Eric</span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
            Clear Guidance. Local Market Focus. Direct Communication.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-background p-7 hover:shadow-card transition-shadow">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h4 className="mt-5 font-display text-lg text-foreground">{title}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Book a Consultation", desc: "Tell Eric what you are looking for and your timeline." },
  { n: "02", title: "Review Your Goals", desc: "Discuss location, budget, property type, and investment or lifestyle needs." },
  { n: "03", title: "Explore Suitable Options", desc: "Review available residential, commercial, or presale opportunities." },
  { n: "04", title: "Move Forward With Confidence", desc: "Get guidance through the next steps with clear communication." },
];

export function Process() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeading
        eyebrow="Process"
        title="A Simple Process From First Conversation to Next Step"
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-3xl border border-border bg-card p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-4xl text-gold">{s.n}</span>
              {i < steps.length - 1 && (
                <span className="hidden lg:block h-px w-10 bg-border" />
              )}
            </div>
            <h4 className="mt-4 font-display text-xl text-navy">{s.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
