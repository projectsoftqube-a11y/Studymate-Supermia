import { APP_URL } from "@/lib/site";
import type { Card, PageContent } from "@/content/types";

/**
 * The three feature pages, written from the package's Feature Page Briefs
 * (02 Features) and the Fact Sheet. Each owns one keyword:
 *
 *   chat-with-your-textbook   "textbook ai"
 *   adaptive-tutoring         "adaptive learning ai"
 *   practice-tests            "practice test generator"
 *
 * Every claim is one the Fact Sheet lists as live on the subdomain. Left out on
 * purpose, because the Fact Sheet marks them unconfirmed: uploading PDFs,
 * flashcards, teacher or school accounts, parent dashboards, downloadable
 * question banks, device support and any named board. No outcome, score or
 * accuracy claims; the 48% to 82% figures on the sample dashboard are sample
 * data and never appear here as results.
 *
 * Section order follows what ranks for these keywords (problem, how it works,
 * the feature in depth, a comparison table, who it is for, FAQs, related
 * features), and each section opens with a sentence that answers its heading
 * on its own, which is the passage answer engines lift.
 *
 * The FAQs are visible only and phrased differently from /faq, which is the one
 * page that carries FAQPage markup.
 */

const START_FREE = { label: "Start free", href: APP_URL } as const;

export const RELATED: Record<"chat" | "adaptive" | "tests" | "exam" | "how", Card> = {
  chat: {
    title: "Chat With Your Textbook",
    text: "Ask any chapter a question and get a plain-language answer with the page cited.",
    icon: "message",
    href: "/features/chat-with-your-textbook",
  },
  adaptive: {
    title: "Adaptive Tutoring",
    text: "Practice that steps up only when the student is ready, across three levels.",
    icon: "gauge",
    href: "/features/adaptive-tutoring",
  },
  tests: {
    title: "Practice Tests and Progress",
    text: "Papers from any chapter, instant evaluation and a weakest-first study list.",
    icon: "list",
    href: "/features/practice-tests",
  },
  exam: {
    title: "Exam Revision",
    text: "Chapter-by-chapter revision for school tests and board exams.",
    icon: "exam",
    href: "/exam-revision",
  },
  how: {
    title: "How It Works",
    text: "From a new account to the first answer in about five minutes.",
    icon: "route",
    href: "/how-it-works",
  },
};

export const SETUP_FACT = { value: "~5 min", label: "To set up, with nothing to install" };

/* ------------------------------------------------------------------------ */

