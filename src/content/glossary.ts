import { APP_URL } from "@/lib/site";
import type { PageContent } from "@/content/types";

/**
 * /glossary: plain definitions of the study and learning terms the guides use.
 *
 * Each entry is written to be lifted on its own: the first sentence is a
 * definition of the form "X is ...", which is the sentence shape retrieval
 * systems match when someone asks "what is X". Every heading is that question.
 *
 * Research claims are attributed to papers verified against Crossref (listed
 * in the Sources section). The DefinedTermSet schema on the route is generated
 * from GLOSSARY below, so a definition edited here changes the page and the
 * schema together.
 */
export interface GlossaryTerm {
  id: string;
  term: string;
  /** The section heading: the question someone types or asks aloud. */
  question: string;
  /** First sentence is the definition. Inline links allowed. */
  definition: string;
  /** Optional follow-up sentence(s) with a link to the guide that goes deeper. */
  more?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: "active-recall",
    question: "What is active recall?",
    term: "Active recall",
    definition:
      "Active recall is a study method in which a student brings information back from memory, for example by answering questions with the book closed, instead of rereading it.",
    more: "Research on the testing effect supports it, and our guide to [active recall](/blog/active-recall) shows simple ways to use it.",
  },
  {
    id: "adaptive-learning",
    question: "What is adaptive learning?",
    term: "Adaptive learning",
    definition:
      "Adaptive learning is an approach in which the difficulty, pace or content of practice changes based on how the learner performs.",
    more: "In StudyMate, practice moves between three levels with each answer. See how [adaptive tutoring](/features/adaptive-tutoring) works.",
  },
  {
    id: "ai-tutor",
    question: "What is an AI tutor?",
    term: "AI tutor",
    definition:
      "An AI tutor is software that uses artificial intelligence to explain topics, answer questions and give practice to one learner at a time.",
    more: "A tutor built for school study can be tied to a student's own syllabus, unlike a general chatbot. Read [AI tutor vs general AI chatbot](/blog/ai-tutor-vs-chatbot).",
  },
  {
    id: "board-exam",
    question: "What is a board exam?",
    term: "Board exam",
    definition:
      "A board exam is a standardized exam set and marked by an education board rather than by an individual school, usually at the end of a key school year.",
    more: "Our [board exam revision plan](/blog/board-exam-revision-plan) explains how to prepare chapter by chapter.",
  },
  {
    id: "cramming",
    question: "What is cramming?",
    term: "Cramming (massed practice)",
    definition:
      "Cramming, called massed practice in research, is studying a topic in one long session shortly before a test instead of spreading the study out.",
    more: "Its counterpart, distributed practice, spreads the same study across several sessions, and Dunlosky and colleagues (2013) rated that high utility.",
  },
  {
    id: "distributed-practice",
    question: "What is distributed practice?",
    term: "Distributed practice",
    definition:
      "Distributed practice is the research term for spreading the study of a topic across several sessions separated by time.",
    more: "Dunlosky and colleagues (2013) rated it one of only two high-utility study techniques. See [study methods compared](/blog/study-methods-compared).",
  },
  {
    id: "elaborative-interrogation",
    question: "What is elaborative interrogation?",
    term: "Elaborative interrogation",
    definition:
      "Elaborative interrogation is a study technique in which the student asks why a fact or idea is true and works out an answer.",
    more: "Dunlosky and colleagues (2013) rated it moderate utility.",
  },
  {
    id: "feynman-technique",
    question: "What is the Feynman technique?",
    term: "Feynman technique",
    definition:
      "The Feynman technique is a study method, named after physicist Richard Feynman, in which a student explains a topic in simple words as if teaching it, finds the gaps, returns to the source and simplifies again.",
    more: "Our guide to [the Feynman technique](/blog/feynman-technique) works through an example.",
  },
  {
    id: "formative-assessment",
    question: "What is formative assessment?",
    term: "Formative assessment",
    definition:
      "Formative assessment is checking understanding during learning, through quizzes, questions or practice work, so study can be adjusted before a final exam.",
    more: "Its counterpart, summative assessment, measures learning at the end of a course or unit.",
  },
  {
    id: "illusion-of-fluency",
    question: "What is the illusion of fluency?",
    term: "Illusion of fluency",
    definition:
      "The illusion of fluency is the feeling of knowing material because it looks familiar, often after rereading it, without being able to recall it when tested.",
    more: "Testing yourself is the quickest way to tell real recall from familiarity.",
  },
  {
    id: "interleaving",
    question: "What is interleaving?",
    term: "Interleaving",
    definition:
      "Interleaving is mixing different types of problems or topics in one study session instead of practicing one type at a time.",
    more: "Dunlosky and colleagues (2013) rated interleaved practice moderate utility.",
  },
  {
    id: "metacognition",
    question: "What is metacognition?",
    term: "Metacognition",
    definition:
      "Metacognition is thinking about your own thinking: knowing what you understand, noticing what you don't and choosing how to study as a result.",
    more: "A chapter-by-chapter progress report is a simple metacognitive tool, because it shows where understanding is thin.",
  },
  {
    id: "pomodoro-technique",
    question: "What is the Pomodoro technique?",
    term: "Pomodoro technique",
    definition:
      "The Pomodoro technique is a time-management method, developed by Francesco Cirillo, in which work is split into short focused intervals separated by brief breaks.",
    more: "It is about managing time rather than memory, so it pairs well with active recall during each interval.",
  },
  {
    id: "practice-paper",
    question: "What is a practice paper?",
    term: "Practice paper",
    definition:
      "A practice paper is a test written in the style of a real exam, used to rehearse answering questions and to find out which topics still need work.",
    more: "See [how to use practice papers in the last month before exams](/blog/practice-papers-before-exams).",
  },
  {
    id: "retrieval-practice",
    question: "What is retrieval practice?",
    term: "Retrieval practice",
    definition:
      "Retrieval practice is the research term for active recall: deliberately bringing information back to mind through quizzes, practice papers or writing down what you remember.",
    more: "Dunlosky and colleagues (2013) rated practice testing high utility.",
  },
  {
    id: "self-explanation",
    question: "What is self-explanation?",
    term: "Self-explanation",
    definition:
      "Self-explanation is a study technique in which the student explains, in their own words, how new information connects to what they already know or how a solution works.",
    more: "Dunlosky and colleagues (2013) rated it moderate utility.",
  },
  {
    id: "spaced-repetition",
    question: "What is spaced repetition?",
    term: "Spaced repetition",
    definition:
      "Spaced repetition is reviewing material several times with gaps between the reviews, rather than all at once.",
    more: "Cepeda and colleagues (2006) reviewed 317 experiments on spacing and found the best gap between reviews grows with the time left before the test. Our guide to [spaced repetition](/blog/spaced-repetition) includes a schedule.",
  },
  {
    id: "syllabus",
    question: "What is a syllabus?",
    term: "Syllabus",
    definition:
      "A syllabus is the official list of topics a course or exam covers; for school students it is usually set by the education board for each class.",
    more: "StudyMate preloads textbooks by country, board and class, so answers and practice stay inside the syllabus.",
  },
  {
    id: "testing-effect",
    question: "What is the testing effect?",
    term: "Testing effect",
    definition:
      "The testing effect is the finding that taking a test on material improves later memory of it more than spending the same time studying it again.",
    more: "Roediger and Karpicke (2006) demonstrated it with students reading prose passages.",
  },
];

