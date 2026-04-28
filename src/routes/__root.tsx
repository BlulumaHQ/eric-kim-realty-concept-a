import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-navy">404</h1>
        <h2 className="mt-4 font-display text-xl text-navy">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground hover:bg-navy/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "Eric Kim REALTOR® | Metro Vancouver Residential, Commercial & Presale Real Estate",
      },
      {
        name: "description",
        content:
          "Work with Eric Kim, REALTOR® at Initia Real Estate for residential, commercial, and presale real estate guidance across Metro Vancouver.",
      },
      { name: "author", content: "Eric Kim, REALTOR®" },
      {
        name: "keywords",
        content:
          "Metro Vancouver realtor, Vancouver commercial realtor, Vancouver presale realtor, Eric Kim realtor, Initia Real Estate",
      },
      {
        property: "og:title",
        content:
          "Eric Kim REALTOR® | Metro Vancouver Residential, Commercial & Presale Real Estate",
      },
      {
        property: "og:description",
        content:
          "Residential, commercial, and presale real estate guidance across Metro Vancouver with Eric Kim, REALTOR® at Initia Real Estate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Lovable App" },
      { property: "og:title", content: "Lovable App" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "description", content: "Vancouver Real Estate Advisor website for Eric Kim, REALTOR®, specializing in residential, commercial, and presale properties." },
      { property: "og:description", content: "Vancouver Real Estate Advisor website for Eric Kim, REALTOR®, specializing in residential, commercial, and presale properties." },
      { name: "twitter:description", content: "Vancouver Real Estate Advisor website for Eric Kim, REALTOR®, specializing in residential, commercial, and presale properties." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/259e53d8-f3b4-4c0c-b761-8ad212787167/id-preview-87f43c2e--6e10a9f9-b606-4d76-bfcc-14aec3fdf242.lovable.app-1777420483493.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/259e53d8-f3b4-4c0c-b761-8ad212787167/id-preview-87f43c2e--6e10a9f9-b606-4d76-bfcc-14aec3fdf242.lovable.app-1777420483493.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
