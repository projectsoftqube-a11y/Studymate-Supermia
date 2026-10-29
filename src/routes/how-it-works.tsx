import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { HOW_IT_WORKS_CONTENT } from "@/content/how-it-works";
import { PAGES } from "@/content/pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () => pageHead(PAGES.howItWorks),
  component: HowItWorksRoute,
});

function HowItWorksRoute() {
  return <ContentPage page={PAGES.howItWorks} content={HOW_IT_WORKS_CONTENT} />;
}
