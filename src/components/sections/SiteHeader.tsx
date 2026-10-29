/**
 * SiteHeader — floating forest-glass capsule.
 *
 * One element, two states, cross-faded on scroll rather than swapped:
 *   at rest  — sitting inside the hero's own padding
 *   scrolled — tucks closer to the top edge with a deeper, layered green shadow
 *
 * Signature interactions:
 *   1. Sliding pill     — one FLIP-style indicator tracks the hovered item and
 *                         parks on the current page's item. Constant 2 tweens
 *                         for N items, vs. N transitions if each animated itself.
 *   2. Trailing glow    — an emerald underline follows the pill a beat behind,
 *                         so the nav reads as lit rather than merely highlighted.
 *   3. Character roll   — labels split per glyph; the printed copy rolls up and
 *                         out while a handwritten duplicate rolls in from below.
 *
 * Menu: Features ▾ · How it works · About · Blog · FAQ, then Sign in and Start free. The
 * Features dropdown opens as a compact card under the capsule, each item
 * carrying a one-line tagline (the pattern the strongest study-tool sites use).
 * Guides and the glossary are reached from Blog and the footer.
 *
 * SEO rules it follows (content package, Navigation Spec):
 *   - every item is a real <a href>; dropdown and mobile links are in the HTML
 *     on load and hidden with CSS, never mounted on hover or fetched
 *   - an item renders only once its page is live (`isLive`), so the menu can
 *     never link to a 404
 *   - desktop and mobile carry the same links, since Google indexes mobile
 *   - the current page is marked `aria-current="page"`
 *   - "Skip to content" is the first focusable element
 *
 * Scroll state comes from ScrollTrigger, not a React scroll listener: the class
 * toggle fires once per threshold crossing instead of once per scroll event.
 */

import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Gauge,
  GraduationCap,
  ListChecks,
  Menu,
  MessageCircleQuestion,
  X,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoLink } from "@/components/brand/Logo";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PAGES, isLive } from "@/content/pages";
