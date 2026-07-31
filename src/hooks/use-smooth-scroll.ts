/**
 * Lenis smooth scroll, driven by GSAP's ticker.
 *
 * Lenis and ScrollTrigger both want to own a rAF loop. Left alone they run on
 * separate frames, so ScrollTrigger reads a scroll position Lenis has already
 * moved past and pinned/scrubbed elements visibly lag the page by a frame. The
 * fix is to give up Lenis's own loop (`autoRaf: false`), raf it from
 * gsap.ticker, and tell ScrollTrigger to update on every Lenis scroll event —
 * one clock, one order of operations.
 *
 * lagSmoothing(0) is required: GSAP normally clamps large frame deltas to avoid
 * animation jumps after a stall, but that clamping desynchronises a
 * scroll-linked loop from the real scroll position.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The running Lenis instance, or null when smooth scroll is off (the user
 * prefers reduced motion, or the route has unmounted).
 */
let activeLenis: Lenis | null = null;

/**
 * Scroll the page back to the top.
 *
 * Routed through Lenis when it is running, because it owns the scroll position
 * and a raw `window.scrollTo` fights it. Falls back to the native call for
 * reduced-motion users, where Lenis is deliberately never started.
 */
export function scrollToTop(): void {
  if (activeLenis) activeLenis.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: "auto" });
}

export function useSmoothScroll() {
  useEffect(() => {
    /* Honour the OS setting: smooth scrolling is exactly the kind of motion
       that triggers vestibular discomfort, and it hijacks the native scroll. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      /* ~1s to settle. Long enough to feel eased, short enough that the page
         still tracks the wheel rather than gliding past the target. */
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      /* Touch devices already have momentum scrolling in the OS; layering Lenis
         on top makes them feel slippery and breaks pull-to-refresh. */
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    /* Published so components outside this hook can drive the scroll. Lenis
       owns the scroll position while it is running, so anything calling
       window.scrollTo directly fights it and lands in the wrong place.

       A module variable rather than `window.lenis`: Lenis already declares that
       global as a feature-flags object ({version, horizontal, snap, touch}), so
       assigning the instance there is a type conflict and would overwrite data
       the library owns. */
    activeLenis = lenis;

    /* gsap.ticker passes seconds; Lenis wants milliseconds. */
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* In-page anchors, handled here rather than per link.
       Taking over the scroll means the browser's own anchor handling no longer
       applies: a click on `#faq` sets the hash and jumps (or, once Lenis has
       the wheel, does nothing useful), so every on-page link in the header and
       footer felt broken. One delegated listener covers all of them, including
       any added later.

       `offset` clears the fixed header, which would otherwise sit on top of the
       heading the reader just asked to see. */
    const HEADER_CLEARANCE = 96;

    const onDocumentClick = (event: MouseEvent) => {
      /* Let the browser handle modified clicks (new tab, download, etc.). */
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;
      if (anchor.hasAttribute("target") || anchor.hasAttribute("download")) return;

      const target = document.getElementById(href.slice(1));
      /* No such section: leave the click alone rather than silently swallowing
         it, so a dead link stays visibly dead instead of looking handled. */
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -HEADER_CLEARANCE, duration: 1.2 });

      /* Keep the URL and the back button honest, without a second native jump. */
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP's default
      lenis.destroy();
      /* Clear it, or a consumer would hold a destroyed instance whose scrollTo
         silently does nothing. */
      activeLenis = null;
    };
  }, []);
}

export default useSmoothScroll;
