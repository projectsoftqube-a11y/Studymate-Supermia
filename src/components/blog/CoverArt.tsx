import type { ReactNode } from "react";
import type { BlogPost } from "@/content/blog/types";

/**
 * Hand-drawn cover art for each guide: simple white line drawings on the
 * card's green cover, one per post, each a picture of what the guide is
 * about. Inline SVG, so no image requests and nothing to load. Decorative,
 * so the whole drawing is `aria-hidden`; the card's title is the text.
 *
 * Unknown slugs fall back to an open book, so a new post always has art.
 */

const S = {
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
} as const;

/** Soft white fill for shapes that should read as solid. */
const FILL = "rgba(255,255,255,0.14)";
/** Accent fill: the light brand green. */
const ACCENT = "var(--forest-300)";

const ART: Record<string, ReactNode> = {
  /* Bars rising: methods ranked by research */
  "study-methods-compared": (
    <g {...S}>
      <path d="M30 118h140" />
      <rect x="44" y="84" width="22" height="34" rx="4" fill={FILL} />
      <rect x="78" y="62" width="22" height="56" rx="4" fill={FILL} />
      <rect x="112" y="36" width="22" height="82" rx="4" fill={ACCENT} />
      <rect x="146" y="72" width="22" height="46" rx="4" fill={FILL} />
      <path d="M118 22l5-8 5 8" />
      <circle cx="123" cy="28" r="1.5" fill="currentColor" />
    </g>
  ),
  /* Open book with a question mark rising */
  "how-to-study-a-textbook-chapter": (
    <g {...S}>
      <path
        d="M100 52c-16-10-38-12-58-8v66c20-4 42-2 58 8 16-10 38-12 58-8V44c-20-4-42-2-58 8z"
        fill={FILL}
      />
      <path d="M100 52v66" />
      <path d="M56 62h28M56 74h24M116 62h28M116 74h22M56 86h26M116 86h26" strokeWidth={1.8} />
      <path d="M92 18a8 8 0 1 1 11 7c-3 1-3 3-3 6" stroke={ACCENT} />
      <circle cx="100" cy="38" r="1.8" fill={ACCENT} stroke="none" />
    </g>
  ),
  /* Light bulb with recall arrows */
  "active-recall": (
    <g {...S}>
      <path
        d="M100 26a28 28 0 0 0-16 51c4 3 6 7 6 11v4h20v-4c0-4 2-8 6-11a28 28 0 0 0-16-51z"
        fill={FILL}
      />
      <path d="M90 100h20M93 110h14" />
      <path d="M100 46v20M92 58l8 8 8-8" stroke={ACCENT} />
      <path d="M46 70a54 54 0 0 1 18-34M154 70a54 54 0 0 0-18-34" />
      <path d="M58 32l6 4-2 7M142 32l-6 4 2 7" />
    </g>
  ),
  /* Calendar with spaced ticks */
  "spaced-repetition": (
    <g {...S}>
      <rect x="40" y="30" width="120" height="90" rx="10" fill={FILL} />
      <path d="M40 52h120M66 22v16M134 22v16" />
      {[0, 1, 2, 3, 4].map((c) =>
        [0, 1, 2].map((r) => (
          <circle
            key={`${c}-${r}`}
            cx={58 + c * 21}
            cy={68 + r * 18}
            r="2"
            fill="currentColor"
            stroke="none"
          />
        )),
      )}
      <path d="M53 68l4 4 7-8M95 86l4 4 7-8M137 104l4 4 7-8" stroke={ACCENT} strokeWidth={3} />
    </g>
  ),
  /* Teaching board with a speech bubble */
  "feynman-technique": (
    <g {...S}>
      <rect x="34" y="34" width="92" height="64" rx="6" fill={FILL} />
      <path d="M48 52h46M48 64h60M48 76h34" strokeWidth={1.8} />
      <path d="M80 98l-10 22M80 98l10 22" />
      <path
        d="M134 44h34a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8h-18l-10 10v-10h-6a8 8 0 0 1-8-8V52a8 8 0 0 1 8-8z"
        fill={ACCENT}
        fillOpacity={0.35}
      />
      <path d="M144 58h20M144 68h14" />
    </g>
  ),
  /* Notebook with questions in the margin */
  "how-to-make-notes-from-a-textbook": (
    <g {...S}>
      <rect x="54" y="20" width="96" height="104" rx="8" fill={FILL} />
      {[34, 48, 62, 76, 90, 104].map((y) => (
        <circle key={y} cx="54" cy={y} r="4" fill="rgba(0,0,0,0.15)" />
      ))}
      <path d="M78 22v100" stroke={ACCENT} strokeWidth={1.8} />
      <path d="M88 42h48M88 56h40M88 70h46M88 84h34M88 98h42" strokeWidth={1.8} />
      <path d="M64 50a4 4 0 1 1 5 3v2M66 60v.5" stroke={ACCENT} strokeWidth={2} />
      <path d="M158 110l14-34 8 3-14 34-9 3z" fill={FILL} />
    </g>
  ),
  /* Toolbox with sparkles */
  "free-ai-study-tools": (
    <g {...S}>
      <rect x="40" y="58" width="120" height="62" rx="8" fill={FILL} />
      <path d="M78 58V46a6 6 0 0 1 6-6h32a6 6 0 0 1 6 6v12M40 80h120" />
      <rect x="92" y="74" width="16" height="12" rx="3" fill={ACCENT} />
      <path d="M150 22v14M143 29h14M54 26v10M49 31h10M170 50v8M166 54h8" stroke={ACCENT} />
    </g>
  ),
  /* Checklist plan with a target date */
  "board-exam-revision-plan": (
    <g {...S}>
      <rect x="46" y="22" width="78" height="100" rx="8" fill={FILL} />
      <path d="M70 16h30v12H70z" fill={ACCENT} />
      <path d="M60 50l5 5 8-9M60 74l5 5 8-9" stroke={ACCENT} strokeWidth={3} />
      <path d="M82 51h30M82 75h26M82 99h28" strokeWidth={1.8} />
      <rect x="58" y="92" width="14" height="14" rx="3" />
      <circle cx="150" cy="78" r="26" fill={FILL} />
      <circle cx="150" cy="78" r="14" />
      <circle cx="150" cy="78" r="4" fill={ACCENT} stroke="none" />
      <path d="M150 78l22-22M166 56h6v6" />
    </g>
  ),
  /* Stack of marked papers */
  "practice-papers-before-exams": (
    <g {...S}>
      <rect
        x="66"
        y="34"
        width="84"
        height="92"
        rx="6"
        fill="rgba(255,255,255,0.08)"
        transform="rotate(8 108 80)"
      />
      <rect x="56" y="26" width="84" height="92" rx="6" fill={FILL} />
      <path d="M70 46h40M70 62h52M70 78h44M70 94h36" strokeWidth={1.8} />
      <path d="M118 42l4 4 8-9M126 74l4 4 8-9" stroke={ACCENT} strokeWidth={3} />
      <circle cx="152" cy="104" r="16" fill={ACCENT} fillOpacity={0.35} />
      <path d="M145 104h14M152 97v14" />
    </g>
  ),
  /* Clock beside a week grid */
  "study-timetable": (
    <g {...S}>
      <rect x="84" y="36" width="90" height="74" rx="8" fill={FILL} />
      <path d="M84 56h90M114 56v54M144 56v54M84 83h90" strokeWidth={1.8} />
      <rect x="118" y="60" width="22" height="19" rx="3" fill={ACCENT} stroke="none" />
      <rect
        x="88"
        y="87"
        width="22"
        height="19"
        rx="3"
        fill={ACCENT}
        fillOpacity={0.5}
        stroke="none"
      />
      <circle cx="56" cy="74" r="30" fill={FILL} />
      <path d="M56 56v18l12 8" stroke={ACCENT} strokeWidth={3} />
    </g>
  ),
  /* Shield over a pencil: AI with rules */
  "ai-for-homework-without-cheating": (
    <g {...S}>
      <path d="M100 18l42 14v30c0 28-18 46-42 56-24-10-42-28-42-56V32z" fill={FILL} />
      <path d="M82 66l12 12 24-26" stroke={ACCENT} strokeWidth={3.4} />
      <path d="M150 112l24-24 8 8-24 24-11 3z" fill={FILL} />
      <path d="M168 94l8 8" />
    </g>
  ),
  /* Rising progress line over chapter bars */
  "track-your-childs-progress": (
    <g {...S}>
      <rect x="32" y="26" width="136" height="94" rx="10" fill={FILL} />
      <path d="M48 104h104" strokeWidth={1.8} />
      <path d="M50 96l26-18 22 10 26-30 26-14" stroke={ACCENT} strokeWidth={3} />
      {[
        [50, 96],
        [76, 78],
        [98, 88],
        [124, 58],
        [150, 44],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4" fill="white" stroke="none" />
      ))}
    </g>
  ),
  /* Two hands holding a glowing book */
  "help-with-a-hard-chapter": (
    <g {...S}>
      <path
        d="M100 48c-14-8-32-9-48-6v52c16-3 34-2 48 6 14-8 32-9 48-6V42c-16-3-34-2-48 6z"
        fill={FILL}
      />
      <path d="M100 48v52" />
      <path d="M38 96c10 8 26 18 40 18h22M162 96c-10 8-26 18-40 18h-22" />
      <path d="M100 22v10M84 26l4 8M116 26l-4 8" stroke={ACCENT} strokeWidth={3} />
    </g>
  ),
  /* A book-backed answer vs a loose chat bubble */
  "ai-tutor-vs-chatbot": (
    <g {...S}>
      <path
        d="M36 34h56a8 8 0 0 1 8 8v30a8 8 0 0 1-8 8H58l-12 12V80H36a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8z"
        fill={ACCENT}
        fillOpacity={0.35}
      />
      <path d="M40 50h44M40 62h32" />
      <rect x="40" y="96" width="44" height="26" rx="4" fill={FILL} />
      <path d="M62 96v26" />
      <path
        d="M118 46h48a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8h-8v12l-12-12h-28a8 8 0 0 1-8-8V54a8 8 0 0 1 8-8z"
        fill={FILL}
      />
      <path d="M126 60h30M126 72h20" strokeDasharray="4 6" />
      <path d="M104 72h4" />
    </g>
  ),
};

/** Fallback: an open book. */
const FALLBACK = ART["how-to-study-a-textbook-chapter"];

export default function CoverArt({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 140"
      className={`text-white ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {ART[post.slug] ?? FALLBACK}
    </svg>
  );
}
