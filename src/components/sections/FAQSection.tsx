import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The homepage's five-question preview, verbatim from the content package.
 *
 * Ordered by when the doubt surfaces: what it is, whether books must be
 * uploaded, how it differs from a chatbot, whether it hands over answers, and
 * what it costs to start. The fourth carries the most weight: "Will it just
 * give my child the answers?" is the biggest objection a parent has about AI
 * study tools, and answering it honestly is a differentiator.
 *
 * Visible only. The full set of 23 answers, and the site's only FAQPage markup,
 * live on /faq. The package keeps FAQPage on one page so the same questions are
 * not marked up twice across the site.
 */
const FAQS = [
  {
    q: "What is StudyMate AI?",
    a: "StudyMate AI is an AI tutor for school students from SuperMIA. It answers questions from the student's own syllabus textbook with the page cited, adapts practice to their level, generates chapter practice papers with instant evaluation and shows which chapters to study next.",
  },
  {
    q: "Do we need to upload textbooks?",
    a: "No. Choose the country, board and class once at setup and the matching textbooks appear on the bookshelf. Any chapter can be searched as soon as it is opened.",
  },
  {
    q: "How is it different from a general AI chatbot?",
    a: "A general chatbot draws on the internet and doesn't know the syllabus. StudyMate answers from the chapter that is open, within the board and class chosen at setup, so answers, tests and reports stay inside the syllabus.",
  },
  {
    q: "Will it just give my child the answers?",
    a: "No. StudyMate works through a topic with the student and then tests them. A wrong answer shapes what comes next, and the progress report shows where understanding is still thin.",
  },
  {
    q: "How much does it cost to start?",
    a: "New accounts start with 5,000 free credits and no card is required. Setup takes about five minutes and there is nothing to install.",
  },
] as const;

/**
 * FAQSection — the last objections, answered. Sits directly before the footer.
 *
 * Placement: the quiz above ends by inviting the reader to sign up, and the gap
 * between finishing it and clicking is where unspoken doubts surface. Every one
 * of those doubts is a reason not to click, so they are answered here rather
 * than left to the reader.
 *
 * Every answer is in the server HTML on first load: collapsed rows animate
 * their height to zero, but the text is rendered, not fetched on open.
 *
 * Design: a two-column split. Questions on the left as a real accordion, and a
 * persistent card on the right that keeps the offer in view while the reader
 * reads, so the section doubles as a soft conversion point before the footer.
 * One item is open by default: an accordion where everything is shut looks like
 * a list of headings and gives the reader nothing to read.
 */
