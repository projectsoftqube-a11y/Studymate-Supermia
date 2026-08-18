import { useRef, useState } from "react";
import { Clock3, LineChart, ListChecks, MessageCircleQuestion, Play, Volume2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The YouTube Short.
 *
 * Split into id / title / channel rather than one embed URL, because each is
 * needed separately: the id builds three different URLs (thumbnail, embed,
 * watch-page fallback), and the title and channel are shown to the reader so the
 * card says what it is before anyone clicks.
 *
 * Title and channel are the real values from YouTube's oEmbed endpoint, not
 * invented copy — if the video is retitled, these should be updated to match.
 */
const VIDEO = {
  id: "AX_63hD7PdA",
  title: "What If Your AI Could Be Your Study Partner?",
  channel: "MIA My Intelligent Assistant",
} as const;

/**
 * Highest-resolution still YouTube generates. Verified present for this id, at
 * roughly 75 KB.
 *
 * Deliberately the thumbnail and not the player: an <iframe> on load costs
 * ~1 MB of YouTube script and sets third-party cookies on every visitor,
 * including the ones who never press play. A static image with a real play
 * button costs one small request, and the player is only created when someone
 * actually asks for it.
 */
const POSTER = `https://i.ytimg.com/vi/${VIDEO.id}/maxresdefault.jpg`;

/**
 * `youtube-nocookie.com`, not `youtube.com`: the privacy-enhanced host does not
 * write tracking cookies until playback begins.
 *
 * `autoplay=1` is correct here specifically BECAUSE the iframe does not exist
 * until the reader clicks. The click is the play instruction, so without
 * autoplay they would have to press play a second time inside the player.
 */
const EMBED = `https://www.youtube-nocookie.com/embed/${VIDEO.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

/** Fallback for anyone who cannot use the embed, and the crawlable link. */
const WATCH = `https://www.youtube.com/shorts/${VIDEO.id}`;

/**
 * What the clip covers, in the order it covers it.
 *
 * These exist because the left column was otherwise a heading, three lines of
 * copy and a lot of dark green — the section read as unfinished, and worse, it
 * asked for a click without saying what the click buys. Naming the three beats
 * turns "watch this" into "watch this to see X, Y and Z", which is a far easier
 * thing to say yes to.
 *
 * Each line names something the product genuinely does and that this page
 * already demonstrates further down, so nothing here is a claim the rest of the
 * page cannot back up.
 */
const BEATS = [
  {
    Icon: MessageCircleQuestion,
    label: "Ask a chapter anything",
    detail: "Plain questions, answers from your own textbook",
  },
  {
    Icon: ListChecks,
    label: "Practise at your level",
    detail: "Tests that step up or back with you",
  },
  {
    Icon: LineChart,
    label: "See where you stand",
    detail: "Chapter-by-chapter progress, not just a score",
  },
] as const;

/**
 * VideoSection — the sixty-second version.
 *
 * Placement, straight after How It Works: the reader now knows what StudyMate is
 * and what setting it up involves, and the next honest question is "show me".
 * Four detailed sections answer that properly, but some readers will not scroll
 * four sections on trust alone. This is the short answer for them, positioned
 * before the long one rather than after it, where it would be redundant.
 *
 * Design: a dark forest panel between two light sections, matching the hero and
 * the close. Beyond keeping the page's light/dark rhythm, a dark surround is
 * simply what video wants — a bright panel competes with the picture.
 *
 * Interaction, deliberately kept to one idea: the whole card is one button. No
 * modal, no custom controls, no scroll-triggered autoplay. Click it and the real
 * YouTube player replaces the poster in place, already playing. That is the
 * shortest path from "I am curious" to "I am watching", and it is the reason the
 * play affordance is oversized and centred rather than tucked in a corner.
 *
 * Performance: nothing from YouTube loads until that click. See POSTER above.
 */
export default function VideoSection() {
  const rootRef = useRef<HTMLElement>(null);

  /* One flag, one job: has the reader asked for the player yet. Before it flips
     this section is a picture and a button; after, it is an iframe. */
  const [playing, setPlaying] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* SplitText measures glyph boxes at split time, so splitting against
           fallback metrics mis-positions every character once Mulish lands. */
        refreshAfterFonts();

        const heading = new SplitText(".vd-heading", { type: "words,chars" });

        /* `fromTo` throughout, never `from`: a `from()` writes the start state
           immediately and only clears it if the tween actually runs, so a
           trigger that never fires would leave the section blank. Stating both
           ends means the worst case is un-animated, never invisible. */
        gsap
          .timeline({
            scrollTrigger: { trigger: rootRef.current, start: "clamp(top 78%)", once: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(".vd-eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            heading.chars,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.016 },
            0.08,
          )
          .fromTo(".vd-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.34)
          .fromTo(
            ".vd-card",
            { y: 40, scale: 0.97, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 1, ease: "expo.out" },
            0.22,
          )
          .fromTo(
            ".vd-beat",
            { x: -16, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.09 },
            0.46,
          )
          .fromTo(
            ".vd-note",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
            0.6,
          );

        return () => heading.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".vd-eyebrow, .vd-heading, .vd-sub, .vd-card, .vd-beat, .vd-note", {
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="video" className="relative isolate z-30 p-2 sm:p-3">
      {/* Dark panel, inset like the other cards. Same treatment as the hero and
          the close, so the page's three dark moments read as one family. */}
      <div
        className="relative overflow-clip rounded-[1.75rem] px-4 py-20 sm:rounded-[2.25rem] sm:px-6 sm:py-28 lg:px-10"
        style={{
          background:
            "radial-gradient(120% 110% at 50% 0%, var(--forest-800), var(--forest-950) 58%)",
        }}
      >
        {/* Dot texture, masked to fade before the panel edge — the same device
            the closing CTA uses. */}
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

        {/* Emerald bloom, so the panel has a light source rather than being a
            flat dark rectangle. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 30%, transparent), transparent 70%)",
          }}
        />

        {/* Two columns from lg: the argument on the left, the player on the
            right. A portrait Short is a tall narrow object, so stacking it under
            centred copy left a long thin column with wide empty margins either
            side. Side by side, the video's height sets the row height and the
            copy fills the space next to it.

            Below lg it stacks, copy first — a phone is already a narrow column,
            so the reader gets the reason to watch before the thing to watch. */}
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <span className="vd-eyebrow flex items-center justify-center gap-4 lg:justify-start">
              <span
                aria-hidden
                className="h-px w-10 sm:w-14 lg:hidden"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, color-mix(in oklab, var(--forest-300) 65%, transparent))",
                }}
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-forest-300">
                Watch it work
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

            <h2 className="vd-heading mt-6 text-balance font-display text-[clamp(1.65rem,6.5vw,3.25rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
              <span className="block">Rather just</span>
              <span className="font-hand mt-2 block pr-[0.06em] text-[1.12em] font-bold leading-[0.95] text-forest-300">
                be shown?
              </span>
            </h2>

            <p className="vd-sub mx-auto mt-6 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-white/70 lg:mx-0">
              One short video, no signup. The rest of this page explains it in detail — this is the
              quick version if you would rather see it than read it.
            </p>

            {/* What the clip actually covers. This is the substance of the left
              column — without it the section is a heading and a button, which is
              what made it read as empty. */}
            <ul className="mx-auto mt-8 flex max-w-md flex-col gap-4 text-left lg:mx-0">
              {BEATS.map(({ Icon, label, detail }) => (
                <li key={label} className="vd-beat flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-500/15 text-forest-300 ring-1 ring-inset ring-forest-400/25">
                    <Icon className="h-[17px] w-[17px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-bold leading-tight tracking-[-0.01em] text-white">
                      {label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-white/55">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Notes sit in the copy column rather than under the player: beside a
              tall portrait frame there is room for them here, and they belong
              with the reasons to press play. */}
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 border-t border-white/10 pt-6 lg:justify-start">
              <li className="vd-note flex items-center gap-2">
                <Clock3 className="h-[15px] w-[15px] shrink-0 text-forest-300" />
                <span className="text-[13px] font-semibold text-white/60">Under a minute</span>
              </li>
              <li className="vd-note flex items-center gap-2">
                <Volume2 className="h-[15px] w-[15px] shrink-0 text-forest-300" />
                <span className="text-[13px] font-semibold text-white/60">Sound on</span>
              </li>
              <li className="vd-note flex items-center gap-2">
                {/* The crawlable link, and the fallback for anyone whose browser or
                  network blocks the embed. Without this the video would be
                  unreachable for them, and invisible to a search engine. */}
                <a
                  href={WATCH}
                  target="_blank"
                  rel="noopener"
                  className="text-[13px] font-semibold text-white/60 underline decoration-white/25 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/60"
                >
                  Watch on YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* ---------- the player ----------
            Capped narrow on purpose. This is a Short, so the frame is 9:16, and
            a portrait video stretched to a full grid column would letterbox into
            two black bars wider than the picture itself. */}
          <div className="vd-card relative mx-auto w-full max-w-[19rem] sm:max-w-[21.5rem]">
            {/* `aspect-[9/16]` holds the exact shape of a Short, so the layout does
              not shift when the poster or the iframe loads into it. */}
            <div
              className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.5rem] ring-1 ring-inset ring-white/15"
              style={{
                boxShadow:
                  "0 2px 10px -2px rgba(3,26,16,0.4), 0 34px 80px -28px rgba(3,26,16,0.75)",
              }}
            >
              {playing ? (
                /* Only ever rendered after a click, which is what keeps YouTube's
                 script and cookies off the page for readers who never watch. */
                <iframe
                  src={EMBED}
                  title={VIDEO.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                /* A real <button>, not a div with onClick: it is focusable, it
                 responds to Enter and Space, and a screen reader announces it as
                 a button. The accessible name states the video's title rather
                 than just "play", so it is meaningful out of context. */
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play video: ${VIDEO.title}`}
                  className="group absolute inset-0 h-full w-full cursor-pointer outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-forest-400"
                >
                  <img
                    src={POSTER}
                    alt=""
                    aria-hidden
                    /* `eager`: this is the section's whole content, and a poster
                     that fades in late leaves a dark hole where the video is.
                     It is one ~75 KB request. */
                    loading="eager"
                    decoding="async"
                    width={1280}
                    height={720}
                    /* `object-cover` on a 16:9 still inside a 9:16 frame crops the
                     sides and fills the shape, which is what a Short's own
                     preview does. `scale-105` on hover gives the card the small
                     push-in that signals it is clickable. */
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />

                  {/* Scrim: darkest at the bottom where the title sits, lighter
                    across the middle so the frame stays visible. Without it the
                    white type has no guaranteed contrast over an unknown image. */}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(3,26,16,0.42) 0%, rgba(3,26,16,0.12) 34%, rgba(3,26,16,0.55) 74%, rgba(3,26,16,0.88) 100%)",
                    }}
                  />

                  {/* ---------- play affordance ----------
                    Oversized and dead centre, because the brief was that it must
                    be obvious. Two rings pulse outward from behind it so the
                    control reads as live rather than as a printed icon. */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 grid h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 place-items-center"
                  >
                    {/* Pulsing halos. `motion-reduce:animate-none` stops them for
                      anyone who asked for less movement; the button stays
                      perfectly usable without them. */}
                    <span className="absolute h-full w-full animate-ping rounded-full bg-forest-300/25 [animation-duration:2.6s] motion-reduce:animate-none" />
                    <span className="absolute h-[128%] w-[128%] rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/20 transition-transform duration-500 ease-out group-hover:scale-110" />

                    {/* The key itself, in the brand's emerald — the same face the
                      primary CTA uses, so "this is the thing to press" needs no
                      explaining. */}
                    <span
                      className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-b from-forest-300 to-forest-500 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-active:scale-95"
                      style={{
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.6), 0 10px 30px -8px rgba(31,190,92,0.7)",
                      }}
                    >
                      {/* `fill-current` + `translate-x`: an outlined triangle reads
                        as an outline at this size, and a play glyph looks
                        off-centre unless nudged right of true centre. */}
                      <Play className="h-7 w-7 translate-x-[2px] fill-current text-forest-950" />
                    </span>
                  </span>

                  {/* Title and channel, so the card says what it is before anyone
                    commits a click to finding out. */}
                  <span className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 p-5 text-left">
                    <span className="line-clamp-2 font-display text-[15px] font-extrabold leading-snug tracking-[-0.015em] text-white">
                      {VIDEO.title}
                    </span>
                    <span className="text-[12px] font-semibold text-white/60">{VIDEO.channel}</span>
                  </span>

                  {/* Corner badge. Names the format, so the reader knows this is a
                    short vertical clip and not a ten-minute webinar. */}
                  <span className="absolute right-4 top-4 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
                    Short
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
