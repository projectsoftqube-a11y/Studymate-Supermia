import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Minus, RotateCcw, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { refreshAfterFonts } from "@/lib/scroll-refresh";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { APP_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The three difficulty levels. Fixed labels, since every subject set is written
 * to the same three rungs: know it, use it, reason about it.
 */
const LEVELS = [
  { level: "Basic", blurb: "Do you know it?" },
  { level: "Medium", blurb: "Can you use it?" },
  { level: "Advanced", blurb: "Can you reason about it?" },
] as const;

/**
 * Seven subjects, three questions each: twenty-one real questions in total.
 *
 * "Start again" advances to the NEXT subject rather than replaying the same
 * three. That is the point of the bank: a visitor who retries and sees Chemistry
 * after Mathematics has learned something a paragraph could not tell them, which
 * is that this is a real question bank across their whole syllabus rather than
 * one hardcoded demo.
 *
 * Mathematics comes first because rational numbers is the chapter used in the
 * Chat section, so a reader arriving here from above sees one continuous
 * tutoring session before the subject changes.
 *
 * `why` is the teaching line shown after answering. It explains the reasoning
 * rather than just marking right or wrong, which is the behaviour the brochure
 * promises and the thing that separates a tutor from a quiz app.
 */
const SUBJECTS = [
  {
    subject: "Mathematics",
    chapter: "Rational Numbers",
    questions: [
      {
        q: "Which of these is a rational number?",
        options: ["√2", "3/4", "π"],
        answer: 1,
        why: "A rational number is any number you can write as one whole number over another. 3/4 fits; √2 and π cannot be written that way.",
      },
      {
        q: "Simplify: 2/3 + 5/6",
        options: ["7/9", "3/2", "7/6"],
        answer: 1,
        why: "Common denominator is 6, so 2/3 becomes 4/6. Then 4/6 + 5/6 = 9/6, which simplifies to 3/2.",
      },
      {
        q: "Closure under division fails for rational numbers because of which case?",
        options: ["Dividing by a negative", "Dividing by zero", "Dividing by a fraction"],
        answer: 1,
        why: "Division by zero is undefined, so the result is not a rational number. Every other division of two rationals gives a rational.",
      },
    ],
  },
  {
    subject: "Science",
    chapter: "Chemical Reactions",
    questions: [
      {
        q: "What does a chemical equation need to obey?",
        options: ["Conservation of mass", "Conservation of colour", "Conservation of volume"],
        answer: 0,
        why: "Atoms are neither created nor destroyed in a reaction, so the same number of each atom must appear on both sides. That is why equations are balanced.",
      },
      {
        q: "Balance it: H₂ + O₂ → H₂O. What goes in front of H₂O?",
        options: ["1", "2", "3"],
        answer: 1,
        why: "2H₂ + O₂ → 2H₂O. Two water molecules give you 4 hydrogen and 2 oxygen atoms, matching the left side.",
      },
      {
        q: "Rusting of iron is which type of reaction?",
        options: ["Displacement", "Oxidation", "Neutralisation"],
        answer: 1,
        why: "Iron gains oxygen to form iron oxide, and gaining oxygen is oxidation. It is also a slow combination reaction.",
      },
    ],
  },
  {
    subject: "Science",
    chapter: "Light and Reflection",
    questions: [
      {
        q: "What is the angle of incidence equal to?",
        options: ["Angle of refraction", "Angle of reflection", "Angle of deviation"],
        answer: 1,
        why: "The first law of reflection: the angle of incidence always equals the angle of reflection, both measured from the normal.",
      },
      {
        q: "An object 10 cm in front of a plane mirror. How far is the image behind it?",
        options: ["5 cm", "10 cm", "20 cm"],
        answer: 1,
        why: "A plane mirror forms an image exactly as far behind the mirror as the object is in front of it, so 10 cm.",
      },
      {
        q: "Why does a concave mirror form a real image while a plane mirror never does?",
        options: [
          "It absorbs light",
          "It converges rays to a point",
          "It reverses the image left to right",
        ],
        answer: 1,
        why: "A concave mirror converges reflected rays so they actually meet, and rays that meet form a real image. Plane mirror rays only appear to meet behind the mirror.",
      },
    ],
  },
  {
    subject: "Science",
    chapter: "Life Processes",
    questions: [
      {
        q: "Where does photosynthesis take place?",
        options: ["Mitochondria", "Chloroplast", "Ribosome"],
        answer: 1,
        why: "Chloroplasts contain chlorophyll, the pigment that captures light energy. Mitochondria do the opposite job: releasing energy from food.",
      },
      {
        q: "Which gas is taken in during photosynthesis?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen"],
        answer: 1,
        why: "Carbon dioxide goes in and oxygen comes out. Respiration runs the other way round, which is why the two processes balance each other.",
      },
      {
        q: "Why do plants still need respiration if they make their own food?",
        options: [
          "To release energy from that food",
          "To absorb more sunlight",
          "To take in more water",
        ],
        answer: 0,
        why: "Photosynthesis stores energy as glucose, but the plant still has to break that glucose down to actually use the energy. That is respiration.",
      },
    ],
  },
  {
    subject: "Mathematics",
    chapter: "Linear Equations",
    questions: [
      {
        q: "Solve for x: 2x + 6 = 14",
        options: ["3", "4", "10"],
        answer: 1,
        why: "Subtract 6 from both sides to get 2x = 8, then divide by 2. So x = 4.",
      },
      {
        q: "What does the graph of a linear equation in two variables look like?",
        options: ["A parabola", "A straight line", "A circle"],
        answer: 1,
        why: "Every solution pair sits on the same straight line, which is exactly why it is called linear.",
      },
      {
        q: "Two lines have the same slope but different intercepts. How many solutions?",
        options: ["No solution", "One solution", "Infinitely many"],
        answer: 0,
        why: "Same slope means parallel, and different intercepts mean they never meet. Lines that never meet share no solution.",
      },
    ],
  },
  {
    subject: "Science",
    chapter: "Acids, Bases and Salts",
    questions: [
      {
        q: "What is the pH of a neutral solution?",
        options: ["0", "7", "14"],
        answer: 1,
        why: "7 is neutral. Below 7 is acidic, above 7 is basic, on a scale that runs 0 to 14.",
      },
      {
        q: "Acid + base gives which two products?",
        options: ["Salt and water", "Salt and hydrogen", "Water and oxygen"],
        answer: 0,
        why: "That is neutralisation: the H⁺ from the acid and the OH⁻ from the base combine into water, leaving a salt behind.",
      },
      {
        q: "Why does dry HCl gas not turn blue litmus red?",
        options: [
          "It is not really an acid",
          "It needs water to release H⁺ ions",
          "Litmus only works on solids",
        ],
        answer: 1,
        why: "Acidic behaviour comes from H⁺ ions, and HCl only releases them when dissolved in water. No water, no ions, no colour change.",
      },
    ],
  },
  {
    subject: "Science",
    chapter: "Force and Motion",
    questions: [
      {
        q: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt"],
        answer: 1,
        why: "The newton, named after Isaac Newton. A joule measures energy and a watt measures power.",
      },
      {
        q: "A 5 kg object accelerates at 2 m/s². What force is acting on it?",
        options: ["2.5 N", "10 N", "7 N"],
        answer: 1,
        why: "F = ma, so 5 × 2 = 10 N. Newton's second law in one step.",
      },
      {
        q: "Why do passengers lurch forward when a bus brakes suddenly?",
        options: [
          "The brakes push them forward",
          "Their bodies keep moving due to inertia",
          "Gravity increases briefly",
        ],
        answer: 1,
        why: "Inertia. The bus stops but nothing has yet acted on the passengers to stop them, so they carry on at the original speed.",
      },
    ],
  },
] as const;

