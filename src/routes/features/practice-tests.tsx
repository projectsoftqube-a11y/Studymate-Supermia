import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { TESTS_CONTENT } from "@/content/features";
import { PAGES } from "@/content/pages";
import { pageHead } from "@/lib/seo";

/** Feature page for "practice test generator". Copy lives in `content/features`. */
export const Route = createFileRoute("/features/practice-tests")({
  head: () => pageHead(PAGES.tests),
  component: PracticeTestsRoute,
});

function PracticeTestsRoute() {
  return <ContentPage page={PAGES.tests} content={TESTS_CONTENT} />;
}
