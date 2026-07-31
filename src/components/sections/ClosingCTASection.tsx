import { useRef } from "react";
import { ArrowUpRight, BookOpen, LineChart, MessageCircleQuestion } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { APP_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * A one-line recap of what the reader has already been shown, in page order.
 * Not new claims: each line names a section they have just scrolled through, so
 * the close reads as a summary of evidence rather than another pitch.
 */
const RECAP = [
  { Icon: BookOpen, label: "Chat through any chapter" },
  { Icon: MessageCircleQuestion, label: "Practise at your own level" },
  { Icon: LineChart, label: "See exactly what to study next" },
] as const;

/**
 * ClosingCTASection — the last word.
 *
 * Placement, last before the footer: the FAQ removes the final objections, and
 * the moment immediately after an objection is answered is when a reader is most
 * likely to act. Leaving them to find the header button instead would waste it.
 *
 * Design: a dark forest panel, the same treatment as the hero, so the page opens
 * and closes on the same note and the light sections between read as one body.
 * The type is set large and the panel carries almost nothing else — a close that
 * competes with itself gives the reader something to think about other than
 * clicking.
 *
 * The recap row is deliberately not new information. Three lines naming what was
 * already demonstrated turn the close into "here is what you just saw" rather
 * than one more list of features, which is what a reader at the bottom of a long
 * page has stopped reading.
 */
export default function ClosingCTASection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* SplitText measures glyph boxes at split time, so a split against
           fallback metrics mis-positions every character once the webfont lands. */
        refreshAfterFonts();

        /* Words as well as chars: with chars alone, word boundaries cease to
           exist and the browser breaks lines mid-word. */
        const heading = new SplitText(".cc-heading", { type: "words,chars" });

        /* `fromTo` throughout rather than `from`: a `from()` writes the start
           state immediately and only clears it if the tween actually runs, so a
           trigger that never fires leaves the whole close invisible. Stating
           both ends means the worst case is un-animated, never blank. */
        gsap
          .timeline({
            scrollTrigger: { trigger: rootRef.current, start: "clamp(top 80%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".cc-eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            heading.chars,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.014 },
            0.08,
          )
          .fromTo(".cc-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.36)
          .fromTo(
            ".cc-cta",
            { y: 18, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7 },
            0.5,
          )
          .fromTo(
            ".cc-recap li",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
            0.62,
          );

        return () => heading.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".cc-eyebrow, .cc-heading, .cc-sub, .cc-cta, .cc-recap li", {
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="start" className="relative isolate z-30">
      {/* Dark panel, matching the hero. The page opens and closes on the same
          note, which frames everything between as one body. */}
      <div
        className="relative overflow-clip px-4 py-20 sm:px-6 sm:py-32 lg:px-10"
        style={{
          background:
            "radial-gradient(120% 110% at 50% 0%, var(--forest-800), var(--forest-950) 58%)",
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
              "radial-gradient(ellipse 70% 60% at 50% 25%, #000 10%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 25%, #000 10%, transparent 100%)",
          }}
        />

        {/* Emerald bloom behind the headline, so the close has a light source
            rather than being a flat dark rectangle. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full opacity-55 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 30%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="cc-eyebrow flex items-center justify-center gap-4">
            <span
              aria-hidden
              className="h-px w-10 sm:w-14"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-300) 65%, transparent))",
              }}
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-300">
              Your turn
            </span>
            <span
              aria-hidden
              className="h-px w-10 sm:w-14"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in oklab, var(--forest-300) 65%, transparent), transparent)",
              }}
            />
          </span>

          <h2 className="cc-heading mt-7 text-balance font-display text-[clamp(1.75rem,7.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white">
            <span className="block">Open a chapter</span>
            <span className="font-hand mt-4 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-300">
              you're stuck on
            </span>
          </h2>

          <p className="cc-sub mx-auto mt-7 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-white/70 sm:text-[1.125rem]">
            That is the fastest way to find out whether this works for you. It takes about thirty
            seconds to start, and nothing to lose if it does not.
          </p>

          <div className="cc-cta mt-9 flex flex-col items-center gap-4">
            {/* Straight to the app. This pointed at `#adaptive` only while no
                signup destination existed. */}
            <MagneticButton
              as="a"
              href={APP_URL}
              {...EXTERNAL_LINK_PROPS}
              variant="solid"
              size="lg"
              roll={false}
              className="group"
            >
              Start learning free
              <span className="relative grid h-5 w-5 place-items-center overflow-hidden">
                <ArrowUpRight className="h-5 w-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-5 group-hover:translate-x-5" />
                <ArrowUpRight className="absolute h-5 w-5 -translate-x-5 translate-y-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </MagneticButton>

            {/* The offer as a badge, matching the one in the quiz's completion
                panel so the two read as the same promise. */}
            <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full bg-forest-500/14 px-4 py-2.5 ring-1 ring-inset ring-forest-400/30">
              <span className="flex items-center gap-1.5 text-[13.5px] font-bold text-white">
                <span className="font-numeric text-[16px] font-extrabold text-forest-300">
                  5,000
                </span>
                free credits to start
              </span>
              <span aria-hidden className="hidden h-3.5 w-px bg-white/20 sm:block" />
              <span className="text-[13px] font-semibold text-white/60">No card required</span>
            </span>
          </div>

          {/* Recap of what was already shown, not new claims. */}
          <ul className="cc-recap mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-8">
            {RECAP.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-[15px] w-[15px] shrink-0 text-forest-300" />
                <span className="text-[13.5px] font-semibold text-white/60">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
