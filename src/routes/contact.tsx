import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Eric Kim REALTOR® | Metro Vancouver Real Estate" },
      {
        name: "description",
        content:
          "Contact Eric Kim, REALTOR® for residential, commercial, business asset / lease, and presale real estate inquiries across Metro Vancouver.",
      },
      { property: "og:title", content: "Contact Eric Kim REALTOR® | Metro Vancouver Real Estate" },
      {
        property: "og:description",
        content:
          "Contact Eric Kim, REALTOR® for residential, commercial, business asset / lease, and presale real estate inquiries across Metro Vancouver.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <ContactSection />;
}
