import { createFileRoute } from "@tanstack/react-router";
import { sitemapXml } from "@/lib/site-files";

/**
 * /sitemap.xml, generated from the page registry so it lists exactly the live
 * pages, at the URLs their canonical tags declare. Replaces the hand-written
 * public/sitemap.xml, which had no lastmod and had to be edited in step with
 * every route change.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemapXml(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
