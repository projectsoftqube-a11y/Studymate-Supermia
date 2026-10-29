import { CATEGORIES } from "@/content/blog/categories";
import { postPath } from "@/content/blog";
import { wordCount } from "@/content/blog/text";
import type { BlogPost } from "@/content/blog/types";
import type { SitePage } from "@/content/pages";
import { toPlain } from "@/lib/rich-text";
import { OG_IMAGE, ORG_ID, WEBSITE_ID, absoluteUrl, pageGraph } from "@/lib/seo";

/**
 * Structured data for the blog, kept apart from `lib/seo` because it reads the
 * blog content (and `rich-text`), which the page registry depends on.
 */

/**
 * WebPage + BreadcrumbList + BlogPosting for one post.
 *
 * The author is the organisation, by `@id`, until named authors with real
 * credentials are supplied: an invented Person would be a fabricated E-E-A-T
 * signal. `citation` lists the post's verified sources, and `speakable` points
 * at the answer box and the key takeaways.
 */
export function blogPostGraph(page: SitePage, post: BlogPost) {
  const url = absoluteUrl(postPath(post));
  return pageGraph(page, {
    node: {
      /* A guide is about its topic, not about the product: drop the default
         `about` -> SoftwareApplication (undefined keys are not serialised). */
      about: undefined,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".answer-block", ".key-takeaways"],
      },
    },
    extra: [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.h1,
        description: post.description,
        abstract: toPlain(post.answer),
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        datePublished: post.published,
        dateModified: post.modified,
        inLanguage: "en-US",
        articleSection: CATEGORIES[post.category].label,
        wordCount: wordCount(post),
        image: {
          "@type": "ImageObject",
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
        },
        ...(post.sources.length
          ? {
              citation: post.sources.map((s) => ({
                "@type": "CreativeWork",
                name: s.title,
                author: s.publisher,
                datePublished: s.year,
                url: s.url,
              })),
            }
          : {}),
      },
    ],
  });
}

/**
 * CollectionPage + BreadcrumbList + ItemList for the hub and category pages.
 * The ItemList is what lets an engine enumerate the guides without crawling
 * every card, and it is built from the same array the page renders.
 */
export function collectionGraph(page: SitePage, posts: BlogPost[]) {
  const url = absoluteUrl(page.path);
  return pageGraph(page, {
    type: "CollectionPage",
    node: { about: undefined, mainEntity: { "@id": `${url}#posts` } },
    extra: [
      {
        "@type": "ItemList",
        "@id": `${url}#posts`,
        numberOfItems: posts.length,
        itemListElement: posts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(postPath(post)),
          name: post.h1,
        })),
      },
    ],
  });
}
