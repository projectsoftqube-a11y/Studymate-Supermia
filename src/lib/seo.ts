import { SITE_URL } from "@/lib/site";
import type { SitePage } from "@/content/pages";

/**
 * Stable entity identifiers.
 *
 * Every page references these by `@id` instead of restating the entity, which
 * is what lets a crawler merge all of the site's pages into one organisation,
 * one website and one product rather than a pile of unrelated claims.
 *
 * The organisation is SuperMIA, not StudyMate: StudyMate is a product, and its
 * maker is the entity with an address, a legal name and social profiles. The id
 * lives on supermia.ai on purpose, so that if the main site declares the same
 * `@id` the two graphs resolve to one entity across both domains.
 */
export const ORG_ID = "https://supermia.ai/#organization";
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;

/** Shared social image. 1200x630, self-hosted, absolute. */
export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "StudyMate AI: an AI tutor that answers from your own textbook",
} as const;

/**
 * Indexable pages explicitly allow large snippets and previews. These do not
 * change ranking; they lift the default caps on how much of the page a search
 * or answer engine may quote, which is the whole point of writing quotable copy.
 */
const ROBOTS_INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const ROBOTS_HOLD = "noindex, follow";

export const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export interface Crumb {
  label: string;
  href: string;
}

/** Home, then the page's trail if it has one, then the page itself. */
export function breadcrumbsFor(page: SitePage): Crumb[] {
  if (page.path === "/") return [];
  return [
    { label: "Home", href: "/" },
    ...(page.trail ?? []),
    { label: page.label, href: page.path },
  ];
}

type JsonLdNode = Record<string, unknown>;

/**
 * The WebPage node and its BreadcrumbList, plus whatever the page adds.
 *
 * `name` and `description` are the page's title and meta description verbatim,
 * which is what the package specifies and keeps the schema from drifting from
 * the tags a search result actually shows.
 */
export function pageGraph(
  page: SitePage,
  {
    type = "WebPage",
    extra = [],
    node = {},
  }: { type?: string; extra?: JsonLdNode[]; node?: JsonLdNode } = {},
): JsonLdNode {
  const url = absoluteUrl(page.path);
  const crumbs = breadcrumbsFor(page);
  const breadcrumbId = `${url}#breadcrumb`;

  const webPage: JsonLdNode = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    about: { "@id": SOFTWARE_ID },
    ...(crumbs.length ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    dateModified: page.modified,
    ...node,
  };

  const breadcrumb: JsonLdNode[] = crumbs.length
    ? [
        {
          "@type": "BreadcrumbList",
          "@id": breadcrumbId,
          itemListElement: crumbs.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.label,
            item: absoluteUrl(crumb.href.split("#")[0] || "/"),
          })),
        },
      ]
    : [];

  return { "@context": "https://schema.org", "@graph": [webPage, ...breadcrumb, ...extra] };
}

/**
 * Everything a route's `head` needs, from its registry entry.
 *
 * The root route carries only what is genuinely sitewide (charset, viewport,
 * site name, the organisation graph). Each route calls this, so a page can no
 * longer silently inherit the homepage's title and description.
 *
 * The canonical is always the production origin from SITE_URL, never the
 * request host, so the Vercel preview URLs cannot claim to be the original.
 */
export function pageHead(page: SitePage, graph: JsonLdNode = pageGraph(page)) {
  const url = absoluteUrl(page.path);
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { name: "robots", content: page.live ? ROBOTS_INDEX : ROBOTS_HOLD },
      { property: "og:type", content: "website" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE.url },
      { property: "og:image:width", content: String(OG_IMAGE.width) },
      { property: "og:image:height", content: String(OG_IMAGE.height) },
      { property: "og:image:alt", content: OG_IMAGE.alt },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: OG_IMAGE.url },
      { "script:ld+json": graph },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
