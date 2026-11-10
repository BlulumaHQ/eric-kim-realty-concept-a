# Architecture

- Read realtor, listing, and photo data through the central project's `eric_realtors`, `eric_listings`, and `eric_listing_photos` read-only views using the shared browser client; this preserves the existing UI while respecting the central project's access boundaries.