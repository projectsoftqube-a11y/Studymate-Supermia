/**
 * MagneticButton — the site's primary interactive affordance, in the brand's
 * deep-forest palette.
 *
 * Six layered hover behaviours, all GPU-composited (transform/opacity only) so
 * the whole stack stays on the compositor thread:
 *
 *   1. Magnetic pull    — the face leans ~5px toward the cursor and the label
 *                         leans ~45% further, giving parallax depth. Springs back
 *                         on leave via elastic.out.
 *   2. Liquid fill      — a radial emerald bloom grows from the exact pointer
 *                         entry point and floods the face. Because it is seeded
 *                         where the cursor crossed the edge, the button appears
 *                         to react to *how* you approached it, not merely that
 *                         you did.
 *   3. Orbiting streak  — a conic-gradient ring spins behind the face, masked to
 *                         a hairline, so a bright arc travels the perimeter.
 *   4. Specular sweep   — a soft diagonal highlight crosses the face once, the
 *                         way light catches a physical key.
 *   5. Rolling label    — per-glyph roll: the visible text rolls up and out while
 *                         a duplicate rolls in from below, staggered L→R.
 *   6. Spring press     — scale dip on pointer-down with an elastic release.
 *
 * Under `prefers-reduced-motion` every motion layer is skipped; the colour and
 * shadow transitions remain, which carry the same affordance.
 */

import { useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type MagneticVariant = "solid" | "ghost" | "outline" | "accent" | "glass" | "ink";
type MagneticSize = "sm" | "md" | "lg";

/**
 * Base faces. `solid` is the deep-forest capsule — a near-black green with a
 * subtle vertical sheen, an inner top highlight and a tinted ring, so it reads
 * as a moulded physical key rather than a flat rounded rectangle.
 */
const VARIANTS: Record<MagneticVariant, string> = {
  /* Solid: the primary CTA, and the ONLY bright element on the page.
     It was previously a dark forest gradient, which vanished against the dark
     green hero video — a primary action must contrast with its backdrop, not
     match it. Now a luminous emerald face with near-black forest text: on the
     dark hero it reads as lit, and on light sections it still carries weight
     because the fill is far more saturated than any surface behind it. */
  solid:
    "text-forest-950 bg-gradient-to-b from-forest-300 to-forest-500 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-2px_5px_rgba(6,46,29,0.28),0_1px_2px_rgba(3,26,16,0.3),0_12px_32px_-10px_rgba(31,190,92,0.5)] " +
    "hover:from-forest-300 hover:to-forest-400 " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-2px_5px_rgba(6,46,29,0.24),0_2px_6px_rgba(3,26,16,0.32),0_26px_58px_-14px_rgba(31,190,92,0.75)]",
  accent:
    "text-white bg-gradient-to-b from-forest-500 to-forest-700 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-2px_4px_rgba(0,0,0,0.22),0_1px_2px_rgba(6,46,29,0.3),0_12px_30px_-12px_rgba(22,163,74,0.6)] " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.22),0_2px_6px_rgba(6,46,29,0.32),0_26px_54px_-16px_rgba(31,190,92,0.7)]",
  /* Glass-on-light — sits beside the solid CTA without competing with it. */
  outline:
    "text-forest-900 bg-surface/70 ring-1 ring-inset ring-forest-900/15 backdrop-blur-sm " +
    "shadow-[0_1px_2px_rgba(6,46,29,0.05),0_6px_18px_-12px_rgba(6,46,29,0.2)] " +
    "hover:text-forest-950 hover:bg-surface hover:ring-forest-700/30 " +
    "hover:shadow-[0_2px_6px_rgba(6,46,29,0.07),0_16px_34px_-14px_rgba(6,46,29,0.28)]",
  ghost: "text-forest-900/70 hover:text-forest-950 hover:bg-forest-950/[0.055]",
  /* Ink: the header CTA. Deliberately NOT the bright emerald `solid` face — the
     header sits on white, where a saturated green button shouts louder than the
     logo beside it and turns navigation into the loudest thing on the page. A
     near-black forest capsule reads as chrome, and leaves the emerald reserved
     for the one true primary action in the hero. */
  ink:
    "text-white bg-gradient-to-b from-forest-800 to-forest-950 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-2px_4px_rgba(0,0,0,0.3),0_1px_2px_rgba(6,46,29,0.3),0_8px_20px_-8px_rgba(6,46,29,0.45)] " +
    "hover:from-forest-700 hover:to-forest-900 " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.26),inset_0_-2px_4px_rgba(0,0,0,0.3),0_2px_5px_rgba(6,46,29,0.32),0_16px_34px_-10px_rgba(18,120,72,0.55)]",
  /* Glass-on-dark, for photographic backgrounds. Deliberately restrained: it is
     the secondary action, so it stays a thin frosted outline rather than a slab
     of white that would out-shout the primary CTA beside it. */
  glass:
    "text-white bg-white/[0.07] ring-1 ring-inset ring-white/25 backdrop-blur-xl " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_30px_-14px_rgba(3,26,16,0.6)] " +
    "hover:bg-white/[0.14] hover:ring-white/45",
};

