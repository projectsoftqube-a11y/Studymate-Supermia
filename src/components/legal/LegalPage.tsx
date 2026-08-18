/**
 * LegalPage — the shared shell for /privacy and /terms.
 *
 * One component renders both documents from the data in `@/content/legal`, so
 * the two can never drift apart: a spacing fix or a type change lands on both,
 * and the table of contents is generated from the same array that renders the
 * body rather than maintained alongside it.
 *
 * Design notes
 * ------------
 * The marketing page opens and closes on a deep forest panel with light sections
 * between, so this uses the same frame: a dark masthead, then the document on a
 * raised white sheet over the page wash. That keeps a legal page recognisably
 * part of the site instead of the unstyled text dump these pages usually are.
 *
 * Long-form legal copy has one real usability problem — finding the clause you
 * came for — so the layout spends its complexity there and nowhere else:
 *
 *   ≥ lg   a sticky table of contents in the left column, tracking the section
 *          currently in view
 *   < lg   the same list collapsed into a <details> disclosure above the body,
 *          closed by default so it costs no vertical space to scroll past
 *
 * There is deliberately no entrance animation. Someone opening a privacy policy
 * is looking for a specific sentence, and making them wait on a reveal to read
 * it is hostile. The page renders in its final state.
 *
 * Measure is capped at ~68 characters (`max-w-[68ch]`) on the body copy. The
 * site container is 1520px, and legal prose set to that width is unreadable.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown, Mail, ShieldCheck } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { SiteHeader } from "@/components/sections/SiteHeader";
import Footer from "@/components/sections/Footer";
import type { LegalBlock, LegalDoc } from "@/content/legal";

/**
 * Renders the `**bold**` / `` `code` `` subset used in the legal copy.
 *
 * A hand-rolled splitter rather than a markdown library: the grammar is two
 * tokens, the input is a fixed set of strings in this repo (never user content),
 * and the output is real React elements — so there is no `dangerouslySetInnerHTML`
 * anywhere in these pages and nothing to sanitise.
 *
 * Unmatched delimiters fall through as literal text rather than throwing, so a
 * stray asterisk in future copy degrades to a visible asterisk instead of a
 * blank page.
 */
function renderInline(text: string): ReactNode[] {
  /* One pass, alternating on either delimiter, so `**bold**` and `` `code` ``
     can appear in the same sentence without nesting rules. */
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.filter(Boolean).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-extrabold text-forest-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded-md bg-forest-950/[0.06] px-1.5 py-0.5 text-[0.9em] font-semibold text-forest-800 ring-1 ring-inset ring-forest-950/[0.07]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** One block of document body. Kept separate so the section map stays readable. */
function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="mt-5 max-w-[68ch] text-[15.5px] leading-[1.75] text-forest-950/75 sm:text-[16.5px]">
          {renderInline(block.text)}
        </p>
      );

    case "h3":
      return (
        <h3 className="mt-9 text-[16px] font-extrabold tracking-[-0.01em] text-forest-950 sm:text-[17.5px]">
          {block.text}
        </h3>
      );

    case "list":
      return (
        <ul className="mt-5 max-w-[68ch] space-y-3.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5">
              {/* A small emerald rule rather than a bullet glyph: the lead-in
                  labels are already bold, and a disc in front of bold text
                  crowds it. `mt-[0.72em]` centres the rule on the first line at
                  either type size instead of pinning it to the box top. */}
              <span
                aria-hidden
                className="mt-[0.72em] h-[2px] w-3 shrink-0 rounded-full bg-forest-500/70"
              />
              <span className="text-[15.5px] leading-[1.75] text-forest-950/75 sm:text-[16.5px]">
                {renderInline(item)}
              </span>
            </li>
          ))}
        </ul>
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
              {/* `break-all`: an address has no spaces to wrap at, so at 320px
                  it would otherwise push the card past the viewport edge. */}
              <p className="mt-0.5 break-all text-[14px] font-semibold text-forest-950/60">
                {block.email}
              </p>
            </div>
          </div>

          <a
            href={`mailto:${block.email}`}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest-950 px-5 py-3 text-[13.5px] font-bold text-white transition-colors duration-300 hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500"
            style={{ boxShadow: "0 10px 24px -12px rgba(16,40,28,0.5)" }}
          >
            Email us
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      );
  }
}