export const CHAT_CONTENT: PageContent = {
  eyebrow: "Feature · Chat with your textbook",
  h1: "Chat With Your Textbook: Answers From the Chapter, With the Page Cited",
  lead: [
    "Chat With Your Textbook is StudyMate AI's textbook AI: a student asks about any chapter of their own syllabus textbook and gets a plain-language answer from that chapter, with the page cited.",
  ],
  primaryCta: START_FREE,
  secondaryCta: { label: "See a sample chat", href: "/#chat" },
  facts: [
    { value: "Preloaded", label: "Syllabus textbooks by country, board and class" },
    { value: "Page cited", label: "On every answer, so it can be checked" },
    { value: "Follow-ups", label: "An example, a simpler version or a quick quiz" },
    SETUP_FACT,
  ],
  sections: [
    {
      id: "why-students-get-stuck",
      heading: "Why Students Get Stuck on a Textbook Chapter",
      eyebrow: "The problem",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Most students get stuck on a chapter not for lack of effort, but because the help on hand doesn't match the book in front of them.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "The class has moved on",
              text: "A chapter that made sense in class can stop making sense at home, late in the evening, when there is no one to ask.",
              icon: "clock",
            },
            {
              title: "Textbook language is dense",
              text: "Chapters are written to be complete, not friendly. One unfamiliar term can stall a whole page.",
              icon: "book",
            },
            {
              title: "Chatbots don't know the syllabus",
              text: "An answer from the open internet can explain an idea differently from the way the class is taught.",
              icon: "search",
            },
            {
              title: "Rereading isn't checking",
              text: "Reading a page again feels like progress, but it doesn't show whether the idea has actually landed.",
              icon: "repeat",
            },
          ],
        },
      ],
    },
    {
      id: "how-it-works",
      heading: "How to Chat With Your Textbook in Three Steps",
      eyebrow: "How it works",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Setup takes about five minutes in one sitting, and the books are waiting on the shelf when it is done.",
        },
        {
          kind: "steps",
          items: [
            "**Choose the syllabus once.** Pick the country, board and class at setup, which takes about a minute. The matching syllabus textbooks appear on the bookshelf.",
            "**Open a chapter and ask.** Type a question about anything in the chapter that isn't clear: a term, a step or how two ideas connect.",
            "**Check the page, then follow up.** The answer comes in plain language with the page cited. Ask for an example, a simpler explanation or a quick quiz until it clicks.",
          ],
        },
      ],
    },
    {
      id: "books-on-the-shelf",
      heading: "Books Already on the Shelf",
      blocks: [
        {
          kind: "p",
          text: "StudyMate starts with the books a student is already expected to know. At setup, the country, board and class are chosen once, and the matching syllabus textbooks appear on the bookshelf. There is nothing to scan or upload, and any chapter can be searched as soon as it is opened.",
        },
        {
          kind: "p",
          text: "That matters most late in the evening, when a student is stuck on a chapter and the class has already moved on. The book is already open in StudyMate, so the first question can be asked straight away.",
        },
      ],
    },
    {
      id: "answers-from-the-chapter",
      heading: "Textbook AI That Answers From the Open Chapter",
      blocks: [
        {
          kind: "p",
          text: "A general chatbot draws on the internet and doesn't know the syllabus. StudyMate answers from the chapter the student has open, within the board and class chosen at setup, so the explanation matches the textbook that class is taught from.",
        },
        {
          kind: "p",
          text: "Answers come in plain language rather than textbook language. A student can ask what a term means, why a step works or how two ideas in the chapter connect, the way they would ask a tutor sitting beside them.",
        },
        {
          kind: "p",
          text: "In the [sample chat on our homepage](/#chat), a Class 8 Mathematics student asks StudyMate to explain the properties of rational numbers. The answer takes closure, commutative, associative and distributive properties one at a time, then cites page 4 of the chapter.",
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
      id: "answers-cite-the-page",
      heading: "Answers Cite the Page",
      blocks: [
        {
          kind: "p",
          text: "Every answer cites the page it came from. A student can turn to that page and read the passage in the book's own words, and a parent can check an answer without knowing the subject.",
        },
        {
          kind: "p",
          text: "The citation also helps a student find their way around the book. When an answer mentions an idea they want to read more about, the page number points straight to it, so the textbook stays the place they learn from.",
        },
      ],
    },
    {
      id: "follow-ups",
      heading: "Follow-Ups Until It Clicks",
      blocks: [
        {
          kind: "p",
          text: "One explanation is not always enough. The chat keeps track of the conversation, so each follow-up builds on the last answer, and it can be focused on the whole book, one chapter or a single topic. After an answer, the student can carry on with a follow-up:",
        },
        {
          kind: "list",
          items: [
            "**Give me an example.** The same idea, shown on a worked case.",
            "**Explain it simpler.** The same idea in fewer, plainer words.",
            "**Quiz me on this.** A quick quiz on the same idea, to check the explanation landed.",
          ],
        },
        {
          kind: "p",
          text: "When the student is ready to check what has stuck, the chapter can become a [practice paper](/features/practice-tests) at the level they choose, and practice then follows [adaptive tutoring](/features/adaptive-tutoring), stepping up or down with each answer.",
        },
      ],
    },
    {
      id: "what-you-can-ask",
      heading: "What Can You Ask a Textbook Chapter?",
      eyebrow: "Examples",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Anything a student would ask a tutor sitting beside them about the chapter that is open. Questions like these work well:",
        },
        {
          kind: "examples",
          items: [
            "What does this term mean, in simpler words?",
            "Why does this step in the worked example work?",
            "How does this idea connect to the one before it?",
            "What are the properties of rational numbers?",
            "What is the difference between metals and non-metals?",
            "Can you give me an everyday example of an acid?",
            "Explain it again, but simpler.",
            "Can you quiz me on this section?",
          ],
        },
      ],
    },
    {
      id: "textbook-ai-vs-chatbot",
      heading: "Textbook AI vs a General AI Chatbot",
      eyebrow: "Comparison",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Both can explain an idea. The difference is where the explanation comes from and whether it can be checked against the book the class uses.",
        },
        {
          kind: "table",
          caption: "How StudyMate's textbook AI compares with a general AI chatbot",
          head: ["", "StudyMate", "General AI chatbot"],
          rows: [
            [
              "Where answers come from",
              "The chapter the student has open",
              "General knowledge from across the internet",
            ],
            [
              "Syllabus",
              "The board and class chosen at setup",
              "Not known unless the student explains it",
            ],
            [
              "Page citation",
              "Every answer cites the page",
              "Not tied to a page in the student's book",
            ],
            [
              "Textbooks",
              "Preloaded on the bookshelf, nothing to upload",
              "The student has to paste or describe the text",
            ],
            [
              "Follow-ups",
              "Give me an example, Explain it simpler, Quiz me on this",
              "Whatever prompt the student thinks to type",
            ],
            [
              "Approach",
              "Explains the reasoning, then checks understanding",
              "Can hand over a finished answer if asked",
            ],
          ],
        },
        {
          kind: "p",
          text: "For a longer look at the difference, read our guide to [an AI tutor vs a chatbot](/blog/ai-tutor-vs-chatbot).",
        },
      ],
    },
    {
      id: "is-it-accurate",
      heading: "Is Textbook AI Accurate?",
      eyebrow: "Checking answers",
      layout: "dark",
      blocks: [
        {
          kind: "p",
          text: "Answers come from the chapter the student has open and cite the page, so any answer can be checked against the textbook. Like any AI, StudyMate can occasionally get something wrong, and its [terms](/terms) say AI-generated content may contain inaccuracies.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Turn to the cited page",
              text: "Every answer names the page it came from, so the passage is one page-turn away.",
              icon: "page",
            },
            {
              title: "Read it in the book's words",
              text: "If the answer and the textbook disagree, the textbook is the one the class is taught from.",
              icon: "book",
            },
            {
              title: "Ask again if it doesn't fit",
              text: "A follow-up such as “Explain it simpler” or a fresh question gets a new explanation.",
              icon: "message",
            },
          ],
        },
      ],
    },
    {
      id: "who-its-for",
      heading: "Who Uses Chat With Your Textbook?",
      eyebrow: "Who it's for",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Anyone working through a school syllabus chapter who needs an explanation that matches the book.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Students stuck on a chapter",
              text: "A plain-language explanation from their own book at the moment they are stuck, without waiting for the next class.",
              icon: "student",
            },
            {
              title: "Parents helping at home",
              text: "Help with a subject you haven't studied in years. The page citation lets you check an answer against the textbook yourself.",
              icon: "parent",
            },
            {
              title: "Students revising for exams",
              text: "Clear up a confusing idea, then test it with a [practice paper](/features/practice-tests) from the same chapter.",
              icon: "exam",
            },
            {
              title: "Older learners",
              text: "Anyone following a school syllabus on their own, at their own pace, with the textbook as the guide.",
              icon: "learner",
            },
          ],
        },
      ],
    },
    {
      id: "homework-helper",
      heading: "An AI Homework Helper That Teaches",
      blocks: [
        {
          kind: "p",
          text: "Homework help can easily slide into homework done for you. StudyMate is built to teach: it walks through the reasoning, then checks understanding with a quick quiz or a practice paper, instead of handing over a finished answer to copy.",
        },
        {
          kind: "p",
          text: "Schools set their own rules on AI, so it is worth checking what your child's school allows. For a parent's guide to fair house rules, read [how to use AI for homework without cheating](/blog/ai-for-homework-without-cheating). When a chapter is hard going, our guide on [how to help with a hard chapter](/blog/help-with-a-hard-chapter) walks through what to do at home.",
        },
      ],
    },
    {
      id: "chat-faqs",
      heading: "Chat FAQs",
      eyebrow: "FAQs",
      layout: "wide",
      blocks: [
        {
          kind: "qa",
          items: [
            {
              q: "Which textbooks can my child chat with?",
              a: "The ones on their bookshelf. The board and class chosen at setup decide which syllabus textbooks appear, and every chapter in them can be opened and asked about. Signing up is free and needs no card, so the quickest check is to choose your country, board and class and see what appears.",
            },
            {
              q: "Do we have to upload the textbook?",
              a: "No. Books are preloaded by country, board and class. Choose them once at setup and the matching syllabus textbooks appear on the bookshelf, ready to open.",
            },
            {
              q: "What if the explanation still doesn't make sense?",
              a: "Ask again. The student can ask for an example, a simpler explanation or a quick quiz on the same idea, and keep going until the concept makes sense. The cited page is there too, so the passage can be read in the book itself.",
            },
            {
              q: "Why not just ask a general AI chatbot?",
              a: "A general chatbot answers from the internet and doesn't know which syllabus a student follows, so its explanation may not match how the class is taught. StudyMate answers from the open chapter of the student's own textbook and cites the page.",
            },
            {
              q: "Does it do the homework for them?",
              a: "No. StudyMate explains the reasoning and then checks understanding rather than handing over finished answers. Schools set their own rules on AI, so it is worth checking what your child's school allows for homework.",
            },
            {
              q: "Is there an app to install?",
              a: "No. StudyMate is a web app, so there is nothing to download or install. Setup takes about five minutes in one sitting: about 30 seconds for the account and about a minute to choose the syllabus.",
            },
            {
              q: "Are chat histories saved?",
              a: "Chat histories are part of the study data kept with the account. The [privacy policy](/privacy) explains what is collected and how it is used.",
            },
            {
              q: "What does it cost to try?",
              a: "New accounts start with 5,000 free credits, with no card required. To find out what happens after the free credits run out, email [hello@supermia.ai](mailto:hello@supermia.ai).",
            },
          ],
        },
      ],
    },
    {
      id: "more-features",
      heading: "Explore More StudyMate Features",
      eyebrow: "Keep going",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Chat is where understanding starts. Practice and progress show whether it stuck.",
        },
        {
          kind: "cards",
          items: [RELATED.adaptive, RELATED.tests, RELATED.exam, RELATED.how],
        },
      ],
    },
  ],
  closing: {
    heading: "Ask the Chapter Your Child Is Stuck On",
    text: "Set up a free account, open the chapter that is giving them trouble and ask it something. Setup takes about five minutes and there is nothing to install.",
    primary: START_FREE,
    secondary: { label: "Read the FAQ", href: "/faq" },
  },
};

