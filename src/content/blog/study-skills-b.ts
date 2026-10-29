import { APP_URL } from "@/lib/site";
import type { BlogPost } from "@/content/blog/types";

/**
 * Study-skills posts, part B: "how to make notes from a textbook" and "free ai
 * study tools". Product claims come only from Fact Sheet Part A (preloaded
 * syllabus textbooks, answers from the open chapter with the page cited,
 * follow-ups such as "Quiz me on this", practice papers with instant
 * evaluation, 5,000 free credits with no card). No flashcards, uploads, parent
 * dashboards or named boards are claimed for StudyMate, and no outcome claims
 * are made. Every research claim names the primary paper and was checked
 * against its Crossref record (title, authors, year) and abstract; the free
 * tools post covers tool types only and sends readers to SuperMIA's own
 * comparison for named AI tutors.
 */
export const STUDY_SKILLS_B: BlogPost[] = [
  {
    slug: "how-to-make-notes-from-a-textbook",
    category: "study-skills",
    title: "How to Make Notes From a Textbook Chapter",
    description:
      "A practical way to make notes from a textbook chapter that help you revise: read first, write questions, keep notes short and test from them.",
    h1: "How to Make Notes From a Textbook Chapter That Help You Revise",
    label: "How to Make Notes From a Textbook",
    excerpt:
      "Read first, turn each section into questions, keep answers short and revise by testing yourself instead of rereading.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "To make notes from a textbook chapter that help you revise, read each section once before writing anything, then turn it into questions with short answers in your own words. Keep notes brief, write the page number beside each point, and revise by covering the answers and testing yourself instead of rereading.",
    takeaways: [
      "Reading a section once before writing stops notes from turning into a copy of the textbook.",
      "Notes written as questions and answers can be used for self-testing, which is the part of revision that does the most work.",
      "Dunlosky and colleagues (2013) rated highlighting and summarization as low-utility study techniques and practice testing as high utility.",
      "Writing the textbook page number beside each note makes it quick to check a point against the book later.",
      "The best note method depends on the material: outlines suit structured chapters, while mind maps suit processes and cycles.",
    ],
    sections: [
      {
        id: "why-notes-fail",
        heading: "Why do textbook notes often fail to help with revision?",
        blocks: [
          {
            kind: "p",
            text: "Most textbook notes fail because they copy the book instead of processing it. A student reads a paragraph, writes it out in slightly shorter form and moves on. That feels productive but asks for very little thinking, and the result is a second, smaller textbook that is just as hard to revise from.",
          },
          {
            kind: "p",
            text: "Research backs up the worry. In a review of ten common study techniques, Dunlosky et al. (2013) rated highlighting and summarization as low utility, because their benefits were limited or inconsistent across students and tasks. They rated practice testing as high utility. Good notes are built so they can be used for practice testing later.",
          },
        ],
      },
      {
        id: "step-by-step",
        heading: "How do you make notes from a textbook chapter, step by step?",
        blocks: [
          {
            kind: "p",
            text: "Read first, write questions second and keep each answer short. The steps below work for most school subjects and fit into one sitting per chapter.",
          },
          {
            kind: "steps",
            items: [
              "**Skim the chapter.** Read the headings, the summary and the end-of-chapter questions so you know what the chapter is trying to teach.",
              "**Read one section without a pen.** Read the whole section once, all the way through, before writing anything.",
              "**Close the book and write what you remember.** A few lines in your own words show which parts went in and which did not.",
              '**Turn the section into questions.** Write two to four questions the section answers, such as "What happens when a metal reacts with an acid?"',
              "**Write short answers with the page number.** Use your own words, a few lines at most, and note the page so the answer can be checked.",
              "**Mark what is still unclear.** Put a star beside anything that still does not make sense and ask a teacher or classmate about it.",
            ],
          },
          {
            kind: "p",
            text: "Step three is the one most students skip, and it is the most useful. Trying to recall a section with the book closed shows straight away which ideas need another look. Our guide to [active recall](/blog/active-recall) explains why that works.",
          },
        ],
      },
      {
        id: "note-methods",
        heading: "Which note taking methods for students work best?",
        blocks: [
          {
            kind: "p",
            text: "No single method suits every chapter, so match the method to the material. The table compares four common note taking methods for students by what each is good for and where each tends to go wrong.",
          },
          {
            kind: "table",
            caption: "Four note methods compared",
            head: ["Method", "How it works", "Good for", "Watch out for"],
            rows: [
              [
                "Question-and-answer notes",
                "Questions down one side, short answers beside them",
                "Self-testing on facts, definitions and explanations",
                "Questions that only ask for copied sentences",
              ],
              [
                "Cornell-style notes",
                "A main notes column, a narrow cue column and a summary line at the bottom",
                "Lessons and chapters with a lot of detail",
                "Leaving the cue column empty, which removes the testing part",
              ],
              [
                "Outline",
                "Headings and indented points that follow the chapter",
                "Chapters with a clear structure, such as history or biology",
                "Copying the textbook's wording point by point",
              ],
              [
                "Mind map",
                "A central idea with branches for linked ideas",
                "Processes, cycles and how topics connect",
                "Maps that take longer to draw than to learn from",
              ],
            ],
          },
          {
            kind: "p",
            text: "Question-and-answer notes and Cornell-style notes share one feature: they leave room for a question that can be answered with the answer hidden. That is what makes them useful at revision time.",
          },
        ],
      },
      {
        id: "mind-maps",
        heading: "Are mind maps good for revision notes?",
        blocks: [
          {
            kind: "p",
            text: "Mind maps can help, but they seem to work best when redrawn from memory rather than copied from the book. Karpicke and Blunt (2011) compared students who built concept maps while studying a science text with students who practiced retrieving what they had read. The retrieval group learned more, even when the final test asked them to make a concept map.",
          },
          {
            kind: "p",
            text: "That does not make mind maps useless. It suggests the learning comes from recalling the ideas, not from drawing the map. A simple fix is to draw the map once from the book, then a few days later redraw it on a blank page and compare the two.",
          },
        ],
      },
      {
        id: "short-revision-notes",
        heading: "How do you make revision notes short enough to use?",
        blocks: [
          {
            kind: "p",
            text: "Aim for notes that can be reviewed in a few minutes per section, not a rewritten chapter. If a page of notes is as long as the textbook page it came from, it needs cutting.",
          },
          {
            kind: "list",
            items: [
              "**One idea per line.** A line that holds two ideas usually hides one of them at revision time.",
              "**Your own words.** Rephrasing a definition shows whether it has been understood. Keep exact wording only where it matters, such as a formula or a law.",
              "**Page numbers.** A page reference beside each answer makes it quick to check a point against the book.",
              "**Worked examples, not just rules.** In maths and science, one short worked example often shows more than a paragraph about the rule.",
            ],
          },
          {
            kind: "p",
            text: "The test for how to make revision notes that last is simple: can each note be turned into a question that can be answered without looking?",
          },
        ],
      },
      {
        id: "revise-from-notes",
        heading: "How should you revise from your notes?",
        blocks: [
          {
            kind: "p",
            text: "Revise from notes by testing yourself, not by rereading them. Cover the answers, read each question, say or write the answer and then check. Anything missed goes on a short list for the next session.",
          },
          {
            kind: "p",
            text: "Spread these sessions over several days rather than doing them all in one night. Dunlosky et al. (2013) rated distributed practice, spreading study across separate sessions, as high utility alongside practice testing. Our guide to [how to study a textbook chapter](/blog/how-to-study-a-textbook-chapter) shows how reading, notes and review fit together, and more guides are in our [study skills section](/blog).",
          },
        ],
      },
      {
        id: "studymate",
        heading: "Where does StudyMate fit when making notes?",
        blocks: [
          {
            kind: "p",
            text: 'StudyMate AI, our product, helps with the part of note making where students get stuck. When a section does not make sense, a student can [ask the open chapter a question](/features/chat-with-your-textbook) and get a plain-language answer drawn from that chapter of their own textbook, with the page cited. A follow-up such as "Quiz me on this" gives quick questions on the same idea, a ready check on whether the notes cover it. The notes themselves stay the student\'s own work.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Should I write notes before or after reading the chapter?",
        a: "After. Read each section once without writing, then make notes from what you understood. Writing during a first read tends to produce copied sentences rather than your own explanation.",
      },
      {
        q: "Is it better to type or handwrite notes?",
        a: "Either can work. What matters more is whether the notes are in your own words and written as questions you can test yourself on. Some students find handwriting slows them down enough to rephrase rather than copy, so use whichever you will actually revise from.",
      },
      {
        q: "How long should notes for one chapter be?",
        a: "Short enough to review in one sitting. A few questions and short answers per section is usually enough for revision. If notes run as long as the chapter, cut them back to the ideas a test would ask about.",
      },
      {
        q: "Is highlighting the textbook a good way to make notes?",
        a: "On its own, not really. Dunlosky et al. (2013) rated highlighting as a low-utility technique because it did not consistently help students perform better. Highlighting can mark where to look later, but the notes and the self-testing are where the learning happens.",
      },
    ],
    sources: [
      {
        title:
          "Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology",
        publisher: "Dunlosky, Rawson, Marsh, Nathan & Willingham",
        year: "2013",
        url: "https://doi.org/10.1177/1529100612453266",
      },
      {
        title:
          "Retrieval Practice Produces More Learning than Elaborative Studying with Concept Mapping",
        publisher: "Karpicke & Blunt",
        year: "2011",
        url: "https://doi.org/10.1126/science.1199327",
      },
    ],
    related: ["how-to-study-a-textbook-chapter", "active-recall", "study-methods-compared"],
    cta: {
      heading: "Help With the Section That Won't Make Sense",
      text: "If a chapter is holding up your child's notes, StudyMate answers questions from that chapter of their own textbook and cites the page. New accounts start with 5,000 free credits, no card required.",
      link: { label: "Start free", href: APP_URL },
    },
  },
  {
    slug: "free-ai-study-tools",
    category: "study-skills",
    title: "Free AI Study Tools for Students: What Each Is Good For",
    description:
      "A guide to free AI study tools for school students: tutors, quiz and flashcard makers, note summarizers and what to check before your child uses one.",
    h1: "Free AI Study Tools for School Students: What Each Type Is Good For",
    label: "Free AI Study Tools",
    excerpt:
      "What AI tutors, quiz makers, note summarizers and general chatbots are each good for, and what a parent should check first.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "Free AI study tools for school students fall into four main types: AI tutors that explain topics, quiz and flashcard makers, note summarizers and general chatbots. Each type helps with a different part of studying. Before a child uses one, check where its answers come from, whether it explains or hands over answers, and what its privacy policy says.",
    takeaways: [
      "Free AI tools for students fall into four broad types: tutors, quiz and flashcard makers, note summarizers and general chatbots.",
      "A tool that explains and then tests supports learning better than a tool that hands over finished answers.",
      "Answers drawn from the student's own textbook are easier to check than answers drawn from the open internet.",
      "A free AI tool often means a free tier or a set of credits, so it is worth checking what happens when they run out.",
      "Schools set their own rules on AI use, so a family should check the school's policy before relying on any tool for homework.",
    ],
    sections: [
      {
        id: "types",
        heading: "What types of free AI study tools are there?",
        blocks: [
          {
            kind: "p",
            text: "Most free AI study tools fit one of four types, and each is built for a different job. Knowing the type tells a parent more than the brand name does.",
          },
          {
            kind: "terms",
            items: [
              {
                term: "AI tutors",
                text: "Explain a topic step by step and respond to follow-up questions, much as a human tutor might. Some work from a specific syllabus or textbook; others draw on general knowledge.",
              },
              {
                term: "Quiz and flashcard makers",
                text: "Turn notes, a topic or a chapter into questions for self-testing.",
              },
              {
                term: "Note summarizers",
                text: "Shorten a long text, video or set of notes into key points.",
              },
              {
                term: "General chatbots",
                text: "Answer almost any question in conversation, drawing on broad training data rather than a particular syllabus.",
              },
            ],
          },
          {
            kind: "p",
            text: "This guide covers tool types, not named products. SuperMIA, the company behind StudyMate, publishes a [comparison of named AI tutors](https://supermia.ai/blog/best-ai-tutors/) for readers who want one. More guides on studying well are in our [study skills section](/blog).",
          },
        ],
      },
      {
        id: "what-each-is-good-for",
        heading: "What is each type of AI tool good for?",
        blocks: [
          {
            kind: "p",
            text: "Each type is good at one job and weak at another. The table sets out what to expect from each and what to ask before a student starts using it.",
          },
          {
            kind: "table",
            caption: "Free AI study tools by type",
            head: ["Tool type", "Good for", "Watch out for", "Questions to ask"],
            rows: [
              [
                "AI tutor",
                "Explaining a hard topic, step by step",
                "Explanations that don't match how the class is taught",
                "Does it work from my child's syllabus? Does it explain or just answer?",
              ],
              [
                "Quiz or flashcard maker",
                "Self-testing on facts and definitions",
                "Wrong answer keys, or only easy recall questions",
                "Can the answers be checked against the textbook?",
              ],
              [
                "Note summarizer",
                "A quick overview of a long text",
                "Summaries that drop key steps or add errors",
                "Will my child still read and work through the chapter?",
              ],
              [
                "General chatbot",
                "Brainstorming and quick general questions",
                "Confident answers that are wrong or off-syllabus; finished homework on request",
                "Where do its answers come from? What are the school's rules?",
              ],
            ],
          },
          {
            kind: "p",
            text: "Summarizers deserve extra caution for revision. Dunlosky et al. (2013) rated summarization as a low-utility study technique even when students write the summary themselves, so a summary written by a machine is better treated as a map of the chapter than as revision.",
          },
        ],
      },
      {
        id: "explain-or-answer",
        heading: "Does the tool explain, or does it hand over answers?",
        blocks: [
          {
            kind: "p",
            text: "Whether a tool explains or hands over answers is the most useful thing to find out about any free AI tool for students. A tool that produces a finished answer saves time tonight but skips the thinking the homework was set for. A tool that explains, asks the student to try and then checks the result keeps the student doing the work.",
          },
          {
            kind: "p",
            text: "Research on study techniques points the same way. In the same review, Dunlosky et al. (2013) gave practice testing a high utility rating, one of only two techniques of the ten to get one, so tools that quiz a student after explaining work with that finding. Our guide to [using AI for homework without cheating](/blog/ai-for-homework-without-cheating) covers where the line sits.",
          },
        ],
      },
      {
        id: "where-answers-come-from",
        heading: "Where do the tool's answers come from?",
        blocks: [
          {
            kind: "p",
            text: "Answers drawn from the student's own textbook are easier to check than answers drawn from the open internet. A general chatbot does not know which syllabus a student follows, so its explanation can use different methods, terms or depth than the class does, which can confuse more than it helps the night before a test.",
          },
          {
            kind: "p",
            text: "Any AI tool can be wrong, including a good one. Tools that show a source, such as a page number or a link, let a student or parent check an answer instead of taking it on trust. Our guide to [AI tutors versus general chatbots](/blog/ai-tutor-vs-chatbot) goes into the difference.",
          },
        ],
      },
      {
        id: "parent-checklist",
        heading: "What should a parent check before a child uses a free AI tool?",
        blocks: [
          {
            kind: "p",
            text: "A parent can check most of what matters in one short sitting, before the child signs up.",
          },
          {
            kind: "list",
            items: [
              "**Where answers come from.** The syllabus textbook, a set of named sources or the open internet, and whether the tool shows where each answer came from.",
              "**Explain or answer.** Ask it a homework-style question and see whether it walks through the reasoning or just gives the result.",
              "**Privacy policy.** What it collects, such as name, email, chat history and scores, who processes that data and how long it is kept.",
              "**Account and age rules.** Who is meant to create the account and whether the terms set a minimum age.",
              "**School AI rules.** What the school allows for homework and coursework, and whether work done with AI help must be declared.",
              "**What free means.** Whether free is the full product, a trial or a set of credits, and what happens when they run out.",
            ],
          },
          {
            kind: "p",
            text: "Trying the tool yourself on a chapter you know well is the quickest test of all. If the explanation is muddled or wrong on easy material, it is unlikely to do better on hard material.",
          },
        ],
      },
      {
        id: "studymate",
        heading: "Where does StudyMate fit among free AI study tools?",
        blocks: [
          {
            kind: "p",
            text: "StudyMate AI is our product, so weigh this section with that in mind. It is an AI tutor that answers from the student's own syllabus textbook: the country, board and class are chosen at setup, the matching books appear on the shelf, and answers come from the open chapter with the page cited. It explains and then tests, with practice papers from any chapter and instant evaluation.",
          },
          {
            kind: "p",
            text: "New accounts start with 5,000 free credits and no card required, so it is a free start rather than a free-forever tool, and the checklist above applies to it as much as to anything else. The [StudyMate homepage](/) shows a sample chat and a sample test before anyone signs up.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Are free AI study tools safe for children to use?",
        a: "It depends on the tool and how it is used. Read the privacy policy, check who is meant to create the account and whether there is a minimum age, and try the tool yourself first. Agree with your child on what it is for, and check the school's rules on AI.",
      },
      {
        q: "Can free AI tools do my child's homework?",
        a: "Many general tools will produce finished answers if asked, which is why the explain-or-answer test matters. Handing in AI-written work can break school rules even when the tool is free. A tool that explains and then quizzes keeps the thinking with the student.",
      },
      {
        q: "What is the difference between an AI tutor and a general chatbot?",
        a: "An AI tutor is built to teach: it explains a topic, checks understanding and responds to what the student gets wrong. A general chatbot answers whatever it is asked from broad training data. Some AI tutors also work from a specific syllabus, which keeps explanations in line with the class.",
      },
      {
        q: "Which type of free AI tool helps most with exam revision?",
        a: "A tool that makes practice questions from the chapters being studied is usually a better fit for revision than a summarizer. Dunlosky et al. (2013) rated practice testing as high utility and summarization as low utility. Look for questions whose answers can be checked against the textbook.",
      },
    ],
    sources: [
      {
        title:
          "Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology",
        publisher: "Dunlosky, Rawson, Marsh, Nathan & Willingham",
        year: "2013",
        url: "https://doi.org/10.1177/1529100612453266",
      },
    ],
    related: [
      "ai-tutor-vs-chatbot",
      "ai-for-homework-without-cheating",
      "how-to-make-notes-from-a-textbook",
    ],
    cta: {
      heading: "See How a Syllabus-Based Tutor Works",
      text: "Try StudyMate with your child on a chapter they are studying now, and check its answers against the cited page. New accounts start with 5,000 free credits, no card required.",
      link: { label: "Start free", href: APP_URL },
    },
  },
];
