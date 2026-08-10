/**
 * Brand logo — single source of truth for the StudyMate mark.
 *
 * Two variants:
 *   "wordmark" — the full "StudyMate" lockup (public/logo.png)
 *   "mark"     — the square "SM" book + star icon only (public/logo-mark.svg)
 *
 * Assets live in /public so they are served as static files and can be reused by
 * the document head (favicon, og:image) without duplicating them in the bundle.
 */

import { scrollToTop } from "@/hooks/use-smooth-scroll";

type LogoVariant = "wordmark" | "mark";

interface LogoProps {
  /** Which lockup to render. Defaults to the full wordmark. */
  variant?: LogoVariant;
  /** Rendered height in px. Width scales from the asset's intrinsic ratio. */
  height?: number;
  /** Extra classes for the <img>. */
  className?: string;
  /**
   * When true the logo is decorative (a nearby text label already names the
   * brand), so it is hidden from assistive tech.
   */
  decorative?: boolean;
}

/** Intrinsic dimensions of each asset, so the browser can reserve space and avoid CLS. */
const ASSETS: Record<LogoVariant, { src: string; width: number; height: number }> = {
  /* PNG, not the old logo.svg.
     That "SVG" was a 1536x1024 base64 PNG wrapped in an <svg>, weighing 2.8 MB
     — larger than the hero video — and it loads eagerly in the header, so it
     blocked first paint on every page load. Trimmed of its transparent padding
     and resized to 3x its largest rendered size, the same artwork is 31 KB. */
  wordmark: { src: "/logo.png", width: 665, height: 128 },
  mark: { src: "/logo-mark.svg", width: 256, height: 256 },
};

export function Logo({
  variant = "wordmark",
  height = 36,
  className = "",
  decorative = false,
}: LogoProps) {
  const asset = ASSETS[variant];
  const width = Math.round((asset.width / asset.height) * height);

  return (
    <img
      src={asset.src}
      width={width}
      height={height}
      style={{ height, width }}
      className={`select-none ${className}`}
      alt={decorative ? "" : "StudyMate AI"}
      aria-hidden={decorative || undefined}
      draggable={false}
      /* Above the fold in the header — never lazy-load, and decode eagerly so
         the first paint includes the brand. */
      loading="eager"
      fetchPriority="high"
      decoding="sync"
    />
  );
}

/**
 * Logo wrapped in a home link, used in the site header.
 *
 * Pass `interactive={false}` for a plain, non-clickable lockup. The footer uses
 * that: it sits a few centimetres above the header's own logo on a one-page
 * site, so a second control doing exactly the same thing is redundant, and a
 * link that only scrolls the page back up is a weak reason to make the brand
 * mark look pressable.
 */
export function LogoLink({
  variant = "wordmark",
  height = 36,
  className = "",
  interactive = true,
}: Omit<LogoProps, "decorative"> & { interactive?: boolean }) {
  if (!interactive) {
    /* A plain <span>, not a styled <a>. No href, no click handler, no
       hover transition and no pointer cursor, so nothing about it invites a
       click that would do nothing. */
    return (
      <span className={`inline-flex cursor-default select-none items-center ${className}`}>
        <Logo variant={variant} height={height} />
      </span>
    );
  }

  /* No hover transform on the mark: the wordmark is a raster image rather than
     real vector paths, so any scale on hover resamples the bitmap and the
     lockup visibly softens. A plain opacity dip carries the same affordance
     without touching the pixels. */
  return (
    <a
      href="/"
      aria-label="StudyMate AI home"
      /* Scroll to top rather than navigate — but only when already home.
         The marketing site is one route, so there `href="/"` reloaded the entire
         document: it lost the smooth-scroll instance, replayed every entrance
         animation and re-fetched the hero video. `preventDefault` keeps the
         anchor semantics (real href, so middle-click and "open in new tab" still
         work) while turning a plain left-click into a scroll.

         On /privacy and /terms the same interception would make the logo a
         control that scrolls a legal page upward and never leaves it, which is
         the one thing a brand mark in a header must not do. There the click
         falls through to the browser and navigates home. */
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (window.location.pathname !== "/") return;
        e.preventDefault();
        scrollToTop();

        /* Drop any `#section` left in the URL, so the address bar matches what
           the reader is now looking at. */
        if (window.location.hash) {
          window.history.pushState(null, "", window.location.pathname);
        }
      }}
      className={`inline-flex items-center rounded-lg outline-none transition-opacity duration-300 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <Logo variant={variant} height={height} decorative />
    </a>
  );
}

export default Logo;
