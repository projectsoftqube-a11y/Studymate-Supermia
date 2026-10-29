/**
 * ContentPage — the shared shell for every inner marketing page (features,
 * FAQ, parents, exam revision, about, how it works, glossary).
 *
 * Its own design, not a second homepage hero:
 *
 *   masthead   an inset panel in one centred column: a kicker, the <h1>
 *              revealed word by word, one answer sentence and the buttons,
 *              then the key facts along its foot
 *   body       full-width bands on the 1520px measure, alternating white and
 *              page wash; each a split with the section's outlined number and
 *              heading on one side and its content on the other, centred,
 *              flipping sides section to section
 *   closing    the dark panel the homepage ends on
 *
 * Crawlability rules this follows, from the content package:
 *   - every word is in the server HTML at full opacity; motion is applied on
 *     the client after hydration (`useInnerPageMotion`), and FAQ answers sit in
 *     <details> elements, which are in the document whether open or closed
 *   - exactly one <h1>; sections are <h2>; questions are <h3>
 *   - every CTA is a real <a href>
 *
 * The first lead paragraph is the page's answer block: a self-contained
 * definition directly under the <h1>, set larger than body copy.
 */

import { useId, useRef, type ReactNode } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  CircleCheck,
  Clock,
  FileText,
  Gauge,
  GraduationCap,
  Layers,
  Library,
  Lightbulb,
  LineChart,
  ListChecks,
  Mail,
  MessageCircleQuestion,
  Plus,
  NotebookPen,
  Repeat,
  Route,
  Search,
  ShieldCheck,
  Target,
  UserRound,
  Users,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useInnerPageMotion } from "@/hooks/use-inner-page-motion";
