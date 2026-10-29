import { POSTS, postPath } from "@/content/blog";
import type { BlogPost } from "@/content/blog/types";
import { ABOUT_CONTENT, EXAM_REVISION_CONTENT } from "@/content/company";
import { FAQ_CONTENT } from "@/content/faq";
import { ADAPTIVE_CONTENT, CHAT_CONTENT, TESTS_CONTENT } from "@/content/features";
import { GLOSSARY_CONTENT } from "@/content/glossary";
import { HOW_IT_WORKS_CONTENT } from "@/content/how-it-works";
import { LIVE_PAGES, PAGES, POST_PAGES, isLive } from "@/content/pages";
import { PARENTS_CONTENT } from "@/content/parents";
import type { Block, PageContent } from "@/content/types";
import { toMarkdown } from "@/lib/rich-text";
import { absoluteUrl } from "@/lib/seo";

/**
 * Text files for crawlers, generated from the page registry.
 *
 * Both used to be static files in /public, maintained by hand beside the routes
 * they describe, and both had already drifted: the sitemap had no lastmod and
 * llms.txt did not exist. Generating them from `LIVE_PAGES` means a page
 * appears in each the moment its `live` flag flips, with the same URL its
 * canonical tag declares, and disappears the same way.
 */

const PAGES_BLOG = "/blog";

/** One page's copy as Markdown: H1, lead, then each section. */
function contentMarkdown(url: string, content: PageContent): string {
  const blocks = content.sections.flatMap((section) => [
    `## ${section.heading}`,
    ...section.blocks.map(blockMarkdown),
  ]);
  const facts = content.facts?.length
    ? content.facts.map(({ value, label }) => `- **${value}:** ${label}`).join("\n")
    : "";
  return [`# ${content.h1}`, `Source: ${url}`, ...content.lead.map(toMarkdown), facts, ...blocks]
    .filter(Boolean)
    .join("\n\n");
}

function blockMarkdown(block: Block): string {
  switch (block.kind) {
    case "p":
      return toMarkdown(block.text);
    case "list":
      return block.items.map((i) => `- ${toMarkdown(i)}`).join("\n");
    case "steps":
      return block.items.map((i, n) => `${n + 1}. ${toMarkdown(i)}`).join("\n");
    case "terms":
      return block.items.map(({ term, text }) => `- **${term}:** ${text}`).join("\n");
    case "qa":
      return block.items.map(({ q, a }) => `### ${q}\n\n${toMarkdown(a)}`).join("\n\n");
    case "table":
      return [
        `**${block.caption}**`,
        `| ${block.head.join(" | ")} |`,
        `| ${block.head.map(() => "---").join(" | ")} |`,
        ...block.rows.map((row) => `| ${row.map(toMarkdown).join(" | ")} |`),
      ].join("\n");
    case "figure":
      return "";
    case "contact":
      return `${block.name}: ${block.email}`;
    case "cards":
      return block.items
        .map(({ title, text, href }) =>
          href
            ? `- [${title}](${absoluteUrl(href)}): ${toMarkdown(text)}`
            : `### ${title}\n\n${toMarkdown(text)}`,
        )
        .join(block.items.some((c) => c.href) ? "\n" : "\n\n");
    case "examples":
      return block.items.map((q) => `- "${q}"`).join("\n");
    case "journey":
      return block.items
        .map(({ title, time, text }, n) => `${n + 1}. **${title}** (${time}). ${toMarkdown(text)}`)
        .join("\n");
  }
}