export default function FAQSection() {
  const rootRef = useRef<HTMLElement>(null);
  /* Single-open accordion. `null` is allowed so a reader can close the last
     open item rather than being forced to keep one expanded. */
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* SplitText measures glyph boxes at split time, so a split against
           fallback metrics mis-positions every character once the webfont lands. */
        refreshAfterFonts();

        /* Words as well as chars: with chars alone, word boundaries cease to
           exist and the browser breaks lines mid-word. */
        const heading = new SplitText(".fq-heading", { type: "words,chars" });

        gsap
          .timeline({
            scrollTrigger: { trigger: rootRef.current, start: "clamp(top 80%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".fq-eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            heading.chars,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.015 },
            0.08,
          )
          .fromTo(".fq-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.36)
          /* `fromTo`, not `from`.
             A `from()` writes the START state immediately and only clears it when
             the tween runs. If the ScrollTrigger never fires — the section is
             already past on load, a plugin throws earlier in the timeline, the
             scroller is mid-restore on a hard refresh — the cards stay pinned at
             opacity 0 and the section renders blank. Stating both ends means the
             worst case is an un-animated card, never an invisible one.

             (The old ".fq-aside" tween here also targeted a removed element,
             which threw and killed everything after it.) */
          .fromTo(
            ".fq-item",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.07 },
            0.3,
          );

        return () => heading.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".fq-eyebrow, .fq-heading, .fq-sub, .fq-item", {
          clearProps: "opacity,transform,visibility,filter",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="faq" className="relative isolate z-30 p-2 sm:p-3">
      {/* Its own white panel, inset like the other sections, rather than sitting
          directly on the page wash. Gives the block an edge so it reads as a
          closing chapter instead of running straight into the footer. */}
      <div className="relative overflow-clip rounded-[1.75rem] bg-surface py-20 sm:rounded-[2.25rem] sm:py-28">
        {/* Faint grid, masked to fade before the panel edge, echoing the
            blueprint texture used in How It Works. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--forest-800) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--forest-800) 7%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 60% at 50% 30%, #000 20%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, #000 20%, transparent 100%)",
          }}
        />

        {/* One centred column, capped at 3xl. The two-column split needed a
            right-hand card to balance it; with the CTA gone, a full-width
            accordion would run to a measure nobody wants to read across. */}
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <div>
            {/* ---------- heading + accordion ---------- */}
            <div className="text-center">
              <span className="fq-eyebrow flex items-center justify-center gap-4">
                <span
                  aria-hidden
                  className="h-px w-10 sm:w-14"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-600) 55%, transparent))",
                  }}
                />
                <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-700">
                  Questions
                </span>
                <span
                  aria-hidden
                  className="h-px w-10 sm:w-14"
                  style={{
                    background:
                      "linear-gradient(90deg, color-mix(in oklab, var(--forest-600) 55%, transparent), transparent)",
                  }}
                />
              </span>

              <h2 className="fq-heading mt-6 text-balance font-display text-[clamp(1.65rem,7vw,3.25rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-forest-950">
                <span className="block">StudyMate AI</span>{" "}
                <span className="font-hand mt-1 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-600">
                  FAQs
                </span>
              </h2>

              <p className="fq-sub mx-auto mt-6 max-w-lg text-pretty text-[1.0625rem] leading-relaxed text-forest-950/70">
                Five quick answers. The full list, covering textbooks, tests, credits and data, is
                on the{" "}
                <a
                  href="/faq"
                  className="font-bold text-forest-700 underline decoration-forest-500/40 decoration-2 underline-offset-[3px] transition-colors duration-300 hover:text-forest-600 hover:decoration-forest-500"
                >
                  FAQ page
                </a>
                .
              </p>
            </div>

            {/* The list itself stays LEFT aligned inside the centred column.
                Centred body copy is hard to read once it runs past a line, and an
                accordion needs a straight left edge for the questions to scan
                down. Only the heading above is centred. */}
            <div className="mt-12 text-left">
              {/* Real disclosure buttons, not divs: keyboard users can tab to each
                question and toggle it, and `aria-expanded` announces the state. */}
              {/* An editorial ruled list, not cards.
                  Rounded boxes with a coloured left bar and a numbered badge is
                  the single most recognisable generated-UI pattern, which is why
                  the previous version read as machine-made. This drops all three:
                  no box, no accent bar, no badge. What is left is a hairline
                  rule per row and generous space, so the type does the work. */}
              {/* Each question is an <h3> wrapping its button (the WAI accordion
                  pattern), so the page outline lists the questions. A <dl> could
                  not hold them: headings are not allowed inside a <dt>. */}
              <div className="mt-12">
                {FAQS.map(({ q, a }, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={q} className="fq-item border-t border-forest-950/10 last:border-b">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="group flex w-full items-baseline gap-5 py-6 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest-500 sm:gap-7"
                        >
                          {/* Plain tabular index, no badge. Aligned on the text
                              baseline rather than boxed, so it reads as a figure
                              in a contents page. */}
                          {/* Drawn with `::before` from a data attribute, not
                              as text: inside the <h3> a text node would make
                              the heading read "01 What is StudyMate AI?" to
                              crawlers and screen readers. */}
                          <span
                            aria-hidden
                            data-index={String(i + 1).padStart(2, "0")}
                            className={`w-6 shrink-0 font-numeric text-[12px] font-bold tabular-nums transition-colors duration-300 before:content-[attr(data-index)] ${
                              isOpen ? "text-forest-600" : "text-forest-950/25"
                            }`}
                          />

                          <span
                            className={`flex-1 font-display text-[1.0625rem] font-extrabold leading-snug tracking-[-0.02em] transition-colors duration-300 sm:text-[1.2rem] ${
                              isOpen
                                ? "text-forest-950"
                                : "text-forest-950/80 group-hover:text-forest-950"
                            }`}
                          >
                            {q}
                          </span>

                          {/* A bare chevron with no container. The circle around
                              it was part of what made the row look templated. */}
                          <span
                            aria-hidden
                            className={`shrink-0 self-center transition-all duration-400 ${
                              isOpen
                                ? "rotate-180 text-forest-600"
                                : "text-forest-950/25 group-hover:text-forest-700"
                            }`}
                          >
                            <ChevronDown className="h-[18px] w-[18px]" />
                          </span>
                        </button>
                      </h3>

                      {/* `grid-template-rows` 0fr -> 1fr animates to the content's
                          natural height, which a max-height guess cannot do
                          without clipping the longer answers. */}
                      <div
                        className="grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                          opacity: isOpen ? 1 : 0,
                        }}
                      >
                        <div className="overflow-hidden">
                          {/* Indented to clear the index column so the answer
                              hangs under its question, not under the number. */}
                          <p className="max-w-2xl pb-7 pl-11 pr-8 text-[15px] leading-[1.75] text-forest-950/70 sm:pl-13">
                            {a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
