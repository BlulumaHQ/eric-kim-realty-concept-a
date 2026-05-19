import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BedDouble, Bath, Maximize2, MapPin, Send, CheckCircle2, Calendar, Building2, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import { z } from "zod";
import { useListing, formatPrice, type Listing, type ListingPhoto, FALLBACK_LISTING_IMAGE } from "@/lib/listings";


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
          <h1 className="mt-4 font-display text-3xl md:text-4xl text-navy">Listing not found</h1>
          <p className="mt-4 text-muted-foreground">
            This listing may have been removed or the link is incorrect.
          </p>
          <Link
            to="/listings"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm text-navy-foreground hover:bg-navy/90 transition"
          >
            <ArrowLeft className="h-4 w-4" /> View All Listings
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
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Listings
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
              <h2 className="font-display text-2xl text-navy">About This Property</h2>
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
    </article>
  );
}

function fullAddress(l: Listing) {
  const parts = [l.address, l.city, l.province].filter(Boolean);
  return parts.length ? parts.join(", ") : l.city || "Greater Vancouver";
}

function StatusBadge({ listing }: { listing: Listing }) {
  const isSold = listing.status === "sold";
  const label = isSold ? "Sold" : isLease(listing) ? "For Lease" : "For Sale";
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
  const isSold = listing.status === "sold";

  let label: string;
  if (isSold) {
    const display = listing.soldPrice ?? listing.price;
    label = !display || display <= 0 ? "Price upon request" : formatPrice(display);
  } else if (isLease(listing)) {
    label = listing.leaseRate ? listing.leaseRate : "Contact for lease rate";
  } else {
    label = !listing.price || listing.price <= 0 ? "Price upon request" : formatPrice(listing.price);
  }

  return (
    <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-border pt-6">
      <span className="font-display text-4xl md:text-5xl text-navy">{label}</span>
      {isSold && listing.soldDate && (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-gold" /> Sold {listing.soldDate}
        </span>
      )}
      {isSold && listing.price > 0 && listing.soldPrice && listing.price !== listing.soldPrice && (
        <span className="text-sm text-muted-foreground line-through">
          Listed {formatPrice(listing.price)}
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
  const items: React.ReactNode[] = [];

  if (isCommercial) {
    if (listing.sqft > 0)
      items.push(
        <Stat key="sqft" icon={<Maximize2 className="h-4 w-4" />} label="Square Feet" value={listing.sqft.toLocaleString()} />
      );
    if (listing.buildingType)
      items.push(
        <Stat key="bt" icon={<Building2 className="h-4 w-4" />} label="Building Type" value={listing.buildingType} />
      );
    if (listing.zoning)
      items.push(
        <Stat key="zn" icon={<Ruler className="h-4 w-4" />} label="Zoning" value={listing.zoning} />
      );
    if (listing.leaseRate)
      items.push(
        <Stat key="lr" icon={<Building2 className="h-4 w-4" />} label="Lease Rate" value={listing.leaseRate} />
      );
  } else {
    if (listing.beds > 0)
      items.push(
        <Stat key="b" icon={<BedDouble className="h-4 w-4" />} label="Bedrooms" value={String(listing.beds)} />
      );
    if (listing.baths > 0)
      items.push(
        <Stat key="ba" icon={<Bath className="h-4 w-4" />} label="Bathrooms" value={String(listing.baths)} />
      );
    if (listing.sqft > 0)
      items.push(
        <Stat key="s" icon={<Maximize2 className="h-4 w-4" />} label="Square Feet" value={listing.sqft.toLocaleString()} />
      );
    if (listing.propertyType)
      items.push(
        <Stat key="pt" icon={<Building2 className="h-4 w-4" />} label="Property Type" value={listing.propertyType} />
      );
    if (listing.yearBuilt)
      items.push(
        <Stat key="yb" icon={<Calendar className="h-4 w-4" />} label="Year Built" value={listing.yearBuilt} />
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
  const currentSrc = gallery[Math.min(active, gallery.length - 1)] ?? FALLBACK_LISTING_IMAGE;

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
      </div>
      {gallery.length > 1 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {gallery.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
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
      )}
    </div>
  );
}

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please add a short message").max(2000),
});

function InquiryForm({ listing }: { listing: Listing }) {
  const refLabel = listing.mls ? `${listing.title} (MLS® ${listing.mls})` : listing.title;
  const defaultMessage = `I'd like more information about ${refLabel}.`;
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
          Inquire
        </span>
      </div>
      <h2 className="mt-3 font-display text-2xl text-navy">
        Request Information
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Eric will reach out with full details, disclosures, and a private showing.
      </p>

      {submitted ? (
        <div className="mt-8 flex flex-col items-center text-center py-10">
          <CheckCircle2 className="h-12 w-12 text-gold" />
          <h3 className="mt-4 font-display text-xl text-navy">Inquiry Received</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you. Eric will follow up directly regarding {refLabel}.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          <FieldInline label="Full Name" name="name" error={errors.name} required />
          <FieldInline label="Email" name="email" type="email" error={errors.email} required />
          <FieldInline label="Phone" name="phone" type="tel" error={errors.phone} />
          <div>
            <LabelInline required>Message</LabelInline>
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
            Send Inquiry <Send className="h-4 w-4" />
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
