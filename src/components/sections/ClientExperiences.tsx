import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const reviews = [
  {
    quote:
      "They are always kind and, above all, highly professional. From start to finish, Eric was patient, honest, and never pressured us.",
    name: "Hyunsook Ma",
  },
  {
    quote:
      "Eric sold our townhouse above market value and helped us secure our new home. His negotiation skills are exceptional.",
    name: "Grace Han",
  },
  {
    quote:
      "Eric has a strong understanding of the Vancouver market and provides thoughtful, client-first advice.",
    name: "Oh Brother Tribe",
  },
  {
    quote:
      "Working with Eric was a pleasure. He understands the Burnaby market deeply and is extremely responsive and detail-oriented.",
    name: "Jason Lee",
  },
  {
    quote:
      "Eric is excellent at planning and provides insights that helped us make confident financial decisions.",
    name: "Jong Kim",
  },
];

export function ClientExperiences() {
  const { t } = useI18n();
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* LEFT — Rating block */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="flex items-center gap-3">
              <span className="gold-divider" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                {t("cx.eyebrow")}
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-balance leading-[1.1]">
              {t("cx.title")}
            </h2>

            <div className="mt-8 rounded-2xl bg-white p-7 shadow-elegant ring-1 ring-black/5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-6xl font-medium text-foreground leading-none">
                  5.0
                </span>
                <div
                  className="flex items-center gap-0.5"
                  aria-label="Rated 5 out of 5"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-5 w-5"
                      fill="#C8A96A"
                      stroke="#C8A96A"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t("cx.note")}
              </p>
            </div>
          </div>

          {/* RIGHT — Review cards */}
          <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <figure
                key={i}
                className={`relative rounded-2xl bg-white p-7 shadow-card ring-1 ring-black/5 ${
                  i === reviews.length - 1 && reviews.length % 2 === 1
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <Quote
                  className="absolute top-5 right-5 h-6 w-6 text-gold/30"
                  aria-hidden="true"
                />
                <div
                  className="flex items-center gap-0.5"
                  aria-label="Rated 5 out of 5"
                >
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4"
                      fill="#C8A96A"
                      stroke="#C8A96A"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/85 text-pretty">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="h-px w-6 bg-gold" />
                  <span className="text-sm font-medium text-foreground">
                    {r.name}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
