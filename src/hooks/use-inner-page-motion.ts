import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { refreshAfterFonts } from "@/lib/scroll-refresh";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Inner-page motion. Its own vocabulary rather than the homepage hero's: the
 * <h1> rises and sharpens word by word. No overflow mask: with the tight
 * heading leading a mask clips descenders (g, y, p). Hooks onto class names inside
 * `scope`:
 *
 *   .ip-eyebrow   kicker, fades up first
 *   .ip-title     the <h1>, words rising and sharpening in turn
 *   .ip-sub       lead copy, fades up after the title
 *   .ip-cta       buttons, staggered
 *   .ip-journey   a timeline whose `.ip-journey-fill` rail lights up on scroll
 *   .ip-reveal    any block below the fold, fading up as it enters
 *
 * Every word is in the server HTML at full opacity: the from-states are set
 * here, on the client, after hydration, so crawlers and no-JS readers get the
 * finished page. Reduced motion gets no movement at all.
 */
export function useInnerPageMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        refreshAfterFonts();

        const title = scope.current?.querySelector(".ip-title");
        const split = title ? new SplitText(title, { type: "words" }) : null;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".ip-eyebrow",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.07 },
          0,
        );
        if (split) {
          tl.fromTo(
            split.words,
            { yPercent: 45, opacity: 0, filter: "blur(6px)" },
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "expo.out",
              stagger: { amount: 0.45 },
              clearProps: "filter",
            },
            0.1,
          );
        }
        tl.fromTo(
          ".ip-sub",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
          0.45,
        ).fromTo(
          ".ip-cta",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.6,
        );

        /* A journey timeline lights its rail as the reader scrolls through it. */
        gsap.utils.toArray<HTMLElement>(".ip-journey", scope.current).forEach((journey) => {
          const fill = journey.querySelector(".ip-journey-fill");
          if (!fill) return;
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: journey, start: "top 70%", end: "bottom 60%", scrub: true },
            },
          );
        });

        const reveals = gsap.utils.toArray<HTMLElement>(".ip-reveal", scope.current);
        gsap.set(reveals, { y: 32, opacity: 0 });
        ScrollTrigger.batch(reveals, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });

        return () => split?.revert();
      });
    },
    { scope },
  );
}
