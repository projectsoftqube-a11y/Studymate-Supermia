import { INDEX_THRESHOLD, POSTS, postPath } from "@/content/blog";

/**
 * Every public page on the site, in one place.
 *
 * This is the single source the rest of the SEO surface is derived from, so the
 * pieces cannot disagree with each other:
 *
 *   route <head>     title, description, canonical, robots and the WebPage node
 *   /sitemap.xml     every entry with `live: true`, with `modified` as lastmod
 *   /llms.txt        the same set, with `summary` as the one-line description
 *   header / footer  a menu item renders only when its page is live
 *   inline links     a sentence linking to a page that is not live is dropped
 *                    rather than shipped as a link to a 404 (see `isLive`)
 *
 * The rule from the content package: a page enters the menu, the sitemap and
 * other pages' copy only on the day it is live. Flipping `live` is the whole
 * launch; nothing else has to be remembered.
 *
 * Titles and descriptions are the approved values from the SEO content package
 * (23 Oct 2026). `modified` is the date the page's content last changed, not the
 * build date, so the sitemap's lastmod means something to a crawler.
 */

/**
 * /for-parents is written and built, but the package holds it until SuperMIA
 * answers who creates a student account, the minimum age, how parental consent
 * works and whether parents can see progress from their own account (Fact Sheet
 * questions 4, 5 and 9).
 *
 * While this is `false` the page still renders at its URL, but it is noindex,
 * absent from the sitemap, llms.txt, header and footer, and every sentence
 * elsewhere that links to it is left out. Set it to `true` on launch day.
 */
export const FOR_PARENTS_LIVE = false;

export interface SitePage {
  path: string;
  /** `<title>`, og:title and the WebPage `name`. */
  title: string;
  /** Meta description, og:description and the WebPage `description`. */
  description: string;
  /** Short name for breadcrumbs, menus and link lists. */
  label: string;
  /** One line describing the page, used by /llms.txt. */
  summary: string;
  /** ISO date the content last changed. Feeds lastmod and `dateModified`. */
  modified: string;
  /** False keeps the page noindex and out of every list and link above. */
  live: boolean;
  /** Breadcrumb steps between Home and this page, outermost first. */
  trail?: readonly { label: string; href: string }[];
}

/** Where the Features breadcrumb points until a /features hub exists. */
const FEATURES_TRAIL = [{ label: "Features", href: "/#problem" }] as const;

