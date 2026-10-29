import { toPlain } from "@/lib/rich-text";
import type { BlogPost } from "@/content/blog/types";
import type { Block } from "@/content/types";

/**
 * A post's readable text, in reading order, with markup removed.
 *
 * One function feeds the visible reading time, the BlogPosting `wordCount`
 * and the plain-text dump for /llms-full.txt, so the three always describe the
 * same words. Kept out of `blog/index` because `rich-text` imports the page
 * registry, which imports the blog index.
 */
function blockText(block: Block): string[] {
  switch (block.kind) {
    case "p":
      return [block.text];
    case "list":
    case "steps":
      return block.items;
    case "terms":
      return block.items.flatMap(({ term, text }) => [term, text]);
    case "qa":
      return block.items.flatMap(({ q, a }) => [q, a]);
    case "table":
      return [block.caption, ...block.head, ...block.rows.flat()];
    case "figure":
      return block.caption ? [block.caption] : [];
    case "contact":
      return [block.name, block.email];
    case "cards":
      return block.items.flatMap(({ title, text }) => [title, text]);
    case "examples":
      return block.items;
    case "journey":
      return block.items.flatMap(({ title, time, text }) => [title, time, text]);
  }
}

export function postText(post: BlogPost): string {
  return [
    post.h1,
    post.answer,
    ...post.takeaways,
    ...post.sections.flatMap((s) => [s.heading, ...s.blocks.flatMap(blockText)]),
    ...post.faqs.flatMap(({ q, a }) => [q, a]),
  ]
    .map(toPlain)
    .join("\n");
}

export const wordCount = (post: BlogPost) => postText(post).split(/\s+/).filter(Boolean).length;

/** At roughly 230 words a minute, rounded up, never less than one. */
export const readingMinutes = (post: BlogPost) => Math.max(1, Math.ceil(wordCount(post) / 230));
