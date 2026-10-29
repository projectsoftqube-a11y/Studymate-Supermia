import { APP_URL } from "@/lib/site";
import type { PageContent } from "@/content/types";
import { RELATED, SETUP_FACT } from "@/content/features";

/**
 * /exam-revision and /about, written from the package briefs and the Fact
 * Sheet.
 *
 * Exam revision names no board: the supported countries, boards and classes are
 * not published yet (Fact Sheet question 1), so the page talks about "school
 * and board exams" generically and sends board questions to hello@supermia.ai.
 * It makes no claim about marks or scores.
 */

const START_FREE = { label: "Start free", href: APP_URL } as const;

export const EXAM_REVISION_CONTENT: PageContent = {
  eyebrow: "Exam revision",
  h1: "AI Revision Tool for School Exams: Chapter by Chapter",
  lead: [
    "StudyMate AI is an AI revision tool for school and board exams that works chapter by chapter: it ranks chapters weakest first, turns any chapter into a practice paper with instant evaluation and explains what's unclear from the textbook.",
  ],
  primaryCta: START_FREE,
  secondaryCta: { label: "See how practice tests work", href: "/features/practice-tests" },
  facts: [
    { value: "Weakest first", label: "Chapters ranked by results after each test" },
    { value: "Any chapter", label: "A practice paper on demand, at the level chosen" },
    { value: "Page cited", label: "On every explanation, from the textbook" },
    SETUP_FACT,
  ],
  sections: [
    {
      id: "why-revision-goes-wrong",
      heading: "Why Exam Revision So Often Goes Wrong",
      eyebrow: "The problem",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Most revision time isn't lost to a lack of effort. It goes to the wrong chapters, or to methods that feel productive without showing what has stuck.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Starting at chapter one",
              text: "Working through the book in order means time can run out before reaching the chapters that need the most work.",
              icon: "route",
            },
            {
              title: "Rereading instead of testing",
              text: "A page read twice feels familiar, but familiar isn't the same as being able to answer a question on it.",
              icon: "repeat",
            },
            {
              title: "Guessing which chapters are weak",
              text: "A feeling about a chapter isn't a result on it. Without results, it's hard to know where to spend the time.",
              icon: "target",
            },
            {
              title: "Feedback that arrives too late",
              text: "Class tests are often marked after the class has moved on, when there's less time left to act on them.",
              icon: "clock",
            },
          ],
        },
      ],
    },
    {
      id: "how-to-revise",
      heading: "How to Revise With StudyMate's AI Revision Tool",
      eyebrow: "How it works",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "The same four steps work for a unit test next week or a board exam months away.",
        },
        {
          kind: "steps",
          items: [
            "**Test each chapter once.** A practice paper on every chapter gives the progress report a result for each one.",
            "**Start at the top of the list.** The report ranks chapters weakest first, so revision begins where scores are lowest.",
            "**Fix what went wrong.** Read the evaluation, then ask the chapter to explain any mistake, with the page cited.",
            "**Test it again, then move down.** A fresh paper shows whether the chapter has improved before moving to the next one.",
          ],
        },
      ],
    },
    {
      id: "weakest-chapter-first",
      heading: "Start With the Weakest Chapter",
      blocks: [
        {
          kind: "p",
          text: "The hardest part of revision is deciding where to start. It is tempting to begin with chapter one, or with the chapters that already feel comfortable, and run out of time before reaching the ones that need the most work.",
        },
        {
          kind: "p",
          text: "StudyMate's progress report ranks chapters weakest first after each test. Starting at the top of that list puts revision time where scores are lowest, and the list updates as new results come in, so it always reflects the latest papers.",
        },
        {
          kind: "figure",
          src: "/problem/performance-insights.webp",
          alt: "A progress chart rising across chapters",
          width: 1400,
          height: 1400,
        },
      ],
    },
    {
      id: "papers-from-the-textbook",
      heading: "Practice Papers From the Textbook",
      blocks: [
        {
          kind: "p",
          text: "Rereading notes feels like revision but rarely shows what a student can recall without the book open. A practice paper does. StudyMate creates one from any chapter, on demand, at the difficulty the student chooses, and evaluates it instantly and in detail.",
        },
        {
          kind: "p",
          text: "Because papers come from the student's own syllabus textbook, within the board and class chosen at setup, board exam revision stays inside the syllabus they are studying rather than drifting into material from another one. See how [practice papers and progress reports](/features/practice-tests) work.",
        },
        {
          kind: "figure",
          src: "/problem/smart-test-generator.webp",
          alt: "A stack of generated quiz cards with one answer marked correct",
          width: 1400,
          height: 1400,
        },
      ],
    },
    {
      id: "explain-from-the-chapter",
      heading: "Explanations From the Chapter, With the Page Cited",
      blocks: [
        {
          kind: "p",
          text: "Revision stalls when a student meets an idea they never quite understood the first time. In StudyMate they can open that chapter and [ask about it](/features/chat-with-your-textbook), and the answer comes from the chapter in plain language, with the page cited so it can be checked against the book.",
        },
        {
          kind: "p",
          text: "If one explanation isn't enough, follow-ups take it further: an example, a simpler version or a quick quiz on the same idea. Then a fresh practice paper on the chapter shows whether it has stuck.",
        },
      ],
    },
    {
      id: "revision-methods",
      heading: "Which Revision Methods Work Best?",
      eyebrow: "Research",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Testing yourself works better than rereading. A 2013 review of ten study techniques by Dunlosky and colleagues, published in Psychological Science in the Public Interest, rated practice testing and spaced practice as high utility, and rereading and highlighting as low.",
        },
        {
          kind: "table",
          caption: "Common revision methods and how they compare",
          head: [
            "",
            "Practice paper on the chapter",
            "Rereading notes",
            "Highlighting the textbook",
          ],
          rows: [
            [
              "Rating in Dunlosky et al. (2013)",
              "High utility (practice testing)",
              "Low utility",
              "Low utility",
            ],
            [
              "Shows what can be recalled",
              "Yes, by answering questions",
              "No, the page is in front of the student",
              "No",
            ],
            ["Feedback", "Instant, detailed evaluation in StudyMate", "None", "None"],
            ["Shows what to revise next", "Yes, weakest chapter first", "No", "No"],
          ],
        },
        {
          kind: "p",
          text: "Our guide to [study methods compared](/blog/study-methods-compared) covers all ten techniques from the review, and the guide to [active recall](/blog/active-recall) explains how to test yourself on a chapter.",
        },
      ],
    },
    {
      id: "revision-timeline",
      heading: "A Revision Timeline That Uses the AI Revision Tool",
      eyebrow: "Timeline",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "A simple plan for the weeks before an exam, built only from what StudyMate does.",
        },
        {
          kind: "steps",
          items: [
            "**Early on: test every chapter once.** A practice paper on each chapter gives the progress report a result for every chapter, so the weakest-first list reflects the whole syllabus.",
            "**The middle weeks: work down the list.** Take the weakest chapter, ask about anything unclear, then take another paper on it before moving to the next chapter.",
            "**The final weeks: mix the chapters.** Revisit chapters from across the list so earlier ones aren't forgotten, and raise the difficulty on chapters that now feel secure.",
            "**The last few days: short papers, not new material.** Keep sessions short and spend them checking recall rather than starting chapters from scratch.",
          ],
        },
        {
          kind: "p",
          text: "None of this guarantees a mark. It makes sure revision time goes where the results say it's needed most. For a fuller week-by-week plan, read our [board exam revision plan](/blog/board-exam-revision-plan) and the guide to building a [study timetable](/blog/study-timetable).",
        },
      ],
    },
    {
      id: "last-week",
      heading: "What to Do in the Last Week Before an Exam",
      eyebrow: "Final week",
      layout: "dark",
      blocks: [
        {
          kind: "p",
          text: "The last week is for checking and sharpening, not for learning whole chapters for the first time.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Short papers, not new material",
              text: "A short practice paper checks recall in the time it would take to reread a few pages.",
              icon: "list",
            },
            {
              title: "Mix chapters from across the list",
              text: "Switching between chapters keeps earlier ones fresh instead of revising only the most recent.",
              icon: "layers",
            },
            {
              title: "Recheck the top of the list",
              text: "Give the weakest chapters one more paper, then ask the chapter about anything still unclear.",
              icon: "target",
            },
          ],
        },
        {
          kind: "p",
          text: "Our guide to [practice papers before exams](/blog/practice-papers-before-exams) covers the last month in more detail.",
        },
      ],
    },
    {
      id: "parents-and-revision",
      heading: "How Parents Can Help With Revision",
      blocks: [
        {
          kind: "p",
          text: "You don't need to know the subject to help. The chapter-by-chapter report shows where things stand, and looking through it together turns “how's revision going?” into a conversation about one specific chapter.",
        },
        {
          kind: "list",
          items: [
            "**Ask which chapter is at the top of the list.** It's the one with the weakest results, so it's the natural place to start the next session.",
            "**Check an answer against the cited page.** Every explanation names the page it came from, so you can read the passage together.",
            "**Keep sessions short and regular.** Revision spread over several days holds up better than one long session. Our guide to [spaced repetition](/blog/spaced-repetition) explains why.",
            "**Agree the house rules for AI.** Schools set their own rules, so it's worth agreeing how AI is used at home. See [how to use AI for homework without cheating](/blog/ai-for-homework-without-cheating).",
          ],
        },
        {
          kind: "p",
          text: "For more on reading a report like this, see our guide to [tracking your child's progress](/blog/track-your-childs-progress).",
        },
      ],
    },
    {
      id: "choosing-a-revision-tool",
      heading: "Choosing Among AI Revision Tools",
      blocks: [
        {
          kind: "p",
          text: "Lists of the best AI revision tools tend to mix flashcard makers, note summarizers and quiz generators. Before choosing one for your child, four questions are worth asking:",
        },
        {
          kind: "list",
          items: [
            "**Where do the answers come from?** An explanation that matches the textbook the class uses is easier to trust and to check.",
            "**Does it follow their syllabus?** Practice should come from the board and class the student is actually studying.",
            "**Does it explain or just answer?** A tool that hands over finished answers skips the part where learning happens.",
            "**Does it show what to revise next?** Results broken down by chapter turn practice into a plan.",
          ],
        },
        {
          kind: "p",
          text: "StudyMate answers from the student's own textbook with the page cited, follows the board and class chosen at setup, explains before it tests, and ranks chapters weakest first.",
        },
      ],
    },
    {
      id: "who-its-for",
      heading: "Who Uses StudyMate for Exam Revision?",
      eyebrow: "Who it's for",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Anyone revising from a school syllabus textbook who wants revision time to go where it's needed.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Students facing board exams",
              text: "Chapter-wise practice papers across the whole syllabus, with the weakest chapters first.",
              icon: "exam",
            },
            {
              title: "Students with school tests",
              text: "A quick paper on this week's chapter before a unit test or class test.",
              icon: "student",
            },
            {
              title: "Parents planning revision",
              text: "A clear, chapter-by-chapter picture to plan the weeks before an exam together.",
              icon: "parent",
            },
            {
              title: "Older learners",
              text: "Anyone revising a school syllabus on their own, at their own pace.",
              icon: "learner",
            },
          ],
        },
      ],
    },
    {
      id: "revision-faqs",
      heading: "Revision FAQs",
      eyebrow: "FAQs",
      layout: "wide",
      blocks: [
        {
          kind: "qa",
          items: [
            {
              q: "Which exams can StudyMate help my child revise for?",
              a: "StudyMate works from the syllabus textbooks for the board and class chosen at setup, so it fits school tests and board exams that follow those textbooks. The supported countries, boards and classes appear at setup; to ask about a specific board first, email [hello@supermia.ai](mailto:hello@supermia.ai).",
            },
            {
              q: "When should revision start?",
              a: "Early enough to take a practice paper on every chapter at least once before the exam, so the weakest-first list covers the whole syllabus. How early depends on how many chapters there are and how much time there is each week.",
            },
            {
              q: "How many practice papers should my child take per chapter?",
              a: "There's no fixed number. A useful pattern is one paper to find the starting point, then another after revising the chapter to check it has improved. Chapters near the top of the list usually need more than one round.",
            },
            {
              q: "Does it replace past papers from the exam board?",
              a: "No. Past papers show the exam's format and question style. StudyMate's papers are built from the textbook chapters and show which chapters need work, so the two are worth using together.",
            },
            {
              q: "Will StudyMate improve my child's marks?",
              a: "We don't promise marks. StudyMate shows which chapters are weakest, explains them from the textbook and gives practice at the right level. What changes the result is the work your child puts into those chapters.",
            },
            {
              q: "Does it just give my child the answers?",
              a: "No. StudyMate explains the reasoning and then checks understanding with a quiz or a practice paper, rather than handing over finished answers.",
            },
            {
              q: "Is there anything to install?",
              a: "No. StudyMate is a web app. Setup takes about five minutes in one sitting, and the first practice paper can be taken straight after.",
            },
            {
              q: "What does it cost to start?",
              a: "New accounts start with 5,000 free credits and no card is required. Setup takes about five minutes and there is nothing to install.",
            },
          ],
        },
      ],
    },
    {
      id: "more-features",
      heading: "The Features Behind Exam Revision",
      eyebrow: "Keep going",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Revision in StudyMate draws on three features working together.",
        },
        {
          kind: "cards",
          items: [RELATED.tests, RELATED.chat, RELATED.adaptive, RELATED.how],
        },
      ],
    },
  ],
  closing: {
    heading: "Find the Weakest Chapter Before the Exam Does",
    text: "Set up a free account, take a practice paper on each chapter and let the report show where to start. Setup takes about five minutes.",
    primary: START_FREE,
    secondary: { label: "See practice tests", href: "/features/practice-tests" },
  },
};

