import { useRef, type CSSProperties } from "react";
import { Clock3, FileStack, MousePointerClick, Users } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Four rows. Each names a failure of traditional study and the StudyMate pillar
 * that answers it, from the brochure's "Why Traditional Learning Falls Short" and
 * "How StudyMate AI Works" pages, which are written as a matched set: problem N
 * is answered by pillar N.
 */
const ROWS = [
  {
    n: "01",
    problem: "Information overload",
    problemCopy: "Hours lost hunting for the key concepts buried in a textbook.",
    solution: "Chat with your textbook",
    solutionCopy:
      "Ask any chapter a question and get the concept back in plain language, drawn from the page in front of you.",
    Icon: FileStack,
    image: "/problem/chat-with-your-textbook.webp",
    alt: "An open textbook with an AI chat bubble rising from its pages",
  },
  {
    n: "02",
    problem: "One-size-fits-all pace",
    problemCopy: "A single fixed pace never fits the student sitting in front of it.",
    solution: "Adaptive AI tutoring",
    solutionCopy:
      "The session re-paces itself around what you already know, so time goes to the parts that have not landed yet.",
    Icon: Users,
    image: "/problem/adaptive-ai-tutoring.webp",
    alt: "Knowledge cards rising in difficulty along a branching path",
  },
  {
    n: "03",
    problem: "Passive engagement",
    problemCopy: "Reading without testing leaves almost nothing behind a week later.",
    solution: "Smart test generator",
    solutionCopy:
      "Practice papers built from your own chapters, on demand, so reading turns into recall you can measure.",
    Icon: MousePointerClick,
    image: "/problem/smart-test-generator.webp",
    alt: "A stack of generated quiz cards with one answer marked correct",
  },
  {
    n: "04",
    problem: "Slow feedback",
    problemCopy: "Marked tests and answers arrive days after they would have helped.",
    solution: "Performance insights",
    solutionCopy:
      "Instant evaluation with analytics down to the chapter, so you always know what to review next.",
    Icon: Clock3,
    image: "/problem/performance-insights.webp",
    alt: "An analytics dashboard showing an upward trend beside a progress ring",
  },
] as const;

/**
 * ProblemSection — full-bleed dark editorial rows.
 *
 * Deliberately NOT pinned and NOT horizontally scrolled. Both mechanisms were
 * tried and both fought the rest of the page: a pin inserts several viewport
 * heights of spacer and breaks the moment any ancestor clips overflow, and a
 * horizontal track is fragile to measure. This uses ordinary document flow, so
 * it cannot silently stop working, behaves identically on mobile, and stays
 * scannable.
 *
 * The visual idea instead of motion tricks: the whole section is one edge-to-edge
 * dark forest field, which reverses the page's light-on-light and makes the block
 * read as a distinct chapter. Inside it, four oversized rows alternate sides,
 * each carrying a very large ghosted numeral that bleeds off its own edge. The
 * numerals give the section rhythm and scale that a grid of equal cards cannot.
 *
 * Motion is limited to entrance: each row rises and its image drifts on a gentle
 * parallax as it passes. Nothing is scrubbed to a pin, so nothing can desync.
 */
