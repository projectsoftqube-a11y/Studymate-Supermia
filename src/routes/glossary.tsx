import { createFileRoute } from "@tanstack/react-router";
import ContentPage from "@/components/content/ContentPage";
import { GLOSSARY, GLOSSARY_CONTENT } from "@/content/glossary";
import { PAGES } from "@/content/pages";
import { toPlain } from "@/lib/rich-text";
import { absoluteUrl, pageGraph, pageHead } from "@/lib/seo";

/**
 * DefinedTermSet built from the same GLOSSARY entries the page renders, each
 * term pointing at its own section anchor, so an engine can cite a single
 * definition by URL.
 */
const url = absoluteUrl(PAGES.glossary.path);

const termSet = {
  "@type": "DefinedTermSet",
  "@id": `${url}#terms`,
  name: "Study Glossary",
  hasDefinedTerm: GLOSSARY.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${url}#${t.id}`,
    name: t.term,
    description: toPlain(t.definition),
    url: `${url}#${t.id}`,
    inDefinedTermSet: { "@id": `${url}#terms` },
  })),
};

export const Route = createFileRoute("/glossary")({
  head: () =>
    pageHead(
      PAGES.glossary,
      pageGraph(PAGES.glossary, {
        node: { about: undefined, mainEntity: { "@id": `${url}#terms` } },
        extra: [termSet],
      }),
    ),
  component: GlossaryRoute,
});

function GlossaryRoute() {
  return <ContentPage page={PAGES.glossary} content={GLOSSARY_CONTENT} />;
}