/* ------------------------------------------------------------------------ */

export const ADAPTIVE_CONTENT: PageContent = {
  eyebrow: "Feature · Adaptive tutoring",
  h1: "Adaptive AI Tutoring That Moves at Your Child's Pace",
  h1Accent: "at Your Child's Pace",
  lead: [
    "Adaptive tutoring in StudyMate AI is adaptive learning AI that sets the pace and difficulty of practice by what a student already knows, stepping up through three levels only after correct answers.",
  ],
  primaryCta: START_FREE,
  secondaryCta: { label: "Try the sample test", href: "/#adaptive" },
  facts: [
    { value: "3 levels", label: "Know it, use it, reason with it" },
    { value: "Every answer", label: "Moves the next question up or down" },
    { value: "Explained", label: "Each wrong answer, before the next question" },
    SETUP_FACT,
  ],
  sections: [
    {
      id: "why-one-speed-fails",
      heading: "Why One-Speed Practice Doesn't Work",
      eyebrow: "The problem",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "A class moves at one speed, and so does a printed worksheet. Students rarely do.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Bored by the basics",
              text: "A student who already knows a concept spends practice time proving it again instead of moving on.",
              icon: "repeat",
            },
            {
              title: "Lost in the hard parts",
              text: "A student still unsure of the basics meets questions that assume they aren't, and stalls.",
              icon: "target",
            },
            {
              title: "Mistakes that go nowhere",
              text: "A wrong answer marked with a cross and left there doesn't change what the student practices next.",
              icon: "check",
            },
          ],
        },
      ],
    },
    {
      id: "how-it-works",
      heading: "How Adaptive Tutoring Works, Answer by Answer",
      eyebrow: "How it works",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Every answer is information. StudyMate uses each one to decide what the student sees next.",
        },
        {
          kind: "steps",
          items: [
            "**Start from what they know.** Practice begins from what the student has already shown they know, and basics they have cleared are skipped.",
            "**Step up after a correct answer.** A correct answer moves the next question up a level, from knowing a concept to using it to reasoning with it.",
            "**Step down after a wrong one.** A wrong answer brings a short explanation and an easier question, so the same idea gets another go from firmer ground.",
          ],
        },
      ],
    },
    {
      id: "three-levels",
      heading: "Three Levels: Know, Use, Reason",
      blocks: [
        {
          kind: "p",
          text: "Every topic is practiced at three levels, and each one asks more of the student than the last: Basic checks whether they know the concept, Medium whether they can use it and Advanced whether they can reason with it.",
        },
        {
          kind: "p",
          text: "Working through the levels in order means a student isn't asked to reason about an idea before they can recall it, and isn't held at recall once they can do more.",
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
      id: "levels-table",
      heading: "What Each Level Asks",
      eyebrow: "The three levels",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "One Class 8 Mathematics topic, rational numbers, run through all three levels in the [sample test on our homepage](/#adaptive):",
        },
        {
          kind: "table",
          caption: "StudyMate's three practice levels, with sample questions",
          head: ["Level", "What it checks", "Sample question"],
          rows: [
            [
              "Basic",
              "Whether the student knows the concept",
              "Which of these is a rational number?",
            ],
            ["Medium", "Whether they can use it", "Simplify: 2/3 + 5/6"],
            [
              "Advanced",
              "Whether they can reason with it",
              "Closure under division fails for rational numbers because of which case?",
            ],
          ],
        },
      ],
    },
    {
      id: "harder-when-ready",
      heading: "Harder Only When They're Ready",
      blocks: [
        {
          kind: "p",
          text: "Class moves at one speed, so some students are bored by the basics while others are still lost. StudyMate works the other way round. It starts from what the student has already shown they know and skips the basics they have cleared, so practice time goes to what they haven't mastered yet.",
        },
        {
          kind: "p",
          text: "A correct answer moves the next question up a level. Difficulty rises only after the student has shown they can handle the level below, which is what makes StudyMate behave like a personalized AI tutor rather than a fixed worksheet.",
        },
      ],
    },
    {
      id: "wrong-answers",
      heading: "A Wrong Answer Shapes What Comes Next",
      blocks: [
        {
          kind: "p",
          text: "A wrong answer brings a short explanation and steps the difficulty back down. The mistake changes the next question instead of being corrected and forgotten, so the student gets another go at the same idea from an easier starting point.",
        },
        {
          kind: "p",
          text: "Explanations stay inside the student's own textbook, the same way [chat answers come from the open chapter](/features/chat-with-your-textbook). StudyMate explains rather than hands over answers, and the [progress report](/features/practice-tests) shows which chapters still have gaps.",
        },
      ],
    },
    {
      id: "adaptive-vs-worksheet",
      heading: "Adaptive Practice vs a Fixed Worksheet",
      eyebrow: "Comparison",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Both give a student questions to answer. Only one changes the next question based on the last answer.",
        },
        {
          kind: "table",
          caption: "How StudyMate's adaptive tutoring compares with a fixed worksheet",
          head: ["", "StudyMate adaptive tutoring", "Fixed worksheet"],
          rows: [
            [
              "Difficulty",
              "Moves up or down after every answer",
              "Set in advance, the same for everyone",
            ],
            ["Basics already known", "Skipped", "Practiced again"],
            [
              "After a wrong answer",
              "A short explanation, then an easier question",
              "A mark, often after the class has moved on",
            ],
            [
              "Where questions come from",
              "The chapter being studied, within the board and class chosen at setup",
              "Whatever the worksheet happens to cover",
            ],
            [
              "What it shows afterwards",
              "Which chapters still have gaps, in the progress report",
              "A total score",
            ],
          ],
        },
      ],
    },
    {
      id: "choosing",
      heading: "What to Look for in Adaptive Learning Tools",
      blocks: [
        {
          kind: "p",
          text: "When comparing adaptive learning tools, four questions separate practice that adapts from practice that only claims to:",
        },
        {
          kind: "list",
          items: [
            "**Where do the questions come from?** Practice should follow the syllabus the student is taught from, not a generic question pool.",
            "**What happens after a mistake?** Look for an explanation before the next question, not just a mark.",
            "**Does difficulty move both ways?** A tool that only gets harder leaves a struggling student behind.",
            "**Can you see where the gaps are?** Progress by chapter shows what still needs work, which a single average can hide.",
          ],
        },
        {
          kind: "p",
          text: "In StudyMate, practice stays inside the chapter the student is studying, within the board and class chosen at setup, and a wrong answer always comes with an explanation before the next question.",
        },
      ],
    },
    {
      id: "built-to-teach",
      heading: "Built to Teach, Not Just to Test",
      eyebrow: "The approach",
      layout: "dark",
      blocks: [
        {
          kind: "p",
          text: "Adaptive practice only helps if the student learns from it, so every step is built around explaining first.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Explains first",
              text: "A wrong answer brings a short explanation of the reasoning before the next question.",
              icon: "lightbulb",
            },
            {
              title: "Stays in the book",
              text: "Practice and explanations come from the student's own textbook, within their board and class.",
              icon: "book",
            },
            {
              title: "Shows the gaps",
              text: "The progress report shows which chapters still need work, weakest first.",
              icon: "chart",
            },
          ],
        },
      ],
    },
    {
      id: "who-its-for",
      heading: "Who Is Adaptive Tutoring For?",
      eyebrow: "Who it's for",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Any student whose practice should match where they are, not where the class is.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Students ahead of the class",
              text: "Basics they have cleared are skipped, so practice moves on to the harder levels sooner.",
              icon: "gauge",
            },
            {
              title: "Students who need more time",
              text: "Difficulty steps down after a wrong answer, with an explanation, until the idea is solid.",
              icon: "layers",
            },
            {
              title: "Students revising for exams",
              text: "Practice works from the chapters they are revising, at the level they are ready for. See [AI revision for school exams](/exam-revision).",
              icon: "exam",
            },
            {
              title: "Parents following along",
              text: "The chapter-by-chapter report is something you can look through together to see where practice is going.",
              icon: "parent",
            },
          ],
        },
      ],
    },
    {
      id: "adaptive-faqs",
      heading: "Adaptive Tutoring FAQs",
      eyebrow: "FAQs",
      layout: "wide",
      blocks: [
        {
          kind: "qa",
          items: [
            {
              q: "Will the questions be too easy or too hard?",
              a: "They adjust with every answer. A correct answer moves the next question up a level, and a wrong one brings an explanation and an easier question. Basics the student has already cleared are skipped.",
            },
            {
              q: "What do Basic, Medium and Advanced mean?",
              a: "Basic checks whether the student knows a concept, Medium whether they can use it and Advanced whether they can reason with it.",
            },
            {
              q: "Does it just give my child the answer after a mistake?",
              a: "No. A wrong answer brings a short explanation of the reasoning and then an easier question on the same idea, so the student works it out rather than copying a result.",
            },
            {
              q: "Which subjects can my child practice?",
              a: "Practice works from the chapters on the student's bookshelf, which depend on the board and class chosen at setup. The sample test on our homepage includes Mathematics and Science topics.",
            },
            {
              q: "Can we try it before signing up?",
              a: "Yes. The [sample test on our homepage](/#adaptive) runs a short set of questions at rising difficulty, with no account needed.",
            },
            {
              q: "Is there anything to install?",
              a: "No. StudyMate is a web app. Setup takes about five minutes in one sitting, and practice can start straight after.",
            },
            {
              q: "What does it cost to try?",
              a: "New accounts start with 5,000 free credits and no card is required. Setup takes about five minutes and there is nothing to install.",
            },
          ],
        },
      ],
    },
    {
      id: "more-features",
      heading: "Explore More StudyMate Features",
      eyebrow: "Keep going",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Adaptive practice works best alongside an explanation from the book and a clear picture of progress.",
        },
        {
          kind: "cards",
          items: [RELATED.chat, RELATED.tests, RELATED.exam, RELATED.how],
        },
      ],
    },
  ],
  closing: {
    heading: "See It Adapt in Two Minutes",
    text: "Try the sample test on our homepage, then set up a free account to practice from your child's own textbooks.",
    primary: START_FREE,
    secondary: { label: "Try the sample test", href: "/#adaptive" },
  },
};

