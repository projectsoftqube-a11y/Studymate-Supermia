import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { ABOUT_CONTENT } from "@/content/company";
import { PAGES } from "@/content/pages";
import { pageGraph, pageHead } from "@/lib/seo";

/** Company page, as an AboutPage. Copy lives in `content/company`. */
export const Route = createFileRoute("/about")({
  head: () => pageHead(PAGES.about, pageGraph(PAGES.about, { type: "AboutPage" })),
  component: AboutRoute,
});

function AboutRoute() {
  return <ContentPage page={PAGES.about} content={ABOUT_CONTENT} />;
}
