import { createFileRoute } from "@tanstack/react-router";
import { llmsFullTxt } from "@/lib/site-files";

/** /llms-full.txt, the whole site's copy as one Markdown file. See `lib/site-files`. */
export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(llmsFullTxt(), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
