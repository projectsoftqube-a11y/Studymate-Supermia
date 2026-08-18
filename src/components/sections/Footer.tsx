import { useRouterState } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Globe, Mail, MapPin } from "lucide-react";
import { LogoLink } from "@/components/brand/Logo";
import { APP_URL, EXTERNAL_LINK_PROPS, MAIN_SITE_URL } from "@/lib/site";

/**
 * Real destinations only.
 *
 * The previous footer carried twenty-one links across four columns, every one
 * pointing at "#". A footer full of dead links is worse than a small one: it
 * costs the reader a click to learn the link was fake, and search engines follow
 * them into nothing. Every entry below resolves to something that exists —
 * either a section of the marketing page or a live external page.
 *
 * A link is one or the other, never both: `id` is an on-page section, resolved
 * against the current route; `href` is an outright destination.
 */
type FooterLink =
  { label: string; id: string; href?: never } | { label: string; href: string; id?: never };

const EXPLORE: readonly FooterLink[] = [
  { label: "Why StudyMate", id: "problem" },
  { label: "How it works", id: "how" },
  { label: "Your progress", id: "analytics" },
  /* The one link back to the parent brand's own page for this product. It sits
     in Explore rather than the contact column because it is something to read,
     not a way to get in touch, and it is the first link to that URL in document
     order — which is the one whose anchor text search engines actually count
     when a page links to the same target twice (the sign-off below is second). */
  { label: "About StudyMate on SuperMIA", href: MAIN_SITE_URL },
];

const TRY: readonly FooterLink[] = [
  { label: "Ask the book", id: "chat" },
  { label: "Try a test", id: "adaptive" },
  { label: "Questions", id: "faq" },
];

/**
 * The legal pages. Real routes, not anchors, so they sit in the base bar
 * alongside the copyright rather than in the section columns above.
 */
const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

/**
 * Real contact details, from the product brochure's "Connect with Us" page.
 * Every one is a working destination: a mailto, an external site, and an address
 * a person could actually visit.
 */
const CONTACT = [
  { Icon: Mail, label: "hello@supermia.ai", href: "mailto:hello@supermia.ai" },
  { Icon: Globe, label: "supermia.ai", href: "https://www.supermia.ai" },
  {
    Icon: MapPin,
    label: "2451 W Grapevine Mills Cir #547, Grapevine, TX 76051",
    href: null,
  },
] as const;

/**
 * Footer.
 *
 * Light, against the dark closing panel above it. The two used to share a
 * near-identical forest value and merged into one block with no visible
 * boundary; the tonal flip settles that rather than asking a hairline rule to
 * carry it.
 *
 * Proportions are the thing this went through several passes to get right. An
 * earlier version set the six anchors as full-width display-type rows, which
 * gave each link enormous weight and made the whole block read as a menu page
 * rather than a footer. Footer links want to be small and quiet: a reader who
 * has reached the bottom is either leaving or looking for one specific thing,
 * and neither is helped by thirty-two-pixel type.
 *
 * So the interest comes from the frame instead: a raised card carrying the
 * sign-off, with tight link groups beneath it. The links stay in their proper
 * register.
 */
