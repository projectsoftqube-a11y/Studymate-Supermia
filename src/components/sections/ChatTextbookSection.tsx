import { useRef, useState } from "react";
import { ArrowUp, BookOpen, Quote, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The exchange shown in the transcript, taken from the brochure's AI Tutor Chat
 * screen (page 3). Rational numbers rather than a softer example on purpose: the
 * answer has real structure, which is what demonstrates teaching rather than
 * summarising.
 *
 * Each property is its own entry so the answer can build one line at a time, the
 * way the product streams a reply.
 */
const QUESTION = "Explain the topic: Properties of Rational Numbers";

const ANSWER_INTRO =
  "Rational numbers follow four arithmetic properties. Here is each one, with what it means in practice:";

const PROPERTIES = [
  {
    name: "Closure",
    body: "Add, subtract or multiply two rational numbers and the result is always rational. Division works too, as long as you are not dividing by zero.",
  },
  {
    name: "Commutative",
    body: "Order does not matter for addition or multiplication. a + b is the same as b + a.",
  },
  {
    name: "Associative",
    body: "Grouping does not matter either. (a + b) + c gives the same answer as a + (b + c).",
  },
  {
    name: "Distributive",
    body: "Multiplication spreads across addition: a x (b + c) is the same as (a x b) + (a x c).",
  },
] as const;

/**
 * ChatTextbookSection — the product, performing itself.
 *
 * Placement, fifth: the reader has been told what StudyMate is, why it is needed,
 * how to start, and that the results are measurable. What they have not seen is
 * the thing actually working. Every section so far has been argument or outcome;
 * this is the first that shows the product in use.
 *
 * Design: the transcript types itself out as the section enters. The question
 * appears, a thinking indicator pulses, then the answer builds line by line. The
 * same principle as the analytics dashboard assembling itself — demonstrating
 * beats describing, and a static screenshot of a chat proves nothing.
 *
 * The detail that matters most is the citation. "Ask a question, get an answer"
 * is what every chatbot does; answering FROM the student's own chapter, with the
 * page cited, is the actual product. That is why the source line is styled as a
 * first-class element rather than a footnote.
 *
 * Text is real DOM, not canvas or images: it stays selectable, crawlable and
 * sharp, and the typing effect is opacity on pre-rendered lines rather than
 * characters being written into the document.
 */
export default function ChatTextbookSection() {
  const rootRef = useRef<HTMLElement>(null);
  /* Drives the caret under the last visible line. Held in state so the caret is
     a real element rather than a CSS pseudo that GSAP cannot see. */
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* SplitText measures glyph boxes at split time, so a split against
           fallback metrics mis-positions every character once the webfont lands. */
        refreshAfterFonts();

        /* Words as well as chars: with chars alone, word boundaries cease to
           exist and the browser breaks lines mid-word. */
        const heading = new SplitText(".ct-heading", { type: "words,chars" });

        gsap
          .timeline({
            scrollTrigger: { trigger: ".ct-head", start: "clamp(top 82%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".ct-eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            heading.chars,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.015 },
            0.08,
          )
          .fromTo(".ct-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.36)
          /* Claims land before the transcript starts, so the reader knows what
             the demonstration is about to prove. */
          .fromTo(
            ".ct-claims li",
            { x: -16, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.09 },
            0.5,
          )
          .fromTo(".ct-note", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.8);

        /* The conversation plays out once, in the order it would really happen:
           the student's question lands, the tutor thinks, then the reply builds.
           Timing is deliberately unhurried — a reply that appears instantly reads
           as a canned graphic rather than as something being worked out. */
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".ct-window", start: "clamp(top 74%)", once: true },
          defaults: { ease: "power3.out" },
          onComplete: () => setDone(true),
        });

        tl.fromTo(
          ".ct-window",
          { y: 40, scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1 },
          0,
        )
          .fromTo(".ct-source", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.25)
          /* Question arrives from the right, the way the student's own message
             would slide in. */
          .fromTo(".ct-question", { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0.5)
          /* Thinking dots appear, hold, then hand off to the answer. */
          .fromTo(".ct-thinking", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9)
          .to(".ct-thinking", { opacity: 0, duration: 0.3 }, 2.0)
          .fromTo(
            ".ct-answer-head",
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            2.1,
          )
          .fromTo(".ct-intro", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 2.35)
          /* Properties build one at a time. The stagger IS the effect: it reads
             as a reply being composed rather than pasted. */
          .fromTo(
            ".ct-prop",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.45 },
            2.6,
          )
          .fromTo(".ct-cite", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
          .fromTo(
            ".ct-follow",
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
            "-=0.1",
          );

        return () => heading.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        /* No typing. Show the finished transcript, since the content is the
           point and a person who asked for less motion still needs to read it. */
        gsap.set(
          ".ct-window, .ct-source, .ct-question, .ct-answer-head, .ct-intro, .ct-prop, .ct-cite, .ct-follow, .ct-claims li, .ct-note",
          { clearProps: "all", opacity: 1 },
        );
        gsap.set(".ct-thinking", { display: "none" });
        setDone(true);
      });
    },
    { scope: rootRef },
  );

  return (
    /* Inset dark stage, matching the hero and problem sections. The previous
       version was a white window on a white page: no contrast, no depth, and the
       whole section read as one flat column. A dark field makes the chat glow
       like a lit screen, which is what it is. */
    <section ref={rootRef} id="chat" className="relative isolate z-30 p-2 sm:p-3">
      <div
        className="relative overflow-clip rounded-[1.75rem] py-20 sm:rounded-[2.25rem] sm:py-28"
        style={{
          background:
            "radial-gradient(130% 100% at 15% 0%, var(--forest-800), var(--forest-950) 58%)",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.13) 1px, transparent 0)",
            backgroundSize: "26px 26px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 25% 30%, #000 10%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 70% 60% at 25% 30%, #000 10%, transparent 100%)",
          }}
        />

        {/* Emerald bloom behind the chat window, so the screen reads as the
            light source in the scene. */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/4 h-[34rem] w-[34rem] translate-x-1/4 rounded-full opacity-50 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 40%, transparent), transparent 70%)",
          }}
        />

        {/* `items-start`, not `items-center`. Centring vertically left the copy
            column floating in the middle of a much taller chat window, which is
            what opened the dead zone in the lower left. Both columns now hang
            from the same top edge. */}
        <div className="relative mx-auto grid max-w-site grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
          {/* ---------- heading, beside the chat rather than above it ----------
              A centred heading over a centred box is the most generic possible
              arrangement. Setting the argument to the left and the evidence to
              the right gives the section a reading direction. */}
          <div className="ct-head lg:col-span-5">
            <span className="ct-eyebrow flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-300">
                Ask anything
              </span>
              <span
                aria-hidden
                className="h-px w-14"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in oklab, var(--forest-300) 60%, transparent), transparent)",
                }}
              />
            </span>

            <h2 className="ct-heading mt-6 text-balance font-display text-[clamp(1.65rem,7vw,3.4rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
              <span className="block">Stuck on a chapter?</span>
              <span className="font-hand mt-1 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-300">
                Just ask the book
              </span>
            </h2>

            <p className="ct-sub mt-6 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-white/65">
              StudyMate answers from the chapter in front of you and shows you the page it came
              from, so you can always check for yourself.
            </p>

            {/* Three claims the transcript then proves. Stating them beside the
                evidence rather than under it means the reader knows what to look
                for while the reply types itself out. */}
            <ul className="ct-claims mt-8 space-y-3">
              {[
                "Answers in plain language, not textbook language",
                "Every answer cites the page it came from",
                "Ask follow-ups until it actually clicks",
              ].map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-400"
                  />
                  <span className="text-[14px] leading-relaxed text-white/70">{c}</span>
                </li>
              ))}
            </ul>

            {/* Anchors the bottom of this column, which otherwise ended well
                short of the transcript beside it. Also states the boundary
                plainly: a tutor that refuses to just hand over answers is a
                feature to parents and a promise to teachers, so it belongs in
                the argument rather than buried in small print. */}
            <div className="ct-note mt-10 rounded-2xl bg-white/6 p-5 ring-1 ring-inset ring-white/12">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-forest-300" />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-forest-300">
                  Built to teach
                </span>
              </div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">
                StudyMate walks you through the reasoning instead of handing over a finished answer,
                so the next question gets easier rather than harder.
              </p>
            </div>
          </div>

          {/* ---------- the transcript ---------- */}
          <div className="ct-window relative lg:col-span-7">
            <div
              /* Deeper shadow and a bright rim now that this sits on a dark field:
               on white the old subtle treatment was enough, but against forest it
               needs to read as a lit panel lifted off the surface. */
              className="relative overflow-hidden rounded-[1.75rem] bg-surface ring-1 ring-white/12"
              style={{
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.9) inset, 0 2px 8px -2px rgba(3,26,16,0.5), 0 40px 90px -30px rgba(3,26,16,0.75)",
              }}
            >
              {/* Which book and page this conversation is happening inside. Named
                at the top so the reply below is understood as coming FROM the
                chapter, not from the internet. */}
              <div className="ct-source flex items-center gap-3 border-b border-forest-950/8 bg-forest-500/[0.04] px-5 py-4 sm:px-6">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-500/12 text-forest-700 ring-1 ring-inset ring-forest-700/12">
                  <BookOpen className="h-[17px] w-[17px]" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-bold text-forest-950">
                    Mathematics · Class 8
                  </span>
                  <span className="block truncate text-[11.5px] text-forest-950/70">
                    Chapter 1 · Rational Numbers
                  </span>
                </span>
                <span className="ml-auto hidden shrink-0 rounded-full bg-forest-500/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-forest-700 sm:block">
                  Your book
                </span>
              </div>

              {/* ---- conversation ---- */}
              <div className="px-5 py-6 sm:px-7 sm:py-8">
                {/* Student's question, right-aligned like a sent message. */}
                <div className="ct-question flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-forest-950 px-4 py-3 text-[14.5px] font-medium leading-relaxed text-white sm:max-w-[75%]">
                    {QUESTION}
                  </p>
                </div>

                {/* Thinking indicator. Occupies the same row the answer will, so
                  nothing jumps when it hands over. */}
                <div className="ct-thinking mt-5 flex items-center gap-2">
                  <span className="text-[12px] font-bold text-forest-700">
                    StudyMate is reading
                  </span>
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-forest-500"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>

                {/* Tutor's reply. */}
                <div className="mt-5">
                  <div className="ct-answer-head flex items-center gap-2.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-forest-600 text-white">
                      <span className="text-[11px] font-extrabold">SM</span>
                    </span>
                    <span className="text-[12.5px] font-bold text-forest-950">StudyMate</span>
                    <span className="text-[11.5px] text-forest-950/35">Tutor</span>
                  </div>

                  <div className="mt-3 rounded-2xl rounded-tl-md bg-forest-500/[0.055] p-5 ring-1 ring-inset ring-forest-700/10">
                    <p className="ct-intro text-[14.5px] leading-relaxed text-forest-950/75">
                      {ANSWER_INTRO}
                    </p>

                    <ol className="mt-4 space-y-3.5">
                      {PROPERTIES.map(({ name, body }, i) => (
                        <li key={name} className="ct-prop flex gap-3">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest-600 font-numeric text-[10.5px] font-extrabold text-white">
                            {i + 1}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[14px] font-bold text-forest-950">
                              {name} property
                            </span>
                            <span className="mt-0.5 block text-[13.5px] leading-relaxed text-forest-950/70">
                              {body}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>

                    {/* The citation. This is the section's whole argument: not that
                      an AI answered, but that it answered from THIS page and will
                      show you where. Styled as a first-class element rather than
                      a footnote for exactly that reason. */}
                    <div className="ct-cite mt-5 flex items-start gap-2.5 border-t border-forest-700/12 pt-4">
                      <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
                      <span className="text-[12.5px] leading-relaxed text-forest-950/70">
                        From your textbook,{" "}
                        <span className="font-bold text-forest-800">page 4</span>.
                        {done && (
                          <button
                            type="button"
                            className="ml-1.5 font-bold text-forest-700 underline decoration-forest-500/40 decoration-2 underline-offset-2 transition-colors hover:text-forest-600"
                          >
                            Open the page
                          </button>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Suggested follow-ups. Shows the conversation continues, which
                    is what separates a tutor from a search result. */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Give me an example", "Quiz me on this", "Explain it simpler"].map((q) => (
                      <button
                        key={q}
                        type="button"
                        /* Tinted, not `bg-surface`: these sit on the white card,
                           so a white chip with a hairline ring was effectively
                           invisible. A soft emerald fill reads as a tappable
                           suggestion. */
                        className="ct-follow rounded-full bg-forest-500/10 px-3.5 py-2 text-[12.5px] font-bold text-forest-800 ring-1 ring-inset ring-forest-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-600 hover:text-white hover:ring-forest-600"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Composer. Non-functional by design — this is a demonstration, not
                a live chat — but present because its absence would make the
                window read as a screenshot rather than as the product. */}
              <div className="flex items-center gap-3 border-t border-forest-950/8 px-5 py-4 sm:px-6">
                <span className="flex-1 truncate text-[13.5px] text-forest-950/30">
                  Ask anything about this chapter
                </span>
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest-600 text-white"
                >
                  <ArrowUp className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
