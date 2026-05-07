// Real listing data sourced from Eric Kim's public Paragon listing links.
// Images proxied directly from paragon.ice.com — fall back to local hero if blocked.

import fallbackImg from "@/assets/listing-residential.jpg";

export type ListingStatus = "active" | "sold" | "presale";

export interface Listing {
  id: string;
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
  propertyType: string;
  image: string;
  fallbackImage: string;
  description: string;
}

export const FALLBACK_LISTING_IMAGE = fallbackImg;

export const listings: Listing[] = [
  {
    id: "R3110638",
    mls: "R3110638",
    status: "active",
    category: "residential",
    title: "Marlborough House — Top Floor End Unit",
    address: "409 – 3098 Guildford Way",
    city: "Coquitlam",
    neighborhood: "North Coquitlam",
    province: "BC",
    postalCode: "V3B 7W8",
    price: 729000,
    beds: 2,
    baths: 2,
    sqft: 1089,
    propertyType: "Apartment / Condo",
    image:
      "https://zimg.paragon.ice.com/ParagonImages/Property/PN/BCRES/263132265/0/640/480/cf3f211a6619ba636592ff19ef4a143b/16/8ef84668c603bdecd6ca8230060354b9/263132265-bcdcf155-fd03-427e-811b-83211cf8a1f8.JPG",
    fallbackImage: fallbackImg,
    description:
      "Rare top-floor, end unit at the prestigious Marlborough House with extra ceiling height and 1,089 sq ft of bright, open living space. 2 bed, 2 bath with large windows, private balcony with serene views of Lafarge Lake, and 2 parking stalls. Resort-style 55+ community steps to SkyTrain and Coquitlam Centre.",
  },
  {
    id: "R3012776",
    mls: "R3012776",
    status: "sold",
    category: "residential",
    title: "Concord Brentwood Hillside East",
    address: "5001 – 4880 Lougheed Highway",
    city: "Burnaby",
    neighborhood: "Brentwood Park",
    province: "BC",
    postalCode: "V5C 0N1",
    price: 665000,
    soldPrice: 640000,
    soldDate: "2025-07-09",
    beds: 1,
    baths: 1,
    sqft: 551,
    propertyType: "Apartment / Condo",
    image:
      "https://zimg.paragon.ice.com/ParagonImages/Property/PN/BCRES/263034403/0/640/480/6aa58abcc9aff1163c1f67b4c0c3249c/16/4a61fc4fc3206220217a549d921454fe/263034403-de1f9b41-ebcb-490b-998c-acbd585cc3b4.JPG",
    fallbackImage: fallbackImg,
    description:
      "Luxury 1 bedroom in Concord Brentwood Hillside East with breathtaking mountain, park, and water views. 551 sqft with a 200+ sqft heated balcony, BOSCH appliances, central A/C, and 5-star amenities including 24-hour concierge. Quick access to Brentwood Mall SkyTrain.",
  },
];

export const activeResidential = listings.filter(
  (l) => l.category === "residential" && l.status === "active"
);
export const soldResidential = listings.filter(
  (l) => l.category === "residential" && l.status === "sold"
);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
