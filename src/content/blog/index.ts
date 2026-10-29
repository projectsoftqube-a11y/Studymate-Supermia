import { EXAM_PREP } from "@/content/blog/exam-prep";
import { FOR_PARENTS } from "@/content/blog/for-parents";
import { STUDY_METHODS_COMPARED } from "@/content/blog/study-methods-compared";
import { STUDY_SKILLS_A } from "@/content/blog/study-skills-a";
import { STUDY_SKILLS_B } from "@/content/blog/study-skills-b";
import type { BlogPost, CategoryKey } from "@/content/blog/types";

/**
 * Every published post, newest first (ties keep this order, which is the
 * package's publishing order with the hub post first).
 *
 * The checks below run when the module loads, so a malformed post fails the
 * build and every request rather than shipping. They cover what the content
 * package's scripted QA checked by hand: unique slugs, title and description
 * lengths, related posts that exist, and dashes the house style bans.
 */
export const POSTS: BlogPost[] = [
  STUDY_METHODS_COMPARED,
  ...STUDY_SKILLS_A,
  ...FOR_PARENTS,
  ...EXAM_PREP,
  ...STUDY_SKILLS_B,
].sort((a, b) => b.published.localeCompare(a.published));

const BY_SLUG = new Map(POSTS.map((post) => [post.slug, post]));

export const postBySlug = (slug: string) => BY_SLUG.get(slug);
export const postsIn = (category: CategoryKey) => POSTS.filter((p) => p.category === category);
export const postPath = (post: BlogPost) => `/blog/${post.slug}`;

/**
 * A category page and the hub are indexable once they have at least three
 * posts, per the package ("noindex, follow until 3 Final posts").
 */
export const INDEX_THRESHOLD = 3;

for (const post of POSTS) {
  const problems: string[] = [];
  if (post.title.length > 60) problems.push(`title is ${post.title.length} chars`);
  if (post.description.length < 70 || post.description.length > 155) {
    problems.push(`description is ${post.description.length} chars`);
  }
  if (POSTS.filter((p) => p.slug === post.slug).length > 1) problems.push("duplicate slug");
  for (const slug of post.related)
    if (!BY_SLUG.has(slug)) problems.push(`related "${slug}" missing`);
  if (/[–—]/.test(JSON.stringify(post))) problems.push("contains an en or em dash");
  if (problems.length) throw new Error(`Blog post "${post.slug}": ${problems.join("; ")}`);
}