/**
 * /about: facts only, from the Fact Sheet, the privacy policy and supermia.ai
 * (fetched 29 Oct 2026). Who builds StudyMate, what it does, the technology
 * named in the privacy policy, what it doesn't claim and how to get in touch.
 * No team bios, user counts, ratings or founding story until they are
 * supplied; SuperMIA's business-product figures are about other products and
 * are left out.
 */
export const ABOUT_CONTENT: PageContent = {
  eyebrow: "About us",
  h1: "About StudyMate AI",
  h1Accent: "StudyMate AI",
  lead: [
    "StudyMate AI is an AI tutor for school students, built by SuperMIA, the conversational AI platform from Botfinity. It answers from a student's own syllabus textbook with the page cited, adapts practice to their level and shows which chapters to study next.",
  ],
  primaryCta: START_FREE,
  secondaryCta: { label: "See how it works", href: "/how-it-works" },
  facts: [
    { value: "SuperMIA", label: "The conversational AI platform from Botfinity" },
    { value: "Texas, USA", label: "Headquarters, in Grapevine" },
    { value: "Page cited", label: "On every answer, from the student's own textbook" },
    { value: "5,000", label: "Free credits to start, with no card required" },
  ],
  sections: [
    {
      id: "what-studymate-does",
      heading: "What StudyMate AI Does",
      blocks: [
        {
          kind: "p",
          text: "StudyMate AI starts from the book a student is already expected to know. At setup, the country, board and class are chosen once, and the matching syllabus textbooks appear on the bookshelf, with nothing to upload.",
        },
        {
          kind: "list",
          items: [
            "**Chat with your textbook.** Ask any chapter a question and get a plain-language answer from that chapter, with the page cited. See [Chat With Your Textbook](/features/chat-with-your-textbook).",
            "**Adaptive tutoring.** Practice at three levels, knowing a concept, using it and reasoning about it, stepping up only after correct answers. See [Adaptive Tutoring](/features/adaptive-tutoring).",
            "**Practice tests.** A practice paper from any chapter, on demand, with instant and detailed evaluation. See [Practice Tests and Progress](/features/practice-tests).",
            "**Progress by chapter.** A report that ranks chapters weakest first, so revision starts where scores are lowest.",
          ],
        },
      ],
    },
    {
      id: "principles",
      heading: "How StudyMate Is Built",
      eyebrow: "Principles",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Four ideas shape every part of the product, from the first question to the last practice paper before an exam.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Start from the book they study",
              text: "Answers come from the student's own syllabus textbook, not the open internet, and cite the page.",
              icon: "book",
            },
            {
              title: "Explain before testing",
              text: "StudyMate works through the reasoning, then checks understanding, rather than handing over finished answers.",
              icon: "lightbulb",
            },
            {
              title: "Practice at the right level",
              text: "Difficulty steps up after a correct answer and back down, with an explanation, after a wrong one.",
              icon: "gauge",
            },
            {
              title: "Show what to study next",
              text: "Results are broken down by chapter, with the weakest at the top of the list.",
              icon: "target",
            },
          ],
        },
      ],
    },
    {
      id: "who-builds-studymate",
      heading: "Who Builds StudyMate AI",
      blocks: [
        {
          kind: "p",
          text: "StudyMate AI is built by [SuperMIA](https://supermia.ai/), the conversational AI platform from Botfinity, headquartered in Texas, USA. SuperMIA builds AI voice and chat agents for industries including healthcare, hospitality, real estate and education.",
        },
        {
          kind: "p",
          text: "StudyMate AI is SuperMIA's AI tutor for school students. In education, SuperMIA also builds CourseSmith, an AI lesson planner and teaching assistant for teachers. SuperMIA has US-based support, a regional team in the Middle East and North Africa, and operations in India.",
        },
        {
          kind: "p",
          text: "StudyMate also has a page on the SuperMIA site: [StudyMate on SuperMIA](https://supermia.ai/ai-studymate/).",
        },
      ],
    },
    {
      id: "technology-and-data",
      heading: "Technology and Data",
      eyebrow: "Under the hood",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "StudyMate is a web app, so there is nothing to install. The [privacy policy](/privacy) names the services behind it:",
        },
        {
          kind: "cards",
          items: [
            {
              title: "AI models",
              text: "Answers, practice and evaluation use third-party AI models from OpenAI and Anthropic.",
              icon: "wand",
            },
            {
              title: "Cloud storage",
              text: "Account and study data is stored in the cloud on Amazon Web Services (AWS).",
              icon: "layers",
            },
            {
              title: "One SuperMIA account",
              text: "Profile details are synced to the central SuperMIA account database so the same sign-in works across SuperMIA.",
              icon: "learner",
            },
          ],
        },
      ],
    },
    {
      id: "what-we-dont-claim",
      heading: "What We Don't Claim",
      eyebrow: "Honest by default",
      layout: "dark",
      blocks: [
        {
          kind: "p",
          text: "An AI tutor is only useful if you can trust what it says about itself, so here is what StudyMate does not promise.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "No guaranteed marks",
              text: "StudyMate shows which chapters need work and helps with them. What changes a result is the work a student puts in.",
              icon: "chart",
            },
            {
              title: "Not always right",
              text: "Like any AI, it can occasionally get something wrong, which is why every answer cites the page so it can be checked.",
              icon: "page",
            },
            {
              title: "Not a replacement for school",
              text: "StudyMate supports what students learn in class. Schools set their own rules on AI, and those come first.",
              icon: "exam",
            },
          ],
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact StudyMate AI",
      blocks: [
        {
          kind: "p",
          text: "Questions about StudyMate, a specific board or class, your account or your data all go to the same place.",
        },
        { kind: "contact", name: "The StudyMate AI team", email: "hello@supermia.ai" },
        {
          kind: "p",
          text: "Postal address: 2451 W Grapevine Mills Cir #547, Grapevine, TX 76051, United States. For quick answers first, read the [StudyMate AI FAQ](/faq).",
        },
      ],
    },
  ],
  closing: {
    heading: "See What StudyMate Does With a Real Chapter",
    text: "Set up a free account, open the chapter your child finds hardest and ask it something. Setup takes about five minutes and there is nothing to install.",
    primary: START_FREE,
    secondary: { label: "Read the FAQ", href: "/faq" },
  },
};
