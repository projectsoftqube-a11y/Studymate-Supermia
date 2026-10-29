/**
 * BlogPostPage — one guide, laid out to be quoted and to be read.
 *
 * Answer engines lift short, self-contained passages, so the page puts the
 * passages they look for where they look for them:
 *
 *   answer box      directly under the cover, the post's 40-60 word answer
 *   key takeaways   3-5 complete sentences, near the top
 *   sections        question-form H2s, each answered in its first sentence
 *   sources         numbered, linked primary research
 *
 * Both the answer box and the takeaways carry the class names the page's
 * `speakable` specification points at (`.answer-block`, `.key-takeaways`).
 *
 * Layout, on the site's full 1520px measure:
 *   cover      split: the category, <h1>, excerpt and byline on the left, the
 *              guide's own drawn cover (the same art as its card) on the right
 *   body       two columns from lg, 70/30: the article, and a sticky sidebar
 *              with the contents list (tracking the reader), the guide's
 *              details and a start card
 *   related    three guide cards
 *   closing    the shared closing panel, with the post's own next step
 *
 * A thin progress bar under the header fills as the article is read. Motion
 * comes from `useInnerPageMotion` and starts after hydration, so every word is
 * in the server HTML.
 */

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CircleCheck,
  Clock,
  ExternalLink,
  FileText,
  ListChecks,
  RefreshCw,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useInnerPageMotion } from "@/hooks/use-inner-page-motion";
import { SiteHeader } from "@/components/sections/SiteHeader";
import Footer from "@/components/sections/Footer";
import { Block, ClosingPanel, OfferNote } from "@/components/content/ContentPage";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RichText } from "@/components/content/RichText";
import PostCard from "@/components/blog/PostCard";
import CoverArt from "@/components/blog/CoverArt";
import { CATEGORY_COVER, CATEGORY_ICON } from "@/components/blog/category-icons";
import { CATEGORIES } from "@/content/blog/categories";
import { postBySlug } from "@/content/blog";
import { readingMinutes } from "@/content/blog/text";
import type { BlogPost } from "@/content/blog/types";
import { formatDate } from "@/lib/dates";
import { EXTERNAL_LINK_PROPS, MAIN_SITE_URL } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pad = (n: number) => String(n).padStart(2, "0");

/** Which section owns the viewport, for the contents list. */
function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveId(entry.target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return activeId;
}

