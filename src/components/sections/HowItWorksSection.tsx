import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The five onboarding steps, adapted from the brochure's "Getting Started Is Simple".
 *
 * Copy decisions that differ from the brochure, on purpose:
 *
 *   1. Titles are verb phrases the student performs ("Set your syllabus"), not
 *      product nouns ("Select Curriculum"). The reader is picturing themselves
 *      doing this, so the copy belongs in their hands.
 *   2. The brochure's "Hire StudyMate" step is dropped entirely: choosing an
 *      agent is not something a first-time visitor needs to weigh up here, and
 *      it added a decision to a list whose job is to feel effortless.
 *   3. The free-credits offer moved onto step 1, where it kills the signup
 *      objection, rather than a later step nobody has reached yet.
 *
 * `time` is the strongest reassurance available here: a list of steps looks like work
 * until each one is stamped with how little it costs.
 */
const STEPS = [
  {
    n: "01",
    title: "Create your account",
    desc: "One form, and 5,000 credits land in your account to spend on tutoring, tests and reports.",
    time: "30 sec",
    point: "5,000 free credits",
    image: "/how/create-your-account.webp",
    alt: "A sign-up card with credit tokens arriving beside it",
  },
  {
    n: "02",
    title: "Set your syllabus",
    desc: "Pick country, board and standard once. Every answer afterwards stays inside that syllabus.",
    time: "1 min",
    point: "Answers match your board",
    image: "/how/set-your-syllabus.webp",
    alt: "A globe with selector cards cascading from it",
  },
  {
    n: "03",
    title: "Open your bookshelf",
    desc: "Your textbooks arrive already processed, so any chapter is searchable the moment you open it.",
    time: "Instant",
    point: "Nothing to upload",
    image: "/how/open-your-bookshelf.webp",
    alt: "A row of textbooks with the centre one opening and glowing",
  },
  {
    n: "04",
    title: "Work through a topic",
    desc: "Ask questions in plain language and the session re-paces itself around what you already know.",
    time: "Your pace",
    point: "Adapts as you learn",
    image: "/how/work-through-a-topic.webp",
    alt: "An open book with chat bubbles rising from its pages",
  },
  {
    n: "05",
    title: "Test, then see the gaps",
    desc: "Generate a paper, get it evaluated instantly, and see exactly which chapters still need work.",
    time: "Ongoing",
    point: "See gaps by chapter",
    image: "/how/test-then-see-the-gaps.webp",
    alt: "A quiz card beside a progress ring and a rising analytics graph",
  },
] as const;

/** Seconds each step holds before the section advances on its own. */
const DWELL = 5;

/**
 * HowItWorksSection — a stage with a step index.
 *
 * Placement: section 1 says what StudyMate is, section 2 says why it is needed.
 * A reader convinced by those has one question left, "how do I actually use
 * this", and this answers it. It is also the page's highest-intent block for
 * search, hence the HowTo markup.
 *
 * Design: the renders are dark, cinematic and edge-to-edge, so they cannot
 * be shrunk into icon slots without throwing away everything that makes them
 * good. The section is therefore built AROUND one large stage: a single dark
 * panel showing the active step at full bleed, with the titles listed beside
 * it as an index. Hovering or focusing an index row swaps the stage.
 *
 * That solves the problem every earlier version had. Equal cards force each
 * image to be tiny and force the layout into a grid; one stage plus an index
 * gives the imagery real scale and gives the steps a single reading order.
 * It is also genuinely interactive rather than another static arrangement.
 *
 * The section plays itself: each row's top rule fills over DWELL seconds and
 * advances to the next step when it lands, so a reader who does nothing still
 * sees them all. Hovering, focusing or clicking any row takes control and stops
 * the rotation permanently, since a carousel that resumes under the cursor
 * fights the person using it.
 *
 * Compact by request: one screen, no pin, no scroll capture.
 *
 * STACKING, and a trap to be aware of when adding sections:
 * this section carries `z-20` plus a negative top margin so it rides up over
 * the Problem section's sticky card stack. Because the page sections share one
 * stacking context, an explicit z-index paints above the default `auto`
 * regardless of DOM order, so EVERY section after this one must state a z-index
 * above 20. A later section left on `auto` ends up underneath this one. That is
 * what made the Adaptive quiz vanish in production: it rendered with opacity 1
 * and correct transforms, and the tall dark Chat panel was simply painted over
 * the top of it.
 */