/* ------------------------------------------------------------------------ */

export const TESTS_CONTENT: PageContent = {
  eyebrow: "Feature · Practice tests and progress",
  h1: "Practice Test Generator With Instant Evaluation and Chapter Progress",
  h1Accent: "and Chapter Progress",
  lead: [
    "StudyMate AI's practice test generator turns any chapter of a student's own textbook into a practice paper at the level they choose, evaluated instantly, with chapters then ranked weakest first.",
  ],
  primaryCta: START_FREE,
  secondaryCta: { label: "See the sample dashboard", href: "/#analytics" },
  facts: [
    { value: "Any chapter", label: "Turned into a practice paper on demand" },
    { value: "Instant", label: "Detailed evaluation, not just a score" },
    { value: "Weakest first", label: "Chapters ranked by results after each test" },
    SETUP_FACT,
  ],
  sections: [
    {
      id: "why-rereading-isnt-enough",
      heading: "Why Rereading Isn't Enough Before a Test",
      eyebrow: "The problem",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Rereading a chapter feels like studying. It just doesn't show what a student can recall when the questions come.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "It feels familiar",
              text: "Seeing the same page again makes it feel known, even when the student couldn't explain it from memory.",
              icon: "book",
            },
            {
              title: "Marks come back late",
              text: "Homework and class tests are often marked after the class has moved on to the next chapter.",
              icon: "clock",
            },
            {
              title: "One average hides a weak chapter",
              text: "A good overall score can sit on top of a chapter that still needs real work.",
              icon: "chart",
            },
          ],
        },
        {
          kind: "p",
          text: "Our guide to [active recall](/blog/active-recall) explains why testing yourself works better than rereading.",
        },
      ],
    },
    {
      id: "how-it-works",
      heading: "How the Practice Test Generator Works",
      eyebrow: "How it works",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Three steps turn tonight's chapter into a marked paper and a clear next step.",
        },
        {
          kind: "steps",
          items: [
            "**Pick a chapter and a level.** Choose any chapter on the bookshelf and the difficulty for the paper.",
            "**Attempt it online.** The paper is built from that chapter and attempted in StudyMate, with nothing to print or upload.",
            "**Get an instant evaluation.** See what went wrong as well as the score, then check the progress report for what to study next.",
          ],
        },
      ],
    },
    {
      id: "papers-from-any-chapter",
      heading: "Practice Papers From Any Chapter",
      blocks: [
        {
          kind: "p",
          text: "Rereading a chapter feels productive, but it rarely shows what a student can actually recall. Testing does. In StudyMate, the student picks a chapter and a difficulty and gets a practice paper built from that chapter, so practice stays inside what they are studying.",
        },
        {
          kind: "p",
          text: "Because the papers come from the textbooks on their bookshelf, these chapter-wise practice papers follow the board and class chosen at setup. Questions can be multiple choice, short answer or true or false, and there is nothing to write, print or upload first.",
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
      id: "instant-evaluation",
      heading: "Instant, Detailed Evaluation",
      blocks: [
        {
          kind: "p",
          text: "Papers are attempted online and evaluated as soon as they are submitted. The evaluation is detailed, not just a score, so the student sees what went wrong as well as how many they got right.",
        },
        {
          kind: "p",
          text: "Fast feedback matters because marked work often comes back after the class has moved on. With an AI test generator that evaluates on the spot, a mistake can be looked at while the chapter is still fresh, and the student can [ask the chapter](/features/chat-with-your-textbook) to explain it, with the page cited.",
        },
      ],
    },
    {
      id: "progress-by-chapter",
      heading: "Progress by Chapter",
      blocks: [
        {
          kind: "p",
          text: "After each test, the progress report shows which chapters have been covered and how the student performed in each.",
        },
        {
          kind: "p",
          text: "One weak chapter can hide behind a good overall average, which is why the report breaks results down by chapter. The [dashboard on our homepage](/#analytics) shows the layout with labelled sample data, not a real student's results.",
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
      id: "progress-report",
      heading: "What the Progress Report Shows",
      eyebrow: "Progress report",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Every result feeds one report, so a student and a parent can see the same picture.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Chapters covered",
              text: "Which chapters have been tested so far, and which haven't been touched yet.",
              icon: "books",
            },
            {
              title: "Results by chapter",
              text: "How the student performed in each chapter, rather than one number for everything.",
              icon: "chart",
            },
            {
              title: "Average, topics and streak",
              text: "Average score across all tests, topics learned so far and days in a row of study.",
              icon: "gauge",
            },
            {
              title: "What to study next",
              text: "Chapters ranked from weakest to strongest, with the weakest at the top of the list.",
              icon: "target",
            },
          ],
        },
      ],
    },
    {
      id: "what-to-study-next",
      heading: "What to Study Next",
      blocks: [
        {
          kind: "p",
          text: "Chapters are ranked from weakest to strongest based on the student's results, and the weakest appears first. Starting there puts revision time where scores are lowest, instead of on the chapters that already feel comfortable.",
        },
        {
          kind: "p",
          text: "The list updates after every test, so it always reflects the latest results. For more on reading a report like this, see our guide to [tracking your child's progress](/blog/track-your-childs-progress).",
        },
      ],
    },
    {
      id: "practice-vs-rereading",
      heading: "Practice Papers vs Rereading and Printed Sheets",
      eyebrow: "Comparison",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Each has its place. Only one gives an instant, chapter-by-chapter answer to what to study next.",
        },
        {
          kind: "table",
          caption:
            "How StudyMate practice papers compare with rereading and printed practice sheets",
          head: ["", "StudyMate practice paper", "Rereading the chapter", "Printed practice sheet"],
          rows: [
            [
              "Shows what can be recalled",
              "Yes, by answering questions",
              "No, the page is in front of the student",
              "Yes, by answering questions",
            ],
            ["Feedback", "Instant, detailed evaluation", "None", "When someone marks it"],
            ["Difficulty", "Chosen by the student", "Not applicable", "Fixed in advance"],
            [
              "Chapter",
              "Any chapter on the bookshelf, on demand",
              "Whichever is open",
              "Whatever the sheet covers",
            ],
            [
              "What to do next",
              "Weakest chapter first, in the progress report",
              "Not shown",
              "Not shown",
            ],
          ],
        },
      ],
    },
    {
      id: "revision-loop",
      heading: "From Practice Paper to Revision Plan",
      eyebrow: "Before an exam",
      layout: "dark",
      blocks: [
        {
          kind: "p",
          text: "Before a big exam, this works as an AI revision generator: a paper on the weakest chapter, an instant evaluation, then the next chapter on the list. Revising for school or board exams? See [AI revision for school exams](/exam-revision).",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Test the weakest chapter",
              text: "Start with the chapter at the top of the what-to-study-next list.",
              icon: "target",
            },
            {
              title: "Fix what went wrong",
              text: "Read the evaluation, then [ask the chapter](/features/chat-with-your-textbook) to explain any mistake, with the page cited.",
              icon: "lightbulb",
            },
            {
              title: "Move down the list",
              text: "The report updates after each test, so the next chapter to revise is always at the top.",
              icon: "list",
            },
          ],
        },
        {
          kind: "p",
          text: "Our guide to [practice papers before exams](/blog/practice-papers-before-exams) covers how many to do and when.",
        },
      ],
    },
    {
      id: "who-its-for",
      heading: "Who Uses the Practice Test Generator?",
      eyebrow: "Who it's for",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Anyone who wants to know what has stuck from a chapter, not just what has been read.",
        },
        {
          kind: "cards",
          items: [
            {
              title: "Students who reread",
              text: "A quick paper turns a chapter they have read into a check of what they can recall.",
              icon: "repeat",
            },
            {
              title: "Students facing exams",
              text: "Chapter-wise practice papers for school tests and board exams, weakest chapter first.",
              icon: "exam",
            },
            {
              title: "Parents who want clarity",
              text: "A chapter-by-chapter report to look through together, instead of a single overall grade.",
              icon: "parent",
            },
            {
              title: "Older learners",
              text: "Anyone working through a school syllabus who wants to test themselves chapter by chapter.",
              icon: "learner",
            },
          ],
        },
      ],
    },
    {
      id: "practice-test-faqs",
      heading: "Practice Test FAQs",
      eyebrow: "FAQs",
      layout: "wide",
      blocks: [
        {
          kind: "qa",
          items: [
            {
              q: "Can the student choose how hard the paper is?",
              a: "Yes. The student chooses the difficulty when generating a paper from a chapter. Day-to-day practice also adjusts on its own: correct answers step the difficulty up and wrong answers step it down.",
            },
            {
              q: "Are the papers from my child's own syllabus?",
              a: "Yes. Papers are built from the chapters on the student's bookshelf, which follow the board and class chosen at setup.",
            },
            {
              q: "Is the evaluation just a score?",
              a: "No. Evaluation is instant and detailed, showing what went wrong as well as the score, and each result feeds the chapter-by-chapter progress report.",
            },
            {
              q: "Do we have to print anything?",
              a: "No. Papers are attempted online in StudyMate and evaluated as soon as they are submitted.",
            },
            {
              q: "Which chapter does the report put first?",
              a: "The chapter with the weakest results. After each test, chapters are ranked from weakest to strongest, so the list always starts where scores are lowest.",
            },
            {
              q: "Is the homepage dashboard real data?",
              a: "No. The dashboard on our homepage uses labelled sample data to show the layout of the progress report. It is not a real student's results.",
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
      heading: "Explore More StudyMate Features",
      eyebrow: "Keep going",
      layout: "wide",
      blocks: [
        {
          kind: "p",
          text: "Practice papers show the gaps. These features help close them.",
        },
        {
          kind: "cards",
          items: [RELATED.chat, RELATED.adaptive, RELATED.exam, RELATED.how],
        },
      ],
    },
  ],
  closing: {
    heading: "Turn Tonight's Chapter Into a Practice Paper",
    text: "Set up a free account in about five minutes, generate a paper from the chapter your child is studying and see the evaluation straight away.",
    primary: START_FREE,
    secondary: { label: "Read the FAQ", href: "/faq" },
  },
};