import { SiteHeader } from "@/components/sections/SiteHeader";
import Footer from "@/components/sections/Footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RichText } from "@/components/content/RichText";
import { hasLiveText } from "@/lib/rich-text";
import { APP_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";
import { formatDate } from "@/lib/dates";
import type { SitePage } from "@/content/pages";
import type { Block, Faq, IconKey, JourneyStep, Link, PageContent } from "@/content/types";

const ICONS: Record<IconKey, LucideIcon> = {
  book: BookOpen,
  books: Library,
  message: MessageCircleQuestion,
  page: FileText,
  clock: Clock,
  student: NotebookPen,
  parent: Users,
  exam: GraduationCap,
  learner: UserRound,
  search: Search,
  layers: Layers,
  gauge: Gauge,
  list: ListChecks,
  chart: LineChart,
  check: CircleCheck,
  lightbulb: Lightbulb,
  wand: Wand2,
  route: Route,
  target: Target,
  repeat: Repeat,
};

/** Splits a `**Lead-in.** rest` item into its bold title and the rest. */
function splitLead(text: string): { title: string | null; rest: string } {
  const m = text.match(/^\*\*(.+?)\*\*\s*(.*)$/s);
  return m ? { title: m[1].replace(/\.$/, ""), rest: m[2] } : { title: null, rest: text };
}

/** External links open in a new tab; internal links and anchors do not. */
const linkProps = (href: string) => (href.startsWith("http") ? EXTERNAL_LINK_PROPS : {});

const BODY = "text-[15.5px] leading-[1.8] text-forest-950/75 sm:text-[16.5px]";

/** Raised white card, the surface every section and rail panel sits on. */
const CARD =
  "rounded-[1.5rem] bg-white ring-1 ring-inset ring-forest-950/[0.07] sm:rounded-[1.75rem]";
const CARD_SHADOW = "0 1px 2px rgba(16,40,28,0.04), 0 30px 60px -38px rgba(16,40,28,0.3)";

/** Steps across a full-width section: one card per step, numbered, with the
 * bold lead-in as the step's <h3>. */
function WideSteps({ items, onWhite }: { items: string[]; onWhite: boolean }) {
  const steps = items.filter(hasLiveText).map(splitLead);
  return (
    <ol
      className={`mt-10 grid grid-cols-1 gap-4 ${
        steps.length === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"
      }`}
    >
      {steps.map(({ title, rest }, i) => (
        <li
          key={i}
          className={`relative overflow-hidden rounded-[1.5rem] p-6 ring-1 ring-inset sm:p-8 ${
            onWhite ? "bg-forest-500/[0.06] ring-forest-700/15" : "bg-white ring-forest-950/[0.07]"
          }`}
          style={onWhite ? undefined : { boxShadow: CARD_SHADOW }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-6 font-display text-[7rem] font-extrabold leading-none tracking-[-0.06em] text-forest-500/[0.08]"
          >
            {i + 1}
          </span>
          <span
            aria-hidden
            className="relative grid h-10 w-10 place-items-center rounded-full bg-forest-950 font-numeric text-[14px] font-extrabold text-forest-300"
          >
            {i + 1}
          </span>
          {title && (
            <h3 className="relative mt-6 font-display text-[1.25rem] font-extrabold leading-snug tracking-[-0.02em] text-forest-950">
              {title}
            </h3>
          )}
          <p className={`relative mt-2.5 ${BODY}`}>
            <RichText text={rest} />
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Questions and answers as accordion cards.
 *
 * <details>, not a JS accordion: every answer is in the HTML whether its row
 * is open or shut, so crawlers and answer engines read them all without
 * running a script. A shared `name` makes the group exclusive natively (one
 * open at a time, across both columns), with an `onToggle` fallback for
 * browsers that predate it. `.faq-item` (styles.css) slides each panel open
 * and shut.
 *
 * `columns={2}` splits the list into two independent columns, so opening a
 * card never stretches the card beside it.
 */
function QaList({
  items,
  onWhite = false,
  columns = 1,
}: {
  items: Faq[];
  onWhite?: boolean;
  columns?: 1 | 2;
}) {
  const group = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const half = Math.ceil(items.length / 2);
  const cols = columns === 2 ? [items.slice(0, half), items.slice(half)] : [items];

  const item = ({ q, a }: Faq, n: number) => (
    <details
      key={q}
      name={group}
      onToggle={(e) => {
        const el = e.currentTarget;
        if (!el.open) return;
        listRef.current?.querySelectorAll("details").forEach((d) => {
          if (d !== el) d.open = false;
        });
      }}
      className={`faq-item group relative overflow-hidden rounded-[1.35rem] ring-1 ring-inset transition-[background-color,box-shadow] duration-500 open:bg-forest-950 open:shadow-[0_30px_60px_-30px_rgba(6,46,29,0.65)] open:ring-forest-950 [&_summary::-webkit-details-marker]:hidden ${
        onWhite
          ? "bg-forest-500/[0.05] ring-forest-700/12"
          : "bg-white ring-forest-950/[0.07] shadow-[0_1px_2px_rgba(16,40,28,0.04),0_18px_40px_-30px_rgba(16,40,28,0.3)]"
      }`}
    >
      {/* Soft bloom inside the open card */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full opacity-0 blur-[70px] transition-opacity duration-700 group-open:opacity-50"
        style={{ background: "var(--forest-500)" }}
      />
      <summary className="relative flex cursor-pointer list-none items-center gap-4 px-5 py-5 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest-500 sm:px-6 sm:py-6">
        <span
          aria-hidden
          className="hidden h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-500/10 font-numeric min-[400px]:grid text-[12px] font-extrabold tabular-nums text-forest-700 transition-colors duration-500 group-open:bg-forest-400/15 group-open:text-forest-300"
        >
          {String(n + 1).padStart(2, "0")}
        </span>
        <h3 className="flex-1 font-display text-[1.02rem] font-extrabold leading-snug tracking-[-0.02em] text-forest-950 transition-colors duration-500 group-open:text-white sm:text-[1.1rem]">
          {q}
        </h3>
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-950/[0.05] text-forest-950/60 ring-1 ring-inset ring-forest-950/10 transition-all duration-500 group-hover:bg-forest-950/10 group-open:rotate-[135deg] group-open:bg-forest-400 group-open:text-forest-950 group-open:ring-forest-400"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </summary>
      <p className="faq-answer relative px-5 pb-6 text-[15px] leading-[1.75] text-white/70 sm:pb-7 sm:pl-[4.75rem] sm:pr-16 sm:text-[15.5px] [&_a]:font-bold [&_a]:text-forest-300">
        <RichText text={a} />
      </p>
    </details>
  );

  return (
    <div
      ref={listRef}
      className={`mt-6 grid grid-cols-1 items-start gap-3 sm:gap-4 ${
        columns === 2 ? "lg:grid-cols-2" : ""
      }`}
    >
      {cols.map((col, c) => (
        <div key={c} className="grid gap-3 sm:gap-4">
          {col.map((faq, i) => item(faq, c * half + i))}
        </div>
      ))}
    </div>
  );
}

/**
 * Illustrated steps on a timeline, for a dark section. A rail runs down the
 * middle (down the left edge on small screens) with a numbered node per step;
 * the image and the copy sit either side, swapping sides step to step.
 * `.ip-journey-fill` is the lit part of the rail, scrubbed by scroll in
 * `useInnerPageMotion`; without script it shows the plain rail.
 */
function Journey({ items }: { items: JourneyStep[] }) {
  return (
    <ol className="ip-journey relative mt-14 sm:mt-20">
      <span
        aria-hidden
        className="absolute bottom-0 left-5 top-0 w-px bg-white/10 lg:left-1/2 lg:-translate-x-1/2"
      />
      <span
        aria-hidden
        className="ip-journey-fill absolute bottom-0 left-5 top-0 w-[2px] origin-top -translate-x-[0.5px] rounded-full bg-gradient-to-b from-forest-300 via-forest-400 to-forest-500 lg:left-1/2 lg:-translate-x-1/2"
        style={{
          boxShadow: "0 0 18px 1px color-mix(in oklab, var(--forest-400) 60%, transparent)",
        }}
      />
      {items.map((step, i) => {
        const flip = i % 2 === 1;
        return (
          <li
            key={step.title}
            className="ip-reveal relative grid grid-cols-1 items-center gap-6 pb-16 pl-14 last:pb-0 sm:pb-24 lg:grid-cols-2 lg:gap-28 lg:pl-0"
          >
            {/* Node on the rail */}
            <span
              aria-hidden
              className="absolute left-5 top-0 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full bg-forest-950 font-numeric text-[15px] font-extrabold text-forest-300 ring-2 ring-forest-400/70 lg:left-1/2 lg:top-1/2 lg:h-14 lg:w-14 lg:-translate-y-1/2 lg:text-[18px]"
              style={{
                boxShadow:
                  "0 0 0 8px color-mix(in oklab, var(--forest-950) 92%, transparent), 0 0 30px color-mix(in oklab, var(--forest-400) 45%, transparent)",
              }}
            >
              {i + 1}
            </span>

            <figure className={flip ? "lg:order-2" : ""}>
              <div
                className="group/img relative overflow-hidden rounded-[1.5rem] ring-1 ring-inset ring-white/10"
                style={{ boxShadow: "0 40px 80px -40px rgba(0,0,0,0.7)" }}
              >
                <img
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10"
                />
              </div>
            </figure>

            <div
              className={`flex flex-col ${flip ? "lg:order-1 lg:items-end lg:text-right" : "lg:items-start"}`}
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-forest-400/15 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-forest-300 ring-1 ring-inset ring-forest-300/20">
                <Clock aria-hidden className="h-3.5 w-3.5" />
                {step.time}
              </span>
              <h3 className="mt-5 text-balance font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                <span className="mr-2 text-forest-400">{String(i + 1).padStart(2, "0")}.</span>
                {step.title}
              </h3>
              <p className="mt-4 max-w-md text-pretty text-[16px] leading-[1.75] text-white/70 sm:text-[16.5px] [&_a]:font-bold [&_a]:text-forest-300">
                <RichText text={step.text} />
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Closing panel shared by every inner page and the blog.
 *
 * Split on a forest panel: the heading, copy and buttons on the left, with a
 * handwritten "it's free" note pointing at the primary button; a glass card
 * of the three setup steps on the right, over soft orbit rings; and a strip of
 * three facts along the foot. Every figure is from the Fact Sheet.
 */
const CLOSING_STEPS = [
  { title: "Create an account", time: "About 30 seconds" },
  { title: "Choose the board and class", time: "About 1 minute" },
  { title: "Open the hardest chapter", time: "Ask it anything" },
] as const;

const CLOSING_FACTS = [
  { label: "Page cited on every answer", Icon: FileText },
  { label: "Explains before it tests", Icon: Lightbulb },
  { label: "Nothing to install", Icon: CircleCheck },
] as const;

export function ClosingPanel({
  heading,
  text,
  primary,
  secondary,
  note,
}: {
  heading: string;
  text: string;
  primary: Link;
  secondary?: Link;
  /** Optional extra line under the copy, e.g. a link to the FAQ. */
  note?: ReactNode;
}) {
  return (
    <section className="relative isolate px-2 pb-2 sm:px-3 sm:pb-3">
      <div
        className="ip-reveal relative overflow-clip rounded-[1.75rem] sm:rounded-[2.25rem]"
        style={{
          background:
            "radial-gradient(90% 120% at 0% 0%, var(--forest-800), var(--forest-950) 60%)",
        }}
      >
        {/* Dot grid, emerald bloom and orbit rings */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.13) 1px, transparent 0)",
            backgroundSize: "26px 26px",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 70% at 20% 30%, #000 10%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 60% 70% at 20% 30%, #000 10%, transparent 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--forest-500) 45%, transparent), transparent 70%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-1/2 hidden -translate-y-1/2 lg:block"
        >
          {[30, 42, 54].map((size) => (
            <span
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
              style={{ width: `${size}rem`, height: `${size}rem` }}
            />
          ))}
        </span>

        <div className="relative mx-auto grid max-w-site grid-cols-1 items-center gap-12 px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-12 lg:gap-16 lg:px-14 lg:pb-12 lg:pt-24">
          {/* ---- copy ---- */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-forest-300 ring-1 ring-inset ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-300" />
              Your turn
            </p>
            <h2 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
              {heading}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-white/70 sm:text-[1.125rem]">
              <RichText text={text} />
            </p>
            {note && <p className="mt-3 max-w-xl text-[15px] text-white/60">{note}</p>}

            <div className="relative mt-9 w-fit">
              <CtaPair primary={primary} secondary={secondary} />
              {/* A teacher's margin note pointing at the button */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-9 left-6 hidden items-end gap-1 sm:flex"
              >
                <span className="font-hand -rotate-6 text-[1.35rem] font-bold leading-none text-forest-300">
                  it&apos;s free!
                </span>
                <svg
                  width="34"
                  height="26"
                  viewBox="0 0 34 26"
                  fill="none"
                  className="text-forest-300"
                >
                  <path
                    d="M2 3c9 1 18 6 23 16m0 0-6-1m6 1 1-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <OfferNote className="mt-5" />
          </div>

          {/* ---- setup card ---- */}
          <div className="lg:col-span-5">
            <div
              className="relative mx-auto max-w-md rounded-[1.75rem] bg-white/[0.06] p-6 ring-1 ring-inset ring-white/12 backdrop-blur-md sm:p-7"
              style={{ boxShadow: "0 40px 80px -40px rgba(0,0,0,0.6)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-[1.15rem] font-extrabold tracking-[-0.02em] text-white">
                  Get started in 3 steps
                </p>
                <span className="rounded-full bg-forest-400 px-2.5 py-1 text-[11px] font-extrabold text-forest-950">
                  ~5 min
                </span>
              </div>
              <ol className="relative mt-5">
                {/* Rail through the centres of the 36px circles, behind them */}
                <span
                  aria-hidden
                  className="absolute bottom-7 left-[18px] top-7 w-px -translate-x-1/2 bg-gradient-to-b from-forest-300/70 via-forest-300/40 to-forest-300/10"
                />
                {CLOSING_STEPS.map(({ title, time }, i) => (
                  <li
                    key={title}
                    className="relative flex items-center gap-4 border-b border-white/[0.07] py-4 last:border-b-0"
                  >
                    <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-950 font-numeric text-[13px] font-extrabold text-forest-300 ring-2 ring-forest-400/60">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15.5px] font-bold leading-snug text-white">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-[13px] font-semibold text-white/50">
                        {time}
                      </span>
                    </span>
                    <CircleCheck aria-hidden className="h-4 w-4 shrink-0 text-forest-400/70" />
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-forest-400/10 px-4 py-4 ring-1 ring-inset ring-forest-300/20">
                <span className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.04em] text-forest-300">
                  5,000
                </span>
                <span className="text-[13.5px] font-semibold leading-snug text-white/75">
                  free credits for every new account. No card required.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- facts strip ---- */}
        <div className="relative mx-auto max-w-site px-5 pb-8 sm:px-8 lg:px-14 lg:pb-10">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            {CLOSING_FACTS.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-[14px] font-semibold text-white/65"
              >
                <Icon aria-hidden className="h-4 w-4 text-forest-300" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * One block of section copy.
 *   lead   the first paragraph of a split section, set larger as its opening
 *   wide   the block spans a full-width section, so grids can go four across
 *   dark   the block sits on a forest panel
 *   onWhite  the section is a white band; cards switch to a tinted surface
 */
export function Block({
  block,
  lead = false,
  wide = false,
  dark = false,
  onWhite = false,
}: {
  block: Block;
  lead?: boolean;
  wide?: boolean;
  dark?: boolean;
  /** The section is a white band, so cards take a tinted surface to stand off it. */
  onWhite?: boolean;
}) {
  switch (block.kind) {
    case "p":
      if (!hasLiveText(block.text)) return null;
      return (
        <p
          className={`max-w-[70ch] ${
            lead
              ? "text-pretty font-display text-[1.125rem] font-semibold leading-[1.55] tracking-[-0.01em] text-forest-950/85 sm:text-[1.4rem]"
              : dark
                ? "mt-5 text-[15.5px] leading-[1.8] text-white/70 sm:text-[16.5px] [&_a]:text-forest-300"
                : `mt-5 ${BODY}`
          } ${wide ? "mx-auto" : ""}`}
        >
          <RichText text={block.text} />
        </p>
      );

    case "list":
    case "steps": {
      if (block.kind === "steps" && wide)
        return <WideSteps items={block.items} onWhite={onWhite} />;
      const ordered = block.kind === "steps";
      const List = ordered ? "ol" : "ul";
      return (
        <List className="mt-6 grid max-w-[70ch] gap-2.5">
          {block.items.filter(hasLiveText).map((item, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-2xl bg-forest-500/[0.05] px-4 py-3.5 ring-1 ring-inset ring-forest-700/[0.08] sm:px-5"
            >
              {ordered ? (
                <span
                  aria-hidden
                  className="mt-[0.2em] grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-950 font-numeric text-[12px] font-extrabold text-white"
                >
                  {i + 1}
                </span>
              ) : (
                <span
                  aria-hidden
                  className="mt-[0.55em] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-forest-500/20"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
                </span>
              )}
              <span className={BODY}>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </List>
      );
    }

    case "terms":
      return (
        <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {block.items.map(({ term, text }, i) => (
            <div
              key={term}
              className="rounded-2xl bg-forest-500/[0.06] px-5 py-4 ring-1 ring-inset ring-forest-700/10"
            >
              <dt className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
                {term}
                <span aria-hidden className="font-numeric text-forest-950/25">
                  0{i + 1}
                </span>
              </dt>
              <dd className="mt-2 text-[15px] font-bold leading-snug text-forest-950">{text}</dd>
            </div>
          ))}
        </dl>
      );

    case "qa":
      return <QaList items={block.items} onWhite={onWhite} columns={wide ? 2 : 1} />;

    case "table": {
      /* A comparison table (empty first header) highlights the StudyMate
         column, the second one. */
      const highlight = block.head[0] === "";
      return (
        /* The wrapper scrolls on narrow screens instead of squeezing columns;
           `tabIndex` makes that scroll region reachable by keyboard. */
        <div className="mt-10">
          {/* The caption, shown above the scroll area so it is never cut off,
              with a swipe hint on screens where the table scrolls sideways. */}
          <p
            aria-hidden
            className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 text-[12px] font-bold uppercase tracking-[0.14em] text-forest-700"
          >
            {block.caption}
            <span className="font-semibold normal-case tracking-normal text-forest-950/45 md:hidden">
              Swipe to compare →
            </span>
          </p>
          <div
            tabIndex={0}
            role="region"
            aria-label={block.caption}
            className="max-w-full overflow-x-auto rounded-[1.5rem] bg-white ring-1 ring-inset ring-forest-950/[0.08] focus-visible:outline-2 focus-visible:outline-forest-500"
            style={{
              boxShadow: "0 1px 2px rgba(16,40,28,0.05), 0 30px 60px -32px rgba(16,40,28,0.35)",
            }}
          >
            <table className="w-full min-w-[30rem] border-collapse text-left text-[14px] sm:min-w-[34rem] sm:text-[14.5px]">
              <caption className="sr-only">{block.caption}</caption>
              <thead>
                <tr className="border-b border-forest-950/10 bg-forest-500/[0.07]">
                  {block.head.map((cell, j) => (
                    <th
                      key={cell || j}
                      scope="col"
                      className={`px-5 py-3.5 font-extrabold ${
                        highlight && j === 1 ? "bg-forest-950 text-white" : "text-forest-950"
                      }`}
                    >
                      {cell || <span className="sr-only">Feature</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-forest-950/[0.07] transition-colors duration-300 last:border-0 hover:bg-forest-500/[0.04]"
                  >
                    {row.map((cell, j) => {
                      const Cell = j === 0 ? "th" : "td";
                      return (
                        <Cell
                          key={j}
                          {...(j === 0 ? { scope: "row" } : {})}
                          className={`px-5 py-3.5 align-top leading-relaxed ${
                            j === 0
                              ? "font-bold text-forest-950"
                              : highlight && j === 1
                                ? "bg-forest-500/[0.07] font-semibold text-forest-950"
                                : "font-normal text-forest-950/70"
                          }`}
                        >
                          <RichText text={cell} />
                        </Cell>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    case "figure":
      return (
        <figure className="mt-8">
          <div
            className="relative overflow-hidden rounded-2xl ring-1 ring-inset ring-forest-950/[0.06]"
            style={{
              background:
                "radial-gradient(90% 90% at 50% 40%, white, color-mix(in oklab, var(--forest-500) 9%, white))",
            }}
          >
            <img
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              loading="lazy"
              decoding="async"
              className="mx-auto h-64 w-full object-contain p-4 mix-blend-multiply sm:h-80"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-[13px] text-forest-950/60">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "contact":
      return (
        <div
          className="mt-6 flex flex-col gap-4 rounded-2xl px-5 py-5 ring-1 ring-inset ring-forest-950/[0.08] sm:flex-row sm:items-center sm:justify-between sm:px-6"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--forest-500) 10%, white), white 70%)",
          }}
        >
          <div className="flex items-start gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-950 text-white">
              <Mail className="h-[17px] w-[17px]" />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-extrabold text-forest-950">{block.name}</p>
              <p className="mt-0.5 break-all text-[14px] font-semibold text-forest-950/60">
                {block.email}
              </p>
            </div>
          </div>
          <a
            href={`mailto:${block.email}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest-950 px-5 py-3 text-[13.5px] font-bold text-white transition-colors duration-300 hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500"
          >
            Email us
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      );

    case "cards": {
      const n = block.items.length;
      const cols = !wide
        ? "sm:grid-cols-2"
        : n === 4
          ? "sm:grid-cols-2 xl:grid-cols-4"
          : n === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-3";
      return (
        <ul className={`mt-10 grid grid-cols-1 gap-4 ${cols}`}>
          {block.items.map(({ title, text, icon, href }) => {
            const Icon = icon ? ICONS[icon] : null;
            const body = (
              <>
                <span className="flex items-start justify-between gap-4">
                  {Icon && (
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 ring-inset ${
                        dark
                          ? "bg-forest-400/15 text-forest-300 ring-forest-300/20"
                          : "bg-forest-500/10 text-forest-700 ring-forest-700/10"
                      }`}
                    >
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                  )}
                  {href && (
                    <ArrowUpRight
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-forest-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </span>
                <h3
                  className={`mt-6 font-display text-[1.2rem] font-extrabold leading-snug tracking-[-0.02em] ${
                    dark ? "text-white" : "text-forest-950"
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`mt-2.5 text-[15px] leading-relaxed ${
                    dark ? "text-white/65 [&_a]:text-forest-300" : "text-forest-950/65"
                  }`}
                >
                  <RichText text={text} />
                </p>
              </>
            );
            const surface = dark
              ? "bg-white/[0.05] ring-white/10"
              : onWhite
                ? "bg-forest-500/[0.06] ring-forest-700/15"
                : "bg-white ring-forest-950/[0.07]";
            return (
              <li key={title}>
                {href ? (
                  <a
                    href={href}
                    className={`group flex h-full flex-col rounded-[1.5rem] p-6 ring-1 ring-inset transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(16,40,28,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 sm:p-7 ${surface}`}
                    style={{ boxShadow: CARD_SHADOW }}
                  >
                    {body}
                  </a>
                ) : (
                  <div
                    className={`flex h-full flex-col rounded-[1.5rem] p-6 ring-1 ring-inset sm:p-7 ${surface}`}
                    style={dark || onWhite ? undefined : { boxShadow: CARD_SHADOW }}
                  >
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      );
    }

    case "journey":
      return <Journey items={block.items} />;

    case "examples":
      return (
        <ul className={`mt-10 flex flex-wrap gap-3 ${wide ? "justify-center" : ""}`}>
          {block.items.map((q) => (
            <li
              key={q}
              className="group flex items-center gap-3 rounded-full bg-forest-500/[0.09] py-2.5 pl-2.5 pr-5 text-[15px] font-semibold text-forest-950 ring-1 ring-inset ring-forest-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-950 hover:text-white hover:ring-forest-950"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest-950 text-forest-300 transition-colors duration-300 group-hover:bg-forest-400 group-hover:text-forest-950">
                <MessageCircleQuestion aria-hidden className="h-4 w-4" />
              </span>
              <q>{q}</q>
            </li>
          ))}
        </ul>
      );
  }
}

/** The offer line every CTA on the site carries, worded once. */
export function OfferNote({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <p
      className={`text-[13px] font-semibold ${light ? "text-forest-950/60" : "text-white/60"} ${className}`}
    >
      <span
        className={`font-numeric font-extrabold ${light ? "text-forest-700" : "text-forest-300"}`}
      >
        5,000
      </span>{" "}
      free credits to start. No card required.
    </p>
  );
}

export function CtaPair({
  primary,
  secondary,
  centered = false,
  tone = "dark",
}: {
  primary: Link;
  secondary?: Link;
  centered?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
        centered ? "items-center sm:justify-center" : "items-start"
      }`}
    >
      <span className="ip-cta">
        <MagneticButton
          as="a"
          href={primary.href}
          {...linkProps(primary.href)}
          variant="solid"
          size="lg"
          roll={false}
        >
          {primary.label}
          <ArrowUpRight className="h-5 w-5" />
        </MagneticButton>
      </span>
      {secondary && (
        <span className="ip-cta">
          <MagneticButton
            as="a"
            href={secondary.href}
            {...linkProps(secondary.href)}
            variant={tone === "light" ? "outline" : "glass"}
            size="lg"
            roll={false}
          >
            {secondary.label}
          </MagneticButton>
        </span>
      )}
    </div>
  );
}

/** Eyebrow between two tapering hairlines, as on the homepage hero. */
export function MastheadEyebrow({ children }: { children: string }) {
  return (
    <span className="flex items-center justify-center gap-4">
      <span
        aria-hidden
        className="h-px w-10 sm:w-16"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-300) 65%, transparent))",
        }}
      />
      <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-300">
        {children}
      </span>
      <span
        aria-hidden
        className="h-px w-10 sm:w-16"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--forest-300) 65%, transparent), transparent)",
        }}
      />
    </span>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ContentPage({ page, content }: { page: SitePage; content: PageContent }) {
  /* Same scroll behaviour as the rest of the site. It also owns in-page anchor
     clicks, so the section links ease to a position clear of the fixed header. */
  useSmoothScroll();
  const rootRef = useRef<HTMLElement>(null);
  useInnerPageMotion(rootRef);

  /* The <h1> in two faces: an explicit accent, else everything after a colon. */
  const accentGiven = content.h1Accent && content.h1.endsWith(content.h1Accent);
  const colon = content.h1.indexOf(": ");
  const h1Accent = accentGiven ? content.h1Accent : colon > 0 ? content.h1.slice(colon + 2) : null;
  const h1Main = accentGiven
    ? content.h1.slice(0, -content.h1Accent!.length).trimEnd()
    : colon > 0
      ? content.h1.slice(0, colon + 1)
      : content.h1;

  return (
    <main ref={rootRef}>
      <SiteHeader />

      {/* ---- masthead ----
          An inset panel in one centred column: a short kicker, the <h1>, one
          answer sentence and the buttons, then the key facts along the panel's foot.
          Its own design, not a second homepage hero. Top padding clears the
          fixed header capsule. */}
      <header id="content" className="relative isolate p-2 sm:p-3">
        <div
          className="ip-masthead relative isolate overflow-hidden rounded-[1.75rem] ring-1 ring-inset ring-forest-950/[0.06] sm:rounded-[2.25rem]"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 0%, color-mix(in oklab, var(--forest-400) 26%, transparent), transparent 75%), radial-gradient(35% 40% at 0% 70%, color-mix(in oklab, var(--forest-300) 22%, transparent), transparent 70%), radial-gradient(35% 40% at 100% 70%, color-mix(in oklab, var(--forest-300) 22%, transparent), transparent 70%), linear-gradient(180deg, white, color-mix(in oklab, var(--forest-500) 5%, white))",
            boxShadow: CARD_SHADOW,
          }}
        >
          {/* Fine grid, centred on the copy and fading out to the edges. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in oklab, var(--forest-700) 9%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--forest-700) 9%, transparent) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              backgroundPosition: "center top",
              WebkitMaskImage:
                "radial-gradient(ellipse 55% 45% at 50% 22%, #000 0%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 55% 45% at 50% 22%, #000 0%, transparent 100%)",
            }}
          />

          <div
            className={`mx-auto max-w-site px-4 pt-28 sm:px-6 sm:pt-36 lg:px-10 lg:pt-40 ${
              content.facts?.length ? "pb-12 sm:pb-16" : "pb-16 sm:pb-24"
            }`}
          >
            {/* ---- copy, centred ---- */}
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <p className="ip-eyebrow inline-flex w-fit items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 text-[11px] font-bold uppercase tracking-[0.12em] text-forest-800 ring-1 sm:tracking-[0.18em] ring-inset ring-forest-700/15 backdrop-blur-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-forest-950 text-forest-300">
                  <ShieldCheck aria-hidden className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {content.eyebrow}
              </p>

              <h1 className="ip-title mt-6 text-balance font-display text-[clamp(1.85rem,5vw,4.1rem)] font-extrabold leading-[1.03] tracking-[-0.045em] text-forest-950">
                {h1Main}
                {h1Accent && (
                  <>
                    {" "}
                    {/* Kalam, the brand's handwritten face, on the closing words,
                        as on the homepage headings. */}
                    <span className="font-hand mt-1 block pr-[0.06em] text-[0.95em] font-bold leading-[1] text-forest-600 sm:text-[1.08em]">
                      {h1Accent}
                    </span>
                  </>
                )}
              </h1>

              <div className="answer-block mt-6 max-w-2xl">
                {content.lead.map((text, i) => (
                  <p
                    key={i}
                    className={`ip-sub text-pretty leading-relaxed text-forest-950/70 ${
                      i === 0 ? "text-[1.0625rem] sm:text-[1.125rem]" : "mt-3 text-[1rem]"
                    }`}
                  >
                    <RichText text={text} />
                  </p>
                ))}
              </div>

              <div className="mt-8">
                <CtaPair
                  primary={content.primaryCta}
                  secondary={content.secondaryCta}
                  tone="light"
                  centered
                />
              </div>

              {/* Offer and freshness on one quiet line. The date is the page's
                  `dateModified` and its sitemap lastmod. */}
              <p className="ip-sub mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] font-semibold text-forest-950/55">
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck aria-hidden className="h-3.5 w-3.5 text-forest-600" />
                  <span>
                    <span className="font-numeric font-extrabold text-forest-950/80">5,000</span>{" "}
                    free credits, no card
                  </span>
                </span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-forest-950/25" />
                <span>
                  Updated{" "}
                  <time dateTime={page.modified} className="font-numeric">
                    {formatDate(page.modified)}
                  </time>
                </span>
              </p>
            </div>
          </div>

          {/* ---- key facts ----
              Fact Sheet figures only, a ruled strip along the panel's foot. */}
          {content.facts && content.facts.length > 0 && (
            <div className="mx-auto max-w-site px-4 pb-4 sm:px-6 sm:pb-6 lg:px-10">
              <dl className="ip-sub grid grid-cols-2 border-t border-forest-950/[0.08] lg:grid-cols-4">
                {content.facts.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className={`flex flex-col-reverse gap-1.5 py-6 pr-4 sm:py-7 ${
                      i % 2 === 1 ? "border-l border-forest-950/[0.08] pl-5 sm:pl-8" : ""
                    } ${i >= 2 ? "border-t border-forest-950/[0.08] lg:border-t-0" : ""} ${
                      i === 2 ? "lg:border-l lg:pl-8" : ""
                    }`}
                  >
                    <dt className="text-[13.5px] font-semibold leading-snug text-forest-950/60">
                      {label}
                    </dt>
                    <dd className="font-display text-[clamp(1.2rem,2.4vw,2rem)] font-extrabold leading-none tracking-[-0.03em] text-forest-950">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </header>

      {/* Section pills below lg, where there is no sidebar. Scrolls sideways
          rather than wrapping into a block. */}
      <nav
        aria-label="Sections on this page"
        className="overflow-x-auto px-4 [scrollbar-width:none] sm:px-6 lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        <ol className="flex w-max gap-2 pb-2">
          {content.sections.map((section, i) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[13px] font-bold text-forest-950/75 ring-1 ring-inset ring-forest-950/[0.08]"
              >
                <span className="font-numeric text-[11px] font-extrabold text-forest-600">
                  {pad(i + 1)}
                </span>
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ---- body ----
          Full-width bands, alternating white and page wash, in three layouts
          chosen per section in the content data:
            split   number and heading on one side, content on the other,
                    centred, flipping sides section to section
            wide    heading and intro centred, then cards, steps, examples or a
                    table across the full measure
            dark    wide, on a forest panel, for the one point a page most
                    needs to land */}
      <div className="pb-6 pt-6 sm:pt-10">
        {(() => {
          let split = 0;
          return content.sections.map((section, i) => {
            const layout = section.layout ?? "split";
            const banded = layout !== "dark" && i % 2 === 0;
            const dark = layout === "dark";

            const shell = (children: ReactNode) => (
              <section
                key={section.id}
                id={section.id}
                /* Native-jump clearance only for reduced motion, where Lenis
                   (which applies its own offset) never starts. */
                className={`motion-reduce:scroll-mt-28 ${banded || dark ? "px-2 sm:px-3" : ""} ${
                  dark ? "py-2 sm:py-3" : ""
                }`}
              >
                <div
                  className={`relative overflow-clip ${
                    banded
                      ? "rounded-[1.75rem] bg-white ring-1 ring-inset ring-forest-950/[0.05] sm:rounded-[2.25rem]"
                      : dark
                        ? "rounded-[1.75rem] sm:rounded-[2.25rem]"
                        : ""
                  }`}
                  style={
                    dark
                      ? {
                          background:
                            "radial-gradient(120% 120% at 0% 0%, var(--forest-800), var(--forest-950) 62%)",
                        }
                      : banded
                        ? { boxShadow: CARD_SHADOW }
                        : undefined
                  }
                >
                  {dark && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
                        backgroundSize: "26px 26px",
                        WebkitMaskImage:
                          "radial-gradient(ellipse 60% 70% at 80% 0%, #000, transparent)",
                        maskImage: "radial-gradient(ellipse 60% 70% at 80% 0%, #000, transparent)",
                      }}
                    />
                  )}
                  <div className="relative mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
                    {children}
                  </div>
                </div>
              </section>
            );

            if (layout === "split") {
              const figure = section.blocks.find((b) => b.kind === "figure");
              const rest = section.blocks.filter((b) => b.kind !== "figure");
              const firstP = rest.findIndex((b) => b.kind === "p");
              const flip = split++ % 2 === 1;
              return shell(
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
                  <div className={`ip-reveal lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                    <span
                      aria-hidden
                      className="block font-display text-[clamp(4.5rem,9vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.06em] text-transparent"
                      style={{
                        WebkitTextStroke:
                          "1.5px color-mix(in oklab, var(--forest-600) 45%, transparent)",
                      }}
                    >
                      {pad(i + 1)}
                    </span>
                    <h2 className="mt-5 text-balance font-display text-[clamp(1.75rem,3.6vw,2.85rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-forest-950">
                      {section.heading}
                    </h2>
                    <span
                      aria-hidden
                      className="mt-6 block h-1 w-16 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, var(--forest-500), var(--forest-300))",
                      }}
                    />
                    {figure && (
                      <div className="max-w-md">
                        <Block block={figure} />
                      </div>
                    )}
                  </div>
                  <div
                    className={`ip-reveal max-w-3xl lg:col-span-7 [&_p]:max-w-none ${
                      flip ? "lg:order-1" : ""
                    }`}
                  >
                    {rest.map((block, j) => (
                      <Block key={j} block={block} lead={j === firstP} />
                    ))}
                  </div>
                </div>,
              );
            }

            /* wide and dark: the first paragraph, when it opens the section,
               is the centred intro under the heading. */
            const [first, ...others] = section.blocks;
            const intro = first?.kind === "p" ? first : null;
            const blocks = intro ? others : section.blocks;
            /* An FAQ section: a header row (heading and intro, with a contact
               card opposite), then the questions as two columns of cards
               across the full measure. */
            if (layout === "wide" && blocks.length > 0 && blocks.every((b) => b.kind === "qa")) {
              const count = blocks.reduce((n, b) => n + (b.kind === "qa" ? b.items.length : 0), 0);
              return shell(
                <>
                  <div className="ip-reveal grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                      {section.eyebrow && (
                        <p className="inline-flex items-center gap-2 rounded-full bg-forest-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-forest-700 ring-1 ring-inset ring-forest-700/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                          {section.eyebrow}
                        </p>
                      )}
                      <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-forest-950">
                        {section.heading}
                      </h2>
                      <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-forest-950/65 sm:text-[1.125rem]">
                        {intro && hasLiveText(intro.text) ? (
                          <RichText text={intro.text} />
                        ) : (
                          <>
                            {count} straight answers to what parents and students ask before they
                            start.
                          </>
                        )}
                      </p>
                    </div>

                    <div
                      className="relative overflow-hidden rounded-[1.5rem] p-5 sm:p-6 lg:col-span-5"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 0% 0%, var(--forest-700), var(--forest-950) 70%)",
                        boxShadow: "0 30px 60px -32px rgba(6,46,29,0.6)",
                      }}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-50 blur-[70px]"
                        style={{ background: "var(--forest-500)" }}
                      />
                      <div className="relative flex items-start gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest-400/15 text-forest-300 ring-1 ring-inset ring-forest-300/20">
                          <Mail aria-hidden className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-[1.15rem] font-extrabold tracking-[-0.02em] text-white">
                            Still have a question?
                          </p>
                          <p className="mt-1 text-[14px] leading-relaxed text-white/65">
                            Email the team, or read the full FAQ on accounts, credits and data.
                          </p>
                        </div>
                      </div>
                      <div className="relative mt-5 flex flex-wrap gap-2.5">
                        <a
                          href="mailto:hello@supermia.ai"
                          className="inline-flex items-center gap-2 rounded-full bg-forest-400 px-4 py-2.5 text-[13.5px] font-extrabold text-forest-950 transition-colors duration-300 hover:bg-forest-300"
                        >
                          <Mail aria-hidden className="h-4 w-4" />
                          hello@supermia.ai
                        </a>
                        <a
                          href="/faq"
                          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13.5px] font-bold text-white ring-1 ring-inset ring-white/20 transition-colors duration-300 hover:bg-white/10"
                        >
                          All FAQs
                          <ArrowUpRight aria-hidden className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="ip-reveal mt-10 sm:mt-14 [&>div]:mt-0">
                    {blocks.map((block, j) => (
                      <Block key={j} block={block} wide onWhite={banded} />
                    ))}
                  </div>
                </>,
              );
            }

            return shell(
              <>
                <div className="ip-reveal mx-auto max-w-3xl text-center">
                  {section.eyebrow && (
                    <p
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ring-1 ring-inset ${
                        dark
                          ? "bg-white/[0.06] text-forest-300 ring-white/10"
                          : "bg-forest-500/10 text-forest-700 ring-forest-700/10"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-forest-300" : "bg-forest-500"}`}
                      />
                      {section.eyebrow}
                    </p>
                  )}
                  <h2
                    className={`mt-5 text-balance font-display text-[clamp(1.85rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.04em] ${
                      dark ? "text-white" : "text-forest-950"
                    }`}
                  >
                    {section.heading}
                  </h2>
                  {intro && hasLiveText(intro.text) && (
                    <p
                      className={`mx-auto mt-5 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed sm:text-[1.125rem] ${
                        dark ? "text-white/70 [&_a]:text-forest-300" : "text-forest-950/65"
                      }`}
                    >
                      <RichText text={intro.text} />
                    </p>
                  )}
                </div>
                <div
                  className={`ip-reveal ${
                    blocks.every((b) => b.kind === "p" || b.kind === "qa")
                      ? "mx-auto max-w-3xl"
                      : ""
                  }`}
                >
                  {blocks.map((block, j) => (
                    <Block key={j} block={block} wide dark={dark} onWhite={banded} />
                  ))}
                </div>
              </>,
            );
          });
        })()}
      </div>

      {/* ---- closing ---- */}
      <ClosingPanel
        heading={content.closing.heading}
        text={content.closing.text}
        primary={content.closing.primary}
        secondary={content.closing.secondary}
      />

      <Footer />
    </main>
  );
}
