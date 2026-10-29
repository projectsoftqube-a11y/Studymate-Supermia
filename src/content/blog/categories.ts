import type { Category, CategoryKey } from "@/content/blog/types";

/**
 * Blog topics. They are tabs on /blog, not pages of their own: there are no
 * category URLs. `label` names the tab and the card pill; the title, H1,
 * description and intro are the package's category-page copy (05 Resources),
 * kept for if topic pages are ever wanted.
 */
export const CATEGORIES: Record<CategoryKey, Category> = {
  "study-skills": {
    key: "study-skills",
    label: "Study Skills",
    title: "Study Skills Guides | StudyMate AI Blog",
    description:
      "Guides to studying a chapter well: active reading, active recall, practice tests and making revision stick.",
    h1: "Study Skills Guides",
    intro:
      "Study skills are the habits that turn time spent with a textbook into things a student can actually remember. These guides cover how to read a chapter with questions in mind, how to make notes that are useful later, and the two methods with the strongest research behind them: testing yourself and spacing review out over time. Each guide explains what to do in plain steps, says where the evidence comes from and links to the published research, so you can check it yourself.",
  },
  "exam-prep": {
    key: "exam-prep",
    label: "Exam Prep",
    title: "Exam Prep Guides | StudyMate AI Blog",
    description:
      "Guides to preparing for school and board exams: revision plans, practice papers and what to do in the final weeks.",
    h1: "Exam Prep Guides",
    intro:
      "Exam preparation goes best when it starts with a plan rather than with chapter one. These guides show how to build a revision timetable around the weakest chapters, how to use practice papers in the final month, and how to pace the last weeks so earlier chapters are not forgotten. They are written for school tests and board exams in general, and they stay honest about what a plan can and cannot promise.",
  },
  "for-parents": {
    key: "for-parents",
    label: "For Parents",
    title: "Guides for Parents | StudyMate AI Blog",
    description:
      "Guides for parents: helping your child study, reading progress reports and setting sensible rules for AI and homework.",
    h1: "Guides for Parents",
    intro:
      "You do not need to know every subject to help your child study well. These guides are for parents who want to support without hovering: how to follow progress chapter by chapter, what to ask when a chapter is hard, where AI helps with homework and where it crosses the line, and how an AI tutor that works from the textbook differs from a general chatbot. Each one ends with something you can try this week.",
  },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];
