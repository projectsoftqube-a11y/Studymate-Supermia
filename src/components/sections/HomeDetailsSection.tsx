import {
  ArrowUpRight,
  BookOpenCheck,
  Check,
  ClipboardCheck,
  Gauge,
  LineChart,
  Library,
  X,
  type LucideIcon,
} from "lucide-react";
import { RichText } from "@/components/content/RichText";
import { hasLiveText } from "@/lib/rich-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { APP_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * The five differentiators, from the content package's "What Makes StudyMate
 * Different". Each is a fact the Fact Sheet lists as live on this subdomain.
 * The first leads the bento grid: it is the idea the other four follow from.
 */
const DIFFERENCES: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: BookOpenCheck,
    title: "Their own textbook, not the open internet.",
    text: "Answers stay inside the syllabus and cite the page.",
  },
  {
    Icon: Library,
    title: "No uploads.",
    text: "Books are already on the shelf once the country, board and class are set.",
  },
  {
    Icon: Gauge,
    title: "Harder only when they're ready.",
    text: "Three levels, adjusted with every answer.",
  },
  {
    Icon: ClipboardCheck,
    title: "Explains, then tests.",
    text: "It works through the reasoning and then checks understanding.",
  },
  {
    Icon: LineChart,
    title: "Progress by chapter.",
    text: "A clear list of what to study next, chapter by chapter.",
  },
];

/**
 * Sample paper for the practice-tests visual: three questions from the same
 * Rational Numbers set as the Adaptive demo, so the page tells one story.
 */
const SAMPLE_PAPER = [
  { q: "Which of these is a rational number?", correct: true },
  { q: "Simplify: 2/3 + 5/6", correct: true },
  { q: "Closure under division fails for rational numbers because of which case?", correct: false },
] as const;

/** Sample chapter report: the same four chapters as the Analytics section. */
const SAMPLE_REPORT = [
  { chapter: "Metals and non-metals", score: 0 },
  { chapter: "Acids, bases and salts", score: 25 },
  { chapter: "Chemical reactions", score: 100 },
  { chapter: "Data handling", score: 100 },
] as const;

/** One paragraph of section copy; sentences linking to held pages drop out. */
function Copy({
  text,
  className = "",
  tone = "light",
}: {
  text: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (!hasLiveText(text)) return null;
  return (
    <p
      className={`max-w-[60ch] text-pretty text-[1.0625rem] leading-relaxed ${
        tone === "dark"
          ? "text-white/70 [&_a]:text-forest-300 [&_a]:decoration-forest-300/40"
          : "text-forest-950/70"
      } ${className}`}
    >
      <RichText text={text} />
    </p>
  );
}

/** Same eyebrow treatment as every other section heading on the page. */
function Eyebrow({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-4">
      <span
        className={`text-[11px] font-bold uppercase tracking-[0.34em] ${
          tone === "dark" ? "text-forest-300" : "text-forest-700"
        }`}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="h-px w-10 sm:w-14"
        style={{
          background: `linear-gradient(90deg, color-mix(in oklab, var(${
            tone === "dark" ? "--forest-300" : "--forest-600"
          }) 60%, transparent), transparent)`,
        }}
      />
    </span>
  );
}

/** Small "Sample" tag, so an illustration is never read as a real result. */
function SampleTag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-forest-950/[0.06] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-forest-950/55">
      {children}
    </span>
  );
}

const H2 =
  "mt-5 text-balance font-display text-[clamp(1.75rem,4.6vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em]";

const CARD_SHADOW = "0 1px 2px rgba(16,40,28,0.04), 0 30px 60px -36px rgba(16,40,28,0.28)";

/**
 * HomeDetailsSection — four short blocks the content package adds to the
 * homepage: practice papers, what makes StudyMate different, the parent view
 * and what it costs to start.
 *
 * They answer the questions a parent checks before signing a child up, so they
 * sit after the demos and before the FAQ preview. Laid out as a bento on the
 * page's full `max-w-site` measure: a wide practice-paper card, a dark
 * differentiator panel, then the parent report beside the pricing card. Each
 * card pairs its copy with a small, labelled sample of the screen it describes.
 *
 * No entrance animation, deliberately. This is reference copy a reader scans
 * for one fact, and every word has to be in the server HTML at full opacity
 * for crawlers, which a reveal starting at opacity 0 undermines.
 *
 * `z-30`, like every section after How It Works: that section rides up with
 * `z-20`, so anything below it on `auto` would paint underneath it.
 */
