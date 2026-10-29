import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { CHAT_CONTENT } from "@/content/features";
import { PAGES } from "@/content/pages";
import { pageHead } from "@/lib/seo";

/** Feature page for "textbook ai". Copy lives in `content/features`. */
export const Route = createFileRoute("/features/chat-with-your-textbook")({
  head: () => pageHead(PAGES.chat),
  component: ChatRoute,
});

function ChatRoute() {
  return <ContentPage page={PAGES.chat} content={CHAT_CONTENT} />;
}
