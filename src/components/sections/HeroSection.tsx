import { useRef } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  ClipboardCheck,
  Gauge,
  LineChart,
  ListChecks,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { APP_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Background video source.
 *
 * Kept as a module constant rather than inlined so swapping the asset (or moving
 * it behind a CDN) is a one-line change. Served from /public, so the site has no
 * third-party runtime dependency.
 *
 * The filename is URL-encoded at point of use rather than renamed on disk, so the
 * file the author dropped in keeps working as-is.
 */
const VIDEO_MP4 = "/A_silent_wordless_visual_expl_gwr_video_mvp.mp4";

/**
 * Eyebrow capabilities — statements about what the product does, so nothing here
 * depends on third-party endorsement. Kept to four; a fifth wraps to a second
 * line at tablet widths and unbalances the cluster above the headline.
 */
const CAPABILITIES = [
  { label: "Chat with your textbook", Icon: MessageCircleQuestion },
  { label: "Adaptive AI tutoring", Icon: Sparkles },
  { label: "Smart test generator", Icon: ListChecks },
  { label: "Performance insights", Icon: LineChart },
] as const;

/**
 * The five differentiators from the product brochure, each with a one-line
 * expansion so the strip explains rather than merely labels.
 *
 * Deliberately NOT usage statistics: an earlier version scrolled "Trusted in
 * 120+ schools" and "1.2M questions answered", which are unverifiable claims
 * about adoption. These describe what the product does, which is true today.
 */
const FEATURES = [
  {
    label: "Concept learning",
    detail: "Chat through any chapter",
    Icon: BookOpenCheck,
  },
  {
    label: "Adaptive learning",
    detail: "Paced to each student",
    Icon: Gauge,
  },
  {
    label: "Test generation",
    /* Leads with the action the student takes, not the file format. "Question
       papers as PDFs" described an artefact; attempting a test in-app and
       downloading it are two different capabilities, and the first is the one
       worth surfacing here. */
    detail: "Attempt online",
    Icon: ListChecks,
  },
  {
    label: "AI evaluation",
    detail: "Instant, detailed feedback",
    Icon: ClipboardCheck,
  },
  {
    label: "Deep insights",
    detail: "Track progress by chapter",
    Icon: LineChart,
  },
] as const;

/**
 * HeroSection — full-bleed video stage.
 *
 * Structure follows the reference: a near-full-height video panel with a flat
 * dark scrim over it, centred white copy, and a solid-white proof strip butted
 * against the bottom edge so the footage terminates on a hard line.
 *
 * Height is 86vh rather than 100vh, matching the reference's `height: 86`. That
 * leaves the proof strip's top edge visible above the fold, which is what tells
 * a first-time visitor the page continues.
 *
 * Animation:
 *   • SplitText per-character curtain reveal on the headline
 *   • staggered fade-up for everything around it
 *   • slow scrub-linked zoom on the video, so scrolling parallaxes the footage
 *     against the copy without pinning the section
 *
 * All of it sits behind gsap.matchMedia, so prefers-reduced-motion gets a static
 * hero with nothing left mid-transform.
 */
export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Webfonts land after first paint and SplitText measures glyph boxes at
           split time, so a split against fallback metrics leaves characters
           mis-positioned once Mulish and Kalam swap in. */
        refreshAfterFonts();

        const split = new SplitText(".hero-headline", {
          type: "chars,words",
          charsClass: "hero-char",
        });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(".hero-award", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0)
          .fromTo(
            split.chars,
            { yPercent: 115, opacity: 0, rotateX: -70 },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1,
              ease: "expo.out",
              stagger: { each: 0.02, from: "start" },
            },
            0.15,
          )
          .fromTo(".hero-sub", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.6)
          .fromTo(
            ".hero-cta",
            { y: 20, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.09 },
            0.75,
          )
          .fromTo(".hero-strip", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.9);

        /* Footage drifts and grows as the hero leaves — parallax without a pin,
           so the sections below keep their natural scroll positions. */
        gsap.fromTo(
          ".hero-video",
          { scale: 1.06, yPercent: -2 },
          {
            scale: 1.16,
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-award, .hero-headline, .hero-sub, .hero-cta, .hero-strip", {
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  return (
    // Inset from the page edges so the body texture frames the panel on three
    // sides and it reads as a card on the page rather than a full-bleed band.
    // The inset stays small on mobile, where edge space is scarce.
    <section ref={rootRef} id="hero" className="relative isolate p-2 sm:p-3">
      {/* One rounded card holding BOTH the video panel and the proof strip.
          Rounding them separately left the panel's curved bottom sitting on the
          strip's square top — the corners read as a mistake. Clipping the pair
          together means the outer radius is the only one visible, and the strip
          inherits the bottom corners.

          The shadow lifts the whole card off the page texture; it is forest-tinted
          rather than neutral black so the cast light stays in the palette. */}
      {/* The shadow is an inline style, not a Tailwind arbitrary value: Tailwind
          parses `color-mix()` inside `shadow-[...]` as a shadow *color* and
          rewrites it to a solid `var(--tw-shadow-color)`, silently dropping the
          percentage and painting a near-black slab. */}
      <div
        className="relative overflow-hidden rounded-[1.75rem]"
        style={{
          boxShadow:
            "0 2px 8px -2px color-mix(in oklab, var(--forest-950) 16%, transparent), 0 28px 70px -24px color-mix(in oklab, var(--forest-950) 30%, transparent)",
        }}
      >
        {/* ---------- video stage ---------- */}
        {/* pt-24/32 reserves room for the fixed header: content is vertically
          centred, so on a short viewport the eyebrow cluster would ride up under
          the pill. pb offsets it so the block stays optically centred.

          Height is deliberately asymmetric across breakpoints:

          • Mobile — `min-h`, NOT `h`. A fixed 86vh box is shorter than this copy
            block on a phone (four eyebrow items + a 3-line headline + 4-line sub
            + two stacked CTAs), so the panel clipped its own buttons. A minimum
            keeps the panel filling the fold when the copy is short, and lets it
            grow instead of overflowing when it isn't.
          • sm and up — the fixed `h-[86vh]` stage from the reference, where the
            copy comfortably fits and the strip's top edge should peek above the
            fold.

          `svh`, not `vh`: mobile browsers size `vh` against the LARGEST viewport
          (chrome hidden), so a 86vh panel is taller than what is actually visible
          while the URL bar is showing — the exact overflow in the screenshot.
          The small viewport unit measures the always-visible area, and unlike
          `dvh` it does not resize as the bar collapses, so nothing reflows
          mid-scroll. */}
        <div className="relative flex min-h-[max(34rem,100svh-1rem)] flex-col items-center justify-center overflow-hidden bg-forest-950 px-4 pb-12 pt-24 sm:h-[86svh] sm:min-h-[36rem] sm:px-6 sm:pb-12 sm:pt-32 lg:px-10">
          {/* Layering here is all POSITIVE z-index on purpose.

              A negative z-index puts an element behind its own parent's
              background, and this parent carries an opaque `bg-forest-950` (the
              base colour before the video loads). The video was previously at
              -z-20, so the green painted straight over it and the footage never
              appeared. Order is now: video z-0 → scrims z-10/20 → copy z-30. */}
          <video
            className="hero-video absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            /* `none`, not `auto`. This file is 2.7 MB and the element is purely
               decorative, so preloading it competed with the CSS, fonts and
               logo for bandwidth on first paint. The `src` is attached at
               runtime below only when the client actually qualifies, so on a
               phone or a metered connection nothing is fetched at all and the
               forest-950 base colour stands in. */
            preload="none"
            aria-hidden
            tabIndex={-1}
            ref={(el) => {
              if (!el) return;

              /* Some browsers ignore a `muted` attribute in SSR'd markup and
                 then refuse autoplay; setting it on the node guarantees the
                 flag is on before play() is attempted. */
              el.muted = true;
              el.defaultMuted = true;

              /* Skip the download entirely for the clients least able to
                 afford it: small screens, users who asked for reduced motion
                 (the footage drifts and zooms), and anyone on Save-Data or a
                 connection the browser reports as 2g/3g. */
              const conn = (
                navigator as Navigator & {
                  connection?: { saveData?: boolean; effectiveType?: string };
                }
              ).connection;

              const skip =
                window.matchMedia("(max-width: 767px)").matches ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
                conn?.saveData === true ||
                /2g|3g/.test(conn?.effectiveType ?? "");

              if (skip || el.dataset.loaded === "1") return;
              el.dataset.loaded = "1";

              /* Attaching the source here rather than in markup is what makes
                 `preload="none"` meaningful: a <source> in the HTML is still a
                 candidate the browser may fetch on its own schedule. */
              const source = document.createElement("source");
              source.src = VIDEO_MP4;
              source.type = "video/mp4";
              el.appendChild(source);
              el.load();

              const tryPlay = () => el.play().catch(() => {});
              tryPlay();
              el.addEventListener("loadeddata", tryPlay, { once: true });
            }}
          >
            {/* No <source> here on purpose. It is created in the ref callback
                above, so clients that should not download 2.7 MB never see a
                URL to fetch. A <source> present in the markup would be a
                candidate the browser could load on its own schedule regardless
                of preload="none". */}
          </video>

          {/* ONE overlay, not a stack.
              Two layers were compounding — a flat 30% under a 55% gradient reads
              nearer 70% at the edges, which is what buried the footage. This is a
              single gradient: heavier at top and bottom where the header pill and
              the headline need contrast, lightest across the middle band so the
              video stays clearly visible there.

              Raise the middle stop (currently 52%) to hide more of the video;
              lower it to show more. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--forest-950) 78%, transparent) 0%, color-mix(in oklab, var(--forest-950) 58%, transparent) 22%, color-mix(in oklab, var(--forest-950) 52%, transparent) 50%, color-mix(in oklab, var(--forest-950) 62%, transparent) 78%, color-mix(in oklab, var(--forest-950) 82%, transparent) 100%)",
            }}
          />

          {/* ---------- centred copy ----------
              5xl, so the headline's own max-w-5xl is not clamped by its parent. */}
          <div className="relative z-30 flex w-full max-w-5xl flex-col items-center text-center">
            {/* Capability strip, not social proof.
                This previously showed a 4.9 rating, a review count and four award
                badges — all invented. Ratings and awards are claims about the
                outside world, so they can only ship once they are true. What the
                product DOES needs no third-party proof, so this states capability
                instead. Swap in a real rating once you have one. */}
            <div className="hero-award flex flex-col items-center gap-4 sm:gap-5">
              {/* Typographic eyebrow, not a badge.
                  A translucent pill with a pulsing dot is the single most
                  recognisable AI-generated hero pattern, so this uses an editorial
                  device instead: wide-tracked small caps between two hairlines
                  that taper away from the text. No container, no fill, no dot —
                  it reads as a masthead kicker rather than a status chip. */}
              <span className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="h-px w-10 sm:w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-300) 65%, transparent))",
                  }}
                />
                <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-300">
                  AI Tutoring Agent
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

              {/* Features as a divided row — hairline separators instead of four
                  identical chips, so the group reads as one line of spec text. */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
                {CAPABILITIES.map(({ label, Icon }, i) => (
                  <span key={label} className="flex items-center gap-3 sm:gap-4">
                    {i > 0 && (
                      <span aria-hidden className="hidden h-3.5 w-px bg-white/20 sm:block" />
                    )}
                    <span className="flex items-center gap-2 text-[13px] font-semibold text-white/75">
                      <Icon className="h-4 w-4 shrink-0 text-forest-300" />
                      {label}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Headline. One clean node for SplitText.

                `text-balance` distributes the words evenly across the two lines
                instead of leaving a short orphan on the second — with a headline
                this size, one trailing word reads as a layout bug. The measure is
                widened to 5xl so it settles at two lines on desktop rather than
                three. */}
            <h1
              className="hero-headline mt-6 max-w-5xl text-balance font-display text-[clamp(1.85rem,7.5vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white sm:mt-8"
              style={{ textShadow: "0 2px 34px rgba(3,26,16,0.55), 0 1px 3px rgba(3,26,16,0.4)" }}
            >
              Your AI tutor that turns any textbook into{" "}
              {/* Kalam, the brand's handwritten face, marks the payoff word — the
                one a teacher would have circled. font-bold (700) not 800: Kalam
                ships only 400/700, and 800 forces a synthesized fake bold. */}
              <span className="font-hand inline-block pr-[0.06em] text-[1.1em] font-bold leading-[0.9] text-forest-300">
                real understanding
              </span>
            </h1>

            {/* Wider measure than the old max-w-2xl so this also lands in two
                lines on desktop and reads as one statement, not a paragraph. */}
            <p className="hero-sub mt-5 max-w-3xl text-pretty text-[1.03125rem] leading-relaxed text-white/80 sm:mt-7 sm:text-[1.25rem]">
              Open your textbook, chat through any chapter, and practise with AI-generated tests
              that adapt to you, with analytics that show exactly where you stand.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row">
              <span className="hero-cta">
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
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5 group-hover:-translate-y-5" />
                    <ArrowUpRight className="absolute h-5 w-5 -translate-x-5 translate-y-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </MagneticButton>
              </span>
              <span className="hero-cta">
                {/* `#adaptive`, not `#demo`: there is no demo video on this
                    page, so the old anchor pointed at nothing. The label and
                    icon changed with it. "Watch demo" next to a play button
                    promises a video, and sending that click to a quiz instead
                    would be a worse outcome than the dead link was. */}
                <MagneticButton
                  as="a"
                  href="#adaptive"
                  variant="glass"
                  size="lg"
                  roll={false}
                  className="group"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-forest-500">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  Try a sample test
                  <span className="text-white/50">2 min</span>
                </MagneticButton>
              </span>
            </div>
          </div>
        </div>

        {/* ---------- feature strip ----------
            A static grid, not a marquee. Scrolling items can only be read as they
            pass, so a visitor sees three of ten and never the set; these are the
            product's capabilities, which is exactly the thing that must land at a
            glance. Everything is on screen at once, and the row divides evenly
            (5 / 3 / 2) at each breakpoint rather than orphaning a last cell.

            No top border: the panel's dark edge above already separates the two,
            and a line there would read as a seam. */}
        <div className="hero-strip relative z-10 bg-surface py-8">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
              {FEATURES.map(({ label, detail, Icon }) => (
                <div key={label} className="group/f flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-500/10 text-forest-700 ring-1 ring-inset ring-forest-700/12 transition-colors duration-300 group-hover/f:bg-forest-500 group-hover/f:text-white">
                    <Icon className="h-[17px] w-[17px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-bold leading-tight tracking-[-0.01em] text-forest-950">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-forest-950/70">
                      {detail}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
