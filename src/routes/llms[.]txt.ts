import { createFileRoute } from "@tanstack/react-router";
import { llmsTxt } from "@/lib/site-files";

/** /llms.txt, generated from the page registry. See `lib/site-files`. */
export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(llmsTxt(), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
