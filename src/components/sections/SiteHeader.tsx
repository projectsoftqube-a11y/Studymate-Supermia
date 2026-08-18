/**
 * SiteHeader — floating forest-glass capsule.
 *
 * One element, two states, cross-faded on scroll rather than swapped:
 *   at rest  — wide and transparent, sitting inside the hero's own padding
 *   scrolled — contracts into a narrower frosted island that detaches from the
 *              top edge, gains a forest-tinted hairline ring and a layered green
 *              shadow
 *
 * Signature interactions:
 *   1. Sliding pill     — one FLIP-style indicator tracks the hovered link and
 *                         parks on the section in view. Constant 2 tweens for N
 *                         links, vs. N transitions if each link animated itself.
 *   2. Trailing glow    — an emerald blur follows the pill a beat behind, so the
 *                         nav reads as lit rather than merely highlighted.
 *   3. Character roll   — link labels split per glyph; the visible copy rolls up
 *                         and out while a duplicate rolls in from below, L→R.
 *
 * Scroll state comes from ScrollTrigger, not a React scroll listener: the class
 * toggle fires once per threshold crossing instead of once per scroll event.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoLink } from "@/components/brand/Logo";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { APP_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NAV = [
  /* Every entry must point at a section that actually exists on the page.
     `features`, `journey` and `pricing` were left over from sections that have
     since been removed, so all three scrolled nowhere. A nav link that silently
     does nothing is worse than one fewer link. */
  { id: "problem", label: "Why StudyMate" },
  { id: "how", label: "How it works" },
  { id: "analytics", label: "Your progress" },
  { id: "chat", label: "See it work" },
] as const;

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

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Pill follows hover when there is one, otherwise parks on the in-view
     section. Null on both (top of page) fades it out entirely. */
  const pillTargetId = hoverId ?? activeId;

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

      /* Dock / undock. */
      ScrollTrigger.create({
        start: 20,
        end: "max",
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      });

      /* Which section owns the viewport. Sections live in sibling components, so
         guard on existence rather than assuming the anchors are mounted.

         NO `refreshPriority` here, deliberately.

         Setting it flips GSAP's internal `_sort` flag, and from then on every
         refreshAll() calls ScrollTrigger.sort() and REORDERS the global
         `_triggers` array. Trigger init captures its own position first
         (`triggerIndex = _triggers.indexOf(self)`) and then walks backwards
         from it; once the array has been re-sorted underneath that index, the
         walk reads a slot that no longer holds what it expects, `curTrigger`
         comes back undefined, and `curTrigger.end` throws:

             TypeError: Cannot read properties of undefined (reading 'end')
                 at P.refresh  <- recursed
                 at P.refresh
                 at t.init

        Thrown inside a React render pass, that hits the error boundary and
        takes the page down, which is what crashed on hard refresh.

        These triggers only drive which nav pill is highlighted, so refresh
        order genuinely does not matter for them. */
      NAV.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActiveId(id),
        });
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

    const idx = NAV.findIndex((n) => n.id === pillTargetId);
    const target = idx >= 0 ? linkRefs.current[idx] : null;

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
  }, [pillTargetId, scrolled]);

  /* Lock body scroll while the mobile sheet is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        /* Sits a little lower at rest so the pill reads as floating inside the
           hero panel, then tucks closer to the edge once docked. */
        className={`fixed inset-x-0 z-50 transition-[top] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "top-3" : "top-5"
        }`}
      >
        {/* One fixed measure in both scroll states. The width deliberately does
            not animate: a pill that resizes as you scroll pulls attention back to
            the chrome, and at full viewport width the nav items strand in the
            middle with the logo and CTA pinned to far-apart edges.

            The pill is opaque white throughout — it sits over video, where a
            transparent bar would leave the nav unreadable. Scroll changes only
            its height and shadow depth. */}
        <div className="mx-auto max-w-[1080px] px-4">
          <div
            className={` relative flex items-center justify-between rounded-[1.35rem] bg-surface transition-[box-shadow,padding] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled
                ? "px-3 py-2 shadow-[0_2px_10px_-2px_rgba(6,46,29,0.1),0_18px_44px_-20px_rgba(6,46,29,0.3)] md:px-4"
                : "px-4 py-3 shadow-[0_2px_8px_-2px_rgba(6,46,29,0.07),0_12px_34px_-18px_rgba(6,46,29,0.22)] md:px-5"
            }`}
          >
            <div className="gsap-h-logo relative z-10 flex items-center">
              <LogoLink height={scrolled ? 30 : 34} className="transition-all duration-500" />
            </div>

            {/* ---- desktop nav ---- */}
            <div
              ref={navRef}
              onMouseLeave={() => setHoverId(null)}
              className="relative z-10 hidden items-center md:flex"
            >
              {/* Underline, not a glow.
                  A blurred emerald bloom behind a pale wash read as a washed-out
                  smudge on white — two soft green layers with no hard edge
                  between them. This is a single crisp bar that slides along the
                  bottom of the nav, so the indicator has a defined edge and the
                  green stays fully saturated. */}
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
              {/* Neutral capsule behind the hovered label — a faint ink tint
                  rather than green, so the moving highlight never competes with
                  the emerald CTA a few pixels to its right. */}
              <span
                ref={pillRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-1/2 h-9 -translate-y-1/2 rounded-full bg-forest-950/5.5 opacity-0 ring-1 ring-inset ring-forest-950/4"
                style={{ width: 0 }}
              />
              {NAV.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    href={`#${item.id}`}
                    onMouseEnter={() => setHoverId(item.id)}
                    onFocus={() => setHoverId(item.id)}
                    onBlur={() => setHoverId(null)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group/link gsap-h-item relative rounded-full px-[1.15rem] py-2 text-[14.5px] font-bold tracking-[-0.015em] outline-none transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 ${
                      isActive ? "text-forest-950" : "text-forest-950/65"
                    }`}
                  >
                    {/* No chevron here, unlike the reference: these are
                        single-destination anchors, and a disclosure arrow that
                        opens nothing is a broken affordance. */}
                    <RollingLabel text={item.label} />
                    {/* Dot marks the section actually in view — the pill can't,
                        since hover borrows it. */}
                    <span
                      aria-hidden
                      className={`absolute bottom-[3px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-forest-500 transition-all duration-300 ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* ---- actions ---- */}
            <div className="relative z-10 flex items-center gap-1.5">
              {/* `#start`, not `#signin`: there is no sign-in route in this
                  project, and an anchor to an ID that does not exist is a link
                  that visibly does nothing when clicked. */}
              <MagneticButton
                as="a"
                href={APP_URL}
                {...EXTERNAL_LINK_PROPS}
                variant="ghost"
                size="sm"
                /* `md`, not `sm`, to match the CTA beside it and the burger's own
                   `md:hidden`. At sm this appeared alongside the hamburger, so
                   the bar showed a nav link and the menu that duplicates it. One
                   breakpoint now switches the whole action cluster at once. */
                className="gsap-h-item hidden md:inline-flex"
              >
                Sign in
              </MagneticButton>

              <MagneticButton
                as="a"
                href={APP_URL}
                {...EXTERNAL_LINK_PROPS}
                variant="ink"
                size="sm"
                roll={false}
                /* Hidden below md, where the hamburger appears: the mobile sheet
                   already carries its own "Start free" (and "Sign in"), so this
                   was a duplicate CTA competing with the burger for the narrow
                   strip beside the logo and crowding the bar. */
                className="gsap-h-item group hidden md:inline-flex"
              >
                Start free
                {/* Diagonal arrow that exits top-right and re-enters from
                    bottom-left, so the loop reads as "launch" rather than a
                    nudge. Overflow-hidden on the well does the clipping. */}
                <span className="relative grid h-4 w-4 place-items-center overflow-hidden">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:-translate-y-4" />
                  <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </MagneticButton>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="gsap-h-item ml-0.5 grid h-10 w-10 place-items-center rounded-full text-forest-950 ring-1 ring-inset ring-forest-900/12 transition-colors duration-300 hover:bg-forest-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 md:hidden"
              >
                {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---- mobile sheet ---- */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-forest-950/30 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-20 origin-top rounded-[1.75rem] bg-[color-mix(in_oklab,var(--surface)_84%,var(--forest-500))]/92 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_28px_70px_-28px_rgba(6,46,29,0.4)] ring-1 ring-inset ring-forest-900/12 backdrop-blur-2xl backdrop-saturate-[1.7] transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-3 scale-[0.97] opacity-0"
          }`}
        >
          <nav className="flex flex-col">
            {NAV.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                style={{ transitionDelay: mobileOpen ? `${90 + i * 50}ms` : "0ms" }}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] font-bold tracking-[-0.015em] text-forest-950 transition-all duration-500 active:bg-forest-950/5 ${
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                } ${activeId === item.id ? "bg-forest-950/5" : ""}`}
              >
                {item.label}
                <ArrowRight className="h-4 w-4 text-forest-700/40" />
              </a>
            ))}
          </nav>
          <div className="mt-2 flex flex-col gap-2 border-t border-forest-900/10 pt-3">
            {/* `#start` for the same reason as the desktop button above. */}
            <MagneticButton
              as="a"
              href={APP_URL}
              {...EXTERNAL_LINK_PROPS}
              variant="outline"
              size="md"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </MagneticButton>
            {/* Matches the desktop CTA's ink face — the sheet is white, so the
                same reasoning applies: chrome, not the hero's emerald. */}
            <MagneticButton
              as="a"
              href={APP_URL}
              {...EXTERNAL_LINK_PROPS}
              variant="ink"
              size="md"
              roll={false}
              onClick={() => setMobileOpen(false)}
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