export default function ProblemSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* SplitText measures glyph boxes at split time; splitting against
           fallback metrics mis-positions every character once the webfont lands. */
        refreshAfterFonts();

        /* MUST split words as well as chars.
           With `type: "chars"` alone, SplitText wraps every character in its own
           inline-block span and word boundaries cease to exist, so the browser
           breaks lines mid-word ("break / s in four places") and strands
           punctuation at the start of a line. Splitting words too keeps each word
           as a single unbreakable wrap unit while still exposing the characters
           for the stagger. */
        const heading = new SplitText(".ps-heading", { type: "words,chars" });

        gsap
          .timeline({
            scrollTrigger: { trigger: ".ps-head", start: "clamp(top 82%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".ps-eyebrow", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            heading.chars,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.015 },
            0.1,
          )
          .fromTo(".ps-sub", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.4);

        /* Per-row entrance. `once: true` so rows never replay or reverse on the
           way back up, which is what makes a long page feel unstable. */
        gsap.utils.toArray<HTMLElement>(".ps-row").forEach((row) => {
          const copy = row.querySelector(".ps-copy");
          const art = row.querySelector(".ps-art");
          const numeral = row.querySelector(".ps-numeral");

          gsap
            .timeline({
              scrollTrigger: { trigger: row, start: "clamp(top 78%)", once: true },
              defaults: { ease: "power3.out" },
            })
            .fromTo(numeral, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1 }, 0)
            .fromTo(
              art,
              { opacity: 0, y: 40, scale: 0.94 },
              { opacity: 1, y: 0, scale: 1, duration: 1 },
              0.05,
            )
            .fromTo(copy, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.85 }, 0.18);

          /* No parallax drift on the art.
             The rows are `position: sticky`, so once a row parks it stops moving
             relative to the viewport while its trigger range keeps advancing.
             A scrubbed y-offset then slides the image inside a stationary card,
             which reads as a glitch rather than as depth. Entrance motion alone
             carries this section. */
        });

        return () => heading.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".ps-row, .ps-copy, .ps-art, .ps-numeral, .ps-eyebrow, .ps-heading, .ps-sub", {
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      {/* Full-bleed dark field. The page is light on light throughout, so
          inverting here is what makes this read as its own chapter rather than
          another band of cards. Rounded and inset to match the hero's card
          language instead of running hard to the window edge. */}
      {/* Lower z-index than the section that follows, so that one paints over
          this as it rides up.

          NOT `sticky` itself: this section is far taller than the viewport and
          its own cards are already sticky inside it. Making the section sticky
          too would give those cards a scroll container that stops moving, and
          the internal stack would break. The overlap is achieved by the next
          section's negative margin alone. */}
      <section id="problem" className="relative z-10 isolate p-2 sm:p-3">
        <div
          /* `overflow-clip` rather than `overflow-hidden`.
             Both clip the decorative texture to the rounded corners, but
             `hidden` makes this element a scroll container, which cancels
             `position: sticky` on every descendant and the cards would simply
             not stack. `clip` clips without creating that container. */
          /* No background of its own: the section now sits directly on the page
             surface, so the body's own texture and wash carry through. */
          className="relative overflow-clip rounded-[1.75rem] py-24 sm:rounded-[2.25rem] sm:py-32"
        >
          {/* Surface texture, faded out toward the edges. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--forest-900) 14%, transparent) 1px, transparent 0)",
              backgroundSize: "26px 26px",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 55% at 50% 20%, #000 10%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 80% 55% at 50% 20%, #000 10%, transparent 100%)",
            }}
          />

          {/* ---------- heading ---------- */}
          <div className="ps-head relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
            <span className="ps-eyebrow flex items-center justify-center gap-4">
              <span
                aria-hidden
                className="h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-600) 60%, transparent))",
                }}
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-700">
                The problem
              </span>
              <span
                aria-hidden
                className="h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in oklab, var(--forest-600) 60%, transparent), transparent)",
                }}
              />
            </span>

            <h2 className="ps-heading mt-6 text-balance font-display text-[clamp(1.65rem,7vw,3.75rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-forest-950">
              {/* The two clauses are forced onto their own lines rather than left
                  to reflow. As one wrapping paragraph the sentence boundary landed
                  mid-line at most widths, which is what made the heading read as
                  broken even once the words themselves stopped splitting. */}
              <span className="block">Studying breaks in four places.</span>
              <span className="font-hand mt-1 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-600">
                We fixed each one
              </span>
            </h2>

            <p className="ps-sub mx-auto mt-6 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-forest-950/65 sm:text-[1.125rem]">
              Passive reading makes it hard to stay engaged and harder to retain anything. Here is
              what replaces each failure.
            </p>
          </div>

          {/* ---------- stacking rows ----------
              Each row is `sticky` at the same top offset, so as you scroll the
              next one rides up and comes to rest ON TOP of the previous one,
              covering it. Four cards end up as a physical stack.

              Sticky is used rather than a pinned ScrollTrigger deliberately: it
              is pure CSS, inserts no spacer, cannot desync, and needs no
              measurement. The only requirement is that no ancestor clips
              overflow, which is why the dark panel below sets `overflow-visible`
              from lg up. */}
          <div className="relative mx-auto mt-20 max-w-6xl px-4 sm:mt-28 sm:px-6 lg:px-10">
            {ROWS.map(
              ({ n, problem, problemCopy, solution, solutionCopy, Icon, image, alt }, i) => {
                const flipped = i % 2 === 1;
                return (
                  <div
                    key={n}
                    /* `lg:top-(--ps-top)` keeps the offset inside the same
                       breakpoint that turns on `lg:sticky`, so the two can
                       never disagree. Below lg the card is plain flow content
                       with no offset at all.

                       The mobile gap is `mt-4` rather than `mt-8`: with no
                       stacking on small screens the cards are just a vertical
                       list, and 2rem between them plus their own 2.5rem of
                       padding left an obvious dead band between every card. */
                    className={`ps-row relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[1.5rem] px-5 py-8 ring-1 ring-inset ring-forest-950/8 sm:gap-10 sm:px-10 sm:py-14 lg:sticky lg:top-(--ps-top) lg:grid-cols-2 lg:gap-16 ${
                      i > 0 ? "mt-4 sm:mt-6 lg:mt-10" : ""
                    }`}
                    style={
                      {
                        /* `top` is set via a CSS variable consumed only inside the
                         lg media query (see the `[--ps-top:...]` class below).

                         Setting it inline applied it at EVERY width, but the
                         cards are only `position: sticky` from lg up. Below
                         that they are `position: relative`, where a `top` of
                         6rem+ does not park a card, it shifts it bodily
                         downward, out of its own section and behind the one
                         after it. That is the mobile overlap. */
                        /* Each card rests 6rem lower than the one before it, so the
                         stack fans downward and every card's top edge stays
                         visible instead of being fully hidden. */
                        "--ps-top": `calc(6rem + ${i * 1.25}rem)`,
                        /* Later cards must paint over earlier ones. Scoped to the
                         stacking context so it cannot fight the next section. */
                        zIndex: i + 1,
                        /* Opaque, so a card genuinely covers the one beneath rather
                         than letting it show through. Lightens slightly with
                         depth so the stack reads as layered planes. */
                        /* Opaque white so a card genuinely covers the one beneath
                         it. Each card sits a touch warmer than the last, so the
                         stack still reads as layered planes now that the depth
                         cue can no longer come from lightening a dark surface. */
                        background: `linear-gradient(160deg, #ffffff, color-mix(in oklab, var(--forest-300) ${3 + i * 2}%, #ffffff))`,
                        boxShadow:
                          "0 1px 0 rgba(255,255,255,0.9) inset, 0 -18px 40px -26px color-mix(in oklab, var(--forest-950) 40%, transparent), 0 24px 56px -28px color-mix(in oklab, var(--forest-950) 26%, transparent)",
                        /* CSSProperties has no index signature for custom
                         properties, so the `--ps-top` entry above needs this. */
                      } as CSSProperties
                    }
                  >
                    {/* Oversized ghosted numeral, bled off the outer edge. This is
                        what gives the section scale; a small index number would
                        leave the rows reading as four equal boxes again. */}
                    <span
                      aria-hidden
                      /* Anchored just INSIDE the card edge now that each row is
                         clipped, so `overflow-hidden` cannot shear the numeral in
                         half. Top corner rather than centred, where stacked cards
                         overlap least. */
                      className={`ps-numeral pointer-events-none absolute -top-6 hidden select-none font-display text-[11rem] font-extrabold leading-none tracking-tighter text-forest-950/[0.06] xl:block ${
                        flipped ? "right-4" : "left-4"
                      }`}
                    >
                      {n}
                    </span>

                    {/* ---- copy ---- */}
                    <div
                      className={`ps-copy relative ${flipped ? "lg:order-2 lg:pl-6" : "lg:pr-6"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-numeric text-[13px] font-extrabold text-forest-700">
                          {n}
                        </span>
                        <span
                          aria-hidden
                          className="h-px w-7"
                          style={{
                            background:
                              "linear-gradient(90deg, color-mix(in oklab, var(--forest-600) 70%, transparent), transparent)",
                          }}
                        />
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-forest-700">
                          <Icon className="h-3.5 w-3.5" />
                          {problem}
                        </span>
                      </span>

                      <h3 className="mt-5 font-display text-[clamp(1.45rem,5.5vw,2.75rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-forest-950">
                        {solution}
                      </h3>

                      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-forest-950/70">
                        {solutionCopy}
                      </p>

                      <p className="mt-6 max-w-md border-l-2 border-forest-500/40 pl-4 text-[13.5px] leading-relaxed text-forest-950/70">
                        Replaces: {problemCopy}
                      </p>
                    </div>

                    {/* ---- art ---- */}
                    <div className={`ps-art relative ${flipped ? "lg:order-1" : ""}`}>
                      {/* Softer, cooler glow than the dark version used: on a
                          white card a strong emerald bloom reads as a colour cast
                          rather than as light behind the object. */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-10 -z-10 rounded-full opacity-60 blur-3xl"
                        style={{
                          background:
                            "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 22%, transparent), transparent 70%)",
                        }}
                      />
                      <img
                        src={image}
                        alt={alt}
                        width={1400}
                        height={1400}
                        loading="lazy"
                        decoding="async"
                        /* Fixed box, not `h-auto`. The four renders have different
                           intrinsic aspect ratios, so an auto height made each
                           card a different size and the stack lost its rhythm.
                           `object-contain` inside a locked square scales each one
                           to fit without cropping, so every card is identical. */
                        /* No `mix-blend-screen` now that the card is light: screen
                           blending lightens toward white, so on a white surface it
                           erased the render entirely. The images already sit on a
                           near-white backdrop, so they composite cleanly as-is. */
                        className="mx-auto h-76 w-full max-w-md object-contain sm:h-84"
                      />
                    </div>
                  </div>
                );
              },
            )}

            {/* Trailing scroll room. A sticky element stops sticking once its
                PARENT's bottom edge passes, so without space after the last row
                the final cards would unstick almost immediately and the stack
                would never fully form. Desktop only, where the stacking runs. */}
            <div aria-hidden className="hidden lg:block lg:h-[55vh]" />
          </div>
        </div>
      </section>
    </div>
  );
}