export const PAGES = {
  home: {
    path: "/",
    title: "StudyMate AI: An AI Tutor for Students' Own Textbooks",
    description:
      "StudyMate AI is an AI tutor for students that answers from their own textbooks, adapts practice to their level and shows which chapters need work.",
    label: "Home",
    summary: "AI tutor for students that answers from their own textbooks.",
    modified: "2026-10-28",
    live: true,
  },
  chat: {
    path: "/features/chat-with-your-textbook",
    title: "Chat With Your Textbook: Page-Cited Answers | StudyMate AI",
    description:
      "Ask any chapter a question and StudyMate AI answers from that chapter of your child's syllabus textbook, in plain language, with the page cited.",
    label: "Chat With Your Textbook",
    summary: "Ask any chapter a question and get an answer from that chapter, with the page cited.",
    modified: "2026-10-28",
    live: true,
    trail: FEATURES_TRAIL,
  },
  adaptive: {
    path: "/features/adaptive-tutoring",
    title: "Adaptive AI Tutoring by Chapter and Level | StudyMate AI",
    description:
      "StudyMate AI adjusts pace and difficulty to what a student already knows, across three levels: knowing a concept, using it and reasoning about it.",
    label: "Adaptive Tutoring",
    summary:
      "Practice that steps up or down with each answer across three levels: know, use, reason.",
    modified: "2026-10-28",
    live: true,
    trail: FEATURES_TRAIL,
  },
  tests: {
    path: "/features/practice-tests",
    title: "Practice Test Generator, Instant Evaluation | StudyMate AI",
    description:
      "Generate a practice paper from any chapter at the level you choose, get instant, detailed evaluation and see which chapters need work next.",
    label: "Practice Tests and Progress",
    summary:
      "Practice papers from any chapter, instant evaluation and a weakest-first list of chapters to study next.",
    modified: "2026-10-28",
    live: true,
    trail: FEATURES_TRAIL,
  },
  examRevision: {
    path: "/exam-revision",
    title: "AI Revision Tool for School and Board Exams | StudyMate AI",
    description:
      "Revise for school and board exams chapter by chapter: practice papers from the textbook, instant evaluation and a weakest-first list of what to study next.",
    label: "Exam Revision",
    summary:
      "Chapter-by-chapter revision for school and board exams, starting with the weakest chapter.",
    modified: "2026-10-28",
    live: true,
  },
  parents: {
    path: "/for-parents",
    title: "An AI Tutor for Your Child's Textbooks | StudyMate AI",
    description:
      "StudyMate AI explains chapters from your child's own textbooks, tests them at their level and shows which chapters need work before the exam.",
    label: "For Parents",
    summary:
      "How StudyMate works for parents: what your child does, what the report shows, how to set it up.",
    modified: "2026-10-28",
    live: FOR_PARENTS_LIVE,
  },
  howItWorks: {
    path: "/how-it-works",
    title: "How StudyMate AI Works: From Sign-Up to Progress Report",
    description:
      "How StudyMate AI works in five steps: create an account, set the syllabus, open the bookshelf, work through a topic, then test and see the gaps.",
    label: "How It Works",
    summary: "The five setup steps, what happens in a session and what the progress report shows.",
    modified: "2026-10-28",
    live: true,
  },
  glossary: {
    path: "/glossary",
    title: "Study Glossary: Learning Terms Explained | StudyMate AI",
    description:
      "Plain definitions of the study and learning terms parents and students meet: active recall, spaced repetition, interleaving, adaptive learning and more.",
    label: "Study Glossary",
    summary: "Plain-language definitions of study and learning terms, with links to the research.",
    modified: "2026-10-28",
    live: true,
  },
  blog: {
    path: "/blog",
    title: "Study Tips for Students and Parents | StudyMate AI Blog",
    description:
      "Practical study guides for school students and parents: how to study a chapter, active recall, practice tests, exam revision and using AI honestly.",
    label: "Blog",
    summary: "Study skills, exam prep and guides for parents.",
    modified: "2026-10-28",
    live: POSTS.length >= INDEX_THRESHOLD,
  },
  faq: {
    path: "/faq",
    title: "StudyMate AI FAQ: Textbooks, Tests, Credits and Privacy",
    description:
      "Answers about StudyMate AI: which textbooks it uses, how the tutoring and tests work, what progress reports show, free credits and student data.",
    label: "FAQ",
    summary: "Textbooks, tutoring, tests, progress reports, credits and data.",
    modified: "2026-10-28",
    live: true,
  },
  about: {
    path: "/about",
    title: "About StudyMate AI | Built by SuperMIA",
    description:
      "StudyMate AI is an AI tutor from SuperMIA that works from students' own textbooks and explains before it tests. Learn who builds it.",
    label: "About",
    summary: "Who builds StudyMate AI, the technology behind it and how to contact the team.",
    modified: "2026-10-29",
    live: true,
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | StudyMate AI",
    description:
      "How StudyMate AI collects, uses and protects account, study and chat data, and how to contact us about your information.",
    label: "Privacy Policy",
    summary: "What account, study and chat data is collected and who processes it.",
    modified: "2026-08-10",
    live: true,
  },
  terms: {
    /* Titled "Security Policy" until full Terms of Service are published: the
       live document only covers security and acceptable use, and the package
       reserves "Terms of Service" for the complete text (06 Legal brief). */
    path: "/terms",
    title: "Security Policy | StudyMate AI",
    description:
      "StudyMate AI's security and service terms: account and sign-in security, acceptable use, the limits of AI-generated content and account suspension.",
    label: "Terms",
    summary: "Account security, acceptable use and the limits of AI-generated content.",
    modified: "2026-08-10",
    live: true,
  },
} as const satisfies Record<string, SitePage>;

export type PageKey = keyof typeof PAGES;

const BLOG_TRAIL = [{ label: "Blog", href: "/blog" }] as const;

/** One registry entry per post, so posts follow every rule above. */
export const POST_PAGES: readonly SitePage[] = POSTS.map((post) => ({
  path: postPath(post),
  title: post.title,
  description: post.description,
  label: post.label,
  summary: post.excerpt,
  modified: post.modified,
  live: true,
  trail: BLOG_TRAIL,
}));

export const ALL_PAGES: readonly SitePage[] = [...Object.values(PAGES), ...POST_PAGES];

/** Registry order is the order pages appear in the sitemap and llms.txt. */
export const LIVE_PAGES: readonly SitePage[] = ALL_PAGES.filter((p) => p.live);

const BY_PATH = new Map<string, SitePage>(ALL_PAGES.map((p) => [p.path, p]));

export const pageByPath = (path: string) => BY_PATH.get(path);

/**
 * Whether a link target can be shipped.
 *
 * External URLs, mailto links and homepage anchors are always fine. An internal
 * path is fine only if it is a registered page with `live: true`, so a link to
 * /pricing or /blog (planned, not built) is treated exactly like a link to a
 * page that is built but held back.
 */
export function isLive(href: string): boolean {
  if (!href.startsWith("/") || href.startsWith("//")) return true;
  const path = href.split(/[?#]/)[0] || "/";
  return BY_PATH.get(path)?.live ?? false;
}
