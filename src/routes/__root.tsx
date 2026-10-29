import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE_URL } from "../lib/site";
import { OG_IMAGE, ORG_ID, SOFTWARE_ID, WEBSITE_ID } from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* `ErrorComponentProps`, not `{ error: Error }`: the router types `error` as
   `unknown` (anything can be thrown), and the narrower annotation failed the
   typecheck. Nothing below needs it to be an Error. */
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Organisation, product and site schema.
 *
 * Three linked nodes in one graph rather than three separate <script> blocks,
 * so `@id` references resolve and engines read them as one entity rather than
 * three unrelated claims. Every route adds its own WebPage node that points back
 * at these by `@id` (see `pageGraph` in lib/seo).
 *
 * This is the AEO/GEO layer: answer engines and LLM crawlers extract entities,
 * not keywords. Naming the organisation, what the product is and who it is for,
 * in machine-readable form, is what lets an assistant answer "what is StudyMate
 * AI" correctly instead of guessing from prose.
 *
 * Values follow the content package's schema.jsonld and are verifiable from the
 * site, the privacy policy or SuperMIA's own profiles. No ratings, review counts
 * or adoption figures: fabricated `aggregateRating` is both a lie and a
 * manual-action risk. No `offers` either, until credit costs are published.
 */
const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "SuperMIA",
      legalName: "Botfinity Inc.",
      description:
        "SuperMIA is the conversational AI platform from Botfinity, building AI voice and chat agents for industries including education. StudyMate AI is its AI tutor for school students.",
      url: "https://supermia.ai/",
      email: "hello@supermia.ai",
      logo: { "@type": "ImageObject", url: "https://supermia.ai/images/logo.svg" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "2451 W Grapevine Mills Cir #547",
        addressLocality: "Grapevine",
        addressRegion: "TX",
        postalCode: "76051",
        addressCountry: "US",
      },
      sameAs: [
        "https://www.linkedin.com/showcase/mia-my-intelligent-assistant",
        "https://www.youtube.com/@MIAMyIntelligentAssistant",
        "https://twitter.com/supermia_ai",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: "StudyMate AI",
      alternateName: ["StudyMate AI by SuperMIA", "StudyMate"],
      inLanguage: "en-US",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": SOFTWARE_ID,
      name: "StudyMate AI",
      url: `${SITE_URL}/`,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "AI tutor",
      operatingSystem: "Web browser",
      description:
        "An AI tutor for school students that answers from their own syllabus textbooks with the page cited, adapts practice to their level, generates chapter practice papers with instant evaluation and shows which chapters to study next.",
      featureList: [
        "Preloaded syllabus textbooks by country, board and class",
        "Chat with a textbook chapter, with the page cited",
        "Adaptive tutoring at three levels: know, use, reason",
        "Practice paper generator for any chapter",
        "Instant, detailed evaluation",
        "Chapter-level progress reports with a weakest-first study list",
      ],
      audience: { "@type": "EducationalAudience", educationalRole: "student" },
      image: OG_IMAGE.url,
      publisher: { "@id": ORG_ID },
      provider: { "@id": ORG_ID },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  /* Sitewide tags only. Title, description, robots, canonical and the og:/
     twitter: page fields come from each route's `pageHead`, so no page can
     silently inherit the homepage's. The title below is the fallback for the
     404 and error screens, which have no registry entry. */
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "StudyMate AI" },
      { name: "author", content: "StudyMate AI" },
      { name: "theme-color", content: "#012715" },
      { property: "og:site_name", content: "StudyMate AI" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      /* SuperMIA's handle until StudyMate has its own. */
      { name: "twitter:site", content: "@supermia_ai" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      /* No canonical here, deliberately.
         `links` from the root and the matched route are concatenated rather than
         deduped by `rel`, so a canonical declared at this level would render on
         every page alongside the route's own and point /privacy and /terms back
         at the homepage. Each route declares its own through `pageHead` in
         lib/seo, which also explains why it never uses the request host. */
      /* Icons. PNGs at explicit sizes first so a browser picks the right one
         without downscaling, then the multi-res .ico as the universal fallback
         (which browsers request at /favicon.ico regardless of markup anyway).
         No SVG entry: the current icon set is raster only. */
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        /* Families MUST stay in alphabetical order (Kalam before Mulish). The
           CSS2 API silently drops weights from out-of-order families rather than
           erroring: with Mulish listed first, Kalam came back as 400-only, and
           `font-bold` on Kalam then rendered as a synthesized fake bold. */
        href: "https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Mulish:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Organisation / WebSite / SoftwareApplication graph. Rendered here
            rather than in a section component so it is present on every route
            and is not tied to any one block of copy. Each route's WebPage,
            BreadcrumbList and FAQPage nodes come from its own `head`. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
