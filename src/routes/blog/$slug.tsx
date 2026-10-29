import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPostPage from "@/components/blog/BlogPostPage";
import { postBySlug, postPath } from "@/content/blog";
import { pageByPath } from "@/content/pages";
import { blogPostGraph } from "@/lib/blog-seo";
import { pageHead } from "@/lib/seo";

/**
 * One route for every post. An unknown slug throws `notFound()` in the loader,
 * so it renders the 404 page with a real 404 status instead of an empty post.
 */
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    const page = post && pageByPath(postPath(post));
    if (!post || !page) throw notFound();
    return { slug: post.slug };
  },
  head: ({ params }) => {
    const post = postBySlug(params.slug);
    const page = post && pageByPath(postPath(post));
    return post && page ? pageHead(page, blogPostGraph(page, post)) : {};
  },
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { slug } = Route.useLoaderData();
  const post = postBySlug(slug)!;
  return <BlogPostPage post={post} />;
}
