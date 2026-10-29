import { useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { LogoLink } from "@/components/brand/Logo";
import { PAGES, isLive } from "@/content/pages";
import { APP_URL, EXTERNAL_LINK_PROPS, MAIN_SITE_URL } from "@/lib/site";

/**
 * Real destinations only.
 *
 * An earlier footer carried twenty-one links, every one pointing at "#". Every
 * entry below resolves to a live page, a mailto or a live external page. A link
 * to a page of this site renders only once that page is live (`isLive`), so
 * /for-parents joins the Product column on its launch day.
 *
 * Four balanced groups of four to six links. The previous layout followed the
 * Navigation Spec's columns literally and left "For" holding a single link next
 * to a seven-link column, which read as unfinished rather than organised.
 */
interface FooterLink {
  label: string;
  href: string;
}

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: PAGES.chat.label, href: PAGES.chat.path },
      { label: PAGES.adaptive.label, href: PAGES.adaptive.path },
      { label: PAGES.tests.label, href: PAGES.tests.path },
      { label: "Exam revision", href: PAGES.examRevision.path },
      { label: "For parents", href: PAGES.parents.path },
      { label: "How it works", href: PAGES.howItWorks.path },
    ],
  },
  {
    heading: "Guides",
    links: [
      { label: "All study guides", href: PAGES.blog.path },
      { label: "Study methods compared", href: "/blog/study-methods-compared" },
      { label: "How to study a chapter", href: "/blog/how-to-study-a-textbook-chapter" },
      { label: "Board exam revision plan", href: "/blog/board-exam-revision-plan" },
      { label: "AI homework without cheating", href: "/blog/ai-for-homework-without-cheating" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "FAQ", href: PAGES.faq.path },
      { label: "Study glossary", href: PAGES.glossary.path },
      { label: "Sign in", href: APP_URL },
      { label: "Contact us", href: "mailto:hello@supermia.ai" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: PAGES.about.path },
      /* The one link back to the parent brand's page for this product. */
      { label: "StudyMate on SuperMIA", href: MAIN_SITE_URL },
      { label: PAGES.privacy.label, href: PAGES.privacy.path },
      { label: PAGES.terms.label, href: PAGES.terms.path },
    ],
  },
]
  .map((column) => ({ ...column, links: column.links.filter(({ href }) => isLive(href)) }))
  .filter((column) => column.links.length > 0);

/** One container for every row, so all three rows share the same edges. */
const CONTAINER = "mx-auto max-w-site px-4 sm:px-6 lg:px-10";

/**
 * Footer.
 *
 * Light, against the dark closing panel above it, in three rows that share one
 * container: a sign-off card, then the brand block beside four link groups,
 * then a single base line. The brand block carries the contact details (the
 * same name, address and email as the organisation schema on every page)
 * instead of leaving them to a crowded bottom bar.
 *
 * No entrance animation, deliberately: it is the last thing on the page, and a
 * reveal would only delay the details someone scrolled down to find.
 */
