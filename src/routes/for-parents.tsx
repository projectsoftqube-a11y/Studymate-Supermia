import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { PARENTS_CONTENT } from "@/content/parents";
import { PAGES } from "@/content/pages";
import { pageHead } from "@/lib/seo";

/**
 * Built and held. While FOR_PARENTS_LIVE is false the registry marks this page
 * not live, so `pageHead` emits `noindex, follow` and nothing else on the site
 * links here. The page itself renders normally so it can be reviewed in place.
 */
export const Route = createFileRoute("/for-parents")({
  head: () => pageHead(PAGES.parents),
  component: ForParentsRoute,
});

function ForParentsRoute() {
  return <ContentPage page={PAGES.parents} content={PARENTS_CONTENT} />;
}
