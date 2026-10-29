import { ArrowUpRight, Clock } from "lucide-react";
import { CATEGORY_COVER, CATEGORY_ICON } from "@/components/blog/category-icons";
import CoverArt from "@/components/blog/CoverArt";
import { RichText } from "@/components/content/RichText";
import { CATEGORIES } from "@/content/blog/categories";
import { postPath } from "@/content/blog";
import { readingMinutes } from "@/content/blog/text";
import type { BlogPost } from "@/content/blog/types";
import { formatDate } from "@/lib/dates";

/** The standard card: an illustrated cover, then the title and excerpt. */
function GuideCard({ post, Heading }: { post: BlogPost; Heading: "h2" | "h3" }) {
  const Icon = CATEGORY_ICON[post.category];
  return (
    <article
      className="group relative flex h-full flex-col rounded-[1.75rem] bg-white p-2.5 ring-1 ring-inset ring-forest-950/[0.07] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:ring-forest-500/30"
      style={{ boxShadow: "0 1px 2px rgba(16,40,28,0.04), 0 24px 50px -34px rgba(16,40,28,0.35)" }}
    >
      {/* Hover glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: "0 30px 60px -30px color-mix(in oklab, var(--forest-500) 55%, transparent)",
        }}
      />

      {/* ---- cover ---- */}
      <div
        aria-hidden
        className="relative h-44 overflow-hidden rounded-[1.35rem] sm:h-48"
        style={{ background: CATEGORY_COVER[post.category] }}
      >
        <span
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.22) 1px, transparent 0)",
            backgroundSize: "18px 18px",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 0% 100%, #000, transparent)",
            maskImage: "radial-gradient(ellipse 70% 80% at 0% 100%, #000, transparent)",
          }}
        />
        {/* Soft rings and the guide's own drawing */}
        <span className="absolute right-[18%] top-1/2 -translate-y-1/2">
          {[10, 15].map((size) => (
            <span
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
              style={{ width: `${size}rem`, height: `${size}rem` }}
            />
          ))}
        </span>
        <CoverArt
          post={post}
          className="absolute bottom-3 right-3 h-[82%] w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-forest-800 backdrop-blur-sm">
          <Icon className="h-3.5 w-3.5" />
          {CATEGORIES[post.category].label}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-forest-950/35 px-3 py-1.5 text-[11.5px] font-bold text-white ring-1 ring-inset ring-white/15 backdrop-blur-sm">
          <Clock className="h-3.5 w-3.5" />
          {readingMinutes(post)} min read
        </span>
      </div>

      {/* ---- body ---- */}
      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-5 sm:px-4">
        <Heading className="font-display text-[1.2rem] font-extrabold leading-snug tracking-[-0.025em] text-forest-950 transition-colors duration-300 group-hover:text-forest-700">
          <a
            href={postPath(post)}
            className="outline-none after:absolute after:inset-0 after:z-20 after:content-[''] focus-visible:after:rounded-[1.75rem] focus-visible:after:outline-2 focus-visible:after:outline-forest-500"
          >
            {post.h1}
          </a>
        </Heading>
        <p className="mt-2.5 line-clamp-2 flex-1 text-[14.5px] leading-relaxed text-forest-950/60">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 text-[13px] font-semibold">
          <time dateTime={post.published} className="text-forest-950/45">
            {formatDate(post.published)}
          </time>
          <span
            aria-hidden
            className="pointer-events-none inline-flex items-center gap-1.5 font-bold text-forest-700"
          >
            Read guide
            <span className="grid h-7 w-7 place-items-center rounded-full bg-forest-500/10 transition-all duration-500 group-hover:rotate-45 group-hover:bg-forest-950 group-hover:text-forest-300">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * Post card. The whole card is one link (the title's <a> is stretched over the
 * card), so there is a single, descriptive anchor per post rather than a title
 * link plus a "Read more" link.
 *
 * `variant="feature"` is the large dark lead card on the blog hub.
 */
