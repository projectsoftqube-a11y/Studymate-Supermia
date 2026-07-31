import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { refreshAfterFonts } from "@/lib/scroll-refresh";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

/**
 * A fortnight of practice-test averages, matching the brochure's "Score Trend
 * (Last 14 Days)" chart. Deliberately not a smooth climb: real revision dips,
 * and a curve that only ever rises reads as marketing rather than as data.
 */
const TREND = [48, 52, 49, 58, 61, 57, 66, 71, 68, 74, 79, 76, 84, 82];

/**
 * Chapter-level results, the brochure's "Review Test History" panel. Mixed
 * outcomes on purpose: a dashboard where everything is green proves nothing, and
 * this section's argument is precisely that StudyMate shows you the gaps.
 */
const CHAPTERS = [
  { subject: "Mathematics", chapter: "Data handling", score: 100 },
  { subject: "Science", chapter: "Chemical reactions", score: 100 },
  { subject: "Science", chapter: "Acids, bases and salts", score: 25 },
  { subject: "Science", chapter: "Metals and non-metals", score: 0 },
] as const;

/**
 * AnalyticsSection — the dashboard, built live.
 *
 * Placement, fourth: the reader now knows what StudyMate is, why it is needed and
 * how to start. The remaining question is "does it actually work", and this
 * answers it with the product's own output rather than with a claim. It is also
 * the only section that speaks to parents, who scan for measurable outcomes.
 *
 * Design: rather than a screenshot, the dashboard assembles itself as the section
 * enters. The ring sweeps to its value, counters tick up, the trend line draws
 * left to right with its area filling underneath, and the chapter bars grow in
 * sequence. A static image says "we have analytics"; a dashboard that builds in
 * front of you demonstrates them.
 *
 * Everything is real DOM and SVG rather than an image: it stays sharp at any
 * size, scales with the type, and the numbers remain selectable text.
 *
 * Figures are illustrative sample data and the UI says so. The brochure's
 * 48%-to-82% belongs to one named student, so presenting it as a typical result
 * would be a claim the product cannot support.
 */
