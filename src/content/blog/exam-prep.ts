import { APP_URL } from "@/lib/site";
import type { BlogPost } from "@/content/blog/types";

/**
 * Exam-prep posts: "how to prepare for board exams", "practice papers before
 * exams" and "study timetable". All three stay generic to school and board
 * exams: no board, exam format or exam date is named. Product claims come only
 * from Fact Sheet Part A (chapter-level progress with a weakest-first "what to
 * study next" list, practice papers from any chapter at a chosen difficulty,
 * instant detailed evaluation, 5,000 free credits with no card) and make no
 * outcome claims. Each research claim names the primary paper and was checked
 * against its Crossref record (title, authors, year) and its abstract; figures
 * quoted (317 experiments) appear in the published abstract. Stress is handled
 * as study planning only, with a pointer to a teacher or school counselor.
 */

const START_FREE = { label: "Start free", href: APP_URL } as const;

const DUNLOSKY_2013 = {
  title:
    "Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology",
  publisher: "Dunlosky, Rawson, Marsh, Nathan & Willingham",
  year: "2013",
  url: "https://doi.org/10.1177/1529100612453266",
};

export const EXAM_PREP: BlogPost[] = [
  {
    slug: "board-exam-revision-plan",
    category: "exam-prep",
    title: "How to Prepare for Board Exams: A Revision Plan",
    description:
      "A practical board exam revision plan: rank chapters by weakness, schedule practice papers, review mistakes and use the final weeks well.",
    h1: "How to Prepare for Board Exams: A Chapter-by-Chapter Revision Plan",
    label: "Board Exam Revision Plan",
    excerpt:
      "List every chapter, rank them by weakness, relearn the weakest first, then move to timed papers and a mistake log.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "To prepare for board exams, list every chapter in each subject, rank the chapters from weakest to strongest and give the weakest the most revision time early on. Then add practice papers, trace every mistake back to the chapter it came from and use the final weeks for mixed review rather than new material.",
    takeaways: [
      "A board exam revision plan starts with a full list of chapters for each subject, ranked from weakest to strongest.",
      "Weak chapters need the most time early, while there is still room to go back and relearn them.",
      "Practice papers are most useful when every mistake is traced back to the chapter it came from.",
      "Dunlosky and colleagues (2013) rated practice testing and distributed practice as the two highest-utility techniques in their review of ten.",
      "The final weeks before board exams suit mixed review and timed papers, not chapters studied for the first time.",
    ],
    sections: [
      {
        id: "when-to-start",
        heading: "When should you start preparing for board exams?",
        blocks: [
          {
            kind: "p",
            text: "Start as early as the syllabus allows, because a good plan needs time to revisit weak chapters more than once. A plan that starts a few months out can work through every chapter, return to the weak ones and still leave the last weeks for practice papers. A plan that starts a few weeks out has to make harder choices about what to cover.",
          },
          {
            kind: "p",
            text: "Whatever the start date, the order stays the same: list, rank, schedule, practice and review. Those five steps make up the rest of this plan.",
          },
        ],
      },
      {
        id: "rank-chapters",
        heading: "How do you rank chapters by weakness?",
        blocks: [
          {
            kind: "p",
            text: "Rank chapters by how well the student can answer questions on them now, not by how familiar they feel. A chapter read three times can still be weak if questions on it go wrong.",
          },
          {
            kind: "steps",
            items: [
              "**List every chapter** in each subject from the syllabus or the textbook contents page.",
              "**Try a few questions** from the end of each chapter, with the book closed.",
              "**Mark each chapter** red (cannot answer most), amber (some gaps) or green (answers most).",
              "**Put red chapters first** in the plan, then amber, then green.",
            ],
          },
          {
            kind: "p",
            text: "School test results and teacher feedback help too. If a school test showed a chapter going wrong, it goes on the red list even if it felt fine at the time.",
          },
        ],
      },
      {
        id: "phase-plan",
        heading: "What does a phase-by-phase board exam revision plan look like?",
        blocks: [
          {
            kind: "p",
            text: "A workable plan moves from mapping, to relearning, to practice, to mixed review. The table shows each phase and what it is for; stretch or shrink the phases to fit the time available.",
          },
          {
            kind: "table",
            caption: "Board exam revision plan by phase",
            head: ["Phase", "Focus", "What to do", "Sign it's working"],
            rows: [
              [
                "1. Map",
                "Know where you stand",
                "List chapters, try questions, rank red, amber, green",
                "Every chapter has a color",
              ],
              [
                "2. Relearn",
                "Red and amber chapters",
                "Reread, make question-and-answer notes, test from them",
                "Red chapters move to amber",
              ],
              [
                "3. Practice",
                "Questions chapter by chapter",
                "Chapter tests, then sections of past papers, mistakes logged",
                "Fewer repeat mistakes",
              ],
              [
                "4. Full papers",
                "Whole papers under time",
                "Timed papers, every mistake traced to its chapter",
                "Papers finish on time",
              ],
              [
                "5. Final review",
                "Short, mixed recall",
                "Mistake log and notes, no new chapters",
                "Mistake log is shrinking",
              ],
            ],
          },
          {
            kind: "p",
            text: "The phases overlap. Green chapters still get a short review during phase two, so they do not fade while red chapters take most of the time.",
          },
        ],
      },
      {
        id: "revision-timetable",
        heading: "How do you build a revision timetable around the plan?",
        blocks: [
          {
            kind: "p",
            text: "Build the revision timetable from short sessions that mix subjects across the week, with the weakest chapters appearing most often. Each chapter should come back more than once, a few days apart, rather than being finished in one long block.",
          },
          {
            kind: "p",
            text: "That spacing has research behind it. Dunlosky et al. (2013) rated distributed practice, spreading study across separate sessions, as high utility, alongside practice testing. Our step-by-step guide to [making a study timetable](/blog/study-timetable) includes a sample week.",
          },
          {
            kind: "p",
            text: "A simple weekly rhythm keeps the plan on track: relearning and chapter questions on weekdays, a mixed review at the weekend and one check each week to recolor any chapter that has moved. A chapter moving from red to amber is the clearest sign the plan is doing its job.",
          },
        ],
      },
      {
        id: "review-mistakes",
        heading: "How should you use practice papers and review mistakes?",
        blocks: [
          {
            kind: "p",
            text: "Use practice papers to find weak spots, then spend more time on the mistakes than on the paper itself. A paper finished and put away teaches far less than one where every lost mark has been traced back to a chapter.",
          },
          {
            kind: "list",
            items: [
              "**Mark it the same day**, while the reasoning is still fresh.",
              "**Log each mistake** with the chapter, the question type and why it went wrong: a knowledge gap, a misread question or running out of time.",
              "**Fix the cause.** A knowledge gap means going back to the chapter; a misread question means slowing down; time trouble means more timed practice.",
              "**Retest within a few days** on a similar question to check the fix held.",
            ],
          },
          {
            kind: "p",
            text: "Our guide to [using practice papers in the last month before exams](/blog/practice-papers-before-exams) covers marking and pacing in more detail.",
          },
        ],
      },
      {
        id: "final-weeks",
        heading: "Which board exam preparation tips matter most in the final weeks?",
        blocks: [
          {
            kind: "p",
            text: "The final weeks are for review and timed papers, not for learning chapters from scratch. Starting a new chapter now usually takes time away from chapters that only need a last review.",
          },
          {
            kind: "list",
            items: [
              "**Keep a fixed daily routine**, with study at similar times and regular breaks.",
              "**Work from the mistake log** and question-and-answer notes rather than the full textbook.",
              "**Practice under exam-like conditions** for some papers: timed, no notes, at a desk.",
              "**Check the practical details early**: the date of each paper, what to bring and where to be.",
              "**Keep evenings before each paper light**, with a short review rather than a long session.",
            ],
          },
          {
            kind: "p",
            text: "If worry about the exams starts getting in the way of study, a teacher or school counselor is a good person to talk to. More planning guides are in our [exam prep section](/blog).",
          },
        ],
      },
      {
        id: "studymate",
        heading: "How can StudyMate help with a board exam revision plan?",
        blocks: [
          {
            kind: "p",
            text: 'StudyMate AI, our product, covers two steps of this plan. Its progress reports show how a student performed in each chapter and give a "what to study next" list with the weakest chapter first, which supports the ranking step. A student can also generate a practice paper from any chapter at the difficulty they choose and get an instant, detailed evaluation. Our [exam revision page](/exam-revision) shows how the pieces fit together.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How many hours a day should I study for board exams?",
        a: "There is no single right number; it depends on the time left, the number of weak chapters and the school day. A steady daily routine of focused sessions with breaks is easier to keep up than occasional very long days. Plan by chapters to cover rather than hours to fill.",
      },
      {
        q: "Should I revise strong subjects or weak subjects first?",
        a: "Weak chapters first, while there is still time to relearn them. Strong chapters still need short reviews spread through the plan so they do not fade. A red, amber and green ranking keeps the balance visible.",
      },
      {
        q: "Are past papers enough to prepare for board exams?",
        a: "Past papers are useful but work best after the chapters behind them have been relearned. Used too early, they mostly show what is not known yet. Used later, with every mistake traced to its chapter, they show exactly what still needs work.",
      },
      {
        q: "What should I do the night before a board exam?",
        a: "A short review of notes and the mistake log, then rest. Starting a new topic the night before rarely helps and can add worry. Check what to bring and when to arrive so the morning is simple.",
      },
    ],
    sources: [DUNLOSKY_2013],
    related: ["study-timetable", "practice-papers-before-exams", "spaced-repetition"],
    cta: {
      heading: "Find the Weakest Chapter First",
      text: "StudyMate shows how your child is doing in each chapter and lists what to study next, weakest first, so a revision plan starts from evidence. New accounts start with 5,000 free credits, no card required.",
      link: START_FREE,
    },
  },
  {
    slug: "practice-papers-before-exams",
    category: "exam-prep",
    title: "How to Use Practice Papers in the Month Before Exams",
    description:
      "How to use practice papers in the final month before exams: when to start, how to mark them, what to do with mistakes and how to pace the last weeks.",
    h1: "How to Use Practice Papers in the Last Month Before Exams",
    label: "Practice Papers Before Exams",
    excerpt:
      "Start with chapter papers, move to full timed papers, mark the same day and spend more time on mistakes than on the paper.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "Use practice papers before exams by starting with chapter-level papers about four weeks out, moving to full timed papers in the last two weeks, and marking every paper the same day. Spend more time on the mistakes than on the paper itself: trace each lost mark to its chapter, fix the cause and retest it a few days later.",
    takeaways: [
      "Practice papers work best in the final month when they move from single chapters to full timed papers.",
      "Marking a practice paper the same day, while the reasoning is fresh, makes mistakes easier to understand.",
      "Roediger and Karpicke (2006) found that students who took recall tests remembered more a week later than students who restudied the same passages.",
      "Every mistake on a practice paper should be traced to its cause: a knowledge gap, a misread question, a method slip or time pressure.",
      "The last few days before an exam suit short reviews of the mistake log rather than several new full papers.",
    ],
    sections: [
      {
        id: "why-practice-papers",
        heading: "Why use practice papers before exams instead of rereading?",
        blocks: [
          {
            kind: "p",
            text: "Practice papers make a student pull answers out of memory, and research suggests that act of recall helps later remembering more than another read through the chapter. Roediger and Karpicke (2006) had students either restudy prose passages or take recall tests on them. On a test five minutes later, the restudy group did better. On tests two days and one week later, the group that had been tested remembered substantially more.",
          },
          {
            kind: "p",
            text: "The same study found that restudying made students more confident about their memory, even though they remembered less later. That is worth knowing in the last month: a practice paper can feel worse than rereading notes while doing more good. Our guide to [active recall](/blog/active-recall) explains the technique behind it.",
          },
        ],
      },
      {
        id: "when-to-start",
        heading: "When should you start doing practice papers?",
        blocks: [
          {
            kind: "p",
            text: "Start chapter-level practice papers around a month before the exam, once each chapter has been studied at least once. Full papers done too early mostly show what has not been learned yet, which is useful once but discouraging if repeated.",
          },
          {
            kind: "p",
            text: "Knowing how to use past papers well matters more than how many get done. Past and sample papers, where the school or board publishes them, show the question styles and the time pressure. Chapter-level papers fill the gaps between them and let a student start with the weakest topics.",
          },
          {
            kind: "p",
            text: "If no past papers are available for a subject, the end-of-chapter questions in the textbook and any tests set at school make a reasonable substitute. Mixing questions from several chapters into one sitting gives a similar feel to a full paper.",
          },
        ],
      },
      {
        id: "week-by-week",
        heading: "How should you use practice papers week by week?",
        blocks: [
          {
            kind: "p",
            text: "Move from single chapters to full timed papers as the month goes on. The table is a sample plan; adjust it to the number of subjects and the exam dates.",
          },
          {
            kind: "table",
            caption: "Sample four-week plan for practice papers",
            head: ["Week", "Type of paper", "Conditions", "Main goal"],
            rows: [
              [
                "4 weeks out",
                "Chapter papers, weakest chapters first",
                "Untimed, book closed",
                "Find the gaps in each chapter",
              ],
              [
                "3 weeks out",
                "Chapter papers and single sections of past papers",
                "Loosely timed",
                "Fix gaps and retest them",
              ],
              [
                "2 weeks out",
                "Full past papers",
                "Timed, exam-like conditions",
                "Practice pacing across a whole paper",
              ],
              [
                "Final week",
                "One or two full papers, then mistake review",
                "Timed papers, then short review sessions",
                "Clear the mistake log; no new topics",
              ],
            ],
          },
          {
            kind: "p",
            text: "Spread papers across subjects rather than doing all of one subject in a block. A paper in each subject every few days keeps every subject in play until the exam.",
          },
        ],
      },
      {
        id: "marking",
        heading: "How should you mark a practice paper?",
        blocks: [
          {
            kind: "p",
            text: "Mark the paper the same day, strictly, using the answer key or marking guide if there is one. Being generous with half-right answers hides the exact gaps the paper was meant to find.",
          },
          {
            kind: "steps",
            items: [
              "**Mark every answer** right, partly right or wrong.",
              "**Compare the working and wording** with the model answer, not just the final result, especially for longer answers.",
              "**Note the time** each section took against the time allowed.",
              "**Log every lost mark** before putting the paper away.",
            ],
          },
          {
            kind: "p",
            text: "A parent can help here without knowing the subject. Reading out the model answer while the student checks their own work is often enough.",
          },
        ],
      },
      {
        id: "mistakes",
        heading: "What should you do with mistakes from practice papers?",
        blocks: [
          {
            kind: "p",
            text: "Sort each mistake by its cause, because each cause has a different fix. The useful question is not just what went wrong, but why.",
          },
          {
            kind: "terms",
            items: [
              {
                term: "Knowledge gap",
                text: "The idea was not known or was misremembered. Go back to the chapter, relearn the section and write a question and answer for it.",
              },
              {
                term: "Misread question",
                text: "The idea was known, but the question was answered wrongly. Practice underlining what each question asks before answering.",
              },
              {
                term: "Method slip",
                text: "A step was skipped or a calculation went wrong. Redo the question slowly, then try two similar ones.",
              },
              {
                term: "Time pressure",
                text: "The paper ran out before the questions did. Practice timed sections and decide in advance how long each part gets.",
              },
            ],
          },
          {
            kind: "p",
            text: "Retest each fixed mistake a few days later with a similar question. A mistake that comes back twice belongs on the list for the final week.",
          },
          {
            kind: "p",
            text: "Keep the mistake log in one place for every subject, such as a single notebook with a page per subject. By the final week it becomes one of the most useful things to revise from, because it lists exactly what went wrong and why.",
          },
        ],
      },
      {
        id: "pacing",
        heading: "How should you pace the last weeks before exams?",
        blocks: [
          {
            kind: "p",
            text: "Ease off full papers in the last few days and switch to short reviews of the mistake log. A full paper the night before rarely teaches anything new and can leave a student tired going into the exam.",
          },
          {
            kind: "p",
            text: "Among the simplest exam practice tips: keep the routine steady, with similar study times each day, regular breaks and lighter evenings before each paper. If worry about the exams gets in the way, a teacher or school counselor is a good person to talk to. A fuller plan for the months before is in our [board exam revision plan](/blog/board-exam-revision-plan), and more guides are in our [exam prep section](/blog).",
          },
        ],
      },
      {
        id: "studymate",
        heading: "Where does StudyMate fit with practice papers?",
        blocks: [
          {
            kind: "p",
            text: "StudyMate AI, our product, generates [practice papers from any chapter](/features/practice-tests) on demand, at the difficulty the student chooses, and they are attempted online. Each paper gets an instant, detailed evaluation rather than just a score, and progress reports list what to study next, weakest chapter first. That suits the chapter-paper weeks of this plan. StudyMate papers are built from the textbook chapter, so they sit alongside the school's or board's own past papers rather than replacing them.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How many practice papers should I do before an exam?",
        a: "There is no fixed number. A few papers marked carefully, with every mistake fixed and retested, are worth more than many papers done and put away. Fit the number to the time left and the number of subjects.",
      },
      {
        q: "Should practice papers be timed?",
        a: "Later on, yes. Early papers work well untimed, so the focus stays on finding gaps. Full timed papers belong in the last two weeks so pacing gets practiced before the real exam.",
      },
      {
        q: "Is it better to do past papers or chapter tests?",
        a: "Both, at different times. Chapter tests find and fix gaps in single topics, while past papers practice mixing topics under time pressure. Start with chapter tests and move to full papers as the exam gets closer.",
      },
      {
        q: "What if my child keeps getting the same questions wrong?",
        a: "Treat it as a knowledge gap and go back to the chapter, not to another paper. Relearn the section, write a few questions on it and retest after a few days. If it still goes wrong, ask the teacher to explain it a different way.",
      },
    ],
    sources: [
      {
        title: "Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention",
        publisher: "Roediger & Karpicke",
        year: "2006",
        url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
      },
    ],
    related: ["board-exam-revision-plan", "study-timetable", "active-recall"],
    cta: {
      heading: "Turn Any Chapter Into a Practice Paper",
      text: "StudyMate builds a practice paper from any chapter of your child's textbook and evaluates it instantly, with the weakest chapter listed first for next time. New accounts start with 5,000 free credits, no card required.",
      link: START_FREE,
    },
  },
  {
    slug: "study-timetable",
    category: "exam-prep",
    title: "How to Make a Study Timetable That Works",
    description:
      "A step-by-step way to build a study timetable for school: list your chapters, rank them by weakness, block short sessions and leave room to review.",
    h1: "How to Make a Study Timetable That Actually Works",
    label: "How to Make a Study Timetable",
    excerpt:
      "Plan chapters instead of hours: rank them by weakness, block short sessions, bring each chapter back and review weekly.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "A study timetable that works starts with a list of every chapter to cover, ranked from weakest to strongest. Block short, focused sessions on fixed days, give weak chapters more slots, mix subjects across the week and keep one slot each week to review earlier chapters. Then adjust the timetable at the end of every week.",
    takeaways: [
      "A study timetable should be built from chapters to cover, not hours to fill.",
      "Weak chapters need more slots in a study timetable than strong chapters.",
      "Short sessions spread across the week are easier to keep up than a few long ones.",
      "Dunlosky and colleagues (2013) rated distributed practice, spreading study over separate sessions, as a high-utility study technique.",
      "A study timetable needs a weekly review slot and a weekly check to change what is not working.",
    ],
    sections: [
      {
        id: "why-timetables-fail",
        heading: "Why do most study timetables stop working?",
        blocks: [
          {
            kind: "p",
            text: 'Most study timetables stop working because they plan hours instead of tasks and leave no room for real life. A grid that says "Science, 6 to 8 pm" every day does not say which chapter, what to do with it or when to review it. When one evening goes wrong, the whole plan falls behind and gets dropped.',
          },
          {
            kind: "p",
            text: "A timetable can also fail by being too ambitious. A plan that fills every free evening leaves no slack, so the first busy week breaks it, and leaving some evenings free makes the rest of the plan easier to keep.",
          },
          {
            kind: "p",
            text: "A timetable that lasts plans specific chapters in short sessions, leaves gaps for review and catching up, and gets adjusted every week.",
          },
        ],
      },
      {
        id: "step-by-step",
        heading: "How do you make a study timetable, step by step?",
        blocks: [
          {
            kind: "p",
            text: "Start with the chapters, not the clock. These steps show how to make a study timetable that fits around school and everything else in the week.",
          },
          {
            kind: "steps",
            items: [
              "**List every chapter** for each subject from the syllabus or the contents pages.",
              "**Rank each chapter** red (weak), amber (some gaps) or green (strong), using end-of-chapter questions as the test.",
              "**Mark fixed commitments** for the week: school, travel, activities, meals and family time.",
              "**Find the free slots** that are left and choose the ones that can be kept every week.",
              '**Block short sessions** into those slots, each with one chapter and one task, such as "Acids, bases and salts: make question notes".',
              "**Give red chapters more slots** than amber or green ones.",
              "**Keep one review slot** each week, plus a buffer slot to catch up on anything missed.",
            ],
          },
        ],
      },
      {
        id: "session-length",
        heading: "How long should each study session be?",
        blocks: [
          {
            kind: "p",
            text: "Each session should be long enough to finish one task on one chapter and short enough to stay focused throughout. Somewhere between half an hour and an hour is a sensible starting point, adjusted to how long the student can concentrate.",
          },
          {
            kind: "p",
            text: "End each session with a few minutes of self-testing, book closed. It shows what stuck and gives the next session on that chapter a clear starting point. It can also help to put the hardest task first in a session, while attention is fresh, and leave the easier review for the end.",
          },
        ],
      },
      {
        id: "spacing",
        heading: "Why should chapters come back more than once?",
        blocks: [
          {
            kind: "p",
            text: "Chapters should come back across several sessions because study spread over time has stronger research support than cramming. Dunlosky et al. (2013) rated distributed practice as high utility, one of only two techniques to get that rating in their review of ten. Cepeda et al. (2006) combined results from 317 experiments and found that the gap between sessions giving the best retention grew longer as the time until the final test grew longer.",
          },
          {
            kind: "p",
            text: "In practice, a chapter studied on Monday should reappear later that week and again the week after, not be ticked off and left. Our guide to [spaced repetition](/blog/spaced-repetition) explains how to set the gaps.",
          },
        ],
      },
      {
        id: "sample-timetable",
        heading: "What does a sample weekly study timetable look like?",
        blocks: [
          {
            kind: "p",
            text: "Here is an example study schedule for students during a school week, with one session most days. The subjects and chapters are placeholders, so swap in your own and fit the times around the school day.",
          },
          {
            kind: "table",
            caption:
              "Example weekly study timetable (a sample only; adjust it to your own chapters and school day)",
            head: ["Day", "Session", "Why it's there"],
            rows: [
              [
                "Monday",
                "Maths, red chapter: worked examples",
                "The weakest chapter gets the first slot",
              ],
              [
                "Tuesday",
                "Science, red chapter: question-and-answer notes",
                "A second weak chapter, in a different subject",
              ],
              [
                "Wednesday",
                "History, amber chapter: outline notes",
                "Amber chapters still get regular time",
              ],
              [
                "Thursday",
                "Maths, Monday's chapter: self-test from notes",
                "Brings Monday's chapter back after a gap",
              ],
              [
                "Friday",
                "Science, Tuesday's chapter: self-test from notes",
                "The same idea, for science",
              ],
              [
                "Saturday",
                "Mixed questions from last week's chapters, then a green chapter review",
                "The weekly review slot",
              ],
              [
                "Sunday",
                "Buffer slot, then a short plan for next week",
                "Catches up anything missed",
              ],
            ],
          },
          {
            kind: "p",
            text: "Each red chapter appears twice in the week, a few days apart, and Saturday mixes earlier chapters together. Green chapters get less time but are not dropped.",
          },
        ],
      },
      {
        id: "keep-it-going",
        heading: "How do you keep a study timetable going?",
        blocks: [
          {
            kind: "p",
            text: "Review the timetable once a week and change it based on what actually happened. If a red chapter now answers well, move it to amber; if a slot is missed every week, move it to a time that works.",
          },
          {
            kind: "list",
            items: [
              "**Keep it visible.** A printed copy on the wall or a shared calendar is easier to follow than a plan in a notebook.",
              '**Tick off tasks, not hours.** Finishing "self-test on chapter 4" is a clearer win than sitting at a desk for an hour.',
              "**Agree it at home.** When a parent and student set the timetable together, both know what each evening is for, which makes it easier to stick to.",
              "**Use the buffer.** A missed session moves to the buffer slot instead of pushing the whole week back.",
              "**Switch plans before exams.** As exams get closer, move to the phases in our [board exam revision plan](/blog/board-exam-revision-plan), with more practice papers.",
            ],
          },
          {
            kind: "p",
            text: "More planning guides are in our [exam prep section](/blog).",
          },
        ],
      },
      {
        id: "studymate",
        heading: "Can StudyMate help with a study timetable?",
        blocks: [
          {
            kind: "p",
            text: 'StudyMate AI, our product, can supply the ranking step. Its progress reports show how a student has performed in each chapter and give a "what to study next" list with the weakest chapter first, which can decide which chapters get the red slots. Practice papers from any chapter, with instant evaluation, fit the self-test sessions. Our [exam revision page](/exam-revision) shows how that works across a revision period.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How many hours a day should a student study?",
        a: "There is no single right number for every student. Plan by chapters and tasks instead of hours, keep sessions short enough to stay focused and leave time for rest and other activities. The school may also suggest a homework time for the student's year.",
      },
      {
        q: "Should a study timetable change every week?",
        a: "It should be checked every week and changed where needed. Chapters move between red, amber and green as they are learned, and missed slots show which times do not work. The structure can stay the same while the chapters in it change.",
      },
      {
        q: "Is it better to study one subject a day or mix subjects?",
        a: "Mixing subjects across the week fits the research on spacing better, because each chapter comes back after a gap and no subject sits untouched for long. Within a single session, keeping to one chapter and one task helps focus.",
      },
      {
        q: "What should go in a study timetable for exams?",
        a: "Every chapter to cover, ranked by weakness, plus practice papers, mistake review and a weekly review slot. Closer to the exam, practice papers take up more of the timetable and new chapters drop out.",
      },
    ],
    sources: [
      DUNLOSKY_2013,
      {
        title: "Distributed practice in verbal recall tasks: A review and quantitative synthesis",
        publisher: "Cepeda, Pashler, Vul, Wixted & Rohrer",
        year: "2006",
        url: "https://doi.org/10.1037/0033-2909.132.3.354",
      },
    ],
    related: ["board-exam-revision-plan", "spaced-repetition", "practice-papers-before-exams"],
    cta: {
      heading: "Start the Timetable From the Weakest Chapter",
      text: "StudyMate shows how your child is doing in each chapter and lists what to study next, weakest first, so the first slots in the timetable go where they are needed. New accounts start with 5,000 free credits, no card required.",
      link: START_FREE,
    },
  },
];
