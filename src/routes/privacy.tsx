import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY_DOC, TERMS_DOC } from "@/content/legal";
import { PAGES } from "@/content/pages";
import { pageHead } from "@/lib/seo";

/**
 * Head tags come from the page registry like every other route, so the title,
 * description and canonical sit beside the sitemap entry they must agree with.
 *
 * `robots` stays index/follow. Legal pages are legitimate destinations — people
 * search for them, and answer engines cite them when asked what a product does
 * with its data.
 */
export const Route = createFileRoute("/privacy")({
  head: () => pageHead(PAGES.privacy),
  component: PrivacyRoute,
});

function PrivacyRoute() {
  return <LegalPage page={PAGES.privacy} doc={PRIVACY_DOC} other={TERMS_DOC} />;
}