export default function BlogPostPage({ post }: { post: BlogPost }) {
  useSmoothScroll();
  const rootRef = useRef<HTMLElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  useInnerPageMotion(rootRef);

  const category = CATEGORIES[post.category];
  const CategoryIcon = CATEGORY_ICON[post.category];
  const related = post.related.map(postBySlug).filter((p): p is BlogPost => Boolean(p));
  const minutes = readingMinutes(post);

  const toc = [
    ...post.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(post.faqs.length ? [{ id: "faqs", label: "Frequently asked questions" }] : []),
    ...(post.sources.length ? [{ id: "sources", label: "Sources" }] : []),
  ];
  const idsRef = useRef(toc.map((t) => t.id));
  const activeId = useActiveSection(idsRef.current);

  /* Reading progress: the bar fills as the article scrolls past. */
  useGSAP(
    () => {
      if (!articleRef.current) return;
      gsap.fromTo(
        ".bp-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: articleRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true,
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <main ref={rootRef}>
      <SiteHeader />

      {/* Reading progress bar */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1">
        <span className="bp-progress block h-full origin-left scale-x-0 bg-gradient-to-r from-forest-400 to-forest-600" />
      </div>

      {/* ---- cover ---- */}
      <header id="content" className="relative isolate p-2 sm:p-3">
        <div
          className="ip-masthead relative isolate overflow-hidden rounded-[1.75rem] ring-1 ring-inset ring-forest-950/[0.06] sm:rounded-[2.25rem]"
          style={{
            background:
              "radial-gradient(50% 60% at 10% 0%, color-mix(in oklab, var(--forest-400) 20%, transparent), transparent 75%), linear-gradient(180deg, white, color-mix(in oklab, var(--forest-500) 5%, white))",
            boxShadow: "0 1px 2px rgba(16,40,28,0.04), 0 30px 60px -38px rgba(16,40,28,0.3)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, transparent 0 39px, color-mix(in oklab, var(--forest-700) 8%, transparent) 39px 40px)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 70% at 25% 35%, #000 10%, transparent 90%)",
              maskImage: "radial-gradient(ellipse 60% 70% at 25% 35%, #000 10%, transparent 90%)",
            }}
          />

          <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-10 px-4 pb-6 pt-28 sm:px-6 sm:pb-8 sm:pt-36 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pb-10 lg:pt-40">
            <div className="lg:col-span-7">
              <div className="ip-eyebrow flex flex-wrap items-center gap-3">
                <a
                  href="/blog"
                  className="-my-2 inline-flex items-center gap-1.5 py-2 text-[13px] font-bold text-forest-950/50 transition-colors duration-300 hover:text-forest-950"
                >
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5 -rotate-[135deg]" />
                  All guides
                </a>
                <span aria-hidden className="h-4 w-px bg-forest-950/15" />
                <p className="inline-flex items-center gap-2 rounded-full bg-forest-950 py-1 pl-1 pr-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-forest-400 text-forest-950">
                    <CategoryIcon aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {category.label}
                </p>
              </div>

              <h1 className="ip-title mt-6 text-balance font-display text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.045em] text-forest-950">
                {post.h1}
              </h1>
              <p className="ip-sub mt-5 max-w-[60ch] text-pretty text-[1.0625rem] leading-relaxed text-forest-950/65 sm:text-[1.125rem]">
                {post.excerpt}
              </p>

              {/* Byline. The author is the organisation until named authors with
                  real bios are supplied; inventing a person would be worse than
                  naming none. Both dates are machine-readable and match the
                  BlogPosting schema. */}
              <div className="ip-sub mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] font-semibold text-forest-950/60">
                <span className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-forest-950 font-display text-[14px] font-extrabold text-forest-300">
                    S
                  </span>
                  <span>
                    By{" "}
                    <a
                      href={MAIN_SITE_URL}
                      {...EXTERNAL_LINK_PROPS}
                      className="font-bold text-forest-950 hover:text-forest-700"
                    >
                      SuperMIA
                    </a>
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays aria-hidden className="h-4 w-4 text-forest-600" />
                  <time dateTime={post.published}>{formatDate(post.published)}</time>
                </span>
                {post.modified !== post.published && (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw aria-hidden className="h-4 w-4 text-forest-600" />
                    Updated <time dateTime={post.modified}>{formatDate(post.modified)}</time>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock aria-hidden className="h-4 w-4 text-forest-600" />
                  {minutes} min read
                </span>
              </div>
            </div>

            {/* The guide's own drawn cover, the same art as its card */}
            <div className="ip-sub lg:col-span-5">
              <div
                aria-hidden
                className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
                style={{
                  background: CATEGORY_COVER[post.category],
                  boxShadow: "0 40px 80px -40px rgba(6,46,29,0.6)",
                }}
              >
                <span
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 70% 80% at 0% 100%, #000, transparent)",
                    maskImage: "radial-gradient(ellipse 70% 80% at 0% 100%, #000, transparent)",
                  }}
                />
                {[14, 22, 30].map((size) => (
                  <span
                    key={size}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
                    style={{ width: `${size}rem`, height: `${size}rem` }}
                  />
                ))}
                <CoverArt
                  post={post}
                  className="absolute left-1/2 top-1/2 h-[64%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_16px_30px_rgba(0,0,0,0.3)]"
                />
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-forest-950/35 px-3 py-1.5 text-[12px] font-bold text-white ring-1 ring-inset ring-white/15 backdrop-blur-sm">
                  <BookOpen className="h-3.5 w-3.5" />
                  {post.sections.length} sections · {minutes} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---- body ---- */}
      <div className="mx-auto max-w-site px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-10">
        <div className="lg:grid lg:grid-cols-10 lg:gap-10 xl:gap-12">
          {/* ---- article ---- */}
          <article
            ref={articleRef}
            className="rounded-[1.75rem] bg-white px-3.5 py-6 ring-1 min-[400px]:px-5 min-[400px]:py-8 ring-inset ring-forest-950/[0.07] sm:rounded-[2rem] sm:px-10 sm:py-12 lg:col-span-7 xl:px-14 [&_ol]:max-w-none [&_p]:max-w-none [&_ul]:max-w-none"
            style={{
              boxShadow: "0 1px 2px rgba(16,40,28,0.04), 0 30px 60px -38px rgba(16,40,28,0.28)",
            }}
          >
            {/* ---- answer box ---- */}
            <section
              aria-label="Short answer"
              className="answer-block relative overflow-hidden rounded-[1.5rem] px-5 py-5 sm:px-7 sm:py-7"
              style={{
                background:
                  "radial-gradient(120% 120% at 0% 0%, var(--forest-700), var(--forest-950) 70%)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-50 blur-[70px]"
                style={{ background: "var(--forest-500)" }}
              />
              <p className="relative flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-forest-300">
                <BookOpen aria-hidden className="h-3.5 w-3.5" />
                Short answer
              </p>
              <p className="relative mt-3 text-[16.5px] font-semibold leading-[1.7] text-white/90 sm:text-[17.5px] [&_a]:text-forest-300">
                <RichText text={post.answer} />
              </p>
            </section>

            {/* ---- key takeaways ---- */}
            <section
              aria-label="Key takeaways"
              className="key-takeaways mt-6 rounded-[1.5rem] bg-forest-500/[0.05] p-5 ring-1 ring-inset ring-forest-700/10 sm:mt-8 sm:p-7"
            >
              <h2 className="flex items-center gap-2 font-display text-[1.15rem] font-extrabold tracking-[-0.02em] text-forest-950">
                <ListChecks aria-hidden className="h-5 w-5 text-forest-600" />
                Key takeaways
              </h2>
              <ul className="mt-5 space-y-3.5">
                {post.takeaways.map((t) => (
                  <li key={t} className="flex gap-3">
                    <CircleCheck
                      aria-hidden
                      className="mt-1 h-[18px] w-[18px] shrink-0 text-forest-600"
                    />
                    <span className="text-[15.5px] leading-[1.7] text-forest-950/80 sm:text-[16px]">
                      <RichText text={t} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {post.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="motion-reduce:scroll-mt-28 mt-14 border-t border-forest-950/[0.07] pt-12"
              >
                <span
                  aria-hidden
                  className="font-numeric text-[12px] font-extrabold tracking-[0.12em] text-forest-600"
                >
                  {pad(i + 1)} / {pad(post.sections.length)}
                </span>
                <h2 className="mt-2 text-balance font-display text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold leading-[1.16] tracking-[-0.03em] text-forest-950">
                  {section.heading}
                </h2>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </section>
            ))}

            {/* ---- FAQs: visible only; FAQPage markup lives on /faq ---- */}
            {post.faqs.length > 0 && (
              <section
                id="faqs"
                className="motion-reduce:scroll-mt-28 mt-14 border-t border-forest-950/[0.07] pt-12"
              >
                <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold leading-[1.16] tracking-[-0.03em] text-forest-950">
                  Frequently Asked Questions
                </h2>
                <Block block={{ kind: "qa", items: post.faqs }} onWhite />
              </section>
            )}

            {/* ---- sources ---- */}
            {post.sources.length > 0 && (
              <section
                id="sources"
                className="motion-reduce:scroll-mt-28 mt-14 border-t border-forest-950/[0.07] pt-12"
              >
                <h2 className="flex items-center gap-2 font-display text-[1.25rem] font-extrabold tracking-[-0.02em] text-forest-950">
                  <FileText aria-hidden className="h-5 w-5 text-forest-600" />
                  Sources
                </h2>
                <ol className="mt-5 space-y-3">
                  {post.sources.map((s, i) => (
                    <li
                      key={s.url}
                      className="flex gap-4 rounded-2xl bg-forest-500/[0.04] px-4 py-3.5 ring-1 ring-inset ring-forest-950/[0.06]"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-950 font-numeric text-[11.5px] font-extrabold text-forest-300">
                        {i + 1}
                      </span>
                      <span className="text-[14px] leading-relaxed text-forest-950/70">
                        {s.publisher} ({s.year}).{" "}
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-baseline gap-1 font-semibold text-forest-700 underline decoration-forest-500/40 underline-offset-2 hover:text-forest-600"
                        >
                          {s.title}
                          <ExternalLink aria-hidden className="h-3 w-3 self-center" />
                        </a>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>

          {/* ---- details and next step ---- */}
          <aside className="mt-10 lg:col-span-3 lg:mt-0">
            <div className="flex h-full flex-col gap-4">
              <div
                className="rounded-[1.5rem] bg-white p-5 ring-1 ring-inset ring-forest-950/[0.07]"
                style={{ boxShadow: "0 18px 40px -30px rgba(16,40,28,0.3)" }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
                  About this guide
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                  {[
                    { term: "Topic", value: category.label },
                    { term: "Reading time", value: `${minutes} min` },
                    { term: "Sections", value: String(post.sections.length) },
                    { term: "Sources", value: String(post.sources.length) },
                  ].map(({ term, value }) => (
                    <div
                      key={term}
                      className="flex flex-col-reverse rounded-xl bg-forest-500/[0.05] px-3 py-2.5"
                    >
                      <dt className="font-semibold text-forest-950/50">{term}</dt>
                      <dd className="font-display text-[1rem] font-extrabold text-forest-950">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="space-y-4 lg:sticky lg:top-28">
                <nav
                  aria-label="On this page"
                  className="hidden rounded-[1.5rem] bg-white p-3 ring-1 ring-inset ring-forest-950/[0.07] lg:block"
                  style={{ boxShadow: "0 18px 40px -30px rgba(16,40,28,0.3)" }}
                >
                  <p className="flex items-center gap-2 px-3 pb-2 pt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">
                    <ListChecks aria-hidden className="h-3.5 w-3.5" />
                    In this guide
                  </p>
                  <ol className="space-y-0.5">
                    {toc.map(({ id, label }, i) => {
                      const active = activeId === id;
                      return (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            aria-current={active ? "true" : undefined}
                            className={`flex items-start gap-3 rounded-xl px-3 py-2 text-[13.5px] font-semibold leading-snug transition-colors duration-300 ${
                              active
                                ? "bg-forest-950 text-white"
                                : "text-forest-950/60 hover:bg-forest-950/[0.04] hover:text-forest-950"
                            }`}
                          >
                            <span
                              className={`mt-px shrink-0 font-numeric text-[11px] font-extrabold tabular-nums ${
                                active ? "text-forest-300" : "text-forest-950/30"
                              }`}
                            >
                              {pad(i + 1)}
                            </span>
                            {label}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
                <div
                  className="relative overflow-hidden rounded-[1.5rem] p-6"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 0% 0%, var(--forest-700), var(--forest-950) 70%)",
                    boxShadow: "0 30px 60px -32px rgba(6,46,29,0.6)",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full opacity-50 blur-[80px]"
                    style={{ background: "var(--forest-500)" }}
                  />
                  <p className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-forest-300">
                    Try StudyMate
                  </p>
                  <p className="relative mt-3 font-display text-[1.3rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-white">
                    Try it on a real chapter
                  </p>
                  <p className="relative mt-3 text-[14px] leading-relaxed text-white/65">
                    Set up a free account in about five minutes and open the chapter your child
                    finds hardest.
                  </p>
                  <div className="relative mt-5">
                    <MagneticButton
                      as="a"
                      href={post.cta.link.href}
                      {...(post.cta.link.href.startsWith("http") ? EXTERNAL_LINK_PROPS : {})}
                      variant="solid"
                      size="md"
                      roll={false}
                    >
                      {post.cta.link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>
                  </div>
                  <OfferNote className="relative mt-4" />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ---- related ---- */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="ip-reveal mt-20 sm:mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="related-heading"
                className="font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-extrabold tracking-[-0.04em] text-forest-950"
              >
                Keep Reading
              </h2>
              <a
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full bg-forest-950 px-5 py-3 text-[14px] font-bold text-white transition-colors duration-300 hover:bg-forest-800"
              >
                All study guides
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} headingLevel={3} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <ClosingPanel
        heading={post.cta.heading}
        text={post.cta.text}
        primary={post.cta.link}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />

      <Footer />
    </main>
  );
}
