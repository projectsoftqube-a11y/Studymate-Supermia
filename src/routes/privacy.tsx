import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY_DOC, TERMS_DOC } from "@/content/legal";
import { SITE_URL } from "@/lib/site";

/**
 * Head overrides.
 *
 * The root route sets the site-wide defaults, and TanStack merges these on top
 * by `name`/`property`, so only the tags that actually differ per document are
 * restated here. The canonical link lives on each route rather than the root:
 * `links` are concatenated, not deduped, so a canonical in the root shell would
 * render alongside this one and point every page at the homepage.
 *
 * `robots` stays index/follow. Legal pages are legitimate destinations — people
 * search for them, and answer engines cite them when asked what a product does
 * with its data.
 */
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | StudyMate AI" },
      { name: "description", content: PRIVACY_DOC.description },
      { property: "og:title", content: "Privacy Policy | StudyMate AI" },
      { property: "og:description", content: PRIVACY_DOC.description },
      { property: "og:url", content: `${SITE_URL}${PRIVACY_DOC.path}` },
      { name: "twitter:title", content: "Privacy Policy | StudyMate AI" },
      { name: "twitter:description", content: PRIVACY_DOC.description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${PRIVACY_DOC.path}` }],
  }),
  component: PrivacyRoute,
});

function PrivacyRoute() {
  return <LegalPage doc={PRIVACY_DOC} other={TERMS_DOC} />;
}