export default function Footer() {
  /* No entrance animation here, deliberately.
     The footer is the last thing on the page and the reader has already scrolled
     past nine animated sections to reach it; one more reveal adds nothing and
     delays content someone is scrolling down specifically to read (the contact
     details and links). Rendering it plainly also removes one more ScrollTrigger
     from the page, and the `.ft-card` / `.ft-col` / `.ft-base` classes are kept
     only as markup hooks. */

  /* The footer is mounted on the legal routes as well, where none of these
     sections exist, so off the homepage every anchor is rewritten to `/#id` and
     navigates home first. Same reasoning as SiteHeader: on `/` they stay bare so
     Lenis's delegated handler keeps claiming them. */
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  /* One renderer for both link groups: they differ only in heading and items. */
  const linkGroup = (heading: string, items: readonly FooterLink[]) => (
    <div className="ft-col">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
        {heading}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => {
          /* An `href` item leaves the site; an `id` item is a section on the
             marketing page, resolved against the current route. */
          const isExternal = item.href !== undefined;
          const href = item.href ?? (onHome ? `#${item.id}` : `/#${item.id}`);
          /* Diagonal for "this leaves the site", horizontal for "this moves you
             down the page". The arrow is the only thing distinguishing the two
             kinds, so it has to actually differ. */
          const Arrow = isExternal ? ArrowUpRight : ArrowRight;

          return (
            <li key={href}>
              <a
                href={href}
                {...(isExternal ? EXTERNAL_LINK_PROPS : {})}
                className="group inline-flex items-start gap-1.5 text-[14px] font-semibold text-forest-950/65 transition-colors duration-300 hover:text-forest-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500"
              >
                <span className="relative">
                  {item.label}
                  {/* Underline drawn from the left on hover, rather than a rule
                      that is always half-visible. */}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-forest-500 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                  />
                </span>
                {/* `mt-[0.3em]` keeps the arrow on the first line's baseline for
                    the one label long enough to wrap in a narrow column. */}
                <Arrow
                  aria-hidden
                  className="mt-[0.3em] h-3.5 w-3.5 shrink-0 -translate-x-1 text-forest-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <footer className="relative isolate overflow-hidden bg-white text-forest-950">
      {/* Soft emerald bloom, so the light surface has a light source and does
          not read as a flat white rectangle under a dark panel. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full opacity-45 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 30%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-site px-6 pt-16 lg:px-10">
        {/* ---- sign-off card ----
            Raised off the white surface so the top of the footer has an object
            in it rather than starting straight into small text. The panel above
            already made the ask, so this restates it quietly and does not
            repeat the offer terms. */}
        <div
          className="ft-card relative overflow-hidden rounded-2xl px-5 py-7 ring-1 ring-inset ring-forest-950/[0.07] sm:rounded-3xl sm:px-10 sm:py-10"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--forest-500) 9%, white), white 65%)",
            boxShadow: "0 1px 2px rgba(16,40,28,0.04), 0 18px 40px -24px rgba(16,40,28,0.22)",
          }}
        >
          {/* Faint grid inside the card only, so the texture is contained by an
              edge instead of washing across the whole footer. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in oklab, var(--forest-950) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--forest-950) 4%, transparent) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 100% at 100% 0%, #000, transparent 75%)",
              maskImage: "radial-gradient(ellipse 70% 100% at 100% 0%, #000, transparent 75%)",
            }}
          />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest-700">
                Still reading
              </p>
              <p className="mt-3 max-w-md font-display text-[clamp(1.15rem,4vw,1.85rem)] font-extrabold leading-[1.15] tracking-[-0.03em]">
                Then open the chapter you have been avoiding.
              </p>
            </div>

            {/* `justify-center` and full width on the narrowest screens: at
                320px this button plus its padding is wider than the column, and
                `shrink-0` would push it past the card edge rather than wrap. */}
            <a
              href={APP_URL}
              {...EXTERNAL_LINK_PROPS}
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-forest-950 px-5 py-3.5 text-[14px] font-bold text-white transition-all duration-300 hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 sm:w-auto sm:justify-start sm:px-6 sm:text-[14.5px]"
              style={{ boxShadow: "0 10px 24px -12px rgba(16,40,28,0.5)" }}
            >
              Start learning free
              {/* Two arrows: the first leaves up-right, the second arrives from
                  down-left, so the icon reads as replaced rather than nudged. */}
              <span className="relative grid h-4 w-4 place-items-center overflow-hidden">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4 group-hover:translate-x-4" />
                <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </a>
          </div>
        </div>

        {/* ---- columns ---- */}
        {/* One column below 400px. Two 130px columns at 320px is not enough for
            "Why StudyMate" to sit on one line, and the arrow that slides in on
            hover needs room beyond the label. */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 min-[400px]:grid-cols-2 sm:gap-y-12 sm:py-14 lg:grid-cols-12 lg:gap-10">
          <div className="ft-col min-[400px]:col-span-2 lg:col-span-4">
            {/* Not clickable: the header's logo is a few centimetres above this
                on a one-page site, so a second control that does the same thing
                is redundant. */}
            <LogoLink height={30} interactive={false} />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-forest-950/70">
              An AI tutor that reads your own textbooks and shows you exactly what to study next.
            </p>
          </div>

          <div className="lg:col-span-2">{linkGroup("Explore", EXPLORE)}</div>
          <div className="lg:col-span-2">{linkGroup("Try it", TRY)}</div>

          <div className="ft-col min-[400px]:col-span-2 lg:col-span-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3">
              {CONTACT.map(({ Icon, label, href }) => (
                <li key={label}>
                  {/* Only render an anchor when there is somewhere to go: the
                      address is text, not a link to nothing. */}
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group inline-flex max-w-full items-center gap-2.5 text-[14px] font-semibold text-forest-950/65 transition-colors duration-300 hover:text-forest-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500"
                    >
                      <Icon className="h-[15px] w-[15px] shrink-0 text-forest-600" />
                      {/* `break-all` on the address-like strings: an email has
                          no spaces to wrap at, so at 320px it would otherwise
                          push the whole column past the viewport edge. */}
                      <span className="relative min-w-0 break-all">
                        {label}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-0 bg-forest-500 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                        />
                      </span>
                    </a>
                  ) : (
                    <span className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-forest-950/70">
                      <Icon className="mt-0.5 h-[15px] w-[15px] shrink-0 text-forest-600" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---- legal ---- */}
      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="ft-base flex flex-col gap-4 border-t border-forest-950/[0.09] py-7 text-[13px] text-forest-950/70 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} StudyMate AI. All rights reserved.</p>

          {/* Legal + attribution share the right-hand end. They wrap onto their
              own lines below `lg`, where the copyright and the two policy links
              together are wider than the column. */}
          <div className="flex flex-col gap-x-5 gap-y-3 sm:flex-row sm:items-center">
            <nav aria-label="Legal" className="flex items-center gap-x-5">
              {LEGAL.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  /* `aria-current="page"` rather than a colour-only cue: on the
                     document you are already reading, the link stays clickable
                     and needs to announce that it goes nowhere new. */
                  aria-current={pathname === href ? "page" : undefined}
                  className={`font-semibold transition-colors duration-300 hover:text-forest-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 ${
                    pathname === href ? "text-forest-950" : "text-forest-950/70"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <span aria-hidden className="hidden h-3.5 w-px bg-forest-950/15 sm:block" />

            {/* `supermia.ai`, not `supermia.com`. The `.com` is registered to
                someone else, so this sign-off appeared on every page of the site
                pointing the brand's own name at a domain the company does not
                own — a broken destination for readers and leaked authority for
                search. Botfinity is a genuinely separate company and keeps its
                own `.com`. */}
            <p className="text-forest-950/70">
              by{" "}
              <a
                href={MAIN_SITE_URL}
                {...EXTERNAL_LINK_PROPS}
                className="font-bold text-forest-950/70 hover:text-forest-950"
              >
                SuperMIA
              </a>{" "}
              ·{" "}
              <a
                href="https://botfinity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-950/70 hover:text-forest-950"
              >
                Botfinity Inc.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
