import type { ContentSection, Faq, Link } from "@/content/types";

/**
 * Shape of a blog post.
 *
 * Every field maps to something a search or answer engine extracts, which is
 * why a post is data rather than free-form JSX:
 *
 *   answer      the 40-60 word passage under the H1, written to stand alone
 *   takeaways   3-5 complete sentences, each quotable on its own
 *   sections    H2s phrased as the questions readers ask, answer first
 *   sources     primary research cited by name and linked; feeds `citation`
 *   faqs        visible questions (FAQPage markup stays on /faq only)
 *
 * Posts are rendered by `BlogPostPage` and their BlogPosting schema is built
 * from these same fields, so the two cannot drift.
 */

export type CategoryKey = "study-skills" | "exam-prep" | "for-parents";

export interface Source {
  /** Title of the paper, book or page, as published. */
  title: string;
  /** Authors or publishing organisation, e.g. "Roediger & Karpicke". */
  publisher: string;
  year: string;
  /** Prefer a DOI link (https://doi.org/...). */
  url: string;
}

export interface BlogPost {
  /** URL is /blog/{slug}. */
  slug: string;
  category: CategoryKey;
  /** <title>; 60 characters or fewer. */
  title: string;
  /** Meta description; 70-155 characters. */
  description: string;
  h1: string;
  /** Short name for cards and breadcrumbs. */
  label: string;
  /** One sentence for post cards. */
  excerpt: string;
  /** ISO dates. */
  published: string;
  modified: string;
  /** The answer box directly under the H1. 40-60 words, no pronouns that lean on other text. */
  answer: string;
  /** 3-5 standalone sentences. */
  takeaways: string[];
  sections: ContentSection[];
  /** 3-4 visible questions, phrased differently from /faq. */
  faqs: Faq[];
  sources: Source[];
  /** 2-3 related post slugs. */
  related: string[];
  /** The post's next step, addressed to an adult. */
  cta: { heading: string; text: string; link: Link };
}

export interface Category {
  key: CategoryKey;
  label: string;
  title: string;
  description: string;
  h1: string;
  /** Unique 80-150 word intro for the category page. */
  intro: string;
}
