import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { EXAM_REVISION_CONTENT } from "@/content/company";
import { PAGES } from "@/content/pages";
import { pageHead } from "@/lib/seo";

/** Audience page for "ai revision tool". Copy lives in `content/company`. */
export const Route = createFileRoute("/exam-revision")({
  head: () => pageHead(PAGES.examRevision),
  component: ExamRevisionRoute,
});

function ExamRevisionRoute() {
  return <ContentPage page={PAGES.examRevision} content={EXAM_REVISION_CONTENT} />;
}