function postMarkdown(post: BlogPost): string {
  const url = absoluteUrl(postPath(post));
  return [
    `# ${post.h1}`,
    `Source: ${url} · Published ${post.published} · Updated ${post.modified}`,
    `**Short answer:** ${toMarkdown(post.answer)}`,
    `**Key takeaways:**\n${post.takeaways.map((t) => `- ${toMarkdown(t)}`).join("\n")}`,
    ...post.sections.flatMap((s) => [`## ${s.heading}`, ...s.blocks.map(blockMarkdown)]),
    post.faqs.length ? blockMarkdown({ kind: "qa", items: post.faqs }) : "",
    post.sources.length
      ? `## Sources\n\n${post.sources.map((s) => `- ${s.publisher} (${s.year}). [${s.title}](${s.url})`).join("\n")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

/**
 * /llms-full.txt: the complete text of every page whose copy is data, as one
 * clean Markdown document, for engines that ingest a single file rather than
 * crawling. Held pages and sentences linking to them are excluded the same way
 * they are on the site.
 */
export function llmsFullTxt(): string {
  const pages: [string, PageContent][] = [
    [PAGES.howItWorks.path, HOW_IT_WORKS_CONTENT],
    [PAGES.chat.path, CHAT_CONTENT],
    [PAGES.adaptive.path, ADAPTIVE_CONTENT],
    [PAGES.tests.path, TESTS_CONTENT],
    [PAGES.examRevision.path, EXAM_REVISION_CONTENT],
    [PAGES.parents.path, PARENTS_CONTENT],
    [PAGES.faq.path, FAQ_CONTENT],
    [PAGES.glossary.path, GLOSSARY_CONTENT],
    [PAGES.about.path, ABOUT_CONTENT],
  ];
  const docs = [
    ...pages
      .filter(([path]) => isLive(path))
      .map(([path, content]) => contentMarkdown(absoluteUrl(path), content)),
    ...POSTS.map(postMarkdown),
  ];
  return `${llmsTxt()}\n---\n\n${docs.join("\n\n---\n\n")}\n`;
}

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Live, indexable pages only, each with the date its content last changed. */
export function sitemapXml(): string {
  const urls = LIVE_PAGES.map(
    (page) =>
      `  <url>\n    <loc>${escapeXml(absoluteUrl(page.path))}</loc>\n    <lastmod>${page.modified}</lastmod>\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

/**
 * /llms.txt, in the llmstxt.org format: a title, a one-paragraph summary, then
 * curated link lists. The summary and key facts are the content package's
 * Launch Kit wording, restricted to facts on the Fact Sheet.
 */
export function llmsTxt(): string {
  const line = (page: (typeof LIVE_PAGES)[number]) =>
    `- [${page.label}](${absoluteUrl(page.path)}): ${page.summary}`;
  const group = (paths: string[]) =>
    LIVE_PAGES.filter((p) => paths.includes(p.path))
      .map(line)
      .join("\n");

  return `# StudyMate AI by SuperMIA

> StudyMate AI is an AI tutor for school students from SuperMIA (Botfinity Inc., Grapevine, Texas). Students choose their country, board and class once, and the matching syllabus textbooks are already on their bookshelf. StudyMate answers questions from the chapter that is open, in plain language, with the page cited; adapts practice across three levels (know, use, reason); generates practice papers from any chapter with instant, detailed evaluation; and shows chapter-level progress with a weakest-first list of what to study next. New accounts start with 5,000 free credits, no card required.

## Product

${group(["/", "/how-it-works", "/faq"])}
- [Start free / Sign in](https://app.studymate.supermia.ai): the StudyMate web app.

## Features

${group(["/features/chat-with-your-textbook", "/features/adaptive-tutoring", "/features/practice-tests", "/exam-revision", "/for-parents"])}

## Study guides

${group([PAGES_BLOG, "/glossary"])}
${POST_PAGES.filter((p) => p.live)
  .map(line)
  .join("\n")}

## Key facts

- No uploads: textbooks are preloaded by country, board and class.
- Answers come from the open chapter and cite the page; like any AI, answers can occasionally be wrong, so the page is shown for checking.
- Explains, then tests: it does not hand over finished answers.
- Setup takes about five minutes; nothing to install.
- AI model providers named in the privacy policy: OpenAI and Anthropic; storage on AWS.
- Contact: hello@supermia.ai

## Company

${group(["/about"])}
- [SuperMIA](https://supermia.ai/)
- [StudyMate AI on SuperMIA](https://supermia.ai/ai-studymate/)

## Legal

${group(["/privacy", "/terms"])}
`;
}
