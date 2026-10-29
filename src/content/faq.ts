import { APP_URL } from "@/lib/site";
import type { Faq, PageContent } from "@/content/types";

/**
 * /faq copy, verbatim from the content package (Final v2, 23 Oct 2026).
 *
 * This is the only page on the site with FAQPage markup, and that markup is
 * generated from these same strings (`faqItems` below), so a question edited
 * here changes the page and the schema together.
 *
 * Group intros carry links to other pages. Sentences linking to pages that are
 * not live yet (/pricing, /blog, and /for-parents while it is held) are dropped
 * at render time and come back the day those pages launch.
 *
 * Answers say only what the fact sheet and the privacy policy support. Where a
 * fact is not settled (supported boards, what credits cost, data retention) the
 * answer points to hello@supermia.ai rather than guessing.
 */
export const FAQ_CONTENT: PageContent = {
  eyebrow: "FAQ",
  h1: "StudyMate AI FAQ: Textbooks, Tutoring, Tests, Pricing and Privacy",
  lead: [
    "StudyMate AI is an AI tutor that works from a student's own syllabus textbooks. These are straight answers for parents and students on how it works, what it costs to start and how account data is handled.",
  ],
  primaryCta: { label: "Start free", href: APP_URL },
  secondaryCta: { label: "See how it works", href: "/#how" },
  toc: true,
  sections: [
    {
      id: "about",
      heading: "About StudyMate AI",
      blocks: [
        { kind: "p", text: "Start here if you are new to StudyMate." },
        {
          kind: "qa",
          items: [
            {
              q: "What is StudyMate AI?",
              a: "StudyMate AI is an AI tutor for school students from SuperMIA. It answers questions from the student's own syllabus textbook with the page cited, adapts practice to their level, generates chapter practice papers with instant evaluation and shows which chapters to study next.",
            },
            {
              q: "How does an AI tutor like StudyMate work?",
              a: "The student opens a chapter and asks about anything that isn't clear. StudyMate explains it in plain language from that chapter and cites the page. It then offers practice at the student's level and evaluates the answers instantly, so the student can see what they understand and what still needs work.",
            },
            {
              q: "How is StudyMate different from a general AI chatbot?",
              a: "A general chatbot draws on the internet and doesn't know the syllabus. StudyMate answers from the chapter that is open, within the board and class chosen at setup, so answers, tests and reports stay inside what the student is expected to learn.",
            },
            {
              q: "Who makes StudyMate AI?",
              a: "StudyMate AI is built by SuperMIA (supermia.ai), the conversational AI platform from Botfinity, headquartered in Texas, USA. SuperMIA builds AI voice and chat agents for industries including education, and StudyMate AI is its AI tutor for school students. The company address is 2451 W Grapevine Mills Cir #547, Grapevine, Texas, and the team can be reached at hello@supermia.ai.",
            },
          ],
        },
      ],
    },
    {
      id: "textbooks",
      heading: "Textbooks and syllabus",
      blocks: [
        {
          kind: "p",
          text: "How the bookshelf works. Read more about [chatting with a textbook chapter](/features/chat-with-your-textbook).",
        },
        {
          kind: "qa",
          items: [
            {
              q: "Do we need to upload textbooks?",
              a: "No. Choose the country, board and class once at setup and the matching textbooks appear on the bookshelf. Any chapter can be searched as soon as it is opened.",
            },
            {
              q: "Which boards and classes does StudyMate support?",
              a: "The board and class are chosen at setup, and the bookshelf shows the textbooks available for that choice. Signing up is free and needs no card, so the quickest check is to choose your country, board and class and see what appears. To ask about a specific board and class first, email hello@supermia.ai.",
            },
            {
              q: "Does every answer come from the textbook?",
              a: "StudyMate answers from the chapter that is open and cites the page, so the student can go back to the book and check. Like any AI, it can occasionally get something wrong, which is why the page citation is there.",
            },
            {
              q: "Can the student ask follow-up questions?",
              a: "Yes. A student stuck on a chapter can ask for an example, a simpler explanation or a quick quiz on the same idea, and keep asking until the concept makes sense.",
            },
          ],
        },
      ],
    },
    {
      id: "tutoring",
      heading: "Tutoring and tests",
      blocks: [
        {
          kind: "p",
          text: "What happens after the explanation. See how [adaptive tutoring](/features/adaptive-tutoring) and [practice tests](/features/practice-tests) work. Or read the [guide for parents](/for-parents).",
        },
        {
          kind: "qa",
          items: [
            {
              q: "What does adaptive tutoring change?",
              a: "It changes the pace and the difficulty. Based on what the student has already shown they know, the session skips basics they have cleared. Practice runs at three levels: knowing a concept, using it and reasoning about it.",
            },
            {
              q: "Is AI tutoring good for students?",
              a: "It depends on how the tutor works. One that hands over finished answers can let a student skip the thinking. StudyMate explains from the student's own textbook with the page cited, then tests at their level, and a wrong answer brings an explanation and an easier question. Like any AI, it can occasionally be wrong, so the page citation matters.",
            },
            {
              q: "Will StudyMate just give my child the answers?",
              a: "No. StudyMate works through a topic with the student and then tests them. A wrong answer shapes what comes next instead of being corrected and forgotten, and the progress report shows where understanding is still thin.",
            },
            {
              q: "How do the practice tests work?",
              a: "The student generates a practice paper from any chapter at the difficulty they choose and attempts it online. Questions can be multiple choice, short answer or true or false. Evaluation is instant and detailed, so they see what went wrong as well as the score.",
            },
            {
              q: "Can using StudyMate for homework count as cheating?",
              a: "StudyMate is built to explain and test rather than hand over finished answers, so the student is walked through the reasoning instead of handed something to copy. Schools set their own rules on AI, so check what your child's school allows for homework and assignments.",
            },
          ],
        },
      ],
    },
    {
      id: "progress",
      heading: "Progress reports",
      blocks: [
        {
          kind: "p",
          text: "What the reports show after each test. For study tips between tests, visit the [StudyMate blog](/blog).",
        },
        {
          kind: "qa",
          items: [
            {
              q: "What do the progress reports show?",
              a: "They show which chapters have been covered and how the student performed in each, with an average score across tests, topics learned and days studied in a row. Chapters are listed weakest first, so revision can start with the chapters where scores are lowest.",
            },
            {
              q: "How does StudyMate decide what to study next?",
              a: "After each test, chapters are ranked from weakest to strongest based on the student's results. The weakest chapter appears first, so practice starts where scores are lowest.",
            },
          ],
        },
      ],
    },
    {
      id: "pricing",
      heading: "Pricing and credits",
      blocks: [
        {
          kind: "p",
          text: "What it costs to start. See [StudyMate pricing](/pricing).",
        },
        {
          kind: "qa",
          items: [
            {
              q: "How much does StudyMate AI cost?",
              a: "New accounts start with 5,000 free credits and no card is required. To find out what happens after the free credits run out, email hello@supermia.ai.",
            },
            {
              q: "Do I need a card to start?",
              a: "No. The 5,000 free credits are available without a card.",
            },
            {
              q: "How long does setup take?",
              a: "About five minutes in one sitting: create an account (about 30 seconds), choose the country, board and class (about a minute) and open the bookshelf. After that, the student works through topics and takes tests at their own pace. There is nothing to install.",
            },
          ],
        },
      ],
    },
    {
      id: "privacy",
      heading: "Accounts, privacy and data",
      blocks: [
        {
          kind: "p",
          text: "How account and study data is handled. The [privacy policy](/privacy) and [terms](/terms) set out the full details.",
        },
        {
          kind: "qa",
          items: [
            {
              q: "What data does StudyMate collect?",
              a: "The privacy policy lists account details such as name, email and mobile number, location details, the country, board and class chosen, test scores and study activity, generated question banks, chat histories with the AI tutor and custom assignments.",
            },
            {
              q: "Which companies process StudyMate data?",
              a: "The privacy policy names OpenAI and Anthropic as AI model providers, AWS for cloud storage, and the central SuperMIA account database, which holds name and contact details so one account signs in across the SuperMIA network.",
            },
            {
              q: "Is my child's data used for anything else?",
              a: "The privacy policy lists what is collected and names the companies that process it, but it does not yet say how long chats and scores are kept or whether they are used to train AI models. To ask about either before your child starts, email hello@supermia.ai.",
            },
            {
              q: "How should students use the chat with personal information?",
              a: "Only share what is needed for studying. The terms ask users not to enter sensitive, personally identifiable or confidential information into the AI chat unless it is needed for educational purposes.",
            },
            {
              q: "How do I report a security concern or ask about my data?",
              a: "Email hello@supermia.ai. The same address handles privacy questions and security reports.",
            },
          ],
        },
      ],
    },
  ],
  closing: {
    heading: "Try It on the Chapter That's Hardest Right Now",
    text: "Open a chapter your child has been avoiding, ask it something and see how StudyMate explains it. Setup takes about five minutes.",
    primary: { label: "Start free", href: APP_URL },
    secondary: {
      label: "Email us your question",
      href: "mailto:hello@supermia.ai?subject=StudyMate%20question",
    },
  },
};

/** Every question on a page, in order. Feeds the FAQPage node. */
export function faqItems(content: PageContent): Faq[] {
  return content.sections.flatMap((section) =>
    section.blocks.flatMap((block) => (block.kind === "qa" ? block.items : [])),
  );
}
