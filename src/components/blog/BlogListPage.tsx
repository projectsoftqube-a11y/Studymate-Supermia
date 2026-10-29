/**
 * BlogListPage — the blog hub (/blog).
 *
 * Laid out like a magazine rather than a feed:
 *
 *   cover      the <h1> in the site's two faces and the answer-block intro on
 *              the left, a topic index on the right (buttons that pick a topic
 *              tab and jump to the guides), and a facts strip
 *   lead       the newest guide as a large dark feature card, with the next
 *              few as a numbered "more new guides" list beside it
 *   guides     every guide in one grid, filtered by topic tabs
 *   closing    the shared closing panel
 *
 * Topics are tabs, not pages: there are no category URLs. The tab state starts
 * at "all" on the server, so the HTML lists every guide as a plain <a>, and the
 * whole blog is reachable from /blog in one click without any script; the tabs
 * only filter that list on the client. Motion comes from `useInnerPageMotion`
 * and starts after hydration.
 *
 * Hub copy is the content package's Blog Hub text (Final v2).
 */

import { useRef, useState } from "react";
import { ArrowUpRight, BookOpen, CircleCheck, Clock, Layers } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useInnerPageMotion } from "@/hooks/use-inner-page-motion";
import { SiteHeader } from "@/components/sections/SiteHeader";
import Footer from "@/components/sections/Footer";
import { ClosingPanel } from "@/components/content/ContentPage";
import PostCard from "@/components/blog/PostCard";
import { CATEGORY_ICON } from "@/components/blog/category-icons";
import { CATEGORIES, CATEGORY_KEYS } from "@/content/blog/categories";
import { POSTS, postPath, postsIn } from "@/content/blog";
import { readingMinutes } from "@/content/blog/text";
import type { CategoryKey } from "@/content/blog/types";
import { APP_URL } from "@/lib/site";

type Tab = CategoryKey | "all";

/** One line per topic, from the package's Blog Hub copy. */
const CATEGORY_BLURB: Record<CategoryKey, string> = {
  "study-skills": "How to study a chapter well, from active reading to self-testing.",
  "exam-prep":
    "Revision plans, practice papers and what to do in the final weeks before school and board exams.",
  "for-parents":
    "How to help a child study without hovering, read progress reports and set house rules for AI.",
};

const HUB_H1_MAIN = "Study Tips for Students:";
const HUB_H1_ACCENT = "Study Skills, Exam Prep and Parent Guides";
const HUB_INTRO =
  "Study tips for students and the parents who help them, for when a student is stuck on a chapter or reading without testing. Learn how to study a textbook chapter so it sticks, why active recall beats rereading and how to plan revision before board exams. Parents will also find guides on tracking progress and setting fair rules for AI and homework.";

/** How many guides sit in the numbered list beside the feature card. */
const MORE_COUNT = 4;

