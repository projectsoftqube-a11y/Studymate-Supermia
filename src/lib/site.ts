/**
 * Canonical origin for this marketing site, no trailing slash.
 *
 * Social crawlers and `rel="canonical"` both need absolute URLs, so this has to
 * be stated rather than derived from the request. One constant means a custom
 * domain is a single-line change instead of a find-and-replace across every
 * meta tag and JSON-LD block.
 */
export const SITE_URL = "https://study-mate-ai-new.vercel.app";

/**
 * The actual product. Every "Start free" / "Sign in" CTA points here.
 *
 * Kept separate from SITE_URL because they are genuinely different properties:
 * this site is the marketing page, that is the application. They can move
 * independently.
 */
export const APP_URL = "https://app.studymate.supermia.ai";

/**
 * Props for any anchor leaving this site for the app.
 *
 * `rel="noopener"` is required with `target="_blank"`: without it the opened
 * page gets a `window.opener` handle back to this one and can navigate it
 * elsewhere. `noreferrer` is deliberately NOT included, because the app will
 * want the referrer for its own analytics.
 */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener",
} as const;