const SIZES: Record<MagneticSize, string> = {
  sm: "h-10 px-[1.15rem] text-[14px] gap-2",
  md: "h-12 px-6 text-[15px] gap-2.5",
  lg: "h-[3.4rem] px-8 text-[16px] gap-3",
};

interface MagneticButtonOwnProps {
  as?: ElementType;
  variant?: MagneticVariant;
  size?: MagneticSize;
  /** Max px the face travels toward the cursor. 0 disables the pull. */
  strength?: number;
  /** Specular sweep across the face. Defaults on except for `ghost`. */
  sweep?: boolean;
  /** Radial bloom seeded at the pointer entry point. Filled faces only. */
  liquid?: boolean;
  /** Conic light arc travelling the perimeter. Filled faces only. */
  orbit?: boolean;
  /** Per-glyph label roll. Requires `children` to be a plain string. */
  roll?: boolean;
  children?: ReactNode;
}

/* Polymorphic props. `any` for the element generic is deliberate: narrowing it
   makes `as="a"` reject `href`, since TS resolves the default "button" prop set
   before `as` is read. */
export type MagneticButtonProps = MagneticButtonOwnProps &
  Omit<ComponentPropsWithoutRef<any>, keyof MagneticButtonOwnProps>;

/** Per-glyph rolling text. Spaces become NBSP so word gaps survive inline-block. */
function RollText({ text }: { text: string }) {
  const chars = [...text];
  return (
    <span className="relative inline-block overflow-hidden py-[0.14em] align-middle">
      <span className="flex">
        {chars.map((c, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-[440ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mag:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
      <span aria-hidden className="absolute inset-0 flex">
        {chars.map((c, i) => (
          <span
            key={i}
            className="inline-block translate-y-full transition-transform duration-[440ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mag:translate-y-0"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </span>
  );
}

export function MagneticButton({
  as,
  variant = "solid",
  size = "md",
  strength = 5,
  sweep,
  liquid,
  orbit,
  roll = true,
  className,
  children,
  ...rest
}: MagneticButtonProps) {
  const Comp = (as ?? "button") as ElementType;
  const rootRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const sweepRef = useRef<HTMLSpanElement>(null);
  const liquidRef = useRef<HTMLSpanElement>(null);
  const orbitRef = useRef<HTMLSpanElement>(null);
  const spotRef = useRef<HTMLSpanElement>(null);

  const filled = variant === "solid" || variant === "accent" || variant === "ink";
  /* `solid` is the only face light enough that additive light layers wash it
     out, so the hover layers branch on lightness rather than on a variant name
     — a new dark variant then inherits the correct treatment automatically. */
  const lightFace = variant === "solid";
  const showSweep = sweep ?? variant !== "ghost";
  const showLiquid = liquid ?? filled;
  const showOrbit = orbit ?? filled;
  /* Roll only when the label is a bare string — splitting arbitrary nodes per
     glyph is not meaningful, and icons must stay intact. */
  const rollText = roll && typeof children === "string" ? children : null;

  /* One quickTo per animated property, built lazily on first move: quickTo
     reuses a single tween instead of allocating one per pointermove event. */
  const setters = useRef<{
    x?: (v: number) => void;
    y?: (v: number) => void;
    lx?: (v: number) => void;
    ly?: (v: number) => void;
    sx?: (v: number) => void;
    sy?: (v: number) => void;
  }>({});

  const reduced = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: React.PointerEvent) => {
    if (!strength || reduced() || !rootRef.current) return;
    const el = rootRef.current;
    const r = el.getBoundingClientRect();
    /* -1..1 offset of the cursor from the face's centre. */
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);

    const s = setters.current;
    if (!s.x) {
      const opts = { duration: 0.45, ease: "power3.out" } as const;
      s.x = gsap.quickTo(el, "x", opts);
      s.y = gsap.quickTo(el, "y", opts);
      if (labelRef.current) {
        s.lx = gsap.quickTo(labelRef.current, "x", opts);
        s.ly = gsap.quickTo(labelRef.current, "y", opts);
      }
      if (spotRef.current) {
        /* Faster than the face so the light leads the movement rather than
           dragging behind it. */
        const sOpts = { duration: 0.3, ease: "power2.out" } as const;
        s.sx = gsap.quickTo(spotRef.current, "xPercent", sOpts);
        s.sy = gsap.quickTo(spotRef.current, "yPercent", sOpts);
      }
    }
    s.x!(dx * strength);
    s.y!(dy * strength * 0.6);
    s.lx?.(dx * strength * 0.45);
    s.ly?.(dy * strength * 0.3);
    /* Spotlight is 2x the face, centred by a -50%/-50% base offset, so ±50 here
       walks it edge to edge under the cursor. */
    s.sx?.(-50 + dx * 50);
    s.sy?.(-50 + dy * 50);
  };

  const handleEnter = (e: React.PointerEvent) => {
    if (reduced() || !rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();

    /* Spotlight fades up wherever the pointer entered, then handleMove takes
       over tracking it. */
    if (spotRef.current) {
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      gsap.set(spotRef.current, { xPercent: -50 + dx * 50, yPercent: -50 + dy * 50 });
      gsap.to(spotRef.current, { opacity: 1, duration: 0.35, ease: "power2.out", overwrite: true });
    }

    /* Liquid bloom, seeded exactly where the pointer crossed the edge. */
    if (showLiquid && liquidRef.current) {
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      gsap.set(liquidRef.current, {
        transformOrigin: `${px}% ${py}%`,
        left: `${px}%`,
        top: `${py}%`,
        scale: 0,
        opacity: 1,
      });
      gsap.to(liquidRef.current, {
        scale: 1,
        duration: 0.72,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (showSweep && sweepRef.current) {
      /* The sweep must END invisible, not rely on pointerleave to clear it.
         Previously it animated to opacity 1 and was only faded out on leave, so
         any exit that skips that event — scrolling the button away, the pointer
         leaving the window, a re-render mid-tween — stranded a bright band
         across the face. Fading back to 0 inside the same tween makes the
         highlight self-terminating. */
      gsap.fromTo(
        sweepRef.current,
        { xPercent: -140, opacity: 0 },
        {
          keyframes: [
            { opacity: 1, duration: 0.18 },
            { opacity: 0, duration: 0.3, delay: 0.24 },
          ],
          xPercent: 140,
          duration: 0.72,
          ease: "power2.inOut",
          overwrite: true,
        },
      );
    }

    /* Perimeter arc — one continuous rotation while hovered. */
    if (showOrbit && orbitRef.current) {
      gsap.to(orbitRef.current, { opacity: 1, duration: 0.3, overwrite: true });
      gsap.to(orbitRef.current, {
        rotate: "+=360",
        duration: 2.4,
        ease: "none",
        repeat: -1,
        id: "orbit",
      });
    }
  };

  const handleLeave = () => {
    const el = rootRef.current;
    if (!el) return;
    /* elastic.out gives the overshoot-and-settle of a released physical key. */
    gsap.to([el, labelRef.current].filter(Boolean), {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      overwrite: true,
    });
    if (sweepRef.current) gsap.to(sweepRef.current, { opacity: 0, duration: 0.2 });
    if (spotRef.current) gsap.to(spotRef.current, { opacity: 0, duration: 0.3, overwrite: true });
    /* Bloom recedes rather than snapping — it drains back to its seed point. */
    if (liquidRef.current) {
      gsap.to(liquidRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
    if (orbitRef.current) {
      gsap.killTweensOf(orbitRef.current);
      gsap.to(orbitRef.current, { opacity: 0, duration: 0.35 });
    }
  };

  const handleDown = () => {
    if (reduced() || !rootRef.current) return;
    gsap.to(rootRef.current, {
      scale: 0.955,
      duration: 0.14,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleUp = () => {
    if (reduced() || !rootRef.current) return;
    gsap.to(rootRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto",
    });
  };

  return (
    <Comp
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      className={cn(
        "group/mag relative isolate inline-flex select-none items-center justify-center overflow-hidden",
        "rounded-full font-bold tracking-[-0.015em] will-change-transform",
        /* `cursor-pointer` is explicit, not inherited.
           A <button> shows the default arrow in every major browser, and this
           component also renders as an <a>, which only gets the hand cursor when
           it has an href. Stating it here means every variant reads as clickable
           regardless of which element it becomes. `cursor-not-allowed` on the
           disabled state so the affordance is withdrawn rather than just dimmed. */
        "cursor-pointer disabled:cursor-not-allowed",
        "transition-[background-color,box-shadow,color,--tw-ring-color] duration-300 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-forest-500",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {/* Orbit: a conic gradient rotating behind the face, masked to a hairline
          so only the bright arc of the perimeter shows. */}
      {showOrbit && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px z-0 overflow-hidden rounded-full"
          style={{
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
          }}
        >
          <span
            ref={orbitRef}
            className="absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-0"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, var(--forest-400) 320deg, #eafff3 350deg, var(--forest-400) 360deg)",
            }}
          />
        </span>
      )}

      {/* Liquid bloom. Sized past the diagonal so a corner seed still floods
          the whole face; centred on its own seed point via -50% offsets.

          The bloom must move the face AWAY from its resting tone, so its
          direction flips with the variant: `solid` is now a bright emerald face,
          so a dark bloom would read as the button dimming on hover — it blooms
          lighter instead. `accent` stays mid-tone, so it deepens. */}
      {showLiquid && (
        <span
          ref={liquidRef}
          aria-hidden
          className="pointer-events-none absolute z-0 aspect-square w-[240%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background: lightFace
              ? "radial-gradient(circle, #ffffff 0%, color-mix(in oklab, var(--forest-300) 75%, white) 42%, var(--forest-300) 72%, transparent 100%)"
              : "radial-gradient(circle, var(--forest-600) 0%, var(--forest-700) 45%, var(--forest-800) 72%, transparent 100%)",
          }}
        />
      )}

      {/* Cursor spotlight — a soft radial highlight that tracks the pointer
          across the face, so the button reads as lit from a moving source rather
          than uniformly tinted. `screen` on dark faces adds light; `soft-light`
          on the bright emerald face lifts it without blowing out to white. */}
      {variant !== "ghost" && (
        <span
          ref={spotRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 z-1 aspect-square w-[200%] rounded-full opacity-0",
            lightFace ? "mix-blend-soft-light" : "mix-blend-screen",
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.35) 32%, transparent 62%)",
          }}
        />
      )}

      {showSweep && (
        <span
          ref={sweepRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 -left-1/4 z-2 w-1/2 opacity-0",
            /* overlay on a light face darkens as often as it lightens, which
               reads as a smudge; plus-lighter always adds. */
            lightFace ? "mix-blend-plus-lighter" : "mix-blend-overlay",
          )}
          style={{
            background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.6), transparent)",
          }}
        />
      )}

      <span
        ref={labelRef}
        className="relative z-10 inline-flex items-center gap-[inherit] will-change-transform"
      >
        {rollText ? <RollText text={rollText} /> : children}
      </span>
    </Comp>
  );
}

export default MagneticButton;