export default function PostCard({
  post,
  headingLevel = 2,
  variant = "card",
}: {
  post: BlogPost;
  headingLevel?: 2 | 3;
  variant?: "card" | "feature";
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const Icon = CATEGORY_ICON[post.category];
  const feature = variant === "feature";

  if (!feature) return <GuideCard post={post} Heading={Heading} />;

  return (
    <article
      className={`group relative isolate flex h-full flex-col overflow-hidden rounded-[1.5rem] ring-1 ring-inset transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:rounded-[1.75rem] ${
        feature
          ? "p-7 text-white ring-white/10 sm:p-10 lg:p-12"
          : "bg-white p-6 ring-forest-950/[0.07] hover:ring-forest-500/30 sm:p-7"
      }`}
      style={
        feature
          ? {
              background:
                "radial-gradient(120% 120% at 0% 0%, var(--forest-700), var(--forest-950) 65%)",
              boxShadow: "0 40px 80px -40px rgba(6,46,29,0.7)",
            }
          : { boxShadow: "0 1px 2px rgba(16,40,28,0.04), 0 24px 50px -34px rgba(16,40,28,0.35)" }
      }
    >
      {feature && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
              backgroundSize: "24px 24px",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 90% 10%, #000, transparent)",
              maskImage: "radial-gradient(ellipse 70% 70% at 90% 10%, #000, transparent)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full opacity-50 blur-[90px] transition-opacity duration-700 group-hover:opacity-80"
            style={{ background: "var(--forest-500)" }}
          />
          <CoverArt
            post={post}
            className="pointer-events-none absolute right-8 top-20 -z-10 hidden h-36 w-auto opacity-90 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-105 sm:block lg:h-40"
          />
        </>
      )}

      <div className="relative flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-[11px] font-bold uppercase tracking-[0.16em] ring-1 ring-inset ${
            feature
              ? "bg-white/[0.07] text-forest-300 ring-white/10"
              : "bg-forest-500/[0.08] text-forest-700 ring-forest-700/10"
          }`}
        >
          <span
            className={`grid h-6 w-6 place-items-center rounded-full ${
              feature ? "bg-forest-400 text-forest-950" : "bg-forest-950 text-forest-300"
            }`}
          >
            <Icon aria-hidden className="h-3.5 w-3.5" />
          </span>
          {CATEGORIES[post.category].label}
        </span>
        {feature && (
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
            Latest guide
          </span>
        )}
      </div>

      <Heading
        className={`font-display font-extrabold tracking-[-0.03em] ${
          feature
            ? "mt-10 max-w-2xl text-balance text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.08] text-white sm:mt-12 sm:max-w-[calc(100%-13rem)]"
            : "mt-6 text-[1.2rem] leading-snug text-forest-950"
        }`}
      >
        <a
          href={postPath(post)}
          className="outline-none after:absolute after:inset-0 after:z-20 after:content-[''] focus-visible:after:rounded-[1.5rem] focus-visible:after:outline-2 focus-visible:after:outline-forest-500"
        >
          {post.h1}
        </a>
      </Heading>
      <p
        className={`relative mt-3 flex-1 leading-relaxed ${
          feature
            ? "max-w-xl text-[1.0625rem] text-white/70"
            : "line-clamp-3 text-[14.5px] text-forest-950/65"
        }`}
      >
        {post.excerpt}
      </p>

      {/* The post's first takeaway: the feature card previews its answer. */}
      {feature && post.takeaways[0] && (
        <div className="relative mt-8 max-w-xl rounded-2xl bg-white/[0.06] px-5 py-4 ring-1 ring-inset ring-white/10 backdrop-blur-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest-300">
            Key takeaway
          </p>
          <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-white/85">
            <RichText text={post.takeaways[0]} />
          </p>
        </div>
      )}

      <div
        className={`relative mt-7 flex items-center justify-between gap-4 border-t pt-5 text-[12.5px] font-semibold ${
          feature ? "border-white/10 text-white/55" : "border-forest-950/[0.07] text-forest-950/50"
        }`}
      >
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time dateTime={post.published}>{formatDate(post.published)}</time>
          <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-50" />
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="h-3.5 w-3.5" />
            {readingMinutes(post)} min read
          </span>
        </span>
        <span
          aria-hidden
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45 ${
            feature
              ? "bg-forest-400 text-forest-950"
              : "bg-forest-950/[0.05] text-forest-700 group-hover:bg-forest-950 group-hover:text-forest-300"
          }`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
