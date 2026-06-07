import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BedDouble, Bath, Maximize2, MapPin, Send, CheckCircle2, Calendar, Building2, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import { z } from "zod";
import { useListing, formatPrice, type Listing, type ListingPhoto, FALLBACK_LISTING_IMAGE } from "@/lib/listings";
import { useI18n } from "@/lib/i18n";


export const Route = createFileRoute("/listings/$id")({
  head: () => ({
    meta: [
      { title: `Listing | Eric Kim Vancouver REALTOR®` },
    ],
  }),
  component: ListingDetailPage,
});


function isLease(l: Listing) {
  return l.category === "commercial" && /lease/i.test(l.transactionType || "");
}

function ListingDetailPage() {
  const { id } = Route.useParams();
  const { loading, data } = useListing(id);
  const { t } = useI18n();

  if (loading) {
    return (
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <div className="h-[420px] md:h-[560px] w-full rounded-2xl bg-muted animate-pulse" />
          <div className="mt-8 h-8 w-2/3 bg-muted animate-pulse rounded" />
          <div className="mt-4 h-5 w-1/3 bg-muted animate-pulse rounded" />
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="bg-cream py-28 min-h-[60vh]">
        <div className="container-x text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">404</p>
          <h1 className="mt-4 font-display text-3xl md:text-4xl text-navy">{t("ld.notFound.title")}</h1>
          <p className="mt-4 text-muted-foreground">
            {t("ld.notFound.desc")}
          </p>
          <Link
            to="/listings"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm text-navy-foreground hover:bg-navy/90 transition"
          >
            <ArrowLeft className="h-4 w-4" /> {t("ld.viewAll")}
          </Link>
        </div>
      </section>
    );
  }

  const { listing, photos } = data;
  const isSold = listing.status === "sold";
  const isCommercial = listing.category === "commercial";

  return (
    <article className="bg-cream pb-24">
      <div className="container-x pt-10">
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t("ld.back")}
        </Link>
      </div>

      <Gallery listing={listing} photos={photos} />

      <div className="container-x mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge listing={listing} />
            {listing.mls && (
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                MLS® {listing.mls}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance leading-tight">
            {listing.title}
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" />
            {fullAddress(listing)}
          </p>

          <PriceBlock listing={listing} />

          <StatsBlock listing={listing} isCommercial={isCommercial} />

          {!isSold && listing.description && (
            <div className="mt-10">
              <h2 className="font-display text-2xl text-navy">{t("ld.about")}</h2>
              <div className="mt-4 text-foreground/85 leading-relaxed whitespace-pre-line">
                {listing.description}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <InquiryForm listing={listing} />
        </aside>
      </div>

      <div className="container-x mt-12">
        <p className="text-[11px] leading-relaxed text-muted-foreground border-t border-border pt-6 max-w-3xl">
          Listing data is provided through CREA DDF and is subject to applicable
          board and CREA display rules. Information is deemed reliable but not
          guaranteed.
        </p>
      </div>
    </article>
  );
}


function fullAddress(l: Listing) {
  const parts = [l.address, l.city, l.province].filter(Boolean);
  return parts.length ? parts.join(", ") : l.city || "Greater Vancouver";
}

function StatusBadge({ listing }: { listing: Listing }) {
  const { t } = useI18n();
  const isSold = listing.status === "sold";
  const label = isSold ? t("fl.badge.sold") : isLease(listing) ? t("fl.badge.lease") : t("fl.badge.sale");
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-soft ${
        isSold ? "bg-red-600 text-white" : "bg-gold text-gold-foreground"
      }`}
    >
      {label}
    </span>
  );
}

function PriceBlock({ listing }: { listing: Listing }) {
  const { t } = useI18n();
  const isSold = listing.status === "sold";

  let label: string;
  if (isSold) {
    const display = listing.soldPrice ?? listing.price;
    label = !display || display <= 0 ? t("ld.priceOnRequest") : formatPrice(display);
  } else if (isLease(listing)) {
    label = listing.leaseRate ? listing.leaseRate : t("ld.contactLease");
  } else {
    label = !listing.price || listing.price <= 0 ? t("ld.priceOnRequest") : formatPrice(listing.price);
  }

  return (
    <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-border pt-6">
      <span className="font-display text-4xl md:text-5xl text-navy">{label}</span>
      {isSold && listing.soldDate && (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-gold" /> {t("ld.sold")} {listing.soldDate}
        </span>
      )}
      {isSold && listing.price > 0 && listing.soldPrice && listing.price !== listing.soldPrice && (
        <span className="text-sm text-muted-foreground line-through">
          {t("ld.listed")} {formatPrice(listing.price)}
        </span>
      )}
    </div>
  );
}


function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center gap-2 text-gold">{icon}</div>
      <p className="mt-3 font-display text-xl text-navy">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
    </div>
  );
}

function StatsBlock({ listing, isCommercial }: { listing: Listing; isCommercial: boolean }) {
  const { t } = useI18n();
  const items: React.ReactNode[] = [];

  if (isCommercial) {
    if (listing.sqft > 0)
      items.push(
        <Stat key="sqft" icon={<Maximize2 className="h-4 w-4" />} label={t("ld.stat.sqft")} value={listing.sqft.toLocaleString()} />
      );
    if (listing.buildingType)
      items.push(
        <Stat key="bt" icon={<Building2 className="h-4 w-4" />} label={t("ld.stat.buildingType")} value={listing.buildingType} />
      );
    if (listing.zoning)
      items.push(
        <Stat key="zn" icon={<Ruler className="h-4 w-4" />} label={t("ld.stat.zoning")} value={listing.zoning} />
      );
    if (listing.leaseRate)
      items.push(
        <Stat key="lr" icon={<Building2 className="h-4 w-4" />} label={t("ld.stat.leaseRate")} value={listing.leaseRate} />
      );
  } else {
    if (listing.beds > 0)
      items.push(
        <Stat key="b" icon={<BedDouble className="h-4 w-4" />} label={t("ld.stat.bedrooms")} value={String(listing.beds)} />
      );
    if (listing.baths > 0)
      items.push(
        <Stat key="ba" icon={<Bath className="h-4 w-4" />} label={t("ld.stat.bathrooms")} value={String(listing.baths)} />
      );
    if (listing.sqft > 0)
      items.push(
        <Stat key="s" icon={<Maximize2 className="h-4 w-4" />} label={t("ld.stat.sqft")} value={listing.sqft.toLocaleString()} />
      );
    if (listing.propertyType)
      items.push(
        <Stat key="pt" icon={<Building2 className="h-4 w-4" />} label={t("ld.stat.propertyType")} value={listing.propertyType} />
      );
    if (listing.yearBuilt)
      items.push(
        <Stat key="yb" icon={<Calendar className="h-4 w-4" />} label={t("ld.stat.yearBuilt")} value={listing.yearBuilt} />
      );
  }

  if (items.length === 0) return null;
  return <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3">{items}</div>;
}


function Gallery({ listing, photos }: { listing: Listing; photos: ListingPhoto[] }) {
  const gallery = useMemo<string[]>(() => {
    if (photos.length > 0) return photos.map((p) => p.url);
    if (listing.image) return [listing.image];
    return [FALLBACK_LISTING_IMAGE];
  }, [photos, listing.image]);

  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const currentSrc = gallery[Math.min(active, gallery.length - 1)] ?? FALLBACK_LISTING_IMAGE;

  const go = (delta: number) => {
    const n = gallery.length;
    if (n === 0) return;
    const next = ((active + delta) % n + n) % n;
    setActive(next);
    const el = scrollerRef.current?.querySelectorAll<HTMLButtonElement>("[data-thumb]")[next];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };


  return (
    <div className="container-x mt-6">
      <div className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden rounded-2xl bg-muted border border-border">
        <img
          src={currentSrc}
          alt={listing.title}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_LISTING_IMAGE;
          }}
          className="h-full w-full object-cover"
        />
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur shadow-soft hover:bg-background transition"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur shadow-soft hover:bg-background transition"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[11px] font-medium text-foreground">
              {active + 1} / {gallery.length}
            </span>
          </>
        )}
      </div>
      {gallery.length > 1 && (
        <div className="relative mt-4">
          <button
            type="button"
            aria-label="Scroll thumbnails left"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/95 backdrop-blur border border-border shadow-soft hover:bg-background transition"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
          <div
            ref={scrollerRef}
            className="flex flex-nowrap gap-3 overflow-x-auto scroll-smooth px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {gallery.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                data-thumb
                onClick={() => setActive(i)}
                className={`relative shrink-0 w-28 sm:w-32 aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
                  i === active ? "border-gold" : "border-transparent hover:border-border"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_LISTING_IMAGE;
                  }}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Scroll thumbnails right"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/95 backdrop-blur border border-border shadow-soft hover:bg-background transition"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}


function InquiryForm({ listing }: { listing: Listing }) {
  const { t } = useI18n();
  const inquirySchema = z.object({
    name: z.string().trim().min(1, t("val.name")).max(100),
    email: z.string().trim().email(t("val.email")).max(255),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    message: z.string().trim().min(1, t("val.message")).max(2000),
  });
  const refLabel = listing.mls ? `${listing.title} (MLS® ${listing.mls})` : listing.title;
  const defaultMessage = `${t("ld.defaultMessage")} ${refLabel}.`;
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
    };
    const result = inquirySchema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const i of result.error.issues) {
        const k = String(i.path[0] ?? "");
        if (k && !next[k]) next[k] = i.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl bg-background border border-border p-6 md:p-8 shadow-elegant">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-gold" />
        <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
          {t("ld.inquire")}
        </span>
      </div>
      <h2 className="mt-3 font-display text-2xl text-navy">
        {t("ld.requestInfo")}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("ld.formNote")}
      </p>

      {submitted ? (
        <div className="mt-8 flex flex-col items-center text-center py-10">
          <CheckCircle2 className="h-12 w-12 text-gold" />
          <h3 className="mt-4 font-display text-xl text-navy">{t("ct.received")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("ld.thanks")} {refLabel}.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          <FieldInline label={t("ct.fullName")} name="name" error={errors.name} required />
          <FieldInline label={t("ct.email")} name="email" type="email" error={errors.email} required />
          <FieldInline label={t("ct.phoneLabel")} name="phone" type="tel" error={errors.phone} />
          <div>
            <LabelInline required>{t("ct.message")}</LabelInline>
            <textarea
              name="message"
              rows={4}
              maxLength={2000}
              defaultValue={defaultMessage}
              className={inputCls}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition"
          >
            {t("ct.send")} <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}


const inputCls =
  "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition";

function LabelInline({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium mb-1.5">
      {children}
      {required && <span className="text-gold ml-1">*</span>}
    </label>
  );
}

function FieldInline({
  label, name, type = "text", error, required,
}: { label: string; name: string; type?: string; error?: string; required?: boolean }) {
  return (
    <div>
      <LabelInline required={required}>{label}</LabelInline>
      <input type={type} name={name} maxLength={255} className={inputCls} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
