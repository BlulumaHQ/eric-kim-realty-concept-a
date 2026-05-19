import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import portrait from "@/assets/eric-portrait.jpg";
import commercialImg from "@/assets/listing-commercial.jpg";
import presaleImg from "@/assets/listing-presale.jpg";
import residentialImg from "@/assets/listing-residential.jpg";
import initiaLogo from "@/assets/initia-logo.png";
import { useI18n } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useI18n();
  const facts: [string, string][] = [
    [t("ab.k.title"), t("ab.v.title")],
    [t("ab.k.focus"), t("ab.v.focus")],
    [t("ab.k.area"), t("ab.v.area")],
    [t("ab.k.lang"), t("ab.v.lang")],
    [t("ab.k.approach"), t("ab.v.approach")],
  ];
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative max-w-md mx-auto lg:mx-0 w-full">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={portrait} alt="Eric Kim, REALTOR® at Initia Real Estate" width={1024} height={1280} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-5 py-4 shadow-elegant border border-border">
            <img src={initiaLogo} alt="Initia Real Estate" className="h-8 w-auto" />
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-charcoal/70">{t("ab.brokerage")}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="gold-divider" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">{t("ab.eyebrow")}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance">
            {t("ab.title")}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">{t("ab.p1")}</p>
          <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">{t("ab.p2")}</p>

          <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="border-l-2 border-gold pl-4">
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-medium text-navy">{v}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition shadow-card"
          >
            {t("ab.contactEric")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const igPostKeys = [
  { img: commercialImg, key: "ig.label.commercial" },
  { img: presaleImg, key: "ig.label.presale" },
  { img: residentialImg, key: "ig.label.market" },
  { img: commercialImg, key: "ig.label.featured" },
];

export function InstagramSection() {
  const { t } = useI18n();
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="gold-divider" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">{t("ig.eyebrow")}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance">
            {t("ig.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("ig.desc")}</p>
          <a
            href="https://www.instagram.com/erickim.realtor"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/20 px-6 py-3 text-sm font-medium text-navy hover:bg-navy hover:text-navy-foreground transition"
          >
            <Instagram className="h-4 w-4" /> @erickim.realtor
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {igPosts.map((p, i) => (
            <a
              key={i}
              href="https://www.instagram.com/erickim.realtor"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img src={p.img} alt={p.label} width={512} height={512} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-colors flex items-end p-3">
                <span className="text-xs font-medium text-navy-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.label}
                </span>
              </div>
              <Instagram className="absolute top-3 right-3 h-4 w-4 text-navy-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
