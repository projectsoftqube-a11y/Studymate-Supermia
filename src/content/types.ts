/**
 * Shape of a marketing page's copy.
 *
 * Same reasoning as `content/legal.ts`: copy is data, rendered by one component
 * (`ContentPage`), so every inner page shares one layout and one set of fixes,
 * and the structured data is generated from the exact strings on the page
 * rather than retyped beside them.
 *
 * Inline markup is a small, fixed subset (see `lib/rich-text`):
 *   **bold**        lead-in labels on list items
 *   [text](href)    links; internal ones are dropped with their whole sentence
 *                   while the target page is not live
 */

export interface Link {
  label: string;
  href: string;
}

export interface Faq {
  q: string;
  a: string;
}

export type Block =
  /** Body paragraph. */
  | { kind: "p"; text: string }
  /** Bulleted list. Items commonly open with a `**Label.**` lead-in. */
  | { kind: "list"; items: string[] }
  /** Numbered list, for sequences the reader follows in order. */
  | { kind: "steps"; items: string[] }
  /** Term and definition pairs, rendered as a real <dl>. */
  | { kind: "terms"; items: { term: string; text: string }[] }
  /** Questions and answers, each answer in the HTML from first load. */
  | { kind: "qa"; items: Faq[] }
  /**
   * A real data table (<table>, <thead>, <th scope>). Comparisons are the
   * content answer engines quote most reliably, and only a genuine table
   * parses as one. Cells use the same inline markup as paragraphs.
   */
  | { kind: "table"; caption: string; head: string[]; rows: string[][] }
  /** Illustration with descriptive alt text. */
  | { kind: "figure"; src: string; alt: string; width: number; height: number; caption?: string }
  /** Contact card with a live mailto. */
  | { kind: "contact"; name: string; email: string }
  /**
   * A grid of titled cards; each title is an <h3>. With `href` a card becomes
   * one link (related pages). `icon` names an entry in the page's icon map.
   */
  | { kind: "cards"; items: Card[] }
  /** Example questions a reader could ask, shown as quoted chips. */
  | { kind: "examples"; items: string[] }
  /** A numbered journey: illustrated steps on a timeline, each step an <h3>. */
  | { kind: "journey"; items: JourneyStep[] };

export interface JourneyStep {
  title: string;
  /** Short time or cadence chip, e.g. "About 1 minute". */
  time: string;
  text: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

export interface Card {
  title: string;
  text: string;
  icon?: IconKey;
  href?: string;
}

/** Icons a card may use, mapped to components in ContentPage. */
export type IconKey =
  | "book"
  | "books"
  | "message"
  | "page"
  | "clock"
  | "student"
  | "parent"
  | "exam"
  | "learner"
  | "search"
  | "layers"
  | "gauge"
  | "list"
  | "chart"
  | "check"
  | "lightbulb"
  | "wand"
  | "route"
  | "target"
  | "repeat";

export interface ContentSection {
  /** Anchor target, and the jump-list link. */
  id: string;
  /** Rendered as the section's <h2>. */
  heading: string;
  /** Small kicker above the heading (wide and dark layouts). */
  eyebrow?: string;
  /**
   * split (default): heading on one side, content on the other.
   * wide: heading and first paragraph centred, then blocks full width.
   * dark: wide, on a forest panel.
   */
  layout?: "split" | "wide" | "dark";
  blocks: Block[];
}

/** One figure in the strip under the masthead: a short value and its label. */
export interface Fact {
  value: string;
  label: string;
}

export interface PageContent {
  /** Small caps line above the <h1>. */
  eyebrow: string;
  h1: string;
  /**
   * The closing words of the <h1>, set in the handwritten accent face like the
   * homepage headings. Must be the end of `h1`. Without it, a "Title: rest"
   * <h1> accents everything after the colon.
   */
  h1Accent?: string;
  /**
   * The paragraphs directly under the <h1>. The first one answers the page's
   * core question on its own, in a sentence of the form "X is ...", because that
   * is the passage a search or answer engine lifts.
   */
  lead: string[];
  primaryCta: Link;
  secondaryCta?: Link;
  /** Render a jump list of the sections (used where there are many). */
  toc?: boolean;
  /** Key facts strip under the masthead. Fact Sheet figures only. */
  facts?: Fact[];
  sections: ContentSection[];
  closing: {
    heading: string;
    text: string;
    primary: Link;
    secondary?: Link;
  };
}
