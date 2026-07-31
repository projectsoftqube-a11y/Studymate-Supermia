import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { APP_URL, SITE_URL } from "../lib/site";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
 * three unrelated claims.
 *
 * This is the AEO/GEO layer: answer engines and LLM crawlers extract entities,
 * not keywords. Naming the organisation, what the product is, who it is for and
 * what it costs, in machine-readable form, is what lets an assistant answer
 * "what is StudyMate AI" correctly instead of guessing from prose.
 *
 * Every value here is verifiable from the site or the brochure. No ratings, no
 * review counts, no adoption figures: fabricated `aggregateRating` is both a
 * lie and a manual-action risk.
 */
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "StudyMate AI",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      email: "hello@supermia.ai",
      description:
        "StudyMate AI builds an AI study companion that answers from a student's own textbooks, adapts to their level, and reports progress chapter by chapter.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2451 W Grapevine Mills Cir #547",
        addressLocality: "Grapevine",
        addressRegion: "TX",
        postalCode: "76051",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@supermia.ai",
        availableLanguage: ["en"],
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: "StudyMate AI",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: "StudyMate AI",
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "AI tutoring",
      operatingSystem: "Web browser",
      url: APP_URL,
      publisher: { "@id": ORGANIZATION_ID },
      description:
        "An AI tutor that answers from your own textbooks. Chat through any chapter, generate practice papers at your level, get instant evaluation, and see which chapters still need work.",
      featureList: [
        "Chat with your textbook",
        "Adaptive AI tutoring that re-paces to the student",
        "Practice paper generation by chapter and difficulty",
        "Instant, detailed evaluation",
        "Chapter-level progress reporting",
      ],
      audience: {
        "@type": "EducationalAudience",
        educationalRole: ["student", "teacher", "parent"],
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free starter credits, no card required.",
      },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      /* Title: entity first, then what it does, then who for. Answer engines
         and search both lead on the entity name, and "AI tutor" is the phrase
         people actually search rather than "study companion". Kept under ~60
         characters so it is not truncated in results. */
      { title: "StudyMate AI: AI Tutor for Your Own Textbooks" },
      {
        name: "description",
        content:
          "StudyMate AI is an AI tutor that answers from your own textbooks. Pick your board and class, chat through any chapter, generate practice papers, get instant evaluation, and see which chapters still need work.",
      },
      { name: "author", content: "StudyMate AI" },
      { name: "theme-color", content: "#012715" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      /* AEO. Answer engines summarise a page from its own claims, so the most
         useful thing a page can carry is one plain sentence defining the entity
         in the form an assistant would quote back. */
      {
        name: "summary",
        content:
          "StudyMate AI is an AI study tool for school students. It answers questions from the student's own syllabus textbooks, adapts question difficulty to their level, generates practice papers by chapter, evaluates them instantly, and reports progress chapter by chapter.",
      },
      { property: "og:site_name", content: "StudyMate AI" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "StudyMate AI: AI Tutor for Your Own Textbooks" },
      {
        property: "og:description",
        content:
          "An AI tutor that answers from your own textbooks. Chat through any chapter, practise at your level, and see exactly what to study next.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "StudyMate AI: AI Tutor for Your Own Textbooks" },
      {
        name: "twitter:description",
        content:
          "An AI tutor that answers from your own textbooks. Chat through any chapter, practise at your level, and see exactly what to study next.",
      },
      /* Self-hosted, absolute. These previously pointed at a Lovable scaffolding
         preview on a third-party R2 bucket: every social share depended on
         infrastructure this project does not control, and one bucket change
         would have silently broken every card already in the wild.
         Crawlers do not resolve relative URLs here, so the origin is explicit. */
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "StudyMate AI: your personal AI study companion",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      /* Canonical. Vercel serves this deployment on several hostnames (the
         project domain plus per-commit preview URLs), and without this each one
         is a separate indexable copy competing with the others. */
      { rel: "canonical", href: `${SITE_URL}/` },
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
            and is not tied to any one block of copy. The page's HowTo and
            FAQPage schema live with the sections that generate them. */}
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
