/**
 * Canonical origin for this marketing site, no trailing slash.
 *
 * Social crawlers and `rel="canonical"` both need absolute URLs, so this has to
 * be stated rather than derived from the request. One constant means a custom
 * domain is a single-line change instead of a find-and-replace across every
 * meta tag and JSON-LD block.
 *
 * This MUST be the public production domain, never the Vercel deployment URL.
 * It previously read `study-mate-ai-new.vercel.app`, which told Google the
 * authoritative copy of every page lived on the staging host — so each ranking
 * signal the site earned was credited to a domain that should not rank at all,
 * and the real domain looked like the duplicate. If this ever has to change
 * again, `public/robots.txt` and `public/sitemap.xml` carry the same origin as
 * literal text and are not derived from this constant.
 */
export const SITE_URL = "https://studymate.supermia.ai";

/**
 * The actual product. Every "Start free" / "Sign in" CTA points here.
 *
 * Kept separate from SITE_URL because they are genuinely different properties:
 * this site is the marketing page, that is the application. They can move
 * independently.
 */
export const APP_URL = "https://app.studymate.supermia.ai";

/**
 * StudyMate's page on the main SuperMIA site — the parent brand this product
 * belongs to, not another marketing page for it.
 *
 * Named here rather than inlined because the footer previously linked the word
 * "SuperMIA" to `supermia.com`, a domain the company does not own. Every page of
 * this site carried that link, so the whole footer was handing its authority to
 * someone else's registration. A constant makes the correct destination the only
 * one available to reach for.
 */
export const MAIN_SITE_URL = "https://supermia.ai/ai-studymate/";

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
