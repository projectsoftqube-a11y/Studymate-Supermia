import type { ReactNode } from "react";
import { EXTERNAL_LINK_PROPS } from "@/lib/site";
import { INLINE_TOKEN, liveText, parseLink } from "@/lib/rich-text";

/**
 * Renders the `**bold**` / `[text](href)` subset used in page copy.
 *
 * Sentences that link to a page which is not live are removed first
 * (`liveText`), so the copy never ships a link to a 404. Bold runs are parsed
 * again for links, which lets a list item open with a linked, bold label.
 */
function renderInline(text: string): ReactNode[] {
  return text
    .split(INLINE_TOKEN)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-extrabold text-forest-950">
            {renderInline(part.slice(2, -2))}
          </strong>
        );
      }

      const link = parseLink(part);
      if (link) {
        const external = link.href.startsWith("http");
        return (
          <a
            key={i}
            href={link.href}
            {...(external ? EXTERNAL_LINK_PROPS : {})}
            className="font-bold text-forest-700 underline decoration-forest-500/40 decoration-2 underline-offset-[3px] transition-colors duration-300 hover:text-forest-600 hover:decoration-forest-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500"
          >
            {link.label}
          </a>
        );
      }

      return <span key={i}>{part}</span>;
    });
}

export function RichText({ text }: { text: string }) {
  return <>{renderInline(liveText(text))}</>;
}