type Phase = "asking" | "right" | "wrong";

/**
 * AdaptiveSection — a real test the reader can take.
 *
 * Placement, sixth: the Chat section shows the tutor answering ONE question. The
 * obvious follow-up is "what happens on the fifth, or when I get one wrong".
 * Adaptive tutoring is the word in the brochure that separates StudyMate from a
 * chatbot, and until this section it was asserted and never demonstrated.
 *
 * Design: the reader sits the test. Each rung is a real multiple-choice question
 * with one correct answer. Answer correctly and the ladder steps UP to a harder
 * question; answer wrong and it steps DOWN, with the reasoning explained either
 * way. Nothing is on a timer and nothing is simulated.
 *
 * That is the whole argument. A paragraph claiming "the session adapts" asks to
 * be believed; a test that visibly gets harder because YOU got it right proves
 * it in about fifteen seconds, and the reader leaves having used the product
 * rather than having read about it.
 *
 * The down-path matters as much as the up-path. Most product pages only show
 * success. Showing the tutor step back and re-explain on a wrong answer is what
 * makes the claim credible, and it is the behaviour a struggling student most
 * needs to see before signing up.
 */
export default function AdaptiveSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [rung, setRung] = useState(0);
  const [phase, setPhase] = useState<Phase>("asking");
  const [picked, setPicked] = useState<number | null>(null);
  /* Highest rung reached, so the ladder keeps a record of progress even after
     the reader drops back down. Without it, stepping down would erase the ticks
     the reader earned, which reads as punishment. */
  const [best, setBest] = useState(0);
  const [touched, setTouched] = useState(false);
  /* Direction of the last move, so the incoming card animates from the correct
     side and stepping down feels like going back. */
  const [dir, setDir] = useState<1 | -1>(1);

  /* Set when the reader answers the hardest level correctly. The quiz then
     hands off to the real product, which is the whole point of running a demo on
     a marketing page: it should end by inviting the reader in, not by quietly
     stopping. */
  const [finished, setFinished] = useState(false);

  /* Which subject set is loaded. "Start again" advances this rather than
     replaying the same three questions, so a retry visibly changes subject and
     the bank proves itself. */
  const [set, setSet] = useState(0);

  const subject = SUBJECTS[set];
  const current = subject.questions[rung];
  const atTop = rung === LEVELS.length - 1;

  const choose = (i: number) => {
    if (phase !== "asking") return;
    setTouched(true);
    setPicked(i);
    setPhase(i === current.answer ? "right" : "wrong");
    if (i === current.answer) setBest((b) => Math.max(b, rung + 1));
  };

  /** Move on after the explanation has been read. */
  const advance = () => {
    /* Clearing the hardest level ends the demo rather than looping: there is
       nothing harder to show, and stopping without an invitation would waste the
       one moment the reader has just proved the product works. */
    if (phase === "right" && atTop) {
      setFinished(true);
      return;
    }
    const delta: 1 | -1 = phase === "right" ? 1 : -1;
    setDir(delta);
    setRung((r) => Math.min(LEVELS.length - 1, Math.max(0, r + delta)));
    setPicked(null);
    setPhase("asking");
  };

  /* Advances to the NEXT subject rather than replaying this one. Wraps at the
     end so the bank never runs out. */
  const restart = () => {
    setSet((v) => (v + 1) % SUBJECTS.length);
    setRung(0);
    setBest(0);
    setPicked(null);
    setPhase("asking");
    setDir(1);
    setFinished(false);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        refreshAfterFonts();

        /* No SplitText on this heading, and no per-character reveal.
           This section stayed invisible in production through several attempted
           fixes, and SplitText was the one thing it had that the plain,
           reliably-working sections did not need. It rewrites the heading's
           innerHTML into per-character spans at runtime; if that rewrite is
           disturbed at all (a re-render from one of the four dependency-driven
           hooks below, a font swap mid-split, a revert that runs at the wrong
           moment) the tween is left holding detached nodes and the visible <h2>
           keeps whatever inline opacity was written to it.

           A plain class-selector fade cannot fail that way: the element the
           tween targets is the same element React rendered. The heading loses a
           per-character flourish and gains being reliably on screen, which is
           the correct trade for a section carrying the interactive demo.

           `fromTo` throughout, never `from`: a `from()` writes its START state
           immediately and only clears it if the tween actually runs, so an
           interrupted timeline leaves elements pinned at opacity 0. */
        gsap
          .timeline({
            scrollTrigger: { trigger: rootRef.current, start: "clamp(top 78%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".ad-eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(".ad-heading", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.08)
          .fromTo(".ad-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.36)
          .fromTo(
            ".ad-panel",
            { y: 40, scale: 0.98, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 1 },
            0.2,
          )
          /* Rungs build from the bottom up, the way a ladder is climbed. */
          .fromTo(
            ".ad-rung",
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: { each: 0.08, from: "end" } },
            0.5,
          )
          /* The mascot rises into the corner last and slowest, so it reads as
             settling into the margin rather than as part of the quiz panel. */
          .fromTo(
            ".ad-mascot",
            { y: 46, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
            0.42,
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        /* `.ad-body` and `.ad-card` are included even though their tweens live
           in the dependency-driven hooks below, outside this matchMedia. Those
           hooks are NOT gated on reduced motion, so without resetting them here
           the quiz body and question card could be left at opacity 0. */
        gsap.set(".ad-eyebrow, .ad-heading, .ad-sub, .ad-panel, .ad-rung, .ad-body, .ad-card, .ad-mascot", {
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  /* Failsafe.
     This section shipped invisible more than once, and an interactive demo that
     silently does not render is worse than one that does not animate. If the
     entrance has not run a second and a half after mount, force everything
     visible: by then the trigger has either fired or is never going to.

     Deliberately unconditional on reduced-motion and on scroll position. It only
     ever sets opacity to 1, so the worst it can do is skip a flourish. */
  useEffect(() => {
    const t = window.setTimeout(() => {
      const root = rootRef.current;
      if (!root) return;

      root
        .querySelectorAll<HTMLElement>(
          ".ad-eyebrow, .ad-heading, .ad-sub, .ad-panel, .ad-rung, .ad-body, .ad-card, .ad-mascot",
        )
        .forEach((el) => {
          if (Number(getComputedStyle(el).opacity) < 0.99) {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
        });
    }, 1500);

    return () => window.clearTimeout(t);
  }, []);

  /* Subject swap. Fades the panel body so a new subject reads as a fresh set
     rather than as the same quiz with different words. */
  useGSAP(
    () => {
      gsap.fromTo(
        ".ad-body",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: true },
      );
    },
    { dependencies: [set], scope: rootRef },
  );

  /* New question slides in from the direction the marker travelled. */
  useGSAP(
    () => {
      gsap.fromTo(
        ".ad-card",
        { y: dir * 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: true },
      );
    },
    { dependencies: [rung], scope: rootRef },
  );

  /* The completion panel lands with a little more weight than a question
     swap: it is the end of the demo and the handoff to the product. */
  useGSAP(
    () => {
      if (!finished) return;
      gsap.fromTo(
        ".ad-done",
        { y: 24, scale: 0.97, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: "power3.out", overwrite: true },
      );
    },
    { dependencies: [finished], scope: rootRef },
  );

  /* The verdict panel rises once an answer is chosen. */
  useGSAP(
    () => {
      if (phase === "asking") return;
      gsap.fromTo(
        ".ad-verdict",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: true },
      );
    },
    { dependencies: [phase], scope: rootRef },
  );

  return (
    /* `overflow-clip` is what keeps the mascot below inside this section: it is
       positioned against the section box and would otherwise spill over the
       sections either side of it. */
    <section
      ref={rootRef}
      id="adaptive"
      className="relative isolate z-30 overflow-clip py-24 sm:py-32"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* ---------- heading ---------- */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="ad-eyebrow flex items-center justify-center gap-4">
            <span
              aria-hidden
              className="h-px w-10 sm:w-14"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-600) 60%, transparent))",
              }}
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-700">
              Adaptive tutoring
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

          <h2 className="ad-heading mt-6 text-balance font-display text-[clamp(1.65rem,7vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-forest-950">
            <span className="block">It gets harder</span>
            <span className="font-hand mt-1 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-600">
              only when you're ready
            </span>
          </h2>

          <p className="ad-sub mx-auto mt-6 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-forest-950/70">
            Take the test yourself. Answer correctly and the next question steps up. Get one wrong
            and StudyMate explains it, then steps back.
          </p>
        </div>

        {/* ---------- the ladder ---------- */}
        {/* One panel, not two columns.
            Three levels could never fill a 4-column card next to an 8-column
            one, so the ladder became a horizontal strip across the top of the
            question panel itself. Nothing is left holding empty space, and the
            level indicator now sits directly above the question it applies to. */}
        <div className="ad-panel relative mx-auto mt-14 max-w-4xl sm:mt-16">
          <div
            className="relative flex min-h-120 flex-col overflow-hidden rounded-[1.5rem] ring-1 ring-inset ring-white/10 sm:min-h-112"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 0%, var(--forest-800), var(--forest-950) 62%)",
              boxShadow:
                "0 2px 10px -3px color-mix(in oklab, var(--forest-950) 24%, transparent), 0 34px 70px -28px color-mix(in oklab, var(--forest-950) 48%, transparent)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
                backgroundSize: "24px 24px",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 15%, #000 15%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 15%, #000 15%, transparent 100%)",
              }}
            />

            {/* ---- difficulty strip ----
                Horizontal and segmented, so three levels read as a progress bar
                rather than as a list with room left over. */}
            <div className="relative border-b border-white/10 px-6 py-4 sm:px-8 sm:py-5">
              <div className="flex items-center justify-between gap-4">
                {/* Names the subject and chapter, not just "Difficulty". Without
                    it a reader who hits "Start again" gets three new questions
                    with no signal that the SUBJECT changed, which is the whole
                    thing the retry is meant to demonstrate. */}
                <span className="flex min-w-0 items-baseline gap-2">
                  <span className="truncate text-[11px] font-bold uppercase tracking-[0.16em] text-forest-300">
                    {subject.subject}
                  </span>
                  <span className="truncate text-[11.5px] text-white/55">{subject.chapter}</span>
                </span>
                {touched && (
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold transition-colors text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-300"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    New subject
                  </button>
                )}
              </div>

              <ol className="ad-rungs mt-3 grid grid-cols-3 gap-2">
                {LEVELS.map(({ level, blurb }, i) => {
                  const on = i === rung;
                  const cleared = i < best;
                  return (
                    <li key={level} className="ad-rung">
                      {/* Active rung is forest-600, not the brighter forest-500:
                          white on forest-500 measures 3.41:1, under the 4.5:1
                          minimum for text this size. forest-600 reaches 5.15:1
                          and still reads as clearly active next to the dim
                          rungs. */}
                      <div
                        className={`rounded-xl px-3 py-2.5 transition-all duration-500 ${
                          on
                            ? "bg-forest-600 text-white"
                            : cleared
                              ? "bg-forest-500/15 text-white/70"
                              : "bg-white/5 text-white/35"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {/* Cleared levels keep a tick even after the reader
                              drops back, so progress is never erased. */}
                          <span
                            aria-hidden
                            className={`grid h-4 w-4 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                              on
                                ? "bg-white/25 text-white"
                                : cleared
                                  ? "bg-forest-500/30 text-forest-300"
                                  : "bg-white/10 text-transparent"
                            }`}
                          >
                            {cleared && !on ? (
                              <Check className="h-2.5 w-2.5" />
                            ) : on ? (
                              <Minus className="h-2.5 w-2.5" />
                            ) : null}
                          </span>
                          <span className="truncate text-[13px] font-bold tracking-[-0.01em]">
                            {level}
                          </span>
                        </div>
                        {/* One line of what the level tests, so the strip carries
                            meaning rather than just three labels. */}
                        <span
                          className={`mt-1 hidden truncate text-[11px] sm:block ${
                            on ? "text-white/75" : "text-white/30"
                          }`}
                        >
                          {blurb}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* ---- the question ----
                Plain content now, not a card: the panel it used to sit inside is
                gone, so this simply fills the body of the single outer panel. */}
            <div className="ad-body relative flex flex-1 flex-col p-6 sm:p-8">
              {/* No texture layer and no level label here: the outer panel
                    already carries the texture, and the difficulty strip above
                    names the level. Both were duplicated when the two cards
                    merged into one. */}

              {finished ? (
                /* ---- completion ----
                   The reader has just answered the hardest question correctly,
                   which is the single best moment on the page to invite them in.
                   Ending the demo silently would waste it. */
                <div className="ad-done relative flex flex-1 flex-col items-center justify-center py-6 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-500 text-forest-950">
                    <Check className="h-7 w-7" />
                  </span>

                  <h3 className="mt-5 font-display text-[clamp(1.25rem,4.5vw,2rem)] font-extrabold leading-tight tracking-[-0.03em] text-white">
                    All three levels, cleared
                  </h3>

                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">
                    That was one topic from one chapter. StudyMate does this across every chapter of
                    every book on your shelf, and remembers where you left off.
                  </p>

                  <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
                    <MagneticButton
                      as="a"
                      href={APP_URL}
              {...EXTERNAL_LINK_PROPS}
                      variant="solid"
                      size="lg"
                      roll={false}
                      className="group"
                    >
                      Practise on your own books
                      <span className="relative grid h-5 w-5 place-items-center overflow-hidden">
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-5 group-hover:translate-x-5" />
                        <ArrowUpRight className="absolute h-5 w-5 -translate-x-5 translate-y-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                      </span>
                    </MagneticButton>

                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[14px] font-bold text-white/60 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-300"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Try another subject
                    </button>
                  </div>

                  {/* The offer, given real weight.
                      At white/35 this was the dimmest thing on the panel despite
                      being the actual reason to click. It now reads as a badge:
                      an emerald pill, the number set large in tabular figures,
                      and "No card required" as a separate reassurance behind a
                      divider rather than trailing on the same grey line. */}
                  <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full bg-forest-500/14 px-4 py-2.5 ring-1 ring-inset ring-forest-400/30">
                    <span className="flex items-center gap-1.5 text-[13.5px] font-bold text-white">
                      <span className="font-numeric text-[16px] font-extrabold text-forest-300">
                        5,000
                      </span>
                      free credits to start
                    </span>
                    <span aria-hidden className="hidden h-3.5 w-px bg-white/20 sm:block" />
                    <span className="text-[13px] font-semibold text-white/60">
                      No card required
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Keyed on `rung` so React remounts and the entrance replays. */}
                  <div key={rung} className="ad-card relative mt-5 flex-1">
                    <p className="font-display text-[clamp(1.05rem,3.5vw,1.6rem)] font-extrabold leading-snug tracking-[-0.02em] text-white">
                      {current.q}
                    </p>

                    {/* Options. Once answered they lock and reveal: the chosen one
                      is marked right or wrong, and the correct one is always
                      shown, since a test that hides the answer teaches nothing. */}
                    <div className="mt-5 space-y-2.5">
                      {current.options.map((opt, i) => {
                        const isAnswer = i === current.answer;
                        const isPicked = i === picked;
                        const revealed = phase !== "asking";

                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => choose(i)}
                            disabled={revealed}
                            aria-label={
                              revealed && isAnswer
                                ? `${opt} — correct answer`
                                : revealed && isPicked
                                  ? `${opt} — your answer, incorrect`
                                  : opt
                            }
                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[14.5px] font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-300 ${
                              revealed && isAnswer
                                ? "bg-forest-500 text-forest-950 ring-1 ring-inset ring-forest-300"
                                : revealed && isPicked
                                  ? "bg-[#C0453B]/25 text-white ring-1 ring-inset ring-[#E07A70]/50"
                                  : revealed
                                    ? "bg-white/5 text-white/35"
                                    : "bg-white/8 text-white ring-1 ring-inset ring-white/15 hover:-translate-y-0.5 hover:bg-white/14 hover:ring-white/30"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold transition-colors duration-300 ${
                                revealed && isAnswer
                                  ? "bg-forest-950 text-forest-300"
                                  : revealed && isPicked
                                    ? "bg-[#E07A70] text-forest-950"
                                    : "bg-white/12 text-white/70"
                              }`}
                            >
                              {revealed && isAnswer ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : revealed && isPicked ? (
                                <X className="h-3.5 w-3.5" />
                              ) : (
                                String.fromCharCode(65 + i)
                              )}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ---- verdict ---- */}
                  <div className="relative mt-6">
                    {phase === "asking" ? (
                      !touched && (
                        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-forest-300">
                          Pick an answer, and watch
                        </p>
                      )
                    ) : (
                      <div className="ad-verdict">
                        {/* The explanation. This is the product's actual behaviour:
                          not a score, but the reasoning, given either way. */}
                        <div className="rounded-xl bg-white/6 p-4 ring-1 ring-inset ring-white/12">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
                              phase === "right" ? "text-forest-300" : "text-[#E8C566]"
                            }`}
                          >
                            {phase === "right" ? "Correct" : "Not quite"}
                          </span>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
                            {current.why}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={advance}
                            className="inline-flex items-center gap-2 rounded-full bg-forest-500 px-5 py-3 text-[14px] font-bold text-forest-950 transition-all duration-300 hover:bg-forest-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-300"
                          >
                            {phase === "right"
                              ? atTop
                                ? "Finish"
                                : "Next question"
                              : "Try an easier one"}
                          </button>
                          <span className="text-[13px] text-white/55">
                            {phase === "right"
                              ? atTop
                                ? "That is the hardest rung on this topic."
                                : "StudyMate steps you up a level."
                              : rung === 0
                                ? "StudyMate stays here until the basics are solid."
                                : "StudyMate steps back and rebuilds from there."}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- mascot ----------
          Fills the empty right-hand gutter the centred quiz panel leaves behind.
          The panel is capped at max-w-4xl inside a max-w-site band, so on a wide
          screen everything from the panel edge outward sat blank — this puts the
          brand's character in it rather than widening a measure that is
          deliberately narrow.

          Anchored to the SECTION, not the panel: it is decoration sitting in the
          margin, so it hangs off the section's bottom-right corner and lets the
          quiz keep its own centred alignment.

          `xl:block`, hidden below. Between lg and xl the gutter is too narrow to
          hold it without crowding the panel, and on a phone there is no gutter at
          all — a decorative 2.7 MB render is not worth a horizontal squeeze or
          the bandwidth on the screen least able to afford it. */}
      <img
        src="/maskot-1.png"
        alt=""
        aria-hidden
        /* `loading="lazy"` + `decoding="async"`: this sits far down the page and
           is purely decorative, so it must not compete with the fonts, the hero
           video or the sections above it for bandwidth on first paint. */
        loading="lazy"
        decoding="async"
        className="ad-mascot pointer-events-none absolute -bottom-10 right-0 hidden h-auto w-60 select-none xl:block 2xl:w-70"
        style={{
          /* The PNG's corners are already transparent (alpha 0) and its amber
             glow fades out through the alpha channel, so it needs no cutout. The
             mask only softens the two inner edges where the render meets the
             quiz panel, so the character dissolves into the page rather than
             ending on a straight cut. */
          WebkitMaskImage:
            "linear-gradient(to top, #000 72%, transparent 100%), linear-gradient(to left, #000 78%, transparent 100%)",
          maskImage:
            "linear-gradient(to top, #000 72%, transparent 100%), linear-gradient(to left, #000 78%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      />
    </section>
  );
}
