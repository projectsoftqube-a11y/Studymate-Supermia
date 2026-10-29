import { isLive } from "@/content/pages";
import { absoluteUrl } from "@/lib/seo";

/**
 * The inline grammar used in page copy: `**bold**` and `[text](href)`.
 *
 * Hand-rolled rather than a markdown library for the same reason as the legal
 * pages: the input is a fixed set of strings in this repo, the grammar is two
 * tokens, and the output is real React elements or plain strings, so nothing is
 * ever injected as HTML.
 */
export const INLINE_TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;
const LINK_ANYWHERE = /\[[^\]]+\]\(([^)]+)\)/g;

export function parseLink(token: string): { label: string; href: string } | null {
  const m = token.match(LINK);
  return m ? { label: m[1], href: m[2] } : null;
}

/**
 * Drops every sentence that links to a page which is not live.
 *
 * The content package's rule is to leave out the whole sentence holding a link
 * until its page launches, not to unlink it or point it somewhere else. Doing it
 * here means copy can be written once, in its final form, and each sentence
 * appears on the day its target page goes live (see `isLive`).
 *
 * Sentences split after . ? or ! followed by a space and a capital letter, which
 * holds for every string in this repo (there are no abbreviations like "e.g.").
 */
export function liveText(text: string): string {
  if (!text.includes("](")) return text;
  return text
    .split(/(?<=[.?!])\s+(?=[A-Z"])/)
    .filter((sentence) => [...sentence.matchAll(LINK_ANYWHERE)].every(([, href]) => isLive(href)))
    .join(" ");
}

/** Whether a string still has anything to say once held links are dropped. */
export const hasLiveText = (text: string) => liveText(text).trim().length > 0;

/** Visible text with markup removed. Structured data uses exactly this. */
export function toPlain(text: string): string {
  return liveText(text)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/** Markdown with absolute links, for /llms-full.txt. */
export function toMarkdown(text: string): string {
  return liveText(text).replace(/\]\((\/[^)]*)\)/g, (_, href: string) => `](${absoluteUrl(href)})`);
}
