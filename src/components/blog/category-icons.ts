import { GraduationCap, Lightbulb, Users, type LucideIcon } from "lucide-react";
import type { CategoryKey } from "@/content/blog/types";

/**
 * One icon per blog category, so cards and topic tiles read by topic at a
 * glance. Typographic rather than photographic: there are no real cover images
 * yet, and stock photos would add weight without adding information.
 */
export const CATEGORY_ICON: Record<CategoryKey, LucideIcon> = {
  "study-skills": Lightbulb,
  "exam-prep": GraduationCap,
  "for-parents": Users,
};

/**
 * Cover tone per category for post covers, all within the brand greens so a
 * grid reads by topic without leaving the palette.
 */
export const CATEGORY_COVER: Record<CategoryKey, string> = {
  "study-skills":
    "radial-gradient(120% 120% at 100% 0%, var(--forest-400), var(--forest-600) 45%, var(--forest-800) 100%)",
  "exam-prep":
    "radial-gradient(120% 120% at 100% 0%, var(--forest-600), var(--forest-800) 50%, var(--forest-950) 100%)",
  "for-parents":
    "radial-gradient(120% 120% at 100% 0%, var(--forest-300), var(--forest-500) 50%, var(--forest-700) 100%)",
};