export default function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <footer className="relative isolate overflow-hidden bg-white text-forest-950">
      {/* Soft emerald bloom, so the light surface has a light source. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 30%, transparent), transparent 70%)",
        }}
      />

      {/* ---- sign-off card ---- */}
      <div className={`relative pt-16 ${CONTAINER}`}>
        <div
          className="relative overflow-hidden rounded-2xl px-5 py-7 ring-1 ring-inset ring-forest-950/[0.07] sm:rounded-3xl sm:px-10 sm:py-10"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--forest-500) 9%, white), white 65%)",
            boxShadow: "0 1px 2px rgba(16,40,28,0.04), 0 18px 40px -24px rgba(16,40,28,0.22)",
          }}
        >
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest-700">
                Still reading
              </p>
              <p className="mt-3 max-w-md font-display text-[clamp(1.15rem,4vw,1.85rem)] font-extrabold leading-[1.15] tracking-[-0.03em]">
                Then open the chapter that&apos;s hardest right now.
              </p>
            </div>
            <a
              href={APP_URL}
              {...EXTERNAL_LINK_PROPS}
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-forest-950 px-6 py-3.5 text-[14.5px] font-bold text-white transition-colors duration-300 hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 sm:w-auto"
              style={{ boxShadow: "0 10px 24px -12px rgba(16,40,28,0.5)" }}
            >
              Start free
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ---- brand + links ----
          From 2xl the brand block sits beside four equal link groups. Below 2xl
          it takes a full row, with the groups 4-up (lg) or 2-up beneath: any
          narrower and the longer labels wrap and the columns stop lining up. */}
      <div
        className={`relative grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:py-16 lg:grid-cols-4 2xl:grid-cols-[minmax(0,1.25fr)_repeat(4,minmax(0,1fr))] 2xl:gap-x-8 ${CONTAINER}`}
      >
        <div className="col-span-2 lg:col-span-4 2xl:col-span-1 2xl:pr-6">
          <LogoLink height={30} />
          <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-forest-950/70">
            An AI tutor that answers from students&apos; own textbooks, with the page cited, and
            shows which chapters to study next.
          </p>

          <ul className="mt-6 space-y-3 text-[14px]">
            <li>
              <a
                href="mailto:hello@supermia.ai"
                className="inline-flex items-center gap-2.5 py-1.5 font-semibold sm:py-0 text-forest-950/75 transition-colors duration-300 hover:text-forest-950"
              >
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-forest-600" />
                hello@supermia.ai
              </a>
            </li>
            <li className="flex items-start gap-2.5 leading-relaxed text-forest-950/65">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
              <address className="not-italic">
                2451 W Grapevine Mills Cir #547
                <br />
                Grapevine, TX 76051, United States
              </address>
            </li>
          </ul>
        </div>

        {/* Below sm each group takes the full row and its links become pills:
            two narrow columns of plain links wrapped unevenly at phone widths
            and stopped lining up. From sm they are an ordinary list again. */}
        {COLUMNS.map(({ heading, links }) => (
          <nav
            key={heading}
            aria-label={heading}
            className="col-span-2 border-t border-forest-950/[0.07] pt-6 sm:col-span-1 sm:border-0 sm:pt-0"
          >
            {/* A label, not an <h2>: as headings these words landed in every
                page's outline after its real content. The <nav> is already
                named by `aria-label`. */}
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-forest-950">
              {heading}
            </p>
            <ul className="mt-3.5 flex flex-wrap gap-2 sm:mt-5 sm:block sm:space-y-3">
              {links.map(({ label, href }) => {
                const external = href.startsWith("http");
                const current = pathname === href;
                return (
                  <li key={`${label}-${href}`}>
                    <a
                      href={href}
                      {...(external ? EXTERNAL_LINK_PROPS : {})}
                      /* `aria-current` rather than a colour-only cue, so the
                         link announces that it goes nowhere new. */
                      aria-current={current ? "page" : undefined}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] leading-snug ring-1 ring-inset ring-forest-950/[0.07] transition-colors duration-300 hover:text-forest-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 sm:inline sm:rounded-none sm:bg-transparent sm:p-0 sm:text-[14px] sm:ring-0 ${
                        current
                          ? "bg-forest-950/[0.08] font-bold text-forest-950"
                          : "bg-forest-950/[0.03] text-forest-950/70 sm:text-forest-950/65"
                      }`}
                    >
                      {label}
                      {/* Diagonal arrow only on links that leave the site.
                          Inline from sm, so it follows the last word when the
                          label wraps instead of floating at the column edge. */}
                      {external && (
                        <ArrowUpRight
                          aria-hidden
                          className="h-3.5 w-3.5 shrink-0 opacity-50 sm:ml-1 sm:inline sm:align-[-2px]"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      {/* ---- base ---- */}
      <div className={`relative ${CONTAINER}`}>
        <div className="flex flex-col gap-3 border-t border-forest-950/[0.09] py-6 text-[13px] text-forest-950/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} StudyMate AI by{" "}
            {/* `supermia.ai`, not `supermia.com`: the `.com` is registered to
                someone else. Botfinity is a separate company with its own
                `.com`. */}
            <a
              href={MAIN_SITE_URL}
              {...EXTERNAL_LINK_PROPS}
              className="font-semibold text-forest-950/75 hover:text-forest-950"
            >
              SuperMIA
            </a>{" "}
            ·{" "}
            <a
              href="https://botfinity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest-950"
            >
              Botfinity Inc.
            </a>{" "}
            All rights reserved.
          </p>
          <p>
            Design &amp; Develop by{" "}
            <a
              href="https://softqubes.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-forest-950/75 hover:text-forest-950"
            >
              Softqube Technologies LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
