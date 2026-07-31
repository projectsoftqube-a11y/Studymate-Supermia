import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The questions a visitor actually has at this point in the page, ordered by
 * when they surface rather than by topic.
 *
 * Every answer is drawn from something the page itself demonstrates further up:
 * the five setup steps in How It Works, the syllabus lock, the three practice
 * levels in the quiz, the instant evaluation, the chapter reports. Nothing here
 * introduces a capability the reader has not already been shown, and nothing
 * claims a certification, an adoption figure, a price or a third-party
 * endorsement, because those are claims about the outside world that this page
 * cannot substantiate.
 *
 * Deliberately absent: pricing and data-privacy answers. Both were removed
 * because the figures in them were not settled. An FAQ that states a wrong
 * price or an unverified compliance posture is worse than no answer at all.
 *
 * The fourth question carries the most weight. "Will it just give my child the
 * answers?" is the single biggest objection a parent has about AI study tools,
 * and answering it honestly is a genuine differentiator rather than a defensive
 * note. It is placed mid-list, where it reads as a fair question being
 * addressed rather than as a rebuttal the page is anxious about.
 */
const FAQS = [
  {
    q: "Do I need to upload my textbooks?",
    a: "No. Your books are already in the library, processed and ready. You pick your country, board and standard once when you set up, and the right textbooks are waiting on your shelf. Any chapter is searchable from the moment you open it, so there is nothing to scan, upload or wait for.",
  },
  {
    q: "How is this different from asking a general AI chatbot?",
    a: "A general chatbot answers from the internet and does not know which syllabus you are on. StudyMate answers from the chapter in front of you. You set your board and standard during setup, and every answer, test and report afterwards stays inside that syllabus rather than drifting into material you will never be examined on.",
  },
  {
    q: "What does the adaptive tutoring actually change?",
    a: "The pace and the difficulty. Ask a question in plain language and the session re-paces itself around what you have already shown you know, so you are not walked through basics you have cleared. Practice runs through three levels: whether you know a concept, whether you can use it, and whether you can reason about it.",
  },
  {
    q: "Will it just give my child the answers?",
    a: "No, and this is the difference that matters most. StudyMate works a topic through with the student and then tests them on it. A wrong answer changes what comes next rather than being corrected and forgotten. The reports show where the understanding is thin, which is information a student cannot get by copying an answer.",
  },
  {
    q: "How do the tests and evaluation work?",
    a: "Generate a paper from any chapter you choose, at the difficulty you choose, and attempt it online. Evaluation is instant and detailed, not just a score.",
  },
  {
    q: "What do the progress reports tell me?",
    a: "Which chapters you have covered and how you actually performed in each. The point is not the score on its own, it is knowing which chapters still need work before an exam, so revision time goes to the topics that will move your marks rather than the ones that already feel comfortable.",
  },
  {
    q: "How long does it take to get started?",
    a: "About five minutes, in a single sitting. One form to create your account, pick your country, board and standard, open your bookshelf, work through a topic, then take a test and see the gaps. Nothing to install and no manual to read.",
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
 * SEO: this is the page's best remaining structured-data opportunity. FAQPage
 * markup lets search engines render these questions directly in results, and the
 * questions themselves carry the long-tail queries no other section can ("is it
 * free", "does it work with CBSE", "will it do my homework for me") which are
 * lower competition and higher intent than anything the hero targets.
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
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  /* FAQPage structured data, derived from the same array the page renders so the
     two can never disagree. Search engines can surface these directly in
     results, which is the highest-value markup left on this page. */
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section ref={rootRef} id="faq" className="relative isolate z-30 p-2 sm:p-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

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
                <span className="block">Before you start,</span>
                <span className="font-hand mt-1 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-600">
                  the honest answers
                </span>
              </h2>

              <p className="fq-sub mx-auto mt-6 max-w-lg text-pretty text-[1.0625rem] leading-relaxed text-forest-950/70">
                The things people ask us most, answered plainly.
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
              <dl className="mt-12">
                {FAQS.map(({ q, a }, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={q} className="fq-item border-t border-forest-950/10 last:border-b">
                      <dt>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="group flex w-full items-baseline gap-5 py-6 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest-500 sm:gap-7"
                        >
                          {/* Plain tabular index, no badge. Aligned on the text
                              baseline rather than boxed, so it reads as a figure
                              in a contents page. */}
                          <span
                            aria-hidden
                            className={`w-6 shrink-0 font-numeric text-[12px] font-bold tabular-nums transition-colors duration-300 ${
                              isOpen ? "text-forest-600" : "text-forest-950/25"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>

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
                      </dt>

                      {/* `grid-template-rows` 0fr -> 1fr animates to the content's
                          natural height, which a max-height guess cannot do
                          without clipping the longer answers. */}
                      <dd
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
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