const TABS: { key: Tab; label: string; count: number }[] = [
  { key: "all", label: "All guides", count: POSTS.length },
  ...CATEGORY_KEYS.map((key) => ({
    key,
    label: CATEGORIES[key].label,
    count: postsIn(key).length,
  })),
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function BlogListPage() {
  useSmoothScroll();
  const rootRef = useRef<HTMLElement>(null);
  useInnerPageMotion(rootRef);

  /* "all" on the server, so the HTML lists every guide. */
  const [tab, setTab] = useState<Tab>("all");
  const shown = tab === "all" ? POSTS : postsIn(tab);
  const [lead, ...rest] = POSTS;
  const more = rest.slice(0, MORE_COUNT);
  const totalMinutes = POSTS.reduce((n, p) => n + readingMinutes(p), 0);

  const pickTab = (next: Tab, jump = false) => {
    setTab(next);
    if (jump) document.getElementById("guides")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main ref={rootRef}>
      <SiteHeader />

      {/* ---- cover ---- */}
      <header id="content" className="relative isolate p-2 sm:p-3">
        <div
          className="ip-masthead relative isolate overflow-hidden rounded-[1.75rem] ring-1 ring-inset ring-forest-950/[0.06] sm:rounded-[2.25rem]"
          style={{
            background:
              "radial-gradient(50% 60% at 15% 10%, color-mix(in oklab, var(--forest-400) 22%, transparent), transparent 75%), radial-gradient(40% 50% at 100% 100%, color-mix(in oklab, var(--forest-300) 22%, transparent), transparent 70%), linear-gradient(180deg, white, color-mix(in oklab, var(--forest-500) 5%, white))",
            boxShadow: "0 1px 2px rgba(16,40,28,0.04), 0 30px 60px -38px rgba(16,40,28,0.3)",
          }}
        >
          {/* Ruled-paper lines and a margin: a notebook page behind the cover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, transparent 0 39px, color-mix(in oklab, var(--forest-700) 9%, transparent) 39px 40px)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at 30% 30%, #000 10%, transparent 90%)",
              maskImage: "radial-gradient(ellipse 70% 70% at 30% 30%, #000 10%, transparent 90%)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-[6%] top-0 -z-10 hidden w-px bg-forest-500/25 lg:block"
          />

          <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-12 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pt-40">
            <div className="lg:col-span-7">
              <p className="ip-eyebrow inline-flex w-fit items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 text-[11px] font-bold uppercase tracking-[0.18em] text-forest-800 ring-1 ring-inset ring-forest-700/15 backdrop-blur-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-forest-950 text-forest-300">
                  <BookOpen aria-hidden className="h-3 w-3" strokeWidth={2.5} />
                </span>
                StudyMate AI Blog
              </p>
              <h1 className="ip-title mt-6 text-balance font-display text-[clamp(2.1rem,4.8vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.045em] text-forest-950">
                {HUB_H1_MAIN}{" "}
                <span className="font-hand mt-1 block pr-[0.06em] text-[0.92em] font-bold leading-[1.05] text-forest-600">
                  {HUB_H1_ACCENT}
                </span>
              </h1>
              <p className="answer-block ip-sub mt-6 max-w-[64ch] text-pretty text-[1.0625rem] leading-relaxed text-forest-950/70 sm:text-[1.125rem]">
                {HUB_INTRO}
              </p>
            </div>

            {/* Topic index: picks a tab and jumps to the guides */}
            <div className="ip-sub lg:col-span-5">
              <div
                className="rounded-[1.75rem] bg-white/80 p-3 ring-1 ring-inset ring-forest-950/[0.07] backdrop-blur-md sm:p-4"
                style={{ boxShadow: "0 40px 80px -44px rgba(6,46,29,0.45)" }}
              >
                <p className="flex items-center justify-between px-3 pb-2 pt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-forest-700">
                  Topics
                  <span className="font-numeric text-forest-950/40">{POSTS.length} guides</span>
                </p>
                <ul className="space-y-1">
                  {TABS.map((item, i) => {
                    const current = item.key === tab;
                    const Icon = item.key === "all" ? Layers : CATEGORY_ICON[item.key];
                    return (
                      <li key={item.key}>
                        <button
                          type="button"
                          onClick={() => pickTab(item.key, true)}
                          aria-pressed={current}
                          className={`group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors duration-300 ${
                            current ? "bg-forest-950 text-white" : "hover:bg-forest-950/[0.04]"
                          }`}
                        >
                          <span
                            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                              current
                                ? "bg-forest-400 text-forest-950"
                                : "bg-forest-500/10 text-forest-700"
                            }`}
                          >
                            <Icon aria-hidden className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block text-[15.5px] font-extrabold ${
                                current ? "text-white" : "text-forest-950"
                              }`}
                            >
                              {item.label}
                            </span>
                            <span
                              className={`block text-[12.5px] font-semibold ${
                                current ? "text-white/55" : "text-forest-950/50"
                              }`}
                            >
                              {item.count} {item.count === 1 ? "guide" : "guides"}
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className={`font-numeric text-[12px] font-extrabold ${
                              current ? "text-forest-300" : "text-forest-950/25"
                            }`}
                          >
                            {pad(i + 1)}
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            className={`h-4 w-4 shrink-0 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5 ${
                              current ? "text-forest-300" : "text-forest-600"
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Facts strip */}
          <div className="mx-auto max-w-site px-4 pb-4 sm:px-6 sm:pb-6 lg:px-10">
            <ul className="ip-sub flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-forest-950/[0.08] py-5 text-[13.5px] font-semibold text-forest-950/65">
              <li className="flex items-center gap-2">
                <Layers aria-hidden className="h-4 w-4 text-forest-600" />
                {POSTS.length} guides across {CATEGORY_KEYS.length} topics
              </li>
              <li className="flex items-center gap-2">
                <Clock aria-hidden className="h-4 w-4 text-forest-600" />
                {totalMinutes} minutes of reading in all
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck aria-hidden className="h-4 w-4 text-forest-600" />
                Plain steps, with sources linked
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-site px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-10">
        {/* ---- lead ---- */}
        {lead && (
          <section aria-labelledby="latest-heading" className="ip-reveal">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="latest-heading"
                className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold tracking-[-0.04em] text-forest-950"
              >
                Latest Guides
              </h2>
              <p className="text-[14px] font-semibold text-forest-950/50">
                Newest first, updated as guides are added
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-7">
                <PostCard post={lead} headingLevel={3} variant="feature" />
              </div>
              {more.length > 0 && (
                <div
                  className="flex flex-col rounded-[1.75rem] bg-white p-3 ring-1 ring-inset ring-forest-950/[0.07] sm:p-4 lg:col-span-5"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(16,40,28,0.04), 0 24px 50px -34px rgba(16,40,28,0.35)",
                  }}
                >
                  <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-forest-700">
                    More new guides
                  </p>
                  <ol className="flex flex-1 flex-col">
                    {more.map((post, i) => {
                      const Icon = CATEGORY_ICON[post.category];
                      return (
                        <li
                          key={post.slug}
                          className="group relative flex flex-1 items-center gap-4 rounded-2xl border-b border-forest-950/[0.07] px-3 py-5 transition-colors duration-300 last:border-b-0 hover:bg-forest-500/[0.05]"
                        >
                          <span
                            aria-hidden
                            className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.05em] text-transparent"
                            style={{
                              WebkitTextStroke:
                                "1.2px color-mix(in oklab, var(--forest-600) 55%, transparent)",
                            }}
                          >
                            {pad(i + 2)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-forest-700">
                              <Icon aria-hidden className="h-3.5 w-3.5" />
                              {CATEGORIES[post.category].label}
                            </p>
                            <h3 className="mt-1.5 font-display text-[1.05rem] font-extrabold leading-snug tracking-[-0.02em] text-forest-950 transition-colors duration-300 group-hover:text-forest-700">
                              <a
                                href={postPath(post)}
                                className="outline-none after:absolute after:inset-0 after:z-20 after:content-[''] focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-forest-500"
                              >
                                {post.h1}
                              </a>
                            </h3>
                            <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-semibold text-forest-950/45">
                              <Clock aria-hidden className="h-3.5 w-3.5" />
                              {readingMinutes(post)} min read
                            </p>
                          </div>
                          <ArrowUpRight
                            aria-hidden
                            className="mt-1 h-4 w-4 shrink-0 text-forest-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ---- all guides, filtered by topic tabs ---- */}
        <section
          id="guides"
          aria-labelledby="guides-heading"
          className="ip-reveal mt-20 scroll-mt-28 border-t border-forest-950/[0.08] pt-14 sm:mt-24 sm:pt-16"
        >
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <h2
                id="guides-heading"
                className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-forest-950"
              >
                Browse All Guides
              </h2>
              <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-forest-950/65">
                {tab === "all"
                  ? "Every guide on the blog, newest first. Pick a topic to narrow the list."
                  : CATEGORY_BLURB[tab]}
              </p>
            </div>

            {/* Topic tabs: filter in place, no separate pages */}
            <div className="lg:col-span-6 lg:flex lg:justify-end">
              <div
                role="tablist"
                aria-label="Guide topics"
                className="inline-flex max-w-full flex-wrap gap-1.5 rounded-full bg-white p-1.5 ring-1 ring-inset ring-forest-950/[0.08]"
                style={{ boxShadow: "0 12px 30px -22px rgba(16,40,28,0.45)" }}
              >
                {TABS.map((item) => {
                  const current = item.key === tab;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      role="tab"
                      aria-selected={current}
                      aria-controls="guides-panel"
                      onClick={() => pickTab(item.key)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-bold transition-colors duration-300 ${
                        current
                          ? "bg-forest-950 text-white"
                          : "text-forest-950/65 hover:bg-forest-950/[0.05] hover:text-forest-950"
                      }`}
                    >
                      {item.key === "all" ? "All" : item.label}
                      <span
                        className={`rounded-full px-1.5 font-numeric text-[11px] ${
                          current ? "bg-forest-400 text-forest-950" : "bg-forest-950/[0.06]"
                        }`}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <ul
            id="guides-panel"
            role="tabpanel"
            key={tab}
            className="animate-fade-up mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {shown.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} headingLevel={3} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <ClosingPanel
        heading="Turn Any Chapter Into a Practice Paper"
        text="Rereading a chapter feels productive, but testing on it shows what has actually stuck. StudyMate turns any chapter of a student's own textbook into a practice paper, evaluates it instantly and shows which chapters to study next. It explains rather than hands over answers."
        primary={{ label: "Start free", href: APP_URL }}
        secondary={{ label: "Try a sample question", href: "/#adaptive" }}
        note={
          <>
            Parents and older students can set up a free account in about five minutes. Have a
            question first? Read the{" "}
            <a href="/faq" className="font-bold text-forest-300 underline underline-offset-2">
              StudyMate AI FAQ
            </a>
            .
          </>
        }
      />

      <Footer />
    </main>
  );
}