export default function AnalyticsSection() {
  const rootRef = useRef<HTMLElement>(null);
  /* Counters live in state so the values stay real text in the DOM: animating
     them by writing textContent would hide them from crawlers. */
  const [score, setScore] = useState(0);
  const [topics, setTopics] = useState(0);
  const [streak, setStreak] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Hide both paths immediately. They carry no dash attributes of their
           own, so between first paint and the scroll trigger firing they would
           otherwise render fully drawn and then visibly snap back to zero. */
        gsap.set(".an-ring-fill, .an-line", { drawSVG: "0% 0%" });

        /* SplitText measures glyph boxes at split time, so a split against
           fallback metrics mis-positions every character once the webfont lands. */
        refreshAfterFonts();

        /* Words as well as chars: with chars alone, word boundaries cease to
           exist and the browser breaks lines mid-word. */
        const heading = new SplitText(".an-heading", { type: "words,chars" });

        gsap
          .timeline({
            scrollTrigger: { trigger: ".an-head", start: "clamp(top 82%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".an-eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            heading.chars,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.015 },
            0.08,
          )
          .fromTo(".an-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.36);

        /* The dashboard builds itself once, in a deliberate order, rather than
           every element fading in together. */
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".an-board", start: "clamp(top 76%)", once: true },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          ".an-board",
          { y: 40, scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1 },
          0,
        )
          /* `fromTo`, not `from`, and an explicit end value.
             `from({drawSVG: "0%"})` animates from nothing to whatever the element
             currently is — a full circle — so the ring swept past 82% and
             finished closed. Stating both ends pins the sweep to exactly 82% and
             makes the resting value obvious in the code. */
          .fromTo(
            ".an-ring-fill",
            { drawSVG: "0% 0%" },
            { drawSVG: "0% 82%", duration: 1.4, ease: "power2.inOut" },
            0.3,
          )
          /* Same reasoning for the trend line: draw it fully, from nothing. */
          .fromTo(
            ".an-line",
            { drawSVG: "0% 0%" },
            { drawSVG: "0% 100%", duration: 1.6, ease: "power2.inOut" },
            0.45,
          )
          .fromTo(".an-area", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.2)
          .fromTo(
            ".an-dot",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05 },
            0.9,
          )
          .fromTo(
            ".an-bar-fill",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, stagger: 0.08, ease: "power2.out" },
            0.7,
          )
          .fromTo(
            ".an-stat",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
            0.6,
          );

        /* Counters tick alongside the ring. Tweening a plain object and pushing
           the rounded value into state keeps the rendered text real. */
        const nums = { s: 0, t: 0, d: 0 };
        tl.to(
          nums,
          {
            s: 82,
            t: 24,
            d: 12,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              setScore(Math.round(nums.s));
              setTopics(Math.round(nums.t));
              setStreak(Math.round(nums.d));
            },
          },
          0.3,
        );

        return () => heading.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        /* No build: show the finished dashboard, since the data is the point. */
        gsap.set(".an-eyebrow, .an-heading, .an-sub, .an-board, .an-stat, .an-area, .an-dot", {
          clearProps: "all",
          opacity: 1,
        });
        /* The arc has no dash attributes of its own now, so its resting length
           must still be set here or it would paint as a full circle. */
        gsap.set(".an-ring-fill", { drawSVG: "0% 82%" });
        gsap.set(".an-line", { drawSVG: "0% 100%" });
        setScore(82);
        setTopics(24);
        setStreak(12);
      });
    },
    { scope: rootRef },
  );

  /* Chart geometry, computed rather than hand-authored so the path and the data
     can never disagree. */
  const W = 560;
  const H = 200;
  const min = Math.min(...TREND) - 8;
  const max = Math.max(...TREND) + 6;
  const points = TREND.map((v, i) => ({
    x: (i / (TREND.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * H,
  }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${W},${H} L0,${H} Z`;

  return (
    <section ref={rootRef} id="analytics" className="relative isolate z-30 py-24 sm:py-32">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* ---------- heading ---------- */}
        <div className="an-head mx-auto max-w-3xl text-center">
          <span className="an-eyebrow flex items-center justify-center gap-4">
            <span
              aria-hidden
              className="h-px w-10 sm:w-14"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-600) 60%, transparent))",
              }}
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-700">
              Your progress
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

          <h2 className="an-heading mt-6 text-balance font-display text-[clamp(1.65rem,7vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-forest-950">
            {/* Plain words a 14-year-old reads without pausing. "Studying you can
                measure, chapter by chapter" was the kind of line that sounds
                considered and communicates nothing at a glance. */}
            <span className="block">See exactly what</span>
            <span className="font-hand mt-1 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-600">
              to study next
            </span>
          </h2>

          <p className="an-sub mx-auto mt-6 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-forest-950/70">
            Finish a test and get your score right away. StudyMate shows you which chapters you have
            got, and which ones still need work.
          </p>
        </div>

        {/* ---------- the dashboard ---------- */}
        <div
          className="an-board relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[1.75rem] p-5 ring-1 ring-inset ring-white/10 sm:mt-16 sm:p-7"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 0%, var(--forest-800), var(--forest-950) 62%)",
            boxShadow:
              "0 2px 10px -3px color-mix(in oklab, var(--forest-950) 24%, transparent), 0 40px 80px -32px color-mix(in oklab, var(--forest-950) 50%, transparent)",
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
                "radial-gradient(ellipse 75% 60% at 50% 25%, #000 15%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 75% 60% at 50% 25%, #000 15%, transparent 100%)",
            }}
          />

          {/* Window chrome, so the panel reads as the product rather than as a
              decorative card. */}
          <div className="relative flex items-center gap-2 px-1 pb-5">
            <span className="flex gap-1.5">
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </span>
            <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 text-[11px] font-semibold text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-400" />
              Your progress
            </span>
            {/* Honest labelling: these are illustrative figures, and the UI says
                so rather than implying they are a real student's results. */}
            <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 sm:block">
              Sample data
            </span>
          </div>

          <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* ---- ring + counters ---- */}
            <div className="lg:col-span-4">
              <div className="h-full rounded-[1.25rem] bg-white/4 p-6 ring-1 ring-inset ring-white/8">
                <div className="flex items-center gap-5">
                  <div className="relative h-28 w-28 shrink-0">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="10"
                      />
                      {/* NO strokeDasharray/strokeDashoffset here.
                          Both those attributes and DrawSVG control the same
                          thing — how much of the stroke is painted — so setting
                          them together meant DrawSVG overwrote the dash values
                          on its first frame and the ring rendered as a full
                          circle instead of 82%. DrawSVG owns the arc alone, and
                          `drawSVG: "0% 82%"` in the tween is what defines both
                          the resting length and the sweep. */}
                      <circle
                        className="an-ring-fill"
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="url(#anRing)"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="anRing" x1="0" y1="0" x2="120" y2="120">
                          <stop offset="0%" stopColor="var(--forest-500)" />
                          <stop offset="100%" stopColor="var(--forest-300)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="font-numeric text-[1.75rem] font-extrabold leading-none text-white">
                        {score}%
                      </span>
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-forest-300">
                      Your score
                    </div>
                    <div className="mt-1.5 text-[13px] leading-relaxed text-white/55">
                      Your average across every test so far.
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { k: "Topics learned", v: topics },
                    { k: "Days in a row", v: streak },
                  ].map(({ k, v }) => (
                    <div
                      key={k}
                      className="an-stat rounded-2xl bg-white/4 p-4 ring-1 ring-inset ring-white/8"
                    >
                      <div className="font-numeric text-[1.5rem] font-extrabold leading-none text-white">
                        {v}
                      </div>
                      <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">
                        {k}
                      </div>
                    </div>
                  ))}
                </div>

                {/* The takeaway, spelled out. The panel above shows numbers; this
                    says what to DO with them, which is the whole reason a student
                    opens a progress screen. Also fills the dead space the two
                    counters left below them. */}
                <div className="an-stat mt-3 rounded-2xl bg-forest-500/12 p-4 ring-1 ring-inset ring-forest-400/20">
                  <div className="flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-forest-400" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-forest-300">
                      Next up
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                    Open <span className="font-bold text-white">Metals and non-metals</span>. It is
                    your lowest chapter, so it is worth the most marks.
                  </p>
                </div>
              </div>
            </div>

            {/* ---- trend + chapter breakdown ---- */}
            <div className="lg:col-span-8">
              <div className="rounded-[1.25rem] bg-white/4 p-6 ring-1 ring-inset ring-white/8">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-forest-300">
                    How you're doing
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/35">
                    Past 2 weeks
                  </span>
                </div>
                {/* A chart with no axis labels is a shape. One plain sentence
                    turns it into a fact the reader can repeat. */}
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">
                  Your test scores went from{" "}
                  <span className="font-numeric font-bold text-white/70">48%</span> to{" "}
                  <span className="font-numeric font-bold text-forest-300">82%</span> in two weeks.
                </p>

                {/* Scales proportionally, so the stroke stays even without
                    needing `vectorEffect` — which is what conflicted with
                    DrawSVG. The chart is wide and short by design, so uniform
                    scaling costs nothing here. */}
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="mt-5 h-36 w-full sm:h-40"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label="Practice test average rising from 48 to 82 percent across fourteen days"
                >
                  <defs>
                    <linearGradient id="anArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--forest-400)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="var(--forest-400)" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Baseline rules, so the curve has something to sit against.
                      The SVG scales uniformly now, so strokes stay even on
                      their own. */}
                  {[0.25, 0.5, 0.75].map((f) => (
                    <line
                      key={f}
                      x1="0"
                      y1={H * f}
                      x2={W}
                      y2={H * f}
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="1"
                    />
                  ))}

                  <path className="an-area" d={areaPath} fill="url(#anArea)" />
                  {/* NO `vectorEffect` on this path.
                      DrawSVG animates it by measuring `getTotalLength()`, and the
                      browser cannot measure a path whose stroke is
                      non-scaling while the SVG is stretched by
                      `preserveAspectRatio="none"`. The measurement throws, which
                      took the whole page component down on load — the route error
                      boundary was catching it. The grid lines below still use
                      `vectorEffect` because nothing animates them. */}
                  <path
                    className="an-line"
                    d={linePath}
                    fill="none"
                    stroke="var(--forest-400)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {points.map((p, i) => (
                    <circle
                      key={i}
                      className="an-dot"
                      cx={p.x}
                      cy={p.y}
                      r="3.5"
                      fill="var(--forest-300)"
                    />
                  ))}
                </svg>

                {/* ---- chapter breakdown ----
                    The section's real argument: not "you scored well" but "here
                    is precisely which chapter to open next". */}
                <div className="mt-6 border-t border-white/8 pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-forest-300">
                      What to study next
                    </span>
                    {/* Sorted worst-first, and the panel says so. A list of
                        scores is data; a list ordered by what needs attention is
                        an instruction. */}
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/35">
                      Weakest first
                    </span>
                  </div>

                  <ul className="mt-4 space-y-3.5">
                    {[...CHAPTERS]
                      .sort((a, b) => a.score - b.score)
                      .map(({ subject, chapter, score: s }, i) => (
                        <li key={i} className="flex items-center gap-4">
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-bold text-white/85">
                              {chapter}
                            </span>
                            {/* Subject plus a plain-language verdict. The bar and
                              the percentage say how much; this says what it
                              means, which is the part a parent or a tired
                              student actually reads. */}
                            <span className="block text-[11px] text-white/35">
                              {subject} ·{" "}
                              <span
                                style={{
                                  color:
                                    s >= 75 ? "var(--forest-300)" : s >= 25 ? "#E8C566" : "#E07A70",
                                }}
                              >
                                {s >= 75
                                  ? "You've got this"
                                  : s >= 25
                                    ? "Almost there"
                                    : "Start here"}
                              </span>
                            </span>
                          </span>

                          <span className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-white/8 sm:w-36">
                            <span
                              className="an-bar-fill block h-full origin-left rounded-full"
                              style={{
                                width: `${Math.max(s, 2)}%`,
                                /* A zero score is not a failure to hide: the gap IS
                                 the product's value, so it is shown in full. */
                                background:
                                  s >= 75
                                    ? "linear-gradient(90deg, var(--forest-500), var(--forest-300))"
                                    : s >= 25
                                      ? "linear-gradient(90deg, #C99A2E, #E8C566)"
                                      : "linear-gradient(90deg, #C0453B, #E07A70)",
                              }}
                            />
                          </span>

                          <span className="w-10 shrink-0 text-right font-numeric text-[13px] font-extrabold text-white">
                            {s}%
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
