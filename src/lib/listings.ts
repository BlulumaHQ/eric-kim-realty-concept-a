// Live listings loaded from Supabase for realtor slug "eric-kim".
// The Listing interface, formatPrice, and FALLBACK_LISTING_IMAGE stay
// stable so existing components keep working unchanged.

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import fallbackImg from "@/assets/listing-residential.jpg";

export type ListingStatus = "active" | "sold" | "presale";

export interface Listing {
  id: string;
  slug: string;
  mls: string;
  status: ListingStatus;
  category: "residential" | "commercial" | "presale";
  title: string;
  address: string;
  city: string;
  neighborhood: string;
  province: string;
  postalCode: string;
  price: number;
  soldPrice?: number;
  soldDate?: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: string;
  zoning: string;
  buildingType: string;
  leaseRate: string;
  propertyType: string;
  transactionType: string;
  image: string;
  fallbackImage: string;
  description: string;
  featured?: boolean;
  showInSold?: boolean;
  sortOrder?: number;
  soldSortOrder?: number;
}

export interface ListingPhoto {
  id: string;
  url: string;
  caption?: string;
  sortOrder: number;
}

export const FALLBACK_LISTING_IMAGE = fallbackImg;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);

const REALTOR_SLUG = "eric-kim";

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function asNumber(v: unknown, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function mapRow(row: Record<string, unknown>): Listing {
  const features = (row.features && typeof row.features === "object"
    ? (row.features as Record<string, unknown>)
    : {}) as Record<string, unknown>;

  const status = (row.status === "sold"
    ? "sold"
    : row.status === "presale"
      ? "presale"
      : "active") as ListingStatus;

  const category = (row.category === "commercial"
    ? "commercial"
    : row.category === "presale"
      ? "presale"
      : "residential") as Listing["category"];

  const price = asNumber(row.price);
  const soldPriceRaw = features.sold_price ?? features.soldPrice;
  const soldPrice =
    typeof soldPriceRaw === "number" ? soldPriceRaw : status === "sold" ? price : undefined;

  return {
    id: asString(row.id),
    slug: asString(row.slug),
    mls: asString(row.mls_number),
    status,
    category,
    title: asString(row.title),
    address: asString(row.address),
    city: asString(row.city),
    neighborhood: asString(features.neighborhood ?? features.neighbourhood ?? ""),
    province: asString(features.province ?? "BC"),
    postalCode: asString(features.postal_code ?? features.postalCode ?? ""),
    price,
    soldPrice,
    soldDate: asString(features.sold_date ?? features.soldDate ?? "") || undefined,
    beds: asNumber(row.beds),
    baths: asNumber(row.baths),
    sqft: asNumber(row.sqft),
    lotSize: asString(row.lot_size),
    yearBuilt: asString(features.year_built ?? features.yearBuilt ?? ""),
    zoning: asString(features.zoning ?? ""),
    buildingType: asString(features.building_type ?? features.buildingType ?? ""),
    leaseRate: asString(features.lease_rate ?? features.leaseRate ?? ""),
    propertyType: asString(row.property_type),
    transactionType: asString(row.transaction_type),
    image: asString(row.primary_image_url) || fallbackImg,
    fallbackImage: fallbackImg,
    description: asString(row.description),
    featured: Boolean(row.featured),
    showInSold: Boolean(row.show_in_sold),
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : undefined,
    soldSortOrder:
      typeof row.sold_sort_order === "number" ? row.sold_sort_order : undefined,
  };
}

async function fetchListings(): Promise<Listing[]> {
  const { data: realtor, error: realtorErr } = await supabase
    .from("realtors")
    .select("id")
    .eq("slug", REALTOR_SLUG)
    .maybeSingle();

  if (realtorErr || !realtor) return [];

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("realtor_id", (realtor as { id: string }).id);

  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(mapRow);
}

// Module-level cache so multiple components share one fetch.
let cache: Listing[] | null = null;
let inflight: Promise<Listing[]> | null = null;

export function useListings() {
  const [listings, setListings] = useState<Listing[] | null>(cache);
  const [loading, setLoading] = useState<boolean>(cache === null);

  useEffect(() => {
    if (cache) {
      setListings(cache);
      setLoading(false);
      return;
    }
    let cancelled = false;
    if (!inflight) inflight = fetchListings();
    inflight
      .then((rows) => {
        cache = rows;
        if (!cancelled) {
          setListings(rows);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setListings([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const all = listings ?? [];
  const sortBy = (key: "sortOrder" | "soldSortOrder") => (a: Listing, b: Listing) =>
    (a[key] ?? Number.MAX_SAFE_INTEGER) - (b[key] ?? Number.MAX_SAFE_INTEGER);

  const featuredResidential = all
    .filter((l) => l.category === "residential" && l.featured && l.status === "active")
    .sort(sortBy("sortOrder"))
    .slice(0, 6);

  const commercial = all
    .filter((l) => l.category === "commercial")
    .sort(sortBy("sortOrder"))
    .slice(0, 6);

  const recentlySold = all
    .filter((l) => l.status === "sold" && (l.showInSold ?? true))
    .sort(sortBy("soldSortOrder"))
    .slice(0, 6);

  return { loading, all, featuredResidential, commercial, recentlySold };
}

export async function fetchListingById(
  id: string
): Promise<{ listing: Listing; photos: ListingPhoto[] } | null> {
  const { data: row, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !row) return null;

  const listing = mapRow(row as Record<string, unknown>);

  const { data: photoRows } = await supabase
    .from("listing_photos")
    .select("*")
    .eq("listing_id", listing.id)
    .order("sort_order", { ascending: true });

  const photos: ListingPhoto[] = ((photoRows as Record<string, unknown>[] | null) ?? []).map(
    (p) => ({
      id: asString(p.id),
      url:
        asString(p.photo_url) ||
        asString(p.url) ||
        asString(p.image_url) ||
        "",
      caption: asString(p.caption ?? p.alt_text ?? "") || undefined,
      sortOrder: asNumber(p.sort_order),
    })
  ).filter((p) => p.url);

  return { listing, photos };
}

export function useListing(id: string | undefined) {
  const [state, setState] = useState<{
    loading: boolean;
    data: { listing: Listing; photos: ListingPhoto[] } | null;
  }>({ loading: true, data: null });

  useEffect(() => {
    if (!id) {
      setState({ loading: false, data: null });
      return;
    }
    let cancelled = false;
    setState({ loading: true, data: null });
    fetchListingById(id)
      .then((data) => {
        if (!cancelled) setState({ loading: false, data });
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, data: null });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