export default function HowItWorksSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  /* Set once the reader hovers or focuses a row. Auto-advance never resumes
     afterwards: a carousel that starts moving again under the cursor fights the
     person using it. */
  const [taken, setTaken] = useState(false);
  const [inView, setInView] = useState(false);

  /** Hover, focus and click all mean "show me this one, and stop rotating". */
  const pick = (i: number) => {
    setActive(i);
    setTaken(true);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* SplitText measures glyph boxes at split time, so a split against
           fallback metrics mis-positions every character once the webfont lands. */
        refreshAfterFonts();

        /* Words as well as chars: with chars alone, word boundaries cease to
           exist and the browser breaks lines mid-word. */
        const heading = new SplitText(".hw-heading", { type: "words,chars" });

        gsap
          .timeline({
            scrollTrigger: { trigger: rootRef.current, start: "clamp(top 78%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".hw-eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            heading.chars,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.015 },
            0.08,
          )
          .fromTo(".hw-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.36)
          .fromTo(
            ".hw-stage",
            { y: 40, scale: 0.97, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 1 },
            0.2,
          )
          .fromTo(
            ".hw-item",
            { x: 24, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.07 },
            0.4,
          );

        return () => heading.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hw-eyebrow, .hw-heading, .hw-sub, .hw-stage, .hw-item", {
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  /* Cross-fade the stage whenever the active step changes.
     Every non-active shot is explicitly driven to 0 as well as the active one to
     1. The earlier version only animated the incoming image: GSAP then wrote an
     inline opacity that outlived React's `style` prop, so previously-shown
     images stayed at opacity 1 stacked on top and the stage displayed the wrong
     step. Both directions must be written every time. */
  useGSAP(
    () => {
      STEPS.forEach((_, i) => {
        const on = i === active;
        gsap.to(`.hw-shot-${i}`, {
          opacity: on ? 1 : 0,
          scale: on ? 1 : 1.04,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        });
      });

      gsap.fromTo(
        ".hw-caption",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: true },
      );
    },
    { dependencies: [active], scope: rootRef },
  );

  /* Auto-advance, driven by the active row's own progress bar.
     The bar IS the timer: it fills over DWELL seconds and advances the step in
     its onComplete, so what the reader sees and when the step changes can never
     drift apart. Runs only while the section is on screen and only until the
     reader takes over. */
  useGSAP(
    () => {
      /* Every bar resets; only the active one fills. */
      gsap.set(".hw-progress", { scaleX: 0 });
      if (taken || !inView) return;

      gsap.to(`.hw-progress-${active}`, {
        scaleX: 1,
        duration: DWELL,
        ease: "none",
        onComplete: () => setActive((i) => (i + 1) % STEPS.length),
      });
    },
    { dependencies: [active, taken, inView], scope: rootRef },
  );

  /* Only rotate while the section is actually visible, so the step showing when
     the reader arrives is step 1 rather than whatever it advanced to off-screen.

     IntersectionObserver, NOT ScrollTrigger. This is the fix for the hard-refresh
     crash, and the reason is structural rather than cosmetic:

     `inView` is a dependency of the rotation useGSAP below, so every time this
     value flips, that hook disposes its gsap.Context and builds a new one. When
     the flag came from a ScrollTrigger's own `onToggle`, that teardown ran while
     ScrollTrigger was still inside `self.refresh()`, walking `_triggers`
     backwards from its own index:

         while (i-- > 0) {
           curTrigger = _triggers[i];
           curTrigger.end || curTrigger.refresh(0, 1);   // <-- throws
         }

     A trigger killed by that re-render shortens `_triggers` mid-walk, `i` then
     points past the end, and `curTrigger.end` throws
     "Cannot read properties of undefined (reading 'end')" straight into React's
     render pass, where the error boundary catches it and blanks the page. The
     180 "Invalid scope" warnings that follow are the aftermath: once the tree is
     torn down every rootRef is null.

     `queueMicrotask` was not enough, because a microtask still runs before the
     synchronous refresh loop that scheduled it has finished unwinding.

     IntersectionObserver has no shared global registry to corrupt, fires from
     its own task, and expresses "is this section on screen" more directly than
     a scroll-position trigger does. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    /* No IntersectionObserver (very old browser): leave the rotation running
       rather than freezing the section on step 1 forever. */
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      /* Matches the old "top 85% / bottom 15%" band closely enough: start
         rotating just before the section is fully on screen, stop once it is
         mostly gone. */
      { rootMargin: "-15% 0px -15% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* HowTo structured data. Search engines can render these steps directly in
     results, the highest-value markup available to this page. Derived from STEPS
     so the two cannot drift apart. */
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to study with StudyMate AI",
    description:
      "Five steps to start learning with StudyMate AI: create your account, set your syllabus, open your bookshelf, work through a topic, then test and see the gaps.",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  return (
    /* Rides up over the section above via negative margin and stacking order.
       Pure CSS: the section above uses sticky internally for its own card stack,
       so a pin here would fight it. */
    <section ref={rootRef} id="how" className="relative isolate z-20 -mt-16 p-2 sm:-mt-24 sm:p-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />

      <div className="relative overflow-clip rounded-[1.75rem] bg-surface py-20 sm:rounded-[2.25rem] sm:py-28">
        <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          {/* ---------- heading ----------
              Centred, with the eyebrow flanked by rules on both sides. Every
              other section on the page uses this exact treatment, so an
              off-centre heading here read as a mistake rather than as variety. */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="hw-eyebrow flex items-center justify-center gap-4">
              <span
                aria-hidden
                className="h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-600) 60%, transparent))",
                }}
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-700">
                How it works
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

            <h2 className="hw-heading mt-6 text-balance font-display text-[clamp(1.65rem,7vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-forest-950">
              <span className="block">Five steps.</span>
              <span className="font-hand mt-1 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-600">
                About five minutes
              </span>
            </h2>

            <p className="hw-sub mx-auto mt-6 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-forest-950/70">
              From sign-up to your first tracked test in a single sitting. Nothing to install and no
              manual to read.
            </p>
          </div>

          {/* ---------- stage + index ---------- */}
          <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
            {/* ---- the stage ----
                All renders stack in one 3:2 frame and cross-fade. The images
                are already dark and edge to edge, so they are used at full bleed
                with no padding: cropping them into a small slot would discard the
                composition that makes them worth having. */}
            <div className="hw-stage relative lg:col-span-7">
              <div
                className="relative aspect-[3/2] w-full overflow-hidden rounded-[1.5rem] ring-1 ring-inset ring-forest-950/10"
                style={{
                  boxShadow:
                    "0 2px 10px -3px color-mix(in oklab, var(--forest-950) 22%, transparent), 0 34px 70px -30px color-mix(in oklab, var(--forest-950) 48%, transparent)",
                }}
              >
                {STEPS.map(({ image, alt, n }, i) => (
                  <img
                    key={n}
                    src={image}
                    alt={alt}
                    width={1200}
                    height={800}
                    /* Only the first is eager: the rest load as the reader
                       explores, and swapping is instant once cached. */
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`hw-shot-${i} absolute inset-0 h-full w-full object-cover`}
                    style={{ opacity: i === active ? 1 : 0 }}
                  />
                ))}

                {/* Caption plate, bottom-left. Sits ON the render rather than
                    beneath it, so the stage stays one object. The scrim keeps the
                    text legible over whichever frame is showing. */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(3,26,16,0.82), rgba(3,26,16,0.45) 45%, transparent)",
                  }}
                >
                  <div className="hw-caption">
                    {/* Payoff first, at emerald and in caps. The image alone does
                        not say what the reader gains from the step, and the plate
                        is where their eye already is. */}
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-numeric text-[12px] font-extrabold tracking-[0.16em] text-forest-300">
                        {STEPS[active].n}
                      </span>
                      <span
                        aria-hidden
                        className="h-px w-6"
                        style={{
                          background:
                            "linear-gradient(90deg, color-mix(in oklab, var(--forest-300) 70%, transparent), transparent)",
                        }}
                      />
                      <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-forest-300">
                        {STEPS[active].point}
                      </span>
                      <span aria-hidden className="h-3 w-px bg-white/20" />
                      <span className="font-numeric text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                        {STEPS[active].time}
                      </span>
                    </span>

                    {/* The step title, at display size on the plate. Previously
                        the title lived only in the index, so the stage showed an
                        image with no idea what it depicted. */}
                    <h3 className="mt-2.5 font-display text-[clamp(1.1rem,3.8vw,1.75rem)] font-extrabold leading-tight tracking-[-0.03em] text-white">
                      {STEPS[active].title}
                    </h3>

                    <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-white/75">
                      {STEPS[active].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- the index ----
                An ordered list of buttons. `<ol>` because the sequence is the
                meaning; buttons because each one is genuinely actionable, which
                also makes the whole thing keyboard-navigable for free. */}
            <ol className="lg:col-span-5">
              {STEPS.map(({ n, title, time, point }, i) => {
                const on = i === active;
                return (
                  <li key={n} className="hw-item">
                    <button
                      type="button"
                      onMouseEnter={() => pick(i)}
                      onFocus={() => pick(i)}
                      onClick={() => pick(i)}
                      aria-current={on ? "step" : undefined}
                      /* NO `border-t` here.
                         A CSS border sits outside the element's box at 1px while
                         the progress bar sat inside it at 2px, so the two rules
                         were offset by a pixel and different weights — the line
                         visibly stepped up and down where one met the other. The
                         divider is now drawn by the track below, which the fill
                         runs along, so there is only ever ONE line. */
                      className="group relative flex w-full items-baseline gap-4 py-4 text-left outline-none sm:gap-5 sm:py-5"
                    >
                      {/* Track and fill share one box, so the resting rule and
                          the timer are the same line at the same weight. The
                          track is the divider; the fill is the countdown, which
                          advances the step when it completes. */}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px overflow-hidden"
                        style={{
                          background: "color-mix(in oklab, var(--forest-950) 8%, transparent)",
                        }}
                      >
                        <span
                          className={`hw-progress hw-progress-${i} block h-full w-full origin-left`}
                          style={{
                            /* Reader-driven rows have no countdown to show, so
                               the bar simply sits filled on the active one. */
                            transform: taken ? (on ? "scaleX(1)" : "scaleX(0)") : "scaleX(0)",
                            transition: taken
                              ? "transform 400ms cubic-bezier(0.22,1,0.36,1)"
                              : "none",
                            background:
                              "linear-gradient(90deg, var(--forest-600), color-mix(in oklab, var(--forest-400) 70%, transparent))",
                          }}
                        />
                      </span>

                      <span
                        className={`font-numeric text-[clamp(1.3rem,3.6vw,2rem)] font-extrabold leading-none tracking-[-0.04em] transition-colors duration-400 ${
                          on
                            ? "text-forest-600"
                            : "text-forest-950/15 group-hover:text-forest-950/30"
                        }`}
                      >
                        {n}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-[clamp(0.98rem,3vw,1.35rem)] font-extrabold leading-tight tracking-[-0.025em] transition-colors duration-400 ${
                            on
                              ? "text-forest-950"
                              : "text-forest-950/70 group-hover:text-forest-950"
                          }`}
                        >
                          {title}
                        </span>

                        {/* The payoff line. The title says what the reader DOES;
                            this says what they GET, which is the part that earns
                            attention. Previously it only existed in the caption
                            over the image, so most benefits were
                            invisible at any moment. */}
                        <span
                          className={`mt-1 flex items-center gap-1.5 transition-colors duration-400 ${
                            on ? "text-forest-700" : "text-forest-950/70"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`h-1 w-1 shrink-0 rounded-full transition-colors duration-400 ${
                              on ? "bg-forest-500" : "bg-forest-950/25"
                            }`}
                          />
                          <span className="text-[12.5px] font-bold leading-snug">{point}</span>
                        </span>
                      </span>

                      <span
                        className={`shrink-0 font-numeric text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-400 ${
                          on ? "text-forest-700" : "text-forest-950/30"
                        }`}
                      >
                        {time}
                      </span>
                    </button>
                  </li>
                );
              })}

              {/* Closing rule. Each row draws only its own top line, so without
                  this the list would trail off after the last item. Same weight
                  and colour as the tracks above it. */}
              <span
                aria-hidden
                className="block h-px w-full"
                style={{ background: "color-mix(in oklab, var(--forest-950) 8%, transparent)" }}
              />
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