import { APP_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MenuLink {
  label: string;
  href: string;
  description: string;
  Icon: LucideIcon;
}

interface Dropdown {
  key: "features";
  label: string;
  /** One or two columns, each with a small heading. */
  columns: { title: string; links: MenuLink[] }[];
  /** Section of the site the dropdown covers, for the active state. */
  owns: (path: string) => boolean;
}

/** Keeps only links whose page is live; a held or unbuilt page drops out. */
const live = (links: MenuLink[]) => links.filter(({ href }) => isLive(href));

const DROPDOWNS: Dropdown[] = [
  {
    key: "features",
    label: "Features",
    owns: (path) => path.startsWith("/features/") || path === PAGES.examRevision.path,
    columns: [
      {
        title: "Features",
        links: live([
          {
            label: PAGES.chat.label,
            href: PAGES.chat.path,
            description: "Answers from the chapter, with the page cited",
            Icon: MessageCircleQuestion,
          },
          {
            label: PAGES.adaptive.label,
            href: PAGES.adaptive.path,
            description: "Harder only when they're ready",
            Icon: Gauge,
          },
          {
            label: PAGES.tests.label,
            href: PAGES.tests.path,
            description: "Papers from any chapter, evaluated instantly",
            Icon: ListChecks,
          },
          {
            label: "Exam revision",
            href: PAGES.examRevision.path,
            description: "Chapter-by-chapter revision",
            Icon: GraduationCap,
          },
        ]),
      },
    ],
  },
];

/**
 * Plain links after the dropdowns. Each destination appears once in the
 * header: a page linked here is not repeated inside a dropdown.
 * For Parents joins when its page is live.
 */
const LINKS = [
  { label: "How it works", href: PAGES.howItWorks.path },
  { label: "About", href: PAGES.about.path },
  { label: "Blog", href: PAGES.blog.path },
  { label: "FAQ", href: PAGES.faq.path },
  /* Held until its page is live; `isLive` drops it until then. */
  { label: "For parents", href: PAGES.parents.path },
].filter(({ href }) => isLive(href));

/** Pill keys in render order: the dropdown triggers, then each link. */
const PILL_KEYS: string[] = [...DROPDOWNS.map((d) => d.key), ...LINKS.map((l) => l.href)];

/**
 * A label split into per-character spans, doubled. The visible copy rolls up and
 * out on hover while the duplicate rolls in from below — the stagger is what
 * makes it read as mechanical type rather than a crossfade.
 *
 * The incoming copy is set in Kalam, the brand's handwritten accent face, so a
 * hovered link reads as a teacher's pen annotation over the printed label.
 * Kalam runs narrower and shorter than Mulish at the same px, and both halves
 * share one box, so the handwritten copy is scaled ~1.08 and centred — without
 * that correction it lands visibly short and left of the type it replaces.
 *
 * Spaces become non-breaking so multi-word labels keep their gaps once each
 * glyph is its own inline-block.
 */
function RollingLabel({ text }: { text: string }) {
  const chars = [...text];
  return (
    <span className="relative block overflow-hidden py-[0.12em]">
      <span className="flex">
        {chars.map((c, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-[440ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-full"
            style={{ transitionDelay: `${i * 17}ms` }}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
      {/* Incoming copy, set in the brand's handwritten face. */}
      <span
        aria-hidden
        className="font-hand absolute inset-0 flex items-center justify-center text-[1.08em] font-bold text-forest-700"
      >
        {chars.map((c, i) => (
          <span
            key={i}
            className="inline-block translate-y-full transition-transform duration-[440ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-y-0"
            style={{ transitionDelay: `${i * 17}ms` }}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </span>
  );
}

/** One icon-led row inside a dropdown card or the mobile sheet. */
function MenuItem({
  link,
  current,
  onNavigate,
}: {
  link: MenuLink;
  current: boolean;
  onNavigate: () => void;
}) {
  const { Icon } = link;
  return (
    <a
      href={link.href}
      aria-current={current ? "page" : undefined}
      onClick={onNavigate}
      className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 outline-none transition-colors duration-200 hover:bg-forest-950/[0.04] focus-visible:bg-forest-950/[0.04] focus-visible:outline-2 focus-visible:outline-forest-500 ${
        current ? "bg-forest-500/[0.08]" : ""
      }`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-forest-500/10 text-forest-700 ring-1 ring-inset ring-forest-700/10 transition-colors duration-200 group-hover:bg-forest-600 group-hover:text-white">
        <Icon aria-hidden className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-bold leading-tight text-forest-950">
          {link.label}
        </span>
        <span className="mt-0.5 block text-[12px] leading-snug text-forest-950/55">
          {link.description}
        </span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  /* Set when hover opened a dropdown, so the click that usually follows a
     hover does not immediately shut what the pointer just opened. */
  const hoverOpened = useRef(false);

  const [scrolled, setScrolled] = useState(false);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<Dropdown["key"] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<Dropdown["key"] | null>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  /* The current page, as a pill key: the dropdown that owns it, or the link. */
  const activeKey = pathname.startsWith("/blog")
    ? PAGES.blog.path
    : (DROPDOWNS.find((d) => d.owns(pathname))?.key ??
      LINKS.find((l) => l.href === pathname)?.href ??
      null);

  /* Pill follows hover when there is one, otherwise parks on the current page.
     Null on both (the homepage, at rest) fades it out entirely. */
  const pillTargetKey = hoverKey ?? activeKey;

  useGSAP(
    () => {
      /* Entrance. Logo leads; nav and actions follow on a stagger. */
      gsap.set([".gsap-h-item", ".gsap-h-logo"], { opacity: 0, y: -16 });
      gsap
        .timeline({ delay: 0.12 })
        .to(".gsap-h-logo", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0)
        .to(
          ".gsap-h-item",
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.055, ease: "power3.out" },
          0.14,
        );

      /* Dock / undock.

         NO `refreshPriority` here. Setting it flips GSAP's internal `_sort`
         flag, after which every refreshAll() re-sorts the global trigger array
         underneath triggers that captured their own index at init; one of them
         then reads `undefined.end` and throws inside a React render, which is
         what crashed the page on hard refresh. */
      ScrollTrigger.create({
        start: 20,
        end: "max",
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      });
    },
    { scope: headerRef },
  );

  /* Sliding pill + trailing glow. */
  useEffect(() => {
    const pill = pillRef.current;
    const glow = glowRef.current;
    const nav = navRef.current;
    if (!pill || !nav) return;

    const idx = pillTargetKey ? PILL_KEYS.indexOf(pillTargetKey) : -1;
    const target = idx >= 0 ? itemRefs.current[idx] : null;

    if (!target) {
      gsap.to([pill, glow].filter(Boolean), {
        opacity: 0,
        scaleX: 0.75,
        duration: 0.32,
        ease: "power2.out",
      });
      return;
    }

    const navBox = nav.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    const x = box.left - navBox.left;

    gsap.to(pill, {
      x,
      width: box.width,
      opacity: 1,
      scaleX: 1,
      duration: 0.52,
      ease: "power3.out",
      overwrite: true,
    });
    /* Glow lags ~90ms — the light "catches up" to the pill. */
    if (glow) {
      gsap.to(glow, {
        x,
        width: box.width,
        opacity: 1,
        scaleX: 1,
        duration: 0.78,
        delay: 0.09,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [pillTargetKey, scrolled]);

  /* Close everything on navigation. */
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  /* Lock body scroll while the mobile sheet is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /* Escape closes whichever menu is open. */
  useEffect(() => {
    if (!mobileOpen && !openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, openMenu]);

  const linkClass = (active: boolean) =>
    `group/link gsap-h-item relative block rounded-full px-[1rem] py-2 text-[15px] font-bold tracking-[-0.015em] outline-none transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 ${
      active ? "text-forest-950" : "text-forest-950/65"
    }`;

  /* Marks the current page — the pill can't, since hover borrows it. */
  const activeDot = (active: boolean) => (
    <span
      aria-hidden
      className={`absolute bottom-[3px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-forest-500 transition-all duration-300 ${
        active ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    />
  );

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  return (
    <>
      <a
        href="#content"
        className="sr-only z-[60] rounded-full bg-forest-950 px-4 py-2.5 text-[14px] font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        /* Sits a little lower at rest so the pill reads as floating inside the
           hero panel, then tucks closer to the edge once docked. */
        className={`fixed inset-x-0 z-50 transition-[top] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "top-3" : "top-4"
        }`}
      >
        {/* One fixed measure in both scroll states. The pill is opaque white
            throughout — it sits over video, where a transparent bar would leave
            the nav unreadable. Scroll changes only its height and shadow. */}
        <div className="mx-auto max-w-[1120px] px-2.5 min-[381px]:px-4">
          <div
            className={`relative flex items-center justify-between rounded-[1.35rem] bg-surface transition-[box-shadow,padding] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled
                ? "px-2.5 py-2 shadow-[0_2px_10px_-2px_rgba(6,46,29,0.1),0_18px_44px_-20px_rgba(6,46,29,0.3)] min-[381px]:px-3 md:px-4"
                : "px-3 py-2.5 shadow-[0_2px_8px_-2px_rgba(6,46,29,0.07),0_12px_34px_-18px_rgba(6,46,29,0.22)] min-[381px]:px-4 md:px-5"
            }`}
          >
            {/* Smaller below `sm`, where the bar also carries Start free and the
                burger. The logo sizes itself inline, hence `!`. */}
            <div className="gsap-h-logo relative z-10 flex items-center max-sm:[&_img]:h-[26px]! max-sm:[&_img]:w-auto! max-[380px]:[&_img]:h-[22px]!">
              <LogoLink height={scrolled ? 30 : 32} className="transition-all duration-500" />
            </div>

            {/* ---- desktop nav ----
                From `lg`: with two dropdowns and two links the row needs the
                width, and between md and lg it crowded the logo and CTAs. */}
            <nav
              aria-label="Main"
              className="relative z-10 hidden lg:block"
              onMouseLeave={() => setHoverKey(null)}
            >
              <div ref={navRef} className="relative flex items-center">
                {/* Underline, not a glow: one crisp bar sliding along the bottom
                    of the nav, so the indicator has a defined edge. */}
                <span
                  ref={glowRef}
                  aria-hidden
                  className="pointer-events-none absolute bottom-0.5 left-0 h-[2.5px] rounded-full opacity-0"
                  style={{
                    width: 0,
                    background:
                      "linear-gradient(90deg, transparent, var(--forest-500) 22%, var(--forest-400) 50%, var(--forest-500) 78%, transparent)",
                  }}
                />
                {/* Neutral capsule behind the hovered label — a faint ink tint,
                    so the moving highlight never competes with the CTA. */}
                <span
                  ref={pillRef}
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 h-9 -translate-y-1/2 rounded-full bg-forest-950/5.5 opacity-0 ring-1 ring-inset ring-forest-950/4"
                  style={{ width: 0 }}
                />

                <ul className="flex items-center">
                  {DROPDOWNS.map((menu, i) => {
                    const open = openMenu === menu.key;
                    const active = activeKey === menu.key;
                    return (
                      <li
                        key={menu.key}
                        className="relative"
                        onMouseEnter={() => {
                          hoverOpened.current = true;
                          setOpenMenu(menu.key);
                        }}
                        onMouseLeave={() => {
                          hoverOpened.current = false;
                          setOpenMenu(null);
                        }}
                        onBlur={(e) => {
                          /* Close once focus leaves the trigger and its card. */
                          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                            setOpenMenu(null);
                          }
                        }}
                      >
                        <button
                          ref={(el) => {
                            itemRefs.current[i] = el;
                          }}
                          type="button"
                          aria-expanded={open}
                          aria-controls={`menu-${menu.key}`}
                          onClick={() => {
                            if (hoverOpened.current) {
                              hoverOpened.current = false;
                              return;
                            }
                            setOpenMenu(open ? null : menu.key);
                          }}
                          onMouseEnter={() => setHoverKey(menu.key)}
                          onFocus={() => setHoverKey(menu.key)}
                          className={`${linkClass(active || open)} flex items-center gap-1`}
                        >
                          <RollingLabel text={menu.label} />
                          <ChevronDown
                            aria-hidden
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                          {activeDot(active)}
                        </button>

                        {/* Always in the DOM, `invisible` when shut, so the
                            links are crawlable and need no mount to open.
                            `pt-3` bridges the gap to the capsule so the pointer
                            can cross it without closing the card. */}
                        <div
                          id={`menu-${menu.key}`}
                          className={`absolute left-1/2 top-full ${
                            menu.columns.length > 1 ? "w-[34rem]" : "w-[19rem]"
                          } -translate-x-1/2 pt-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            open
                              ? "visible translate-y-0 opacity-100"
                              : "invisible -translate-y-1 opacity-0"
                          }`}
                        >
                          <div
                            className={`grid ${
                              menu.columns.length > 1 ? "grid-cols-2" : "grid-cols-1"
                            } gap-2 rounded-[1.35rem] bg-surface p-3 shadow-[0_2px_10px_-2px_rgba(6,46,29,0.12),0_28px_60px_-24px_rgba(6,46,29,0.4)] ring-1 ring-inset ring-forest-950/[0.07]`}
                          >
                            {menu.columns.map((column) => (
                              <div key={column.title}>
                                <p className="px-3 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
                                  {column.title}
                                </p>
                                {column.links.map((link) => (
                                  <MenuItem
                                    key={link.href}
                                    link={link}
                                    current={pathname === link.href}
                                    onNavigate={() => setOpenMenu(null)}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </li>
                    );
                  })}

                  {LINKS.map((item, i) => {
                    const active = activeKey === item.href;
                    return (
                      <li key={item.href}>
                        <a
                          ref={(el) => {
                            itemRefs.current[DROPDOWNS.length + i] = el;
                          }}
                          href={item.href}
                          onMouseEnter={() => setHoverKey(item.href)}
                          onFocus={() => setHoverKey(item.href)}
                          onBlur={() => setHoverKey(null)}
                          aria-current={active ? "page" : undefined}
                          className={linkClass(active)}
                        >
                          <RollingLabel text={item.label} />
                          {activeDot(active)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            {/* ---- actions ---- */}
            <div className="relative z-10 flex items-center gap-1.5">
              <MagneticButton
                as="a"
                href={APP_URL}
                {...EXTERNAL_LINK_PROPS}
                variant="ghost"
                size="sm"
                className="gsap-h-item hidden lg:inline-flex"
              >
                Sign in
              </MagneticButton>

              {/* Visible at every width, per the Navigation Spec: on mobile the
                  primary CTA stays beside the burger. */}
              <MagneticButton
                as="a"
                href={APP_URL}
                {...EXTERNAL_LINK_PROPS}
                variant="ink"
                size="sm"
                roll={false}
                className="gsap-h-item group inline-flex whitespace-nowrap max-[380px]:h-9 max-[380px]:px-3.5 max-[380px]:text-[13px]"
              >
                Start free
                {/* Diagonal arrow that exits top-right and re-enters from
                    bottom-left, so the loop reads as "launch" rather than a
                    nudge. Dropped below 400px, where the bar has no room. */}
                <span className="relative hidden h-4 w-4 place-items-center overflow-hidden min-[400px]:grid">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:-translate-y-4" />
                  <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </MagneticButton>

              <button
                type="button"
                onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="gsap-h-item ml-0.5 grid h-10 w-10 place-items-center max-[380px]:h-9 max-[380px]:w-9 rounded-full text-forest-950 ring-1 ring-inset ring-forest-900/12 transition-colors duration-300 hover:bg-forest-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 lg:hidden"
              >
                {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---- mobile sheet ----
          The same links as the desktop menu, in the same groups. Stays in the
          DOM when shut (hidden, `inert`), so the links are in the HTML Google's
          mobile crawler reads. */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div
          onClick={closeMobile}
          className={`absolute inset-0 bg-forest-950/30 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-20 max-h-[calc(100svh-6rem)] origin-top overflow-y-auto rounded-[1.75rem] bg-surface p-3 shadow-[0_28px_70px_-28px_rgba(6,46,29,0.4)] ring-1 ring-inset ring-forest-900/12 transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-3 scale-[0.97] opacity-0"
          }`}
        >
          <nav aria-label="Main mobile" className="flex flex-col">
            {DROPDOWNS.map((menu) => {
              const open = mobileSection === menu.key;
              return (
                <div key={menu.key}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`mobile-${menu.key}`}
                    onClick={() => setMobileSection(open ? null : menu.key)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[16px] font-bold tracking-[-0.015em] text-forest-950 active:bg-forest-950/5"
                  >
                    {menu.label}
                    <ChevronDown
                      aria-hidden
                      className={`h-4 w-4 text-forest-700/60 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`mobile-${menu.key}`}
                    className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden" inert={!open}>
                      <div className="pb-2">
                        {menu.columns
                          .flatMap((c) => c.links)
                          .map((link) => (
                            <MenuItem
                              key={link.href}
                              link={link}
                              current={pathname === link.href}
                              onNavigate={closeMobile}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <ul>
              {LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMobile}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] font-bold tracking-[-0.015em] text-forest-950 active:bg-forest-950/5 ${
                      pathname === item.href ? "bg-forest-950/5" : ""
                    }`}
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="h-4 w-4 text-forest-700/40" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-2 flex flex-col gap-2 border-t border-forest-900/10 pt-3">
            <MagneticButton
              as="a"
              href={APP_URL}
              {...EXTERNAL_LINK_PROPS}
              variant="outline"
              size="md"
              onClick={closeMobile}
            >
              Sign in
            </MagneticButton>
            <MagneticButton
              as="a"
              href={APP_URL}
              {...EXTERNAL_LINK_PROPS}
              variant="ink"
              size="md"
              roll={false}
              onClick={closeMobile}
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default SiteHeader;
