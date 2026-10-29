import { APP_URL } from "@/lib/site";
import type { BlogPost } from "@/content/blog/types";

/**
 * Study skills posts, batch A: how-to-study-a-textbook-chapter, active-recall,
 * spaced-repetition and feynman-technique. Product claims come only from the
 * Fact Sheet Part A (answers from the open chapter with the page cited,
 * follow-up options, practice papers at a chosen difficulty with instant
 * evaluation, a weakest-first "what to study next" list, 5,000 free credits with
 * no card). Every research claim names the paper and links its DOI, and each DOI
 * was checked against Crossref (title, authors, year) on 28 Oct 2026; findings
 * are described only as far as the abstracts state them. The suggested study
 * times and review gaps are presented as starting points, not research
 * prescriptions. The Feynman post says plainly that the four-step method is a
 * popular summary, not something Richard Feynman published.
 */

const START_FREE = { label: "Start free", href: APP_URL } as const;

const DUNLOSKY_2013 = {
  title: "Improving Students' Learning With Effective Learning Techniques",
  publisher:
    "Dunlosky, Rawson, Marsh, Nathan & Willingham, Psychological Science in the Public Interest",
  year: "2013",
  url: "https://doi.org/10.1177/1529100612453266",
};

const ROEDIGER_KARPICKE_2006 = {
  title: "Test-Enhanced Learning",
  publisher: "Roediger & Karpicke, Psychological Science",
  year: "2006",
  url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
};

