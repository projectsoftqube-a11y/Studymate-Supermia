import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY_DOC, TERMS_DOC } from "@/content/legal";
import { SITE_URL } from "@/lib/site";

/** See `privacy.tsx` for why the canonical link is declared per route. */
export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | StudyMate AI" },
      { name: "description", content: TERMS_DOC.description },
      { property: "og:title", content: "Terms & Conditions | StudyMate AI" },
      { property: "og:description", content: TERMS_DOC.description },
      { property: "og:url", content: `${SITE_URL}${TERMS_DOC.path}` },
      { name: "twitter:title", content: "Terms & Conditions | StudyMate AI" },
      { name: "twitter:description", content: TERMS_DOC.description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${TERMS_DOC.path}` }],
  }),
  component: TermsRoute,
});

function TermsRoute() {
  return <LegalPage doc={TERMS_DOC} other={PRIVACY_DOC} />;
}
