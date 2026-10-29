import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY_DOC, TERMS_DOC } from "@/content/legal";
import { PAGES } from "@/content/pages";
import { pageHead } from "@/lib/seo";

/** See `privacy.tsx`. The registry entry explains the "Security Policy" title. */
export const Route = createFileRoute("/terms")({
  head: () => pageHead(PAGES.terms),
  component: TermsRoute,
});

function TermsRoute() {
  return <LegalPage page={PAGES.terms} doc={TERMS_DOC} other={PRIVACY_DOC} />;
}