/** Glossary page copy. Each term becomes its own section and jump-list entry. */
export const GLOSSARY_CONTENT: PageContent = {
  eyebrow: "Resources · Glossary",
  h1: "Study Glossary: Learning Terms Explained in Plain English",
  lead: [
    "A study glossary is a list of the learning terms parents and students come across, from active recall and spaced repetition to interleaving and adaptive learning. Each definition below fits in a sentence or two, notes what the research says where it matters and links to a guide that goes further.",
  ],
  primaryCta: { label: "Read the study guides", href: "/blog" },
  secondaryCta: { label: "Study methods compared", href: "/blog/study-methods-compared" },
  toc: true,
  sections: [
    ...GLOSSARY.map((t) => ({
      id: t.id,
      heading: t.question,
      blocks: [
        { kind: "p" as const, text: t.definition },
        ...(t.more ? [{ kind: "p" as const, text: t.more }] : []),
      ],
    })),
    {
      id: "sources",
      heading: "Sources",
      blocks: [
        {
          kind: "list",
          items: [
            "Dunlosky, Rawson, Marsh, Nathan and Willingham (2013). [Improving Students' Learning With Effective Learning Techniques](https://doi.org/10.1177/1529100612453266). Psychological Science in the Public Interest.",
            "Roediger and Karpicke (2006). [Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention](https://doi.org/10.1111/j.1467-9280.2006.01693.x). Psychological Science.",
            "Cepeda, Pashler, Vul, Wixted and Rohrer (2006). [Distributed practice in verbal recall tasks: A review and quantitative synthesis](https://doi.org/10.1037/0033-2909.132.3.354). Psychological Bulletin.",
          ],
        },
      ],
    },
  ],
  closing: {
    heading: "Put the Strongest Methods to Work",
    text: "StudyMate turns any chapter of a student's own textbook into a practice paper and shows which chapters to test again. Setup takes about five minutes.",
    primary: { label: "Start free", href: APP_URL },
    secondary: { label: "See how it works", href: "/how-it-works" },
  },
};
