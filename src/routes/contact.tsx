import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Eric Kim — Book a Real Estate Consultation | Metro Vancouver" },
      {
        name: "description",
        content:
          "Contact Eric Kim, REALTOR® at Initia Real Estate. Phone (778) 838-8993 or email to book a residential, commercial, or presale real estate consultation.",
      },
      { property: "og:title", content: "Contact Eric Kim — Book a Consultation" },
      {
        property: "og:description",
        content:
          "Reach Eric directly to discuss residential, commercial, or presale real estate in Metro Vancouver.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <ContactSection />;
}
