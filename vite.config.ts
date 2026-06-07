import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static prerender for Netlify deployment.
// Prerender crawls links from `/` and emits static HTML for each discovered route.
// SPA fallback (public/_redirects: /* /index.html 200) handles dynamic listing
// detail pages (/listings/:id) and any unknown URLs at runtime.
export default defineConfig({
  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
      retryCount: 2,
    },
    pages: [
      { path: "/" },
      { path: "/listings" },
      { path: "/about" },
      { path: "/services" },
      { path: "/commercial" },
      { path: "/presale" },
      { path: "/contact" },
    ],
  },
});