export default function HomeDetailsSection() {
  return (
    <div className="relative isolate z-30 p-2 sm:p-3">
      <div className="relative overflow-clip rounded-[1.75rem] bg-surface sm:rounded-[2.25rem]">
        {/* Soft blooms so the light panel has depth behind the cards. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full opacity-50 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--forest-400) 26%, transparent), transparent 70%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-40 h-[36rem] w-[36rem] rounded-full opacity-40 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--forest-500) 22%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-site space-y-5 px-3 py-16 min-[400px]:px-4 sm:space-y-6 sm:px-6 sm:py-28 lg:px-10">
          {/* ---- practice papers ---- */}
          <section
            id="tests"
            className="grid grid-cols-1 overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-inset ring-forest-950/[0.07] sm:rounded-[2rem] lg:grid-cols-12"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <div className="flex flex-col justify-center px-5 py-10 min-[400px]:px-6 sm:px-10 sm:py-14 lg:col-span-5 lg:px-14 lg:py-20">
              <Eyebrow>Practice tests</Eyebrow>
              <h2 className={`${H2} text-forest-950`}>Practice Papers and Instant Evaluation</h2>
              <div className="mt-6 space-y-4">
                <Copy text="StudyMate creates a practice paper from any chapter, on demand, at the difficulty the student chooses. They attempt it online and get an instant, detailed evaluation." />
                <Copy text="A [practice test generator](/features/practice-tests) that works from the textbook keeps practice inside the chapter the student is studying. Revising for a big exam? See [AI revision for school exams](/exam-revision)." />
              </div>
            </div>

            {/* Sample paper */}
            <div
              className="relative flex items-center justify-center px-3 py-8 min-[400px]:px-5 min-[400px]:py-12 sm:px-10 sm:py-16 lg:col-span-7"
              style={{
                background:
                  "radial-gradient(110% 110% at 70% 20%, color-mix(in oklab, var(--forest-500) 14%, white), color-mix(in oklab, var(--forest-500) 5%, white) 70%)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--forest-700) 18%, transparent) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                  WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000, transparent)",
                  maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000, transparent)",
                }}
              />

              <figure
                aria-label="Sample practice paper with instant evaluation"
                className="relative w-full max-w-[34rem]"
              >
                <div
                  className="rounded-[1.5rem] bg-white p-4 ring-1 min-[400px]:p-5 ring-inset ring-forest-950/[0.07] sm:p-7"
                  style={{ boxShadow: "0 40px 80px -40px rgba(6,46,29,0.45)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
                        Mathematics
                      </p>
                      <p className="mt-1 font-display text-[1.25rem] font-extrabold tracking-[-0.02em] text-forest-950">
                        Rational Numbers
                      </p>
                    </div>
                    <SampleTag>Sample paper</SampleTag>
                  </div>

                  {/* Difficulty chosen by the student */}
                  <div className="mt-5 grid grid-cols-3 gap-1 rounded-full bg-forest-950/[0.04] p-1 text-center text-[12.5px] font-bold">
                    {["Basic", "Medium", "Advanced"].map((level) => (
                      <span
                        key={level}
                        className={`rounded-full py-1.5 ${
                          level === "Medium"
                            ? "bg-forest-950 text-white shadow-sm"
                            : "text-forest-950/50"
                        }`}
                      >
                        {level}
                      </span>
                    ))}
                  </div>

                  <ol className="mt-5 space-y-2.5">
                    {SAMPLE_PAPER.map(({ q, correct }, i) => (
                      <li
                        key={q}
                        className="flex items-center gap-2.5 rounded-2xl bg-forest-950/[0.025] px-3 py-3 min-[400px]:gap-3.5 min-[400px]:px-4 ring-1 ring-inset ring-forest-950/[0.05]"
                      >
                        <span className="font-display text-[13px] font-extrabold text-forest-950/35">
                          Q{i + 1}
                        </span>
                        <span className="flex-1 text-[14px] font-semibold leading-snug text-forest-950/80">
                          {q}
                        </span>
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                            correct ? "bg-forest-600 text-white" : "bg-forest-950 text-forest-300"
                          }`}
                        >
                          {correct ? (
                            <Check aria-label="Correct" className="h-3.5 w-3.5" strokeWidth={3} />
                          ) : (
                            <X aria-label="Needs review" className="h-3.5 w-3.5" strokeWidth={3} />
                          )}
                        </span>
                      </li>
                    ))}
                  </ol>

                  {/* Evaluation */}
                  <div className="mt-5 flex items-center gap-4 rounded-2xl bg-forest-950 px-4 py-4 text-white sm:px-5">
                    <span
                      aria-hidden
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                      style={{
                        background:
                          "conic-gradient(var(--forest-400) 0 67%, rgba(255,255,255,0.12) 67% 100%)",
                      }}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-forest-950 font-display text-[13px] font-extrabold">
                        2/3
                      </span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-forest-300">
                        Evaluated instantly
                      </p>
                      <p className="mt-0.5 text-[14px] font-semibold leading-snug text-white/85">
                        2 of 3 correct. Review: closure under division.
                      </p>
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </section>

          {/* ---- differentiators ---- */}
          <section
            id="different"
            className="relative overflow-hidden rounded-[1.75rem] px-5 py-12 min-[400px]:px-6 sm:rounded-[2rem] sm:px-10 sm:py-16 lg:px-14 lg:py-20"
            style={{
              background:
                "radial-gradient(120% 120% at 0% 0%, var(--forest-800), var(--forest-950) 62%)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
                backgroundSize: "26px 26px",
                WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 80% 0%, #000, transparent)",
                maskImage: "radial-gradient(ellipse 60% 70% at 80% 0%, #000, transparent)",
              }}
            />

            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                <Eyebrow tone="dark">Why StudyMate</Eyebrow>
                <h2 className={`${H2} text-white`}>What Makes StudyMate Different</h2>
              </div>
              <Copy
                tone="dark"
                className="lg:col-span-5 lg:justify-self-end"
                text="StudyMate is an AI-powered study assistant built around one idea: start from the book the student is already expected to know."
              />
            </div>

            {/* Bento: the lead idea spans two rows, the four that follow
                from it sit in a 2 × 2 beside it. */}
            <ul className="relative mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
              {DIFFERENCES.map(({ Icon, title, text }, i) => {
                const lead = i === 0;
                return (
                  <li
                    key={title}
                    className={`group relative flex flex-col overflow-hidden rounded-[1.35rem] p-6 ring-1 ring-inset ring-white/10 transition-colors duration-300 hover:ring-forest-400/30 sm:p-7 ${
                      lead
                        ? "bg-forest-500/[0.12] sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:p-9"
                        : "bg-white/[0.04] hover:bg-white/[0.06]"
                    }`}
                  >
                    {lead && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-60 blur-[90px]"
                        style={{ background: "var(--forest-500)" }}
                      />
                    )}
                    <div className="relative flex items-center justify-between">
                      <span
                        className={`grid place-items-center rounded-2xl bg-forest-400/15 text-forest-300 ring-1 ring-inset ring-forest-300/20 ${
                          lead ? "h-14 w-14" : "h-11 w-11"
                        }`}
                      >
                        <Icon aria-hidden className={lead ? "h-6 w-6" : "h-5 w-5"} />
                      </span>
                      <span
                        aria-hidden
                        className="font-display text-[13px] font-extrabold tracking-[0.1em] text-white/25"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className={`relative ${lead ? "mt-auto pt-12" : "mt-6"}`}>
                      <strong
                        className={`block font-display font-extrabold leading-[1.15] tracking-[-0.02em] text-white ${
                          lead ? "text-[clamp(1.5rem,2.6vw,2.15rem)]" : "text-[1.15rem]"
                        }`}
                      >
                        {title}
                      </strong>{" "}
                      <span
                        className={`mt-2.5 block leading-relaxed text-white/65 ${
                          lead ? "text-[1.0625rem]" : "text-[14.5px]"
                        }`}
                      >
                        {text}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ---- parents + pricing ---- */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
            <section
              id="parents"
              className="grid grid-cols-1 gap-10 overflow-hidden rounded-[1.75rem] bg-white px-5 py-10 ring-1 min-[400px]:px-6 ring-inset ring-forest-950/[0.07] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:col-span-8 lg:px-14 lg:py-16 xl:grid-cols-2 xl:items-center"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <div>
                <Eyebrow>For parents</Eyebrow>
                <h2 className={`${H2} text-forest-950`}>
                  For Parents: Know Where Your Child Stands
                </h2>
                <div className="mt-6 space-y-4">
                  <Copy text="You can't sit with every chapter. StudyMate explains each chapter from your child's own textbook, gives practice at their level and keeps a chapter-by-chapter report you can look through together. It walks through the reasoning and then tests, instead of handing over finished answers." />
                  {/* Split into separate sentences from the package's one, so the
                      privacy and terms links survive while /for-parents is held. */}
                  <Copy text="Like any AI learning assistant, StudyMate can occasionally get something wrong. That is why answers cite the textbook page, so they can be checked. See [StudyMate for parents](/for-parents). Read how account and study data is handled in the [privacy policy](/privacy) and [terms](/terms)." />
                </div>
                <div className="mt-8">
                  <MagneticButton
                    as="a"
                    href={APP_URL}
                    {...EXTERNAL_LINK_PROPS}
                    variant="ink"
                    size="md"
                    roll={false}
                  >
                    Set up a free account
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </div>

              {/* Sample chapter report, weakest chapter first */}
              <figure
                aria-label="Sample chapter-by-chapter report"
                className="rounded-[1.5rem] p-4 ring-1 min-[400px]:p-5 ring-inset ring-forest-950/[0.07] sm:p-6"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in oklab, var(--forest-500) 8%, white), white 70%)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-[1.05rem] font-extrabold tracking-[-0.02em] text-forest-950">
                    Chapter report
                  </p>
                  <SampleTag>Sample report</SampleTag>
                </div>
                <ul className="mt-5 space-y-3">
                  {SAMPLE_REPORT.map(({ chapter, score }, i) => {
                    const weak = score < 50;
                    return (
                      <li
                        key={chapter}
                        className="rounded-2xl bg-white px-4 py-3.5 ring-1 ring-inset ring-forest-950/[0.06]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                          <span className="text-[14px] font-bold text-forest-950">{chapter}</span>
                          <span className="flex items-center gap-2">
                            {i === 0 && (
                              <span className="whitespace-nowrap rounded-full bg-forest-950 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-forest-300">
                                Study next
                              </span>
                            )}
                            <span
                              className={`font-display text-[13.5px] font-extrabold tabular-nums ${
                                weak ? "text-forest-950/55" : "text-forest-700"
                              }`}
                            >
                              {score}%
                            </span>
                          </span>
                        </div>
                        <span
                          aria-hidden
                          className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-forest-950/[0.06]"
                        >
                          <span
                            className={`block h-full rounded-full ${
                              weak ? "bg-forest-300" : "bg-forest-500"
                            }`}
                            style={{ width: `${Math.max(score, 4)}%` }}
                          />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </figure>
            </section>

            {/* ---- pricing ---- */}
            <section
              id="pricing"
              className="relative flex flex-col overflow-hidden rounded-[1.75rem] px-5 py-10 ring-1 min-[400px]:px-6 ring-inset ring-forest-700/10 sm:rounded-[2rem] sm:px-10 sm:py-14 lg:col-span-4 lg:px-10 lg:py-16"
              style={{
                background:
                  "radial-gradient(120% 90% at 100% 0%, color-mix(in oklab, var(--forest-400) 22%, white), color-mix(in oklab, var(--forest-500) 7%, white) 65%)",
                boxShadow: CARD_SHADOW,
              }}
            >
              <Eyebrow>Pricing</Eyebrow>
              <h2 className={`${H2} text-forest-950`}>Free to Start</h2>

              <p className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-[clamp(3rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.05em] text-forest-950">
                  5,000
                </span>
                <span className="text-[15px] font-bold leading-tight text-forest-950/70">
                  free credits
                  <br />
                  for new accounts
                </span>
              </p>

              <div className="mt-8 space-y-4">
                {/* No prices, plans or Offer markup until SuperMIA publishes what
                    credits cost. The 5,000 free credits are the only public fact. */}
                <Copy text="New accounts start with 5,000 free credits, with no card required. Setup takes about five minutes and there is nothing to install." />
                <Copy text="To find out what happens after the free credits run out, email [hello@supermia.ai](mailto:hello@supermia.ai). See [StudyMate pricing](/pricing). Find quick answers about credits in the [StudyMate AI FAQ](/faq)." />
              </div>

              <div className="mt-auto pt-8">
                <MagneticButton
                  as="a"
                  href={APP_URL}
                  {...EXTERNAL_LINK_PROPS}
                  variant="solid"
                  size="md"
                  roll={false}
                >
                  Start free
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
