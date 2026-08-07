import { useRef } from "react";
import { ArrowDownToLine, ArrowUpRight, BookOpenCheck, FileText, Share2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { EXTERNAL_LINK_PROPS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The brochure asset, served from /public.
 *
 * A module constant for the same reason the hero's video is one: moving the file
 * behind a CDN, or versioning the filename when the brochure is revised, becomes
 * a one-line change instead of a hunt through markup.
 */
const BROCHURE_PDF = "/Studymate.pdf";

/**
 * Filename the browser saves as, via the `download` attribute.
 *
 * Stated explicitly rather than inherited from the URL: "Studymate.pdf" landing
 * in a downloads folder among a hundred other files says nothing about what it
 * is or where it came from six months later.
 */
const BROCHURE_FILENAME = "StudyMate-Brochure.pdf";

/**
 * What the file actually is, measured from the file itself rather than
 * estimated — 8 pages, 5.15 MB, PDF 1.7.
 *
 * Stating the size next to a download link is not a detail: on a phone or a
 * metered connection, 5 MB is a decision the reader is entitled to make before
 * they tap rather than after. The page count sets the same expectation for time.
 *
 * These are facts about the file on disk, so they must be updated when the
 * brochure is replaced. Nothing here describes the brochure's *contents* — that
 * would be a claim this page cannot verify on the reader's behalf.
 */
const SPECS = [
  { Icon: FileText, label: "8 pages" },
  { Icon: ArrowDownToLine, label: "PDF · 5.2 MB" },
  /* "Share with a parent" described the download button's purpose, which now has
     a sibling that does something different. This states a property of the file
     instead, so the row stays a spec list rather than a caption for one button. */
  { Icon: Share2, label: "No signup to read it" },
] as const;

/**
 * BrochureSection — the take-away.
 *
 * Placement, after the FAQ and before the close: a reader who has worked down
 * this far has their questions answered but may not be the person who decides.
 * A student shows a parent; a teacher shows a head of department. Both need
 * something that survives leaving the page, and neither is served by "bookmark
 * this URL".
 *
 * This is deliberately NOT a second conversion attempt. The close that follows
 * asks for the signup, and two competing asks in a row weakens both. This one
 * offers an artefact and says what it is — pages, format, size — so the choice
 * to download is made on facts rather than curiosity.
 *
 * The panel is light and quiet for the same reason: the emerald primary face is
 * reserved for the one true CTA in the hero and the close, so this uses `ink`,
 * the chrome-coloured capsule, and reads as a utility rather than a pitch.
 */
export default function BrochureSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* SplitText measures glyph boxes at split time, so splitting against
           fallback metrics leaves characters mis-positioned once Mulish lands. */
        refreshAfterFonts();

        /* words as well as chars: with chars alone the browser loses word
           boundaries and breaks lines mid-word. */
        const heading = new SplitText(".br-heading", { type: "words,chars" });

        /* `fromTo` rather than `from` throughout: a `from()` writes the start
           state immediately and only clears it if the tween actually runs, so a
           trigger that never fires would leave this section permanently blank.
           Stating both ends means the worst case is un-animated, never invisible. */
        gsap
          .timeline({
            scrollTrigger: { trigger: rootRef.current, start: "clamp(top 78%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".br-eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            heading.chars,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.016 },
            0.08,
          )
          .fromTo(".br-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.34)
          .fromTo(
            ".br-cta",
            { y: 18, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7 },
            0.46,
          )
          .fromTo(
            ".br-spec",
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
            0.56,
          )
          /* The cover mock rises last and furthest, so it reads as the object
             being offered rather than another block of layout. */
          .fromTo(
            ".br-cover",
            { y: 34, opacity: 0, rotate: -3 },
            { y: 0, opacity: 1, rotate: -2.5, duration: 0.95, ease: "expo.out" },
            0.2,
          )
          /* The mascot walks in from the left edge, last and slowest, so it
             reads as arriving into the margin rather than as part of the copy. */
          .fromTo(
            ".br-mascot",
            { x: -38, y: 20, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
            0.34,
          );

        return () => heading.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".br-eyebrow, .br-heading, .br-sub, .br-cta, .br-spec, .br-cover, .br-mascot", {
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="brochure" className="relative isolate z-30 p-2 sm:p-3">
      {/* Its own inset panel, matching the FAQ above it, so the page keeps its
          card rhythm rather than running two full-bleed bands together. */}
      <div className="relative overflow-clip rounded-[1.75rem] bg-surface py-16 sm:rounded-[2.25rem] sm:py-24">
        {/* Faint blueprint grid, masked to fade before the panel edge — the same
            texture used in How It Works and the FAQ. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--forest-800) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--forest-800) 7%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 50% 40%, #000 20%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 75% 70% at 50% 40%, #000 20%, transparent 100%)",
          }}
        />

        {/* ---------- mascot ----------
            Flush against the panel's left edge and standing on its floor, so the
            character reads as leaning into the section rather than floating in
            it. `bottom-0 left-0` with no inset is what "touching" means here —
            the panel's own `overflow-clip` trims it to the rounded corner.

            The content column stays CENTRED — it is not shifted right to make
            room. An earlier version padded the column across to clear this
            figure, which pushed the cover and copy off-centre and left an
            obvious dead gap on the left; the section read as misaligned rather
            than as decorated.

            So the figure lives entirely in the margin the centred column already
            leaves, and its width is tied to how much margin actually exists:
            max-w-5xl inside the panel leaves ~9.8rem clear at 1280, ~17.8rem at
            1536 and ~29.8rem at 1920. The widths below stay inside those
            numbers, so it never reaches the cover mock at any size.

            `2xl:block`, hidden below. At xl the margin is only ~9.8rem, which is
            too narrow to hold this full-length standing figure at a size where
            it reads as anything but a sliver. On a phone there is no margin at
            all, and a decorative 2.5 MB render is not worth the bandwidth on the
            screen least able to afford it. */}
        <img
          src="/maskot-2.png"
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          width={1024}
          height={1536}
          className="br-mascot pointer-events-none absolute bottom-0 left-0 hidden h-auto w-[15rem] select-none 2xl:block min-[1728px]:w-[19rem]"
          style={{
            /* ONE gradient, and no `mask-composite` — see the matching note in
               AdaptiveSection. Two mask layers combined with
               `-webkit-mask-composite: source-in` render the element completely
               invisible: the two composite properties take different keyword
               sets, and `source-in` on the first layer composites against an
               empty backdrop, so nothing survives.

               The corners are already alpha 0 (this render is ~73% transparent),
               so a single soft bottom fade is all it ever needed. */
            WebkitMaskImage: "linear-gradient(to top, #000 82%, transparent 100%)",
            maskImage: "linear-gradient(to top, #000 82%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          {/* Two columns from lg: the artefact on the left, the ask on the right.
              Below lg the cover leads and the copy follows, so a phone reader
              sees the thing before the sentence describing it. */}
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* ---------- cover mock ---------- */}
            {/* A represented object, not an <img> of page one. Rendering the real
                cover would mean shipping a second copy of it as a raster asset
                and keeping the two in sync every time the PDF is revised; this
                costs nothing and cannot fall out of date. */}
            <div className="br-cover relative shrink-0" aria-hidden>
              {/* Back leaves, fanned, so the shape reads as a multi-page document
                  rather than a single card. */}
              <span
                className="absolute inset-0 rounded-xl bg-surface ring-1 ring-inset ring-forest-900/10"
                style={{ transform: "rotate(4deg) translate(6px, 5px)" }}
              />
              <span
                className="absolute inset-0 rounded-xl bg-surface ring-1 ring-inset ring-forest-900/10"
                style={{ transform: "rotate(2deg) translate(3px, 2px)" }}
              />

              {/* Front cover. A4 proportions (1:1.414), so it reads as the shape
                  of the file that actually downloads. */}
              <span
                className="relative grid h-[15.9rem] w-[11.25rem] place-items-center overflow-hidden rounded-xl sm:h-[19.8rem] sm:w-[14rem]"
                style={{
                  background:
                    "radial-gradient(120% 100% at 50% 0%, var(--forest-800), var(--forest-950) 62%)",
                  boxShadow:
                    "0 2px 8px -2px color-mix(in oklab, var(--forest-950) 22%, transparent), 0 26px 60px -22px color-mix(in oklab, var(--forest-950) 42%, transparent)",
                }}
              >
                {/* Emerald bloom, echoing the dark panels elsewhere on the page
                    so the cover looks like it belongs to this brand. */}
                <span
                  className="pointer-events-none absolute -top-10 left-1/2 h-40 w-52 -translate-x-1/2 rounded-full opacity-60 blur-[60px]"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 42%, transparent), transparent 70%)",
                  }}
                />

                <span className="relative flex flex-col items-center px-6 text-center">
                  <BookOpenCheck className="h-8 w-8 text-forest-300" />
                  <span className="mt-4 font-display text-[1.35rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[1.6rem]">
                    StudyMate
                  </span>
                  <span className="font-hand mt-1 text-[1.15rem] font-bold leading-[0.95] text-forest-300 sm:text-[1.3rem]">
                    brochure
                  </span>
                  <span className="mt-5 h-px w-12 bg-white/25" />
                  <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">
                    8 pages
                  </span>
                </span>
              </span>
            </div>

            {/* ---------- copy + download ---------- */}
            <div className="min-w-0 text-center lg:text-left">
              <span className="br-eyebrow flex items-center justify-center gap-4 lg:justify-start">
                <span
                  aria-hidden
                  className="h-px w-10 sm:w-14 lg:hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-600) 55%, transparent))",
                  }}
                />
                <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-700">
                  Take it with you
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

              <h2 className="br-heading mt-6 text-balance font-display text-[clamp(1.6rem,6vw,2.9rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-forest-950">
                <span className="block">The whole picture,</span>
                <span className="font-hand mt-3 block pr-[0.06em] text-[1.1em] font-bold leading-[0.95] text-forest-700">
                  on one page
                </span>
              </h2>

              <p className="br-sub mx-auto mt-6 max-w-lg text-pretty text-[1.0625rem] leading-relaxed text-forest-950/70 lg:mx-0 sm:text-[1.125rem]">
                Everything on this page, as a document you can keep. Useful when the person who
                decides is not the person reading — send it to a parent, or take it into a staff
                meeting, without asking anyone to scroll a website first.
              </p>

              {/* Two ways to take it, because they suit different readers. The
                  download is for the person who wants to keep or forward the
                  file; opening it in a tab is for the person who just wants to
                  look now and would rather not commit 5 MB to their downloads
                  folder to find out whether it is worth reading.

                  `flex-col` below sm: side by side, two lg buttons overflow a
                  narrow phone and the second wraps awkwardly under the first. */}
              <div className="br-cta mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                {/* `download`, not a plain link. Without it the browser opens the
                    PDF in its built-in viewer, which on mobile means leaving the
                    page entirely with no reliable way back. The attribute value
                    sets the saved filename.

                    Deliberately no `target="_blank"`: a download does not
                    navigate, so a new tab would open and sit empty. This is also
                    why EXTERNAL_LINK_PROPS is not spread here — the file is
                    same-origin, so there is no opener to sever. */}
                <MagneticButton
                  as="a"
                  href={BROCHURE_PDF}
                  download={BROCHURE_FILENAME}
                  variant="ink"
                  size="lg"
                  roll={false}
                  className="group"
                >
                  Download the brochure
                  {/* Arrow exits downward and re-enters from above, so the loop
                      reads as "save" rather than the hero's diagonal "launch". */}
                  <span className="relative grid h-5 w-5 place-items-center overflow-hidden">
                    <ArrowDownToLine className="h-5 w-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-5" />
                    <ArrowDownToLine className="absolute h-5 w-5 -translate-y-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                  </span>
                </MagneticButton>

                {/* Read it here instead. No `download` attribute, so the browser
                    renders the PDF in its own viewer rather than saving it.

                    `target="_blank"` IS correct on this one, unlike the download
                    beside it: this genuinely navigates, and opening in a new tab
                    means the reader still has the landing page waiting when they
                    close the viewer. EXTERNAL_LINK_PROPS carries the matching
                    `rel="noopener"`.

                    `outline`, not a second `ink` face — the download is the
                    primary of the two, and two identical capsules would make the
                    reader choose rather than act. */}
                <MagneticButton
                  as="a"
                  href={BROCHURE_PDF}
                  {...EXTERNAL_LINK_PROPS}
                  variant="outline"
                  size="lg"
                  roll={false}
                  className="group"
                >
                  View in browser
                  {/* Diagonal arrow, the page's established "opens elsewhere"
                      cue — it matches the hero CTA and separates this visually
                      from the download's vertical arrow. */}
                  <span className="relative grid h-5 w-5 place-items-center overflow-hidden">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5 group-hover:-translate-y-5" />
                    <ArrowUpRight className="absolute h-5 w-5 -translate-x-5 translate-y-5 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </MagneticButton>
              </div>

              {/* Facts about the file, so the reader knows what they are
                  committing to before they tap it rather than after. */}
              <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 border-t border-forest-900/10 pt-6 lg:justify-start">
                {SPECS.map(({ Icon, label }) => (
                  <li key={label} className="br-spec flex items-center gap-2">
                    <Icon className="h-[15px] w-[15px] shrink-0 text-forest-700" />
                    <span className="text-[13.5px] font-semibold text-forest-950/65">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
