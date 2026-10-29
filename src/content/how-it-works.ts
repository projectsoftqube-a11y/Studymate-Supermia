import { APP_URL } from "@/lib/site";
import type { PageContent } from "@/content/types";
import { RELATED } from "@/content/features";

/**
 * /how-it-works: the homepage's five-step section as a standalone page, with
 * room for what the homepage only gestures at: what a study session looks
 * like, how practice adjusts and what the report shows afterwards.
 *
 * The five steps are an illustrated journey (the homepage's step art in
 * /public/how), then a time table, a what-you-need checklist and the detail.
 *
 * Every step, time and capability is from the Fact Sheet (live subdomain).
 * Nothing about device support, changing the board later or account roles is
 * stated, because none of it is confirmed.
 */
export const HOW_IT_WORKS_CONTENT: PageContent = {
  eyebrow: "How it works",
  h1: "How StudyMate AI Works: From Sign-Up to Your First Progress Report",
  lead: [
    "StudyMate AI works in five steps that take about five minutes to set up: create an account, choose the country, board and class, open the bookshelf, work through a topic, then test and see the gaps.",
  ],
  primaryCta: { label: "Start free", href: APP_URL },
  secondaryCta: { label: "Try a sample question", href: "/#adaptive" },
  facts: [
    { value: "5 steps", label: "From sign-up to the first progress report" },
    { value: "~30 sec", label: "To create an account" },
    { value: "~1 min", label: "To choose the country, board and class" },
    { value: "No card", label: "5,000 free credits, nothing to install" },
  ],
  sections: [
    {
      id: "five-steps",
      heading: "What Are the Five Steps?",
      eyebrow: "The journey",
      layout: "dark",
      blocks: [
        {
          kind: "p",
          text: "Setup happens once, in one sitting, and there is nothing to install. We suggest a parent does it with their child the first time.",
        },
        {
          kind: "journey",
          items: [
            {
              title: "Create an account",
              time: "About 30 seconds",
              text: "A few account details and it is done. New accounts start with 5,000 free credits, with no card required.",
              image: "/how/create-your-account.webp",
              alt: "A sign-up card with credit tokens arriving beside it",
              width: 1200,
              height: 800,
            },
            {
              title: "Set the syllabus",
              time: "About 1 minute",
              text: "Choose the student's country, board and class once. That decides which textbooks appear and keeps every answer inside that syllabus.",
              image: "/how/set-your-syllabus.webp",
              alt: "A globe with selector cards cascading from it",
              width: 1200,
              height: 800,
            },
            {
              title: "Open the bookshelf",
              time: "Instant",
              text: "The matching syllabus textbooks are already on the shelf, so there is nothing to find, scan or upload. Any chapter can be searched as soon as it is opened.",
              image: "/how/open-your-bookshelf.webp",
              alt: "A row of textbooks with the centre one opening and glowing",
              width: 1200,
              height: 800,
            },
            {
              title: "Work through a topic",
              time: "At their own pace",
              text: "The student opens a chapter and asks about anything that isn't clear. Answers come from that chapter in plain language, with the page cited, and follow-ups keep going until it clicks.",
              image: "/how/work-through-a-topic.webp",
              alt: "An open book with chat bubbles rising from its pages",
              width: 1200,
              height: 900,
            },
            {
              title: "Test, then see the gaps",
              time: "After each paper",
              text: "A practice paper from any chapter, evaluated instantly and in detail. The progress report then ranks chapters weakest first, so the next session starts in the right place.",
              image: "/how/test-then-see-the-gaps.webp",
              alt: "A quiz card beside a progress ring and a rising analytics graph",
              width: 1200,
              height: 900,
            },
          ],
        },
      ],
    },
    {
      id: "step-times",
      heading: "How Long Does Each Step Take?",
      eyebrow: "At a glance",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "The first three steps are a one-time setup of about five minutes. The last two are what every study session looks like after that.",
        },
        {
          kind: "table",
          caption: "What each step takes",
          head: ["Step", "Time", "What you need"],
          rows: [
            ["1. Create an account", "About 30 seconds", "A few account details"],
            ["2. Set the syllabus", "About 1 minute", "The student's country, board and class"],
            ["3. Open the bookshelf", "Instant", "Nothing: textbooks are preloaded"],
            ["4. Work through a topic", "The student's own pace", "A chapter that needs attention"],
            ["5. Test and see the gaps", "After each paper", "A practice paper from any chapter"],
          ],
        },
      ],
    },
    {
      id: "before-you-start",
      heading: "What You Need Before You Start",
      eyebrow: "Checklist",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Very little. Have these ready and setup takes one sitting.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Country, board and class",
              text: "These decide which syllabus textbooks appear on the bookshelf.",
              icon: "route",
            },
            {
              title: "About five minutes",
              text: "Around 30 seconds for the account and about a minute for the syllabus.",
              icon: "clock",
            },
            {
              title: "A chapter that needs work",
              text: "The one your child finds hardest is the best place to start.",
              icon: "book",
            },
            {
              title: "No card, nothing to install",
              text: "StudyMate is a web app, and new accounts start with 5,000 free credits.",
              icon: "check",
            },
          ],
        },
      ],
    },
    {
      id: "study-session",
      heading: "What Happens in a Study Session?",
      blocks: [
        {
          kind: "p",
          text: "In a study session, the student asks about anything in the open chapter that isn't clear and gets a plain-language answer drawn from that chapter, with the page cited. The board and class chosen at setup keep every answer inside the syllabus.",
        },
        {
          kind: "p",
          text: "After an answer, the student can ask for an example, a simpler explanation or a quick quiz on the same idea, and keep going until it makes sense. StudyMate walks through the reasoning rather than handing over a finished answer. See [chat with your textbook](/features/chat-with-your-textbook) for more.",
        },
        {
          kind: "figure",
          src: "/problem/chat-with-your-textbook.webp",
          alt: "An open textbook with an AI chat bubble rising from its pages",
          width: 1400,
          height: 1400,
        },
      ],
    },
    {
      id: "practice-adjusts",
      heading: "How Does Practice Adjust to the Student?",
      blocks: [
        {
          kind: "p",
          text: "Practice adjusts with every answer, across three levels:",
        },
        {
          kind: "terms",
          items: [
            { term: "Basic", text: "Does the student know the concept?" },
            { term: "Medium", text: "Can they use it?" },
            { term: "Advanced", text: "Can they reason with it?" },
          ],
        },
        {
          kind: "p",
          text: "A correct answer moves the next question up a level. A wrong answer brings a short explanation and steps the difficulty back down. Read more about [adaptive tutoring](/features/adaptive-tutoring), or try the [sample test on our homepage](/#adaptive).",
        },
        {
          kind: "figure",
          src: "/problem/adaptive-ai-tutoring.webp",
          alt: "Knowledge cards rising in difficulty along a branching path",
          width: 1400,
          height: 1400,
        },
      ],
    },
    {
      id: "after-a-paper",
      heading: "What Happens After a Practice Paper?",
      blocks: [
        {
          kind: "p",
          text: "After a practice paper, the student gets an instant, detailed evaluation that shows what went wrong as well as the score. The result then feeds the progress report, which shows:",
        },
        {
          kind: "list",
          items: [
            "**Chapters covered** and how the student scored in each.",
            "**Average score** across all tests so far.",
            "**Topics learned** and days in a row of study.",
            "**What to study next**, with chapters ranked weakest first.",
          ],
        },
        {
          kind: "p",
          text: "See how [practice tests and progress reports](/features/practice-tests) work, or read our guide to [tracking your child's progress](/blog/track-your-childs-progress).",
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
      id: "how-it-works-faqs",
      heading: "How It Works FAQs",
      eyebrow: "FAQs",
      layout: "wide",
      blocks: [
        {
          kind: "qa",
          items: [
            {
              q: "Do I need to install anything?",
              a: "No. StudyMate runs as a web app, so setup is an account, a syllabus choice and the bookshelf. It takes about five minutes in one sitting.",
            },
            {
              q: "Do we have to find or upload the textbooks?",
              a: "No. Once the country, board and class are chosen, the matching textbooks are already on the bookshelf, and any chapter can be searched as soon as it is opened.",
            },
            {
              q: "Which boards and classes are supported?",
              a: "The supported countries, boards and classes appear at setup. To ask about a specific board before signing up, email [hello@supermia.ai](mailto:hello@supermia.ai).",
            },
            {
              q: "When does the first progress report appear?",
              a: "After the first practice paper is evaluated. From then on, each test updates the chapter-by-chapter report and the weakest-first list of what to study next.",
            },
            {
              q: "Can we try it before signing up?",
              a: "Yes. The [sample test on our homepage](/#adaptive) runs a short set of questions at rising difficulty, with no account needed.",
            },
            {
              q: "Does it just give my child the answers?",
              a: "No. StudyMate walks through the reasoning and then checks understanding with a quiz or a practice paper, rather than handing over finished answers.",
            },
            {
              q: "What does it cost to start?",
              a: "New accounts start with 5,000 free credits, with no card required. To find out what happens after the free credits run out, email [hello@supermia.ai](mailto:hello@supermia.ai).",
            },
          ],
        },
      ],
    },
    {
      id: "more-features",
      heading: "Explore the Features Behind Each Step",
      eyebrow: "Keep going",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Each step draws on one of StudyMate's features. Here is where to read more.",
        },
        {
          kind: "cards",
          items: [RELATED.chat, RELATED.adaptive, RELATED.tests, RELATED.exam],
        },
      ],
    },
  ],
  closing: {
    heading: "Set It Up Together in Five Minutes",
    text: "Create a free account, choose the board and class, and open the chapter your child finds hardest.",
    primary: { label: "Start free", href: APP_URL },
    secondary: { label: "Read the FAQ", href: "/faq" },
  },
};
