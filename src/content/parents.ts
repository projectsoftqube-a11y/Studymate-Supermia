import { APP_URL } from "@/lib/site";
import type { PageContent } from "@/content/types";

/**
 * /for-parents copy, verbatim from the content package (Final v2, 23 Oct 2026).
 *
 * Built and held: see FOR_PARENTS_LIVE in `content/pages.ts` for what has to be
 * answered before it launches.
 *
 * Deliberately absent until SuperMIA confirms them: any parent dashboard, parent
 * login or parental controls, and any "for kids" or compliance wording. The
 * parent FAQs are visible only; FAQPage markup lives on /faq alone.
 *
 * The package specifies a sample progress-report image for "What the Progress
 * Report Shows". No such screenshot exists in the repo yet, and an unrelated
 * illustration captioned as a report would misdescribe it, so the section ships
 * as text until the asset is supplied.
 */
export const PARENTS_CONTENT: PageContent = {
  eyebrow: "For parents",
  h1: "An AI Tutor for Your Child That Works From Their School Textbooks",
  h1Accent: "From Their School Textbooks",
  lead: [
    "StudyMate AI is an AI tutor for school students that starts from the books they already study. It explains any chapter in plain language with the page cited, checks understanding with practice at their level and shows which chapters still need work. Think of it as an online tutor for your child that works from syllabus textbooks and explains rather than hands over answers.",
  ],
  primaryCta: { label: "Set up a free account", href: APP_URL },
  secondaryCta: { label: "Read the parent FAQs", href: "#parent-faqs" },
  sections: [
    {
      id: "what-your-child-does",
      heading: "What Your Child Does in StudyMate",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Opens a chapter from their syllabus.** Books are already on the shelf for the country, board and class chosen at setup, so there is nothing to upload.",
            "**Asks about what isn't clear.** The answer comes from that chapter, in plain words, with the page cited so it can be checked against the book.",
            "**Practices at the right level.** Questions move from knowing a concept, to using it, to reasoning with it, and step up only after correct answers.",
            "**Takes a practice paper.** Any chapter can become a practice paper, evaluated instantly with feedback on what went wrong.",
            "**Sees what to study next.** Chapters are ranked weakest first after each test.",
          ],
        },
      ],
    },
    {
      id: "explains-then-tests",
      heading: "Explains, Then Tests",
      blocks: [
        {
          kind: "p",
          text: "If you worry that AI will simply hand over answers, StudyMate is built to teach instead. It walks through the reasoning, then checks understanding with practice. A wrong answer brings a short explanation and an easier question, and the progress report shows where understanding is still thin.",
        },
        {
          kind: "p",
          text: "Schools set their own rules on AI, so it is worth checking what your child's school allows for homework and assignments.",
        },
      ],
    },
    {
      id: "progress-report",
      heading: "What the Progress Report Shows",
      blocks: [
        {
          kind: "p",
          text: "The progress report in the student's account shows which chapters your child has covered, how they scored in each, an average score across tests, topics learned and days studied in a row. Chapters are listed weakest first, so looking through the report together after a test makes it easier to agree on where the next week of revision should go.",
        },
      ],
    },
    {
      id: "setting-it-up",
      heading: "Setting It Up Together",
      blocks: [
        {
          kind: "p",
          text: "Setup takes about five minutes and there is nothing to install. We suggest doing it with your child the first time:",
        },
        {
          kind: "steps",
          items: [
            "Create the account and choose the country, board and class together.",
            "Open a chapter they find hard and try a couple of questions side by side.",
            "Agree on a simple routine, such as one chapter and one practice paper a few times a week.",
          ],
        },
        {
          kind: "p",
          text: "Only share what is needed for studying. The terms ask users not to enter sensitive, personally identifiable or confidential information into the AI chat unless it is needed for educational purposes.",
        },
        {
          kind: "p",
          text: "Read how StudyMate handles account and study data in the [privacy policy](/privacy) before you start.",
        },
      ],
    },
    {
      id: "how-to-help",
      heading: "How to Help Your Child Study With StudyMate",
      blocks: [
        { kind: "p", text: "A few habits help StudyMate fit into a normal school week:" },
        {
          kind: "list",
          items: [
            "**Start with the chapter they have been avoiding.** If you are not sure which one it is, the progress report ranks chapters weakest first.",
            "**Ask them to explain it back.** After a session, ask your child to tell you the main idea in their own words. If they can't, that chapter goes back on the list.",
            "**Test before the test.** A short practice paper a week before a school test shows what still needs work while there is time to fix it. See how [practice papers and progress reports](/features/practice-tests) work.",
            "**Keep sessions short and regular.** A little most days is easier to keep up than one long session the night before.",
            "**Look at chapters, not just the overall score.** One weak chapter can hide behind a good average.",
          ],
        },
        {
          kind: "p",
          text: "None of this needs you to know the subject. It only needs you to ask the right questions and look at the report together.",
        },
      ],
    },
    {
      id: "parent-faqs",
      heading: "Parent FAQs",
      blocks: [
        {
          kind: "qa",
          items: [
            {
              q: "Will StudyMate just give my child the answers?",
              a: "No. StudyMate works through a topic with your child and then tests them. A wrong answer shapes what comes next, and the progress report shows where understanding is still thin.",
            },
            {
              q: "Can I check that an answer is right?",
              a: "Yes. Answers cite the textbook page they came from, so you or your child can open the book and check. Like any AI, StudyMate can occasionally get something wrong, which is why the page citation matters.",
            },
            {
              q: "How is StudyMate different from a general AI chatbot?",
              a: "A general chatbot draws on the internet and doesn't know the syllabus. StudyMate answers from the chapter your child has open, within the board and class chosen at setup, and cites the page so the answer can be checked.",
            },
            {
              q: "What does it cost to start?",
              a: "New accounts start with 5,000 free credits and no card is required. Setup takes about five minutes. To find out what happens after the free credits run out, email hello@supermia.ai.",
            },
            {
              q: "What data does StudyMate collect?",
              a: "The privacy policy lists contact details (name, email, mobile number), location details (address, city, state, country, zip code), the country, board and class chosen, test scores and study activity, generated question banks, chat histories and custom assignments. It names OpenAI and Anthropic as AI providers and AWS for cloud storage, and says name and contact details are synced to the central SuperMIA account database for sign-in. To ask how long this data is kept or how it is used, email hello@supermia.ai.",
            },
          ],
        },
      ],
    },
  ],
  closing: {
    heading: "Start With One Chapter This Week",
    text: "Pick the chapter your child finds hardest, set up a free account together and see how StudyMate explains it.",
    primary: { label: "Set up a free account", href: APP_URL },
    secondary: { label: "Read all FAQs", href: "/faq" },
  },
};
