import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One shared "refresh once the webfonts have landed" call for the whole page.
 *
 * Why this exists rather than each section calling ScrollTrigger.refresh():
 *
 * Every animated section needs a refresh after `document.fonts.ready`, because
 * SplitText measures glyph boxes at split time and a split against fallback
 * metrics leaves every trigger's start/end computed from the wrong text height.
 *
 * Nine sections each doing `document.fonts.ready.then(() => ScrollTrigger.refresh())`
 * meant nine refreshes resolving from the SAME promise in the SAME microtask
 * flush. ScrollTrigger.refresh() walks its global `_triggers` array and calls
 * `curTrigger.refresh()` on entries it finds, which can itself re-enter and
 * mutate that array. With nine of them interleaved, one pass reads an index the
 * previous pass has already spliced out, `curTrigger` comes back `undefined`,
 * and the next property access throws:
 *
 *     TypeError: Cannot read properties of undefined (reading 'end')
 *         at P.refresh   <- recursed
 *         at P.refresh
 *         at t.init
 *
 * Thrown from inside a React render pass, that reaches the error boundary and
 * takes the whole page down. It only reproduced on a hard refresh, because that
 * is the one load where fonts are uncached and all nine handlers are still
 * pending when the promise settles.
 *
 * Coalescing solves it at the source: the promise is awaited once, the refresh
 * runs once, and it is deferred to the next frame so any trigger created later
 * in the same commit is already registered when it fires.
 */
let scheduled: Promise<void> | null = null;

export function refreshAfterFonts(): void {
  /* Already queued by another section this page load: nothing to do. The whole
     point is that N callers produce exactly one refresh. */
  if (scheduled) return;

  const fonts = typeof document !== "undefined" ? document.fonts : undefined;

  scheduled = Promise.resolve(fonts?.ready)
    .then(
      () =>
        new Promise<void>((resolve) => {
          /* Next frame, not immediately. Sections mount in the same commit, so
             firing on the microtask would refresh before the last section has
             created its triggers, and those would keep their pre-font measurements. */
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            resolve();
          });
        }),
    )
    /* A font that never resolves must not leave the page un-refreshed. */
    .catch(() => {
      ScrollTrigger.refresh();
    });
}

/**
 * Clears the once-per-load latch.
 *
 * Only needed by the route component on unmount: without it a client-side
 * navigation back to this page would skip the refresh entirely, because the
 * module-level flag would still be set from the previous mount.
 */
export function resetRefreshLatch(): void {
  scheduled = null;
}