export const STUDY_SKILLS_A: BlogPost[] = [
  {
    slug: "how-to-study-a-textbook-chapter",
    category: "study-skills",
    title: "How to Study a Textbook Chapter So It Sticks",
    description:
      "A step-by-step way to study a textbook chapter: preview, read with questions, explain it back, test yourself and plan the next review.",
    h1: "How to Study a Textbook Chapter So It Actually Sticks",
    label: "How to Study a Textbook Chapter",
    excerpt:
      "A six-step method for turning one textbook chapter into something a student can explain and recall on exam day.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "To study a textbook chapter so it sticks, preview the headings first, turn them into questions, read one section at a time to answer those questions, close the book and explain the ideas aloud, test yourself without looking, and plan a short review a few days later. Rereading alone feels productive but rarely holds up in an exam.",
    takeaways: [
      "Rereading and highlighting feel like studying, but a large review of learning techniques rated both as low utility.",
      "Turning chapter headings into questions before reading gives every section a purpose.",
      "Closing the book and explaining a section in plain words shows which parts of the chapter are not yet understood.",
      "Testing yourself on a chapter, then coming back to it a few days later, uses the two techniques that research rates most highly.",
      "One chapter studied this way takes roughly an hour spread over two or three sittings.",
    ],
    sections: [
      {
        id: "why-rereading-fails",
        heading: "Why doesn't rereading a chapter make it stick?",
        blocks: [
          {
            kind: "p",
            text: "Rereading makes a chapter feel familiar, and familiar is easy to mistake for learned. When the words look known on the page, it seems the ideas are known too. The test comes when the book is closed and the question is worded differently.",
          },
          {
            kind: "p",
            text: "Research backs this up. In a long review of ten common study techniques, Dunlosky and colleagues (2013) rated rereading and highlighting as low utility, because neither consistently improved students' performance. Practice testing and spacing study out over time were the two techniques they rated high utility.",
          },
          {
            kind: "p",
            text: "Roediger and Karpicke (2006) found something else worth knowing: students who restudied a passage felt more confident they would remember it, yet students who were tested on it remembered more a week later. Feeling ready and being ready are not the same thing.",
          },
        ],
      },
      {
        id: "the-method",
        heading: "What are the steps to study a textbook chapter?",
        blocks: [
          {
            kind: "p",
            text: "The method has six steps, and each one makes the student do something with the chapter rather than just look at it. Here is how to study a textbook chapter from first look to first review:",
          },
          {
            kind: "steps",
            items: [
              "**Preview the chapter.** Read the title, headings, bold terms, diagrams and the questions at the end. This builds a rough map before any detail goes in.",
              '**Turn headings into questions.** A heading like "Properties of Rational Numbers" becomes "What are the properties, and how do I use each one?" Write the questions down.',
              "**Read one section at a time.** Read to answer that section's question, then stop. Work through any solved examples line by line.",
              "**Close the book and explain it back.** Say or write the answer in plain words, without looking. Anything that can't be explained goes on a short list of gaps.",
              "**Test yourself.** Answer the end-of-chapter questions or your own questions from memory, then check against the book.",
              "**Plan the next review.** Put a short review of the chapter in the calendar two or three days later, and another about a week after that.",
            ],
          },
          {
            kind: "table",
            caption:
              "The six steps with a rough time guide for one chapter (a suggested starting point; adjust to the chapter's length)",
            head: ["Step", "What to do", "Rough time"],
            rows: [
              [
                "1. Preview",
                "Skim headings, bold terms, diagrams, end questions",
                "5 to 10 minutes",
              ],
              ["2. Ask", "Rewrite each heading as a question", "5 minutes"],
              ["3. Read", "Read one section, answer its question", "20 to 30 minutes"],
              ["4. Explain", "Book closed, explain each section aloud", "10 minutes"],
              ["5. Test", "Answer questions from memory, then check", "10 to 15 minutes"],
              ["6. Plan", "Schedule the next two reviews", "2 minutes"],
            ],
          },
        ],
      },
      {
        id: "read-effectively",
        heading: "How do you read a textbook effectively without highlighting everything?",
        blocks: [
          {
            kind: "p",
            text: "The way to read a textbook effectively is to read with a question in mind and mark only what answers it. A page covered in highlighter has no priorities, so it gives nothing back at revision time.",
          },
          {
            kind: "list",
            items: [
              "**Mark sparingly.** Underline a definition or a key result, not whole paragraphs.",
              '**Write in the margin.** A short question beside a paragraph ("Why does this react with acid?") is more useful later than a colored line.',
              "**Slow down on examples and diagrams.** In maths and science, the solved examples and labeled diagrams often carry the idea more clearly than the text around them.",
              "**Stop at the end of each section.** If the section's question can't be answered yet, read that section again before moving on.",
            ],
          },
          {
            kind: "p",
            text: "Pace matters too. A textbook is denser than a story, so reading it at story speed lets ideas slip past. Slower reading with regular stops covers fewer pages per hour but leaves far more behind.",
          },
          {
            kind: "p",
            text: "Notes come after reading, not during. Our guide on [how to make notes from a textbook](/blog/how-to-make-notes-from-a-textbook) covers turning a chapter into notes that are worth revising from.",
          },
        ],
      },
      {
        id: "check-understanding",
        heading: "How do you check that you really understood the chapter?",
        blocks: [
          {
            kind: "p",
            text: "The quickest check is to close the book and explain the chapter in plain words, as if to someone in a younger class. Wherever the explanation stalls or falls back on the book's exact phrasing, there is a gap.",
          },
          {
            kind: "p",
            text: "This is the heart of the [Feynman technique](/blog/feynman-technique), and it pairs well with a blank-page test: write everything remembered about the chapter on an empty sheet, then compare it with the book. Both are forms of [active recall](/blog/active-recall), which means pulling ideas out of memory instead of reading them again.",
          },
        ],
      },
      {
        id: "when-to-review",
        heading: "When should you come back to the chapter?",
        blocks: [
          {
            kind: "p",
            text: "Come back to the chapter a few days after first studying it, and again about a week later, rather than all in one night before the test. Dunlosky and colleagues (2013) rated distributed practice, meaning study spread out over time, among the two most useful techniques they reviewed.",
          },
          {
            kind: "p",
            text: "Each review should be short and active: answer questions from memory first, then check the book only for what was missed. Our guide to [spaced repetition](/blog/spaced-repetition) has a simple review schedule for school chapters, and the [study skills guides](/blog) cover each step in more depth.",
          },
        ],
      },
      {
        id: "studymate",
        heading: "Where does StudyMate fit when studying from a textbook?",
        blocks: [
          {
            kind: "p",
            text: 'StudyMate AI helps at the points where students usually get stuck when they study from a textbook on their own. With [Chat With Your Textbook](/features/chat-with-your-textbook), a student can ask about a confusing section and get a plain-language answer drawn from that chapter, with the page cited so it can be checked in the book. Follow-ups such as "Explain it simpler" and "Quiz me on this" support the explain and test steps. The method above works just as well with a pencil and the book alone.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How long should it take to study one textbook chapter?",
        a: "For a typical school chapter, about an hour of focused work is a reasonable starting point, split over two or three sittings. Longer or denser chapters take more. The short reviews afterwards take 10 to 15 minutes each.",
      },
      {
        q: "Should I read the whole chapter first or go section by section?",
        a: "Skim the whole chapter first, then read it properly one section at a time. The skim builds a rough map, and the section-by-section reading lets each part be checked before the next one starts.",
      },
      {
        q: "Should I take notes while reading?",
        a: "Keep marks light while reading and write fuller notes after each section, with the book closed where possible. Writing from memory doubles as a recall check, and it stops notes from becoming a copy of the textbook.",
      },
      {
        q: "What if the chapter still doesn't make sense after reading it?",
        a: 'Go back to the solved examples and diagrams, then try explaining just one small part of the chapter. If it is still unclear, write down the exact question and ask a teacher, a classmate or a tutor, because a specific question gets a much more useful answer than "I don\'t get it."',
      },
    ],
    sources: [DUNLOSKY_2013, ROEDIGER_KARPICKE_2006],
    related: ["active-recall", "feynman-technique", "spaced-repetition"],
    cta: {
      heading: "Try the Method on Next Week's Chapter",
      text: "Open the chapter your child is studying next, ask StudyMate about the part that isn't clear and check the cited page together. New accounts start with 5,000 free credits and no card.",
      link: START_FREE,
    },
  },
  {
    slug: "active-recall",
    category: "study-skills",
    title: "Active Recall: How to Use It for School Exams",
    description:
      "What active recall is, why it works better than rereading, and simple ways to use it for school subjects, from blank-page recall to practice papers.",
    h1: "Active Recall: The Study Method That Beats Rereading",
    label: "Active Recall",
    excerpt:
      "What active recall is, what the research on retrieval practice found, and practical ways to use it for any school subject.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "Active recall is a study method where you pull information out of memory, by answering questions or writing down what you remember, instead of reading it again. Research on retrieval practice has found that testing yourself leads to better long-term memory than rereading, which makes active recall a dependable way to prepare for school exams.",
    takeaways: [
      "Active recall means retrieving ideas from memory, for example by answering questions with the book closed.",
      "Roediger and Karpicke (2006) found that students who were tested on a passage remembered more after a week than students who restudied it.",
      "Karpicke and Blunt (2011) found that retrieval practice beat concept mapping even on questions that asked students to make inferences.",
      "Active recall feels harder than rereading, and that effort is part of why it works.",
      "Blank-page recall, self-made questions and chapter practice papers all count as active recall.",
    ],
    sections: [
      {
        id: "what-is-active-recall",
        heading: "What is active recall?",
        blocks: [
          {
            kind: "p",
            text: "Active recall is the act of bringing an idea back from memory without looking at it. Answering a question with the book shut, writing a definition from memory or explaining a process aloud are all active recall. Rereading notes is not, because the answer is already in front of you.",
          },
          {
            kind: "p",
            text: "Researchers usually call this retrieval practice, and the benefit it produces is known as the testing effect. The idea is simple: a test is not only a way to measure what someone knows, it is also a way to learn.",
          },
        ],
      },
      {
        id: "why-it-works",
        heading: "Why does active recall work better than rereading?",
        blocks: [
          {
            kind: "p",
            text: "Active recall works better than rereading because each act of retrieval makes the memory easier to find again later. Several well-known studies point the same way.",
          },
          {
            kind: "p",
            text: "Roediger and Karpicke (2006) had students study prose passages, then either restudy them or take recall tests on them. On a test five minutes later, restudying came out ahead. On tests two days and one week later, the students who had practiced recall remembered substantially more, even though the restudy group felt more confident.",
          },
          {
            kind: "p",
            text: "Karpicke and Blunt (2011) compared retrieval practice with building concept maps from a science text. Retrieval practice produced more learning, including on questions that tested comprehension and asked students to make inferences, so the benefit is not limited to memorizing facts. In a broad review, Dunlosky and colleagues (2013) rated practice testing as one of only two high-utility study techniques, and recommended it in place of rereading.",
          },
        ],
      },
      {
        id: "techniques",
        heading: "What are the best active recall techniques for school subjects?",
        blocks: [
          {
            kind: "p",
            text: "The best active recall techniques are the ones that match the subject and the stage of revision. Any method counts as long as the answer comes from memory before it is checked.",
          },
          {
            kind: "table",
            caption: "Active recall techniques and when each one is most useful",
            head: ["Technique", "How it works", "When to use it"],
            rows: [
              [
                "Blank-page recall",
                "Write everything you remember about a topic, then check the book",
                "Right after studying a chapter",
              ],
              [
                "Question from headings",
                "Turn each heading into a question and answer it with the book closed",
                "While working through a chapter",
              ],
              [
                "End-of-chapter questions",
                "Answer the textbook's own questions before looking anything up",
                "After finishing a chapter",
              ],
              [
                "Self-made flashcards",
                "Question on one side, answer on the other; answer before flipping",
                "Terms, formulas, dates, definitions",
              ],
              [
                "Explain it aloud",
                "Teach the idea in plain words to someone, or to an empty room",
                "Processes and concepts, such as a reaction or a proof",
              ],
              [
                "Practice papers",
                "Answer a full set of questions under exam conditions",
                "In the weeks before an exam",
              ],
            ],
          },
          {
            kind: "p",
            text: "Different subjects lean on different techniques. In science, explaining a process aloud, such as how a metal reacts with an acid, shows whether the steps are really understood. In history or geography, blank-page recall of causes, events and examples works well. In languages, self-made cards for vocabulary sit alongside writing short answers from memory.",
          },
          {
            kind: "p",
            text: "Whatever the subject, the rule is the same: try first, check second. A wrong answer caught during practice is far cheaper than one discovered in the exam hall.",
          },
        ],
      },
      {
        id: "with-a-chapter",
        heading: "How do you use the active recall study method with one chapter?",
        blocks: [
          {
            kind: "p",
            text: "Use the active recall study method by adding short recall checks at three points: during reading, straight after, and a few days later.",
          },
          {
            kind: "steps",
            items: [
              "**During reading.** After each section, close the book and answer that section's heading as a question.",
              "**Straight after.** Do a blank-page recall of the whole chapter, then fill gaps in a different color so they stand out.",
              "**A few days later.** Answer the end-of-chapter questions or a short practice paper from memory, then check every answer.",
              "**Before the exam.** Return to the questions you got wrong, not the ones you already know.",
            ],
          },
          {
            kind: "p",
            text: "For a full walkthrough of reading a chapter this way, see [how to study a textbook chapter](/blog/how-to-study-a-textbook-chapter).",
          },
        ],
      },
      {
        id: "mistakes",
        heading: "What mistakes make active recall less useful?",
        blocks: [
          {
            kind: "p",
            text: "The most common mistake is peeking: glancing at the answer before really trying. A few others are worth avoiding too.",
          },
          {
            kind: "list",
            items: [
              "**Only easy questions.** Recalling what is already known feels good but teaches little. Include the questions that cause trouble.",
              "**No checking.** Recall without checking can leave a wrong answer in place. Always compare with the book afterwards.",
              "**Recalling once, then stopping.** A single recall session helps, but coming back to the same material on later days helps more.",
              "**Copying the book's words.** If an answer only works in the textbook's exact phrasing, the idea may not be understood yet.",
            ],
          },
        ],
      },
      {
        id: "with-spacing",
        heading: "How do active recall and spaced repetition fit together?",
        blocks: [
          {
            kind: "p",
            text: "Active recall is what you do in a review session, and spaced repetition decides when those sessions happen. Dunlosky and colleagues (2013) rated both practice testing and distributed practice as high utility, so combining them is a sensible default.",
          },
          {
            kind: "p",
            text: "In practice, that means testing yourself on a chapter soon after learning it, then again after a few days and again after a week or two. Our [spaced repetition guide](/blog/spaced-repetition) includes a simple schedule, and more methods are collected in the [study skills guides](/blog).",
          },
        ],
      },
      {
        id: "studymate",
        heading: "How can StudyMate support active recall?",
        blocks: [
          {
            kind: "p",
            text: 'StudyMate AI\'s [practice tests](/features/practice-tests) turn any chapter into a practice paper on demand, at the difficulty the student chooses, with an instant, detailed evaluation rather than just a score. While reading, the "Quiz me on this" follow-up gives a quick recall check on the idea just explained.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is active recall the same as using flashcards?",
        a: "Flashcards are one form of active recall, as long as the answer is attempted before the card is flipped. Active recall is broader: blank-page recall, explaining aloud and practice papers work the same way and suit topics that do not fit on a card.",
      },
      {
        q: "Why does active recall feel harder than rereading?",
        a: "Because it is harder: the answer has to be found rather than recognized. In Roediger and Karpicke (2006), students who restudied felt more confident, yet the tested students remembered more a week later. The struggle is a normal part of the method, not a sign it is failing.",
      },
      {
        q: "Does active recall work for maths?",
        a: "Yes, in the form of solving problems without looking at a worked example first. Recall the method, attempt the problem, then compare with the solution. Recalling definitions and properties from memory helps too.",
      },
      {
        q: "How long should an active recall session be?",
        a: "Short sessions work well: 15 to 30 minutes on one chapter is a reasonable starting point. Several short sessions on different days tend to be more useful than one long one.",
      },
    ],
    sources: [
      ROEDIGER_KARPICKE_2006,
      {
        title:
          "Retrieval Practice Produces More Learning than Elaborative Studying with Concept Mapping",
        publisher: "Karpicke & Blunt, Science",
        year: "2011",
        url: "https://doi.org/10.1126/science.1199327",
      },
      DUNLOSKY_2013,
    ],
    related: ["spaced-repetition", "how-to-study-a-textbook-chapter", "feynman-technique"],
    cta: {
      heading: "Turn a Chapter Into a Practice Paper",
      text: "Pick a chapter your child has just finished and generate a practice paper at the level they choose. The evaluation shows exactly which answers need another look.",
      link: START_FREE,
    },
  },
  {
    slug: "spaced-repetition",
    category: "study-skills",
    title: "Spaced Repetition for School Subjects: A Simple Schedule",
    description:
      "What spaced repetition is, why spreading out review beats cramming, and a simple schedule for revisiting school chapters before an exam.",
    h1: "Spaced Repetition for School Subjects: A Simple Review Schedule",
    label: "Spaced Repetition",
    excerpt:
      "Why spreading out review beats cramming, with a simple schedule for coming back to school chapters before an exam.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "Spaced repetition is a study method where you review the same material several times with growing gaps between sessions, instead of cramming it all at once. Research on distributed practice has found that spreading review out supports longer-lasting memory than massed study, and that the best gap gets longer the further away the test is.",
    takeaways: [
      "Spaced repetition means reviewing material several times with gaps between sessions, and the gaps usually grow longer.",
      "A meta-analysis by Cepeda and colleagues (2006) found that the review gap giving the best retention grew as the time until the final test grew.",
      "A 2015 replication of Ebbinghaus's forgetting curve produced results similar to the original data from 1880.",
      "A simple school schedule reviews a chapter after one day, a few days, a week and a few weeks.",
      "Each review session works best as active recall, answering from memory first, rather than rereading.",
    ],
    sections: [
      {
        id: "what-is-spaced-repetition",
        heading: "What is spaced repetition?",
        blocks: [
          {
            kind: "p",
            text: "Spaced repetition is returning to the same material at planned intervals, with each gap a little longer than the last. Researchers often call the broader idea spaced practice or distributed practice, and contrast it with massed practice, which is doing all the study in one block.",
          },
          {
            kind: "p",
            text: "Spaced repetition is often linked with flashcard apps, but the idea works just as well with whole school chapters. A student who studies a chapter on Monday and returns to it on Tuesday, Friday and the following Friday is using spaced repetition, no software needed.",
          },
        ],
      },
      {
        id: "why-spacing-works",
        heading: "Why does spacing out review beat cramming?",
        blocks: [
          {
            kind: "p",
            text: "Spacing beats cramming because memory fades over time, and a review that comes after some forgetting does more work than one that comes straight away. Cramming can get a student through a test the next morning, but much of it is gone a few weeks later.",
          },
          {
            kind: "p",
            text: "The fading itself is old news. Hermann Ebbinghaus measured his own forgetting in the 1880s, and Murre and Dros (2015) repeated his experiment, relearning lists after intervals from 20 minutes to 31 days. Their results were similar to his original forgetting curve. The paper also notes that material which seems forgotten can still be relearned faster than new material, which is one reason a review is worth doing even when a chapter feels lost.",
          },
          {
            kind: "p",
            text: "Cepeda and colleagues (2006) pooled 839 assessments of distributed practice from 317 experiments. Their analysis suggests the best gap between study sessions depends on how long the material needs to be remembered: the longer the wait until the test, the longer the best gap. Dunlosky and colleagues (2013) rated distributed practice as one of two high-utility study techniques.",
          },
        ],
      },
      {
        id: "schedule",
        heading: "What is a simple spaced repetition schedule for school chapters?",
        blocks: [
          {
            kind: "p",
            text: "A simple spaced repetition schedule reviews a chapter about a day after first studying it, then after a few days, a week, and a few weeks. The intervals below are a suggested starting point, not a schedule prescribed by research, so adjust them to the exam date and how well each review goes.",
          },
          {
            kind: "table",
            caption:
              "An example review schedule for one chapter (a suggested starting point, not a research-prescribed interval)",
            head: ["Review", "When", "What to do", "Time"],
            rows: [
              [
                "First study",
                "Day 0",
                "Read the chapter, explain it back, test yourself",
                "About an hour",
              ],
              ["Review 1", "Day 1", "Blank-page recall, then check the book", "10 to 15 minutes"],
              [
                "Review 2",
                "Day 3 or 4",
                "Answer end-of-chapter questions from memory",
                "15 minutes",
              ],
              [
                "Review 3",
                "Day 7 to 10",
                "Short practice paper, then fix mistakes",
                "20 to 30 minutes",
              ],
              [
                "Review 4",
                "Day 21 to 30",
                "Mixed questions with other chapters",
                "20 to 30 minutes",
              ],
              [
                "Final check",
                "The week before the exam",
                "Revisit only the questions missed earlier",
                "15 minutes",
              ],
            ],
          },
          {
            kind: "p",
            text: "If a review goes badly, shorten the next gap. If it goes smoothly, the next gap can stretch a little further.",
          },
          {
            kind: "p",
            text: "Here is how that looks in a real week. A student studies a science chapter on Monday evening, does a five-minute blank-page recall of it on Tuesday, answers the chapter's end questions on Thursday and takes a short practice paper on it the following Monday. Each review is small, but together they mean the chapter has been pulled from memory four times before the exam, not once.",
          },
        ],
      },
      {
        id: "many-subjects",
        heading: "How do you fit a spaced repetition schedule around many subjects?",
        blocks: [
          {
            kind: "p",
            text: "Fit it in by keeping each review short and writing review dates on a calendar the moment a chapter is first studied. Most days then hold one new chapter and two or three quick reviews of older ones.",
          },
          {
            kind: "list",
            items: [
              "**Plan from the exam date backwards.** Make sure every chapter gets at least three reviews before the exam.",
              "**Mix subjects in a day.** A science review, a maths review and a history review in one evening is easier to sustain than three of the same.",
              "**Review weak chapters more often.** A chapter that keeps going badly earns shorter gaps than one that is already solid.",
              "**Keep a simple log.** A line per chapter with review dates and how it went is enough.",
            ],
          },
          {
            kind: "p",
            text: "For building this into a weekly plan, see our [study timetable guide](/blog/study-timetable).",
          },
        ],
      },
      {
        id: "each-session",
        heading: "What should you do in each spaced practice session?",
        blocks: [
          {
            kind: "p",
            text: "In each spaced practice session, test yourself first and only then open the book. Rereading during a review brings back the comfortable feeling of familiarity without showing what has actually been forgotten.",
          },
          {
            kind: "p",
            text: "This is where spacing meets [active recall](/blog/active-recall): the schedule decides when to review, and recall decides how. A blank page, the textbook's end-of-chapter questions or a short practice paper all work. More methods are in our [study skills guides](/blog).",
          },
        ],
      },
      {
        id: "short-on-time",
        heading: "What if the exam is only a few weeks away?",
        blocks: [
          {
            kind: "p",
            text: "If the exam is close, keep the same pattern with shorter gaps. The Cepeda and colleagues (2006) analysis suggests the best gap scales with how far away the test is, so a nearer exam calls for tighter spacing, such as reviews after one day, three days and a week.",
          },
          {
            kind: "p",
            text: "Even with little time, two or three short spaced reviews of a chapter are a better use of an evening than one long reread of it the night before.",
          },
        ],
      },
      {
        id: "studymate",
        heading: "How can StudyMate help with chapter reviews?",
        blocks: [
          {
            kind: "p",
            text: 'StudyMate AI can supply the review itself. On a review day, a student can generate a [practice paper](/features/practice-tests) from that chapter at the difficulty they choose and get an instant, detailed evaluation. Progress reports also show how each chapter went, with a "what to study next" list that puts the weakest chapter first, which helps decide which chapters need shorter gaps.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How many times should you review a chapter before an exam?",
        a: "Three to five spaced reviews is a practical target for most school chapters. Chapters that keep going badly need more, and chapters that are already solid can manage with fewer. There is no single research-set number for every subject.",
      },
      {
        q: "Is spaced repetition only for flashcards?",
        a: "No. Spaced repetition is about timing, so it works with any review method. Blank-page recall, end-of-chapter questions and practice papers can all be scheduled the same way flashcards are.",
      },
      {
        q: "What is the difference between spaced repetition and spaced practice?",
        a: "The terms overlap. Spaced practice, or distributed practice, is the general research term for spreading study out over time. Spaced repetition usually refers to a planned schedule of reviews with gaps that grow.",
      },
      {
        q: "Can spaced repetition help the night before an exam?",
        a: "Not much, because spacing needs days between sessions. The night before is best used for a calm check of earlier mistakes and a good night's sleep, with the spaced reviews planned well ahead next time.",
      },
    ],
    sources: [
      {
        title: "Distributed practice in verbal recall tasks: A review and quantitative synthesis",
        publisher: "Cepeda, Pashler, Vul, Wixted & Rohrer, Psychological Bulletin",
        year: "2006",
        url: "https://doi.org/10.1037/0033-2909.132.3.354",
      },
      {
        title: "Replication and Analysis of Ebbinghaus' Forgetting Curve",
        publisher: "Murre & Dros, PLOS ONE",
        year: "2015",
        url: "https://doi.org/10.1371/journal.pone.0120644",
      },
      DUNLOSKY_2013,
    ],
    related: ["active-recall", "how-to-study-a-textbook-chapter", "study-timetable"],
    cta: {
      heading: "Plan the Next Review Around Real Results",
      text: "Generate a practice paper from a chapter your child studied last week and see which answers held up. The weakest-first study list shows which chapter to review next.",
      link: { label: "See practice tests", href: "/features/practice-tests" },
    },
  },
  {
    slug: "feynman-technique",
    category: "study-skills",
    title: "The Feynman Technique: Learn a Chapter by Explaining It",
    description:
      "How the Feynman technique works for school students: explain a chapter in plain words, find the gaps, go back to the book and simplify.",
    h1: "The Feynman Technique: How to Learn a Chapter by Explaining It",
    label: "The Feynman Technique",
    excerpt:
      "How to learn a school chapter by explaining it in plain words, finding the gaps and going back to the book, with a worked example on photosynthesis.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "The Feynman technique is a way to learn by explaining a topic in plain words, as if teaching someone younger, then spotting where the explanation breaks down and going back to the source to fill each gap. For school students, it turns a textbook chapter into a short, simple explanation that can be checked against the book.",
    takeaways: [
      "The Feynman technique has four steps: choose a topic, explain it simply, find the gaps, then go back to the book and simplify.",
      "The technique is named after physicist Richard Feynman, but the four-step version is a popular summary written by others, not a method he published.",
      "In a study by Chi and colleagues (1994), eighth-grade students prompted to explain a text to themselves gained more understanding than students who read it twice.",
      "The most useful part of the Feynman technique is the moment the explanation stalls, because that shows exactly what to reread.",
      "The Feynman technique suits concepts and processes, while active recall and spaced repetition handle memorizing and retention.",
    ],
    sections: [
      {
        id: "what-is-it",
        heading: "What is the Feynman technique?",
        blocks: [
          {
            kind: "p",
            text: "The Feynman technique is a study method built on one idea: if you can't explain something simply, you don't understand it yet. The student explains a topic in their own words, notices where the explanation falls apart and goes back to the source to fix it.",
          },
          {
            kind: "p",
            text: "It is named after Richard Feynman, the physicist known for explaining hard ideas in plain language. To be honest about its origin, the four-step method that carries his name is a popular summary of his approach, written by others. Feynman did not publish it as a step-by-step study technique, so treat it as a useful habit rather than a formula with his signature on it.",
          },
        ],
      },
      {
        id: "four-steps",
        heading: "What are the four steps of the Feynman learning technique?",
        blocks: [
          {
            kind: "p",
            text: "The Feynman learning technique has four steps, and it works best on one small topic at a time, such as a single section of a chapter.",
          },
          {
            kind: "steps",
            items: [
              '**Choose one topic.** Write its name at the top of a blank page. Keep it narrow: "photosynthesis" rather than "the whole biology chapter."',
              "**Explain it simply.** With the book closed, write or say an explanation for someone a few years younger. Use short sentences and everyday words.",
              "**Find the gaps.** Mark every spot where the explanation got vague, skipped a step or borrowed the textbook's wording without really understanding it.",
              "**Go back to the book, then simplify.** Reread only the parts that cover the gaps, then rewrite the explanation more simply. An analogy or a small example often helps.",
            ],
          },
        ],
      },
      {
        id: "worked-example",
        heading: "What does the Feynman technique look like on a real chapter?",
        blocks: [
          {
            kind: "p",
            text: 'Here is the technique on photosynthesis, a topic in most school science courses. A first attempt might read: "Plants make their own food using sunlight." That is true, but it leaves almost everything out.',
          },
          {
            kind: "p",
            text: "Asking the obvious follow-up questions exposes the gaps: what goes in, where it happens and what comes out. Checking those against the textbook chapter fills them in.",
          },
          {
            kind: "table",
            caption: "One pass of the Feynman technique on photosynthesis",
            head: ["Gap found", "What the book adds", "Simpler version"],
            rows: [
              [
                "What does the plant use?",
                "Carbon dioxide from the air, water from the soil, and light energy",
                "Air, water and sunlight go in",
              ],
              [
                "Where does it happen?",
                "Mostly in the leaves, in chloroplasts that contain green chlorophyll",
                "The green parts of leaves do the work",
              ],
              [
                "What is made?",
                "Glucose, a sugar the plant uses for energy, and oxygen",
                "Sugar for food comes out, plus oxygen",
              ],
              [
                "How does air get in?",
                "Through tiny pores on the leaf called stomata",
                "Leaves have tiny doors for air",
              ],
            ],
          },
          {
            kind: "p",
            text: "The rewritten explanation might be: \"A leaf is like a tiny kitchen. It takes in air through tiny pores and water from the roots, and the green chlorophyll catches sunlight to power the cooking. The kitchen makes sugar for the plant's food and lets oxygen out.\" Every part of that version can now be checked against the chapter, and any part that can't be explained again tomorrow is the part to review.",
          },
        ],
      },
      {
        id: "why-it-works",
        heading: "Why does explaining a chapter help you learn it?",
        blocks: [
          {
            kind: "p",
            text: "Explaining a chapter helps because it forces new information to connect with what the student already knows. Researchers call the closest studied version of this self-explanation.",
          },
          {
            kind: "p",
            text: "In a study by Chi and colleagues (1994), 14 eighth-grade students were asked to explain each line of a passage on the human circulatory system to themselves, while 10 students read the same text twice. The prompted group gained more from the pretest to the posttest, and the students who produced the most explanations all built a correct mental model of how the system works.",
          },
          {
            kind: "p",
            text: "The evidence is promising but not yet broad. Dunlosky and colleagues (2013) rated self-explanation as moderate utility, noting that it had not been adequately tested in real classrooms. That is a fair way to see the Feynman technique too: a sensible way to learn by teaching, best used alongside methods with stronger evidence.",
          },
        ],
      },
      {
        id: "mistakes",
        heading: "What are common mistakes with the Feynman technique?",
        blocks: [
          {
            kind: "p",
            text: "The most common mistake is reciting the textbook instead of explaining it. If the explanation uses the book's exact words, it hides the gaps it is meant to find.",
          },
          {
            kind: "list",
            items: [
              "**Picking a topic that is too big.** A whole chapter at once turns into a vague summary. One section or one idea is enough.",
              "**Skipping the trip back to the book.** Finding a gap only helps if it then gets filled from the source.",
              "**Explaining with the book open.** The explanation has to come from memory, or it becomes copying.",
              "**Stopping at understanding.** Understanding a topic today does not mean it will still be there in a month, so follow up with [active recall](/blog/active-recall) and planned reviews.",
            ],
          },
        ],
      },
      {
        id: "when-to-use",
        heading: "When should students use the Feynman technique?",
        blocks: [
          {
            kind: "p",
            text: "Students should use the Feynman technique on ideas that need understanding: processes, causes, proofs and the reasons behind a rule in maths. It is less useful for pure memory work such as spellings, dates or symbols, where flashcards and quick recall checks do the job faster.",
          },
          {
            kind: "p",
            text: "It fits neatly into the explain-it-back step of [studying a textbook chapter](/blog/how-to-study-a-textbook-chapter). For more methods and how they fit together, browse the [study skills guides](/blog).",
          },
        ],
      },
      {
        id: "studymate",
        heading: "How can StudyMate help with the go-back-to-the-book step?",
        blocks: [
          {
            kind: "p",
            text: 'StudyMate AI helps most with step four. When a student finds a gap, they can ask about it in [Chat With Your Textbook](/features/chat-with-your-textbook) and get a plain-language answer from the chapter they have open, with the page cited so it can be read in the book. The "Explain it simpler" and "Give me an example" follow-ups support the simplify step, but the explaining itself is still the student\'s job.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Did Richard Feynman invent the Feynman technique?",
        a: "Not as a published four-step method. The technique is named after him because he was known for explaining physics in plain language, but the step-by-step version is a popular summary written by others. It is best treated as a useful study habit inspired by his approach.",
      },
      {
        q: "Do you need another person to use the Feynman technique?",
        a: 'No. Writing the explanation on paper or saying it aloud to an empty room works. A parent or sibling who asks "why?" can help find gaps, but they don\'t need to know the subject.',
      },
      {
        q: "Can younger students use the Feynman technique?",
        a: "Yes, with a small topic and some support. A younger student can explain one idea to a parent, who simply asks questions where the explanation gets fuzzy. The study by Chi and colleagues (1994) worked with eighth-grade students.",
      },
      {
        q: "How long does the Feynman technique take?",
        a: "One pass on a single idea usually takes 10 to 20 minutes. A full chapter might need several passes on different sections, spread over a few sittings.",
      },
    ],
    sources: [
      {
        title: "Eliciting Self-Explanations Improves Understanding",
        publisher: "Chi, De Leeuw, Chiu & LaVancher, Cognitive Science",
        year: "1994",
        url: "https://doi.org/10.1207/s15516709cog1803_3",
      },
      DUNLOSKY_2013,
    ],
    related: ["how-to-study-a-textbook-chapter", "active-recall", "study-methods-compared"],
    cta: {
      heading: "Check the Explanation Against the Book",
      text: "When your child's explanation of a chapter hits a gap, they can ask StudyMate about it and read the cited page in their own textbook. Setup takes about five minutes and starts with 5,000 free credits.",
      link: START_FREE,
    },
  },
];
