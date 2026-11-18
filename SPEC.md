# SPEC — Eric Kim Realty: CREA DDF live listings + Bluluma Realtor CMS

Approved by Sony 2026-11-18.

## Goal
Eric never edits listings by hand. CREA DDF supplies live listings automatically; the
Bluluma Realtor CMS only covers what DDF doesn't have (pre-sale, exclusives, sold archive).

## Data sources
| Source | What | How |
|---|---|---|
| CREA DDF (National Shared Pool feed for erickimrealty.com) | Eric's own active listings | `ddf-sync` edge function, hourly |
| CREA DDF (same feed) | Greater Vancouver area listings (not Eric's) | same sync, separate table |
| Bluluma Realtor CMS | Pre-sale, exclusive, manual sold | manual (`listing_type = 'manual'`) |

The DDF feed has no filters set in DDF; filtering is done in the sync.

## Database (Supabase project `uzdjwpkgldzhnoxjeyrw`, schema `realtor_cms`)
- `listings` — Eric's showcase listings. Manual rows + DDF rows for his OWN listings
  (`listing_type = 'ddf'`, `ddf_listing_key`). Sold archive lives here too.
- `listings` new columns: `ddf_listing_key`, `ddf_last_seen_at`, `off_market_at`,
  `sold_publish_at`, `sold_review` (`pending` | `published` | `cancelled`), `sold_cancel_token`.
- `listing_photos` — photos for `listings` (DDF photos copied to Storage for own listings so
  they survive delisting).
- `ddf_feeds` — one row per realtor feed: credentials secret name, agent keys, area cities.
- `area_listings` — Greater Vancouver pool per realtor, replaced/upserted each sync,
  rows not seen in a sync are deleted (no archive for other agents' listings).
- Public read-only views: `eric_listings`, `eric_listing_photos`, `eric_realtors`,
  `eric_area_listings`.

## Sync (`ddf-sync` Supabase Edge Function, pg_cron hourly)
1. OAuth client_credentials token (identity.crea.ca, scope `DDFApi_Read`).
2. Page through `Property` (OData) filtered to area cities; upsert.
3. Listing where list agent / co-list agent key ∈ Eric's agent keys → `listings` (own).
   Otherwise → `area_listings`.
4. Own listing missing from feed → `off_market_at = now`, `sold_review = pending`,
   `sold_publish_at = now + 3 days`, email Eric (Resend) with a one-click "Not sold" link.
5. After `sold_publish_at` with no cancel → `status = sold`, `show_in_sold = true`.
   Cancel link → `sold_review = cancelled`, listing hidden.

## Website sections
| Page | Data |
|---|---|
| Home / My Listings | `eric_listings` status active (DDF + manual), featured first |
| Search Greater Vancouver | `eric_area_listings` with city / price / beds / type filters |
| Pre-Sale | `eric_listings` category presale |
| Sold | `eric_listings` status sold — brief card: main photo, street + city, type, beds/baths/sqft, sold date, SOLD badge |

## Defaults (change on Eric's answer)
- Area cities: Vancouver, Burnaby, Richmond, North Vancouver, West Vancouver, Coquitlam,
  Port Coquitlam, Port Moody, New Westminster, Surrey, Delta, Langley.
- Sold price hidden unless set in CMS (`features.sold_price`).
- Sold address shows street name + city only (no unit / house number).
- Sold grace period: 3 days.

## Reuse
Same tables serve Tony Lin next: new `realtors` + `ddf_feeds` row, own views.