/**
 * Which section owns the viewport, for the table of contents.
 *
 * IntersectionObserver rather than a scroll listener or a ScrollTrigger per
 * section: the browser does the work off the main thread, and it keeps working
 * under Lenis (which moves the real scroll position, not a transform).
 *
 * The root margin pins the detection line near the top of the viewport
 * (-88px clears the fixed header, -70% ignores everything below the upper
 * third), so a heading becomes "current" as it reaches reading position rather
 * than when it first peeks in from the bottom.
 */
function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

/** The shared list of links, rendered once in the sidebar and once on mobile. */
function TableOfContents({
  doc,
  activeId,
  onNavigate,
}: {
  doc: LegalDoc;
  activeId: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ol className="space-y-0.5">
      {doc.sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 ${
                isActive
                  ? "bg-forest-950/[0.055] text-forest-950"
                  : "text-forest-950/60 hover:bg-forest-950/[0.035] hover:text-forest-950"
              }`}
            >
              <span
                className={`font-numeric mt-px shrink-0 text-[11px] font-extrabold tabular-nums transition-colors duration-300 ${
                  isActive ? "text-forest-600" : "text-forest-950/30"
                }`}
              >
                {section.number}
              </span>
              {section.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function LegalPage({ doc, other }: { doc: LegalDoc; other: LegalDoc }) {
  /* Same scroll behaviour as the marketing page, installed once here rather than
     per route. It also owns in-page anchor clicks — without it, the table of
     contents links would jump under the fixed header instead of easing to a
     cleared position. */
  useSmoothScroll();

  const idsRef = useRef(doc.sections.map((s) => s.id));
  const activeId = useActiveSection(idsRef.current);

  /* Mobile disclosure state is lifted so tapping a link can close the sheet —
     leaving it open would hide the heading the reader just jumped to. */
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <main>
      <SiteHeader />

      {/* ---- masthead ----
          Same forest treatment as the hero and the closing panel, so a legal
          page is visibly the same site. Top padding clears the fixed header
          capsule, which is `position: fixed` and does not reserve space. */}
      <header
        /* Vertical rhythm only. The horizontal padding belongs to the inner
           container, not here — see the note on that element. */
        className="relative isolate overflow-clip pb-14 pt-32 sm:pb-20 sm:pt-36"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, var(--forest-800), var(--forest-950) 62%)",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
            backgroundSize: "26px 26px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 20%, #000 10%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 20%, #000 10%, transparent 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 30%, transparent), transparent 70%)",
          }}
        />

        {/* Byte-identical container classes to the document wrapper below, and
            that matters more than it looks: the gutter has to sit INSIDE the
            capped element, not on an ancestor. With the padding outside, the
            1152px cap centres in the padded box and the content starts one
            gutter further in than the sheet below it — a 40px step between the
            <h1> and the table of contents at desktop widths.
            The copy inside is narrowed separately: a container is for alignment,
            a measure is for reading. */}
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          {/* Back to the site, not a breadcrumb trail: the hierarchy is one
              level deep, so "Home / Privacy Policy" would be two labels to say
              one thing. */}
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-[13px] font-bold text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-400"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to StudyMate
          </a>

          <span className="mt-8 flex items-center gap-4">
            <span
              aria-hidden
              className="h-px w-10 sm:w-14"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in oklab, var(--forest-300) 65%, transparent), transparent)",
              }}
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-300">
              {doc.eyebrow}
            </span>
          </span>

          <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,8vw,3.75rem)] font-extrabold leading-[1.03] tracking-[-0.04em] text-white">
            {doc.title}
          </h1>

          <p className="mt-6 max-w-[60ch] text-pretty text-[1rem] leading-relaxed text-white/70 sm:text-[1.0625rem]">
            {doc.intro}
          </p>

          {/* Two facts a reader checks before trusting a legal page: how current
              it is, and how long it is. Both are derived, so neither can go
              stale against the document. */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-500/14 px-3.5 py-2 text-[12.5px] font-bold text-white ring-1 ring-inset ring-forest-400/30">
              <ShieldCheck className="h-[15px] w-[15px] text-forest-300" />
              Last updated{" "}
              <time dateTime={doc.updatedISO} className="font-numeric">
                {doc.updated}
              </time>
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.07] px-3.5 py-2 text-[12.5px] font-semibold text-white/60 ring-1 ring-inset ring-white/10">
              {doc.sections.length} sections
            </span>
          </div>
        </div>
      </header>

      {/* ---- document ---- */}
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* ---- sidebar table of contents (lg and up) ----
              No `self-start` here, deliberately. A sticky element travels within
              its containing block, which for the <nav> is this <aside>; letting
              the aside keep the grid's default `stretch` gives it the full height
              of the document column, so the nav stays pinned for the whole read.
              Shrink-wrapping the aside to the nav's own height leaves zero travel
              and the "sticky" sidebar scrolls away with the first section. */}
          <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <nav
              aria-label="On this page"
              className="sticky top-28 rounded-2xl bg-surface/70 p-4 ring-1 ring-inset ring-forest-950/[0.07] backdrop-blur-sm"
            >
              <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
                On this page
              </p>
              <TableOfContents doc={doc} activeId={activeId} />
            </nav>
          </aside>

          <div className="lg:col-span-8 xl:col-span-9">
            {/* ---- mobile table of contents ----
                Closed by default. A reader who scrolled here wants the document;
                an eight-item list expanded above it is eight items to scroll
                past before reaching the first clause. */}
            <details
              open={tocOpen}
              onToggle={(e) => setTocOpen((e.currentTarget as HTMLDetailsElement).open)}
              className="mb-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-inset ring-forest-950/[0.07] lg:hidden"
            >
              <summary className="flex list-none items-center justify-between px-5 py-4 text-[13.5px] font-extrabold text-forest-950 [&::-webkit-details-marker]:hidden">
                On this page
                <ChevronDown
                  className={`h-4 w-4 text-forest-700 transition-transform duration-300 ${
                    tocOpen ? "rotate-180" : ""
                  }`}
                />
              </summary>
              <nav aria-label="On this page" className="border-t border-forest-950/[0.07] p-2">
                <TableOfContents
                  doc={doc}
                  activeId={activeId}
                  onNavigate={() => setTocOpen(false)}
                />
              </nav>
            </details>

            {/* The document sheet. Raised off the page wash so the copy sits on
                a defined surface rather than floating on the background texture. */}
            <article
              className="rounded-2xl bg-surface px-5 py-8 ring-1 ring-inset ring-forest-950/[0.07] sm:rounded-3xl sm:px-9 sm:py-11 lg:px-12"
              style={{
                boxShadow: "0 1px 2px rgba(16,40,28,0.04), 0 24px 56px -32px rgba(16,40,28,0.2)",
              }}
            >
              {doc.sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  /* Header clearance for a NATIVE anchor jump, and only then.
                     Lenis applies its own 96px offset — and it also honours
                     `scroll-margin-top`, so an unconditional `scroll-mt-28`
                     stacks with that offset and drops the heading 208px down the
                     viewport instead of 96px. Reduced-motion users are exactly
                     the ones who never start Lenis, so gating on that variant
                     gives each path one clearance rather than two. */
                  className={`motion-reduce:scroll-mt-28 ${
                    i > 0 ? "mt-14 border-t border-forest-950/[0.07] pt-12 sm:mt-16 sm:pt-14" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-3.5">
                    <span className="font-numeric text-[12px] font-extrabold tabular-nums text-forest-600">
                      {section.number}
                    </span>
                    <h2 className="text-balance font-display text-[clamp(1.25rem,4.5vw,1.75rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-forest-950">
                      {section.title}
                    </h2>
                  </div>

                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </section>
              ))}
            </article>

            {/* ---- cross-link ----
                The two documents are read as a pair, and a reader who finishes
                one should not have to go back to the footer to find the other. */}
            <a
              href={other.path}
              className="group mt-8 flex items-center justify-between gap-5 rounded-2xl bg-surface px-5 py-5 ring-1 ring-inset ring-forest-950/[0.07] transition-shadow duration-300 hover:shadow-[0_18px_40px_-26px_rgba(16,40,28,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 sm:px-7 sm:py-6"
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
                  Read next
                </span>
                <span className="mt-2 block font-display text-[1.0625rem] font-extrabold tracking-[-0.02em] text-forest-950 sm:text-[1.25rem]">
                  {other.title}
                </span>
              </span>
              {/* `relative` is load-bearing: the second arrow is absolutely
                  positioned, and without a positioned parent it would resolve
                  against the page rather than this well. */}
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-forest-950 text-white transition-colors duration-300 group-hover:bg-forest-800">
                <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-6 group-hover:translate-x-6" />
                <ArrowUpRight className="absolute h-4.5 w-4.5 -translate-x-6 translate-y-6 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
