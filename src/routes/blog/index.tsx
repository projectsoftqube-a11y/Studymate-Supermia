import { createFileRoute } from "@tanstack/react-router";
import BlogListPage from "@/components/blog/BlogListPage";
import { POSTS } from "@/content/blog";
import { PAGES } from "@/content/pages";
import { collectionGraph } from "@/lib/blog-seo";
import { pageHead } from "@/lib/seo";

/** The blog hub. Indexable once there are at least three posts (registry). */
export const Route = createFileRoute("/blog/")({
  head: () => pageHead(PAGES.blog, collectionGraph(PAGES.blog, POSTS)),
  component: BlogRoute,
});

function BlogRoute() {
  return <BlogListPage />;
}
