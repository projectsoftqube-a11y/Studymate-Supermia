import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { FAQ_CONTENT, faqItems } from "@/content/faq";
import { PAGES } from "@/content/pages";
import { absoluteUrl, pageGraph, pageHead } from "@/lib/seo";
import { toPlain } from "@/lib/rich-text";

/**
 * The only page with FAQPage markup (the homepage, feature pages and parents
 * page show visible FAQs without it, per the content package).
 *
 * Questions and answers are mapped from the same `FAQ_CONTENT` the page
 * renders, through the same `toPlain` text the reader sees, so the schema and
 * the visible answers are identical by construction rather than by care.
 */
const url = absoluteUrl(PAGES.faq.path);

const faqPage = {
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  isPartOf: { "@id": `${url}#webpage` },
  mainEntity: faqItems(FAQ_CONTENT).map(({ q, a }) => ({
    "@type": "Question",
    name: toPlain(q),
    acceptedAnswer: { "@type": "Answer", text: toPlain(a) },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => pageHead(PAGES.faq, pageGraph(PAGES.faq, { extra: [faqPage] })),
  component: FaqRoute,
});

function FaqRoute() {
  return <ContentPage page={PAGES.faq} content={FAQ_CONTENT} />;
}
