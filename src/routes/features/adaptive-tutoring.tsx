import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { ADAPTIVE_CONTENT } from "@/content/features";
import { PAGES } from "@/content/pages";
import { pageHead } from "@/lib/seo";

/** Feature page for "adaptive learning ai". Copy lives in `content/features`. */
export const Route = createFileRoute("/features/adaptive-tutoring")({
  head: () => pageHead(PAGES.adaptive),
  component: AdaptiveRoute,
});

function AdaptiveRoute() {
  return <ContentPage page={PAGES.adaptive} content={ADAPTIVE_CONTENT} />;
}
