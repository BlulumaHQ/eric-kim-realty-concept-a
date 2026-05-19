import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const reviews = [
  { key: "cx.r1", name: "Hyunsook Ma" },
  { key: "cx.r2", name: "Grace Han" },
  { key: "cx.r3", name: "Oh Brother Tribe" },
  { key: "cx.r4", name: "Jason Lee" },
  { key: "cx.r5", name: "Jong Kim" },
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
                  &ldquo;{t(r.key)}&rdquo;
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
