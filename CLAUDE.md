# Eric Kim Realty — project notes

- Stack: TanStack Start (Lovable first build). All changes now go in this repo, never Lovable.
- Hosting: Netlify (`netlify.toml`, functions in `netlify/functions`).
- Data: central Supabase project `uzdjwpkgldzhnoxjeyrw`, schema `realtor_cms`, read via
  public views `eric_*` with the publishable key (see AGENTS.md). Realtor slug `eric-kim`.
- CREA DDF: National Shared Pool feed for https://erickimrealty.com/ (created 2026-06-07).
  Credentials live only as Supabase edge function secrets — never commit them.
- Sync runs in Supabase Edge Function `ddf-sync` (the dev sandbox cannot reach CREA).
- Full design: see SPEC.md.
- Languages: EN + Korean (`src/lib/i18n.tsx`).
