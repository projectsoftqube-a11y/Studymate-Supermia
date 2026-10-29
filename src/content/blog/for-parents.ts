import { APP_URL } from "@/lib/site";
import type { BlogPost } from "@/content/blog/types";

/**
 * The four For Parents posts: ai-for-homework-without-cheating,
 * track-your-childs-progress, help-with-a-hard-chapter and ai-tutor-vs-chatbot.
 * Written for parents, with CTAs addressed to adults. Product claims come only
 * from Fact Sheet Part A (answers from the open chapter with the page cited,
 * explains then tests, three practice levels, practice papers with instant
 * evaluation, a progress report in the student's account with a weakest-first
 * study list, 5,000 free credits with no card). No parent dashboard or parent
 * login, uploads, flashcards, named boards, school policies or outcome claims.
 * Every research source was checked against Crossref (title, authors, year)
 * before use, and findings are described qualitatively, as their abstracts state
 * them. The AI tutor comparison describes general chatbots as a category and
 * names no product.
 */

const START_FREE = { label: "Start free", href: APP_URL } as const;

const DUNLOSKY_2013 = {
  title: "Improving Students' Learning With Effective Learning Techniques",
  publisher:
    "Dunlosky, Rawson, Marsh, Nathan & Willingham, Psychological Science in the Public Interest",
  year: "2013",
  url: "https://doi.org/10.1177/1529100612453266",
};

const BASTANI_2025 = {
  title:
    "Generative AI without guardrails can harm learning: Evidence from high school mathematics",
  publisher:
    "Bastani, Bastani, Sungu, Ge, Kabakcı & Mariman, Proceedings of the National Academy of Sciences",
  year: "2025",
  url: "https://doi.org/10.1073/pnas.2422633122",
};

const HILL_TYSON_2009 = {
  title:
    "Parental involvement in middle school: A meta-analytic assessment of the strategies that promote achievement",
  publisher: "Hill & Tyson, Developmental Psychology",
  year: "2009",
  url: "https://doi.org/10.1037/a0015362",
};

export const FOR_PARENTS: BlogPost[] = [
  {
    slug: "ai-for-homework-without-cheating",
    category: "for-parents",
    title: "Using AI for Homework Without Cheating: A Parent's Guide",
    description:
      "Where AI helps with homework and where it crosses the line: explanations versus finished answers, school rules and house rules parents can set.",
    h1: "How Students Can Use AI for Homework Without Cheating: A Parent's Guide",
    label: "AI for Homework Without Cheating",
    excerpt:
      "Where AI helps with homework, where it crosses the line and the simple house rules that keep the learning with your child.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "Students can use AI to help with homework without plagiarizing when the AI explains ideas, asks practice questions or checks their reasoning, and the work handed in is still their own. It becomes cheating when the AI writes the answer, essay or worked problem that gets submitted. Each school sets its own AI rules, so check them first.",
    takeaways: [
      "Using AI for homework is not cheating in itself, but handing in work an AI produced as your own usually is.",
      "The clearest line for families is between asking AI to explain something and asking AI to do the task.",
      "Every school sets its own rules on AI, so the school's policy and the teacher have the final word on any assignment.",
      "A few house rules, agreed with your child and written down, make the boundary clear before a deadline makes it blurry.",
      "A field experiment in high school math found that students who leaned on a general chatbot during practice did worse once access was taken away.",
    ],
    sections: [
      {
        id: "is-it-cheating",
        heading: "Is using AI for homework cheating?",
        blocks: [
          {
            kind: "p",
            text: "Using AI for homework is cheating when the AI does the thinking the homework was set to practice, or when the school has said not to use it. Asking an AI to explain photosynthesis in simpler words is a lot like asking an older sibling. Asking it to write the answers to the chapter questions is like copying a friend's notebook.",
          },
          {
            kind: "p",
            text: "A simple test works for most assignments: could your child explain the work and do it again without the AI? If the answer is yes, the AI probably helped them learn. If the answer is no, the AI did the homework and your child only delivered it.",
          },
        ],
      },
      {
        id: "why-answers-hurt",
        heading: "Why do finished answers get in the way of learning?",
        blocks: [
          {
            kind: "p",
            text: "Finished answers skip the practice that homework exists to provide. In a review of ten common study techniques, Dunlosky and colleagues (2013) rated practice testing as one of the two most useful, because the effort of recalling and applying an idea is what makes it last. Copying an answer removes that effort.",
          },
          {
            kind: "p",
            text: "Bastani and colleagues (2025) saw the same pattern with AI. In a field experiment with high school math students, those given a standard chatbot did better on practice problems while they had it, but did worse than students who never had access once it was taken away. A second version, with prompts designed to protect learning, largely avoided that drop. The authors describe students using the open chatbot as a crutch.",
          },
        ],
      },
      {
        id: "ok-vs-crosses-the-line",
        heading: "Which AI uses are OK, and which cross the line?",
        blocks: [
          {
            kind: "p",
            text: "AI use is usually fine when it helps your child understand, and it crosses the line when it produces what they hand in. The table below shows the difference for common homework tasks. Your child's school rules always come first.",
          },
          {
            kind: "table",
            caption: "OK uses vs crosses the line, by homework task",
            head: ["Homework task", "OK uses", "Crosses the line"],
            rows: [
              [
                "Math problems",
                "Explaining a method, then trying a similar problem alone",
                "Pasting in the problem and copying the worked answer",
              ],
              [
                "Essays and written answers",
                "Talking through ideas, asking what a question means",
                "Having AI write or rewrite paragraphs that get submitted",
              ],
              [
                "Chapter questions",
                "Asking where in the chapter a topic is explained",
                "Asking AI for the answers to each question",
              ],
              [
                "Reading a hard chapter",
                "Asking for a simpler explanation or an example",
                "Using an AI summary instead of reading the chapter",
              ],
              [
                "Studying for a test",
                "Asking AI to quiz them on the chapter",
                "Using AI on a take-home test that says no AI",
              ],
              [
                "Checking finished work",
                "Asking whether the reasoning holds up, then fixing it themselves",
                "Letting AI correct and rewrite the work wholesale",
              ],
            ],
          },
          {
            kind: "p",
            text: "If a task falls in between, the honest move is to ask the teacher before starting rather than after.",
          },
        ],
      },
      {
        id: "school-ai-policy",
        heading: "How do you find out your school's AI rules?",
        blocks: [
          {
            kind: "p",
            text: "Start with the school's own documents, then ask the teacher. Look in the student handbook, the class syllabus and the assignment sheet, since rules can differ between schools, between subjects and even between assignments in the same class.",
          },
          {
            kind: "p",
            text: "If nothing is written down, a short message to the teacher settles it. Ask whether AI may be used on homework, for which parts, and whether your child should say how they used it. A teacher who knows the question is coming from home is usually glad to answer.",
          },
          {
            kind: "p",
            text: "Keep a note of the answer where your child can see it, such as on the homework planner. That way the rule doesn't have to be renegotiated every time a new assignment comes home.",
          },
        ],
      },
      {
        id: "house-rules",
        heading: "What AI homework rules can parents set for kids?",
        blocks: [
          {
            kind: "p",
            text: "Good AI homework rules for kids are short, written down and agreed together, so they hold up on a busy school night. Here is an example set to adapt:",
          },
          {
            kind: "steps",
            items: [
              "**School rules come first.** If the teacher says no AI, it's no AI for that assignment.",
              "**Try first, ask second.** Spend a real attempt on the problem before asking AI anything.",
              '**Ask for explanations, not answers.** Questions start with "explain", "give me an example" or "quiz me".',
              "**Your words on the page.** Nothing an AI wrote goes into work that is handed in.",
              "**Be ready to explain.** Any answer should be one you can talk a parent through.",
              "**Say how you used it.** If the school allows AI, note what it was used for.",
            ],
          },
          {
            kind: "p",
            text: "Review the rules at the start of each term, when teachers and subjects change.",
          },
        ],
      },
      {
        id: "signs-ai-did-the-work",
        heading: "How can you tell if AI is doing the homework?",
        blocks: [
          {
            kind: "p",
            text: "The clearest sign is an answer your child can't explain. Other signs are writing that doesn't sound like them, no rough work on a math problem and homework that is suddenly much faster than usual.",
          },
          {
            kind: "p",
            text: "Treat it as a conversation rather than an accusation. Ask your child to walk you through one answer and say where the idea came from. Our guide on [helping with a chapter you don't know yourself](/blog/help-with-a-hard-chapter) has questions that work even when you don't know the subject.",
          },
        ],
      },
      {
        id: "where-studymate-fits",
        heading: "Where does an AI tutor like StudyMate fit?",
        blocks: [
          {
            kind: "p",
            text: "StudyMate AI is our product, and it is built for the explain side of the line. A student asks about the chapter they have open and gets a plain-language explanation from that chapter with the page cited, then can ask to be quizzed on it. See how [chatting with the textbook](/features/chat-with-your-textbook) works, and how it differs from a general chatbot in our [comparison of AI tutors and chatbots](/blog/ai-tutor-vs-chatbot).",
          },
          {
            kind: "p",
            text: "Our [guide for parents](/for-parents) explains how families set it up at home. The school's AI rules still apply, whichever tool your child uses. More guides like this one are in our [For Parents guides](/blog).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can teachers tell if my child used AI for homework?",
        a: "Sometimes, and it is not a good bet. Teachers know how a student writes and works in class, and a short question about the homework quickly shows whether the student understands it. The more useful question at home is whether your child could redo the work without the AI.",
      },
      {
        q: "Is using AI to check grammar plagiarism?",
        a: "Usually not, but it depends on the school's rules and how much the AI changes. Fixing a spelling mistake is different from rewriting sentences. When in doubt, your child should ask the teacher and say what they used.",
      },
      {
        q: "Should I ban AI for homework completely?",
        a: "Not necessarily, unless the school does. A ban is simple to explain, but AI used for explanations and self-quizzing can support studying. Clear house rules about explaining versus answering often work better than a blanket no.",
      },
      {
        q: "What if the teacher's AI rule is unclear?",
        a: "Ask before starting the assignment. Your child can send a short question about what is allowed, or you can. Until the answer comes, the cautious choice is to do the work without AI.",
      },
    ],
    sources: [DUNLOSKY_2013, BASTANI_2025],
    related: ["ai-tutor-vs-chatbot", "help-with-a-hard-chapter", "track-your-childs-progress"],
    cta: {
      heading: "Try an AI Tutor That Explains Instead of Answering",
      text: "Set up a free account with your child, open a chapter they find hard and see how StudyMate explains it with the page cited. New accounts get 5,000 free credits, and no card is required.",
      link: START_FREE,
    },
  },
  {
    slug: "track-your-childs-progress",
    category: "for-parents",
    title: "How to Track Your Child's School Progress",
    description:
      "Simple ways to follow your child's progress chapter by chapter, read test results usefully and turn weak spots into a weekly plan.",
    h1: "How to Track Your Child's Progress in School Without Hovering",
    label: "Track Your Child's Progress",
    excerpt:
      "Follow progress chapter by chapter, read test results as a plan rather than a verdict and keep check-ins short.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "The simplest way to track your child's academic progress is chapter by chapter: which chapters are covered, how each practice test went and which chapter is weakest. A short weekly check-in, looking at results together instead of checking up daily, turns weak spots into next week's study plan without hovering over every assignment.",
    takeaways: [
      "Chapter-level results tell a parent more than one overall grade, because one weak chapter can hide inside a good average.",
      "A short weekly check-in at a set time is easier on parents and children than daily questions about homework.",
      "Test results are most useful when they become a list of what to study next, not a verdict on the child.",
      "A meta-analysis of middle school research found that talking about the value of learning had the strongest link with achievement, while direct homework help did not show a positive link.",
      "School reports and conversations with teachers remain the official picture, and home tracking fills the weeks between them.",
    ],
    sections: [
      {
        id: "what-to-track",
        heading: "What should you track besides grades?",
        blocks: [
          {
            kind: "p",
            text: "Track chapters, not just grades. An overall score says how things are going in general, but chapter results show exactly where the gaps are, and gaps are what a study plan can fix.",
          },
          {
            kind: "table",
            caption: "What to look at, what it tells you and what to do",
            head: ["What to look at", "What it tells you", "What to do"],
            rows: [
              [
                "Chapters covered so far",
                "Whether study is keeping up with class",
                "Note any chapter that hasn't been opened since it was taught",
              ],
              [
                "Score in each chapter",
                "Where understanding is strong or thin",
                "Put the weakest chapter first in next week's plan",
              ],
              [
                "Kinds of mistakes",
                "Careless slips versus a missing idea",
                "Slips need checking habits; missing ideas need the chapter again",
              ],
              [
                "Scores over several tests",
                "The trend, not one good or bad day",
                "Compare a chapter with itself, not with a sibling or classmate",
              ],
              [
                "How regularly they study",
                "Whether the routine is holding",
                "Agree a smaller routine if the current one keeps slipping",
              ],
              [
                "Teacher comments",
                "What the teacher sees in class",
                "Ask your child what they think the comment means",
              ],
            ],
          },
        ],
      },
      {
        id: "read-a-progress-report",
        heading: "How do you read a child progress report usefully?",
        blocks: [
          {
            kind: "p",
            text: "Read a child progress report for patterns, not single numbers. One low score can be a bad day. The same chapter low on two tests is a gap worth planning around.",
          },
          {
            kind: "p",
            text: "Before you react to a result, ask your child what they think happened. They often know whether they ran out of time, misread questions or never really understood the chapter, and each of those needs a different fix.",
          },
          {
            kind: "p",
            text: "It also helps to read results against what is coming next. A chapter that is weak but already tested matters less than a weak chapter that the next test or exam will cover. Ask your child for the test calendar, or check the school's, so that the plan points at the right chapters.",
          },
        ],
      },
      {
        id: "without-hovering",
        heading: "How do you monitor your child's studies without hovering?",
        blocks: [
          {
            kind: "p",
            text: "Set up structure and show interest, then step back from the daily details. Hill and Tyson (2009) reviewed 50 studies of parental involvement in middle school and found that most kinds were positively associated with achievement, except help with homework. Involvement they call academic socialization, such as talking about why learning matters and linking schoolwork to future plans, had the strongest positive association.",
          },
          {
            kind: "p",
            text: "In practice, that means agreeing when and where study happens, asking about it at a set time and letting your child lead the work itself. Checking every assignment each night tends to turn study into something done for a parent rather than for themselves.",
          },
          {
            kind: "p",
            text: "A meta-analysis is a summary of associations, not proof that one approach causes better results, so treat it as a guide rather than a rule. It does match what many parents notice: interest and a predictable routine go further than supervision.",
          },
        ],
      },
      {
        id: "weekly-check-in",
        heading: "What does a weekly check-in look like?",
        blocks: [
          {
            kind: "p",
            text: "A weekly check-in is a short, regular conversation about the week's study, held at the same time each week. A quiet weekend morning often works better than a school night. One simple shape:",
          },
          {
            kind: "steps",
            items: [
              "**Your child goes first.** Ask what went well and what felt hard this week.",
              "**Look at results together.** Go through any test or practice scores chapter by chapter.",
              "**Find the weakest chapter.** Agree on the one or two that need attention.",
              "**Check the calendar.** Note upcoming tests and how many weeks remain before each.",
              "**Agree next week's plan.** Keep it small enough to finish.",
            ],
          },
          {
            kind: "p",
            text: "Keep the check-in short, and end it once the plan is agreed. If a result comes up that worries you, note it and come back to it later rather than turning the check-in into a lecture. The aim is a routine your child doesn't dread, because a routine that is avoided tells you nothing.",
          },
        ],
      },
      {
        id: "weak-spots-to-plan",
        heading: "How do you turn weak spots into a weekly plan?",
        blocks: [
          {
            kind: "p",
            text: "Pick the weakest one or two chapters and give each a short cycle: reread with questions, practice, then test again. Dunlosky and colleagues (2013) rated practice testing and spreading study over time as the two most useful study techniques they reviewed, so a test at the end of the week does more than another reread.",
          },
          {
            kind: "p",
            text: "Our guide to [practice papers before exams](/blog/practice-papers-before-exams) explains how to review mistakes from a test, and the [study timetable guide](/blog/study-timetable) shows how to fit chapters into a week.",
          },
        ],
      },
      {
        id: "talk-to-the-teacher",
        heading: "When should you talk to the teacher?",
        blocks: [
          {
            kind: "p",
            text: "Talk to the teacher when the same gap keeps showing up, or when your child's results drop and you can't tell why. The teacher sees how your child works in class, which home tracking can't show.",
          },
          {
            kind: "p",
            text: "If schoolwork seems to be causing your child real stress, the teacher or school counselor is the right person to talk to. At home, a smaller and clearer plan usually helps more than more study time.",
          },
        ],
      },
      {
        id: "studymate-progress-report",
        heading: "Where does StudyMate's progress report fit?",
        blocks: [
          {
            kind: "p",
            text: "StudyMate AI, our product, keeps a progress report in the student's account. It shows which chapters are covered, the score in each, an average across tests, topics learned and days studied in a row, with a what to study next list that puts the weakest chapter first. Looking through it together after a [chapter practice paper](/features/practice-tests) gives the weekly check-in something concrete to work from.",
          },
          {
            kind: "p",
            text: "For more on helping at home, browse our [guides for parents](/blog) or read how to [help with a chapter you don't know yourself](/blog/help-with-a-hard-chapter).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How often should I check my child's school progress?",
        a: "Once a week works for most families. It is often enough to catch a weak chapter before the test and rare enough that it doesn't feel like checking up. Add a quick look after any big test.",
      },
      {
        q: "What if my child doesn't want me looking at their results?",
        a: "Let them lead the conversation. Ask them to show you one thing that went well and one that didn't, and focus on next week's plan rather than the score. Most children open up more when results lead to help rather than blame.",
      },
      {
        q: "What should I do after a bad test result?",
        a: "Ask what happened before reacting, then find the chapter behind the result. A low score caused by running out of time needs timed practice, while a missing idea needs the chapter studied again. Either way, it becomes the first item in next week's plan.",
      },
      {
        q: "Is a school report card enough to track progress?",
        a: "A report card gives the official picture, but it usually arrives after the chance to fix a gap has passed. Chapter-by-chapter results between reports show where help is needed while there is still time to give it.",
      },
    ],
    sources: [HILL_TYSON_2009, DUNLOSKY_2013],
    related: [
      "help-with-a-hard-chapter",
      "practice-papers-before-exams",
      "ai-for-homework-without-cheating",
    ],
    cta: {
      heading: "Look at Chapter Progress Together",
      text: "Set up a free StudyMate account with your child, take a practice paper on one chapter and read the progress report side by side. New accounts start with 5,000 free credits and no card.",
      link: START_FREE,
    },
  },
  {
    slug: "help-with-a-hard-chapter",
    category: "for-parents",
    title: "How to Help With a Chapter You Don't Know Yourself",
    description:
      "You don't need to know the subject to help your child with a hard chapter. Questions to ask, how to use the textbook and when to step back.",
    h1: "How to Help Your Child With a Hard Chapter When You Don't Know the Subject",
    label: "Help With a Hard Chapter",
    excerpt:
      "Good questions, the textbook and knowing when to step back do more than knowing the subject yourself.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "You can help your child with homework you don't understand by asking questions instead of supplying answers. Ask them to explain what the chapter says, find where the textbook covers the problem and name the exact step that is confusing. A parent's job is to guide the thinking and keep it going, not to teach the subject.",
    takeaways: [
      "A parent does not need to know the subject to help, because good questions do most of the work.",
      "Asking a child to explain a chapter in their own words quickly shows which part they don't yet understand.",
      "The textbook is the best reference at home, because it matches what the class is being taught.",
      "Research on self-explanation found that students prompted to explain a text to themselves gained more understanding than students who read it twice.",
      "Stepping back and passing a question to the teacher is the right move when frustration is bigger than the problem.",
    ],
    sections: [
      {
        id: "can-you-help",
        heading: "Can you help if you don't know the subject?",
        blocks: [
          {
            kind: "p",
            text: "Yes. Helping a child study is more like coaching than teaching: you keep them thinking, organized and calm, and the chapter supplies the content.",
          },
          {
            kind: "p",
            text: "Research backs a lighter touch. In a review of 50 studies of parental involvement in middle school, Hill and Tyson (2009) found that most kinds of involvement were positively associated with achievement, with the exception of help with homework. Showing interest and setting up good habits matter more than knowing the answers.",
          },
          {
            kind: "p",
            text: "Not knowing the subject can even help. A parent who already knows the method is tempted to show it, and the child watches instead of thinks. A parent who doesn't know has to ask, and the child has to explain.",
          },
        ],
      },
      {
        id: "questions-to-ask",
        heading: "What questions should you ask your child about school work?",
        blocks: [
          {
            kind: "p",
            text: "The best questions to ask your child about school work make them do the explaining. None of these needs you to know the subject:",
          },
          {
            kind: "list",
            items: [
              '"What is this chapter mostly about?"',
              '"Can you explain it to me as if I\'ve never heard of it?"',
              '"Which part makes sense, and where does it stop making sense?"',
              '"Where in the textbook is this explained?"',
              '"Is there a worked example in the chapter like this problem?"',
              '"What does this word mean? Is it in the chapter\'s key terms?"',
              '"What have you tried so far?"',
              '"How would you check if your answer is right?"',
            ],
          },
          {
            kind: "p",
            text: "Listen more than you talk. Often a child works out the problem halfway through explaining it.",
          },
        ],
      },
      {
        id: "why-explaining-works",
        heading: "Why does explaining it back work?",
        blocks: [
          {
            kind: "p",
            text: "Explaining an idea in your own words forces you to connect it to what you already know, and gaps show up when the explanation stalls. Chi and colleagues (1994) asked eighth graders to explain each line of a textbook passage on the circulatory system to themselves. They gained more from it than students who read the passage twice, and those who explained the most understood it best.",
          },
          {
            kind: "p",
            text: "An earlier study by Chi and colleagues (1989) found that stronger students generated more of these self-explanations while studying worked examples and kept better track of what they did and didn't understand. Dunlosky and colleagues (2013) rate self-explanation as promising but note that it has not yet been tested widely in classrooms. Our guide to the [Feynman technique](/blog/feynman-technique) turns the same idea into a study routine.",
          },
        ],
      },
      {
        id: "use-the-textbook",
        heading: "How can you use the textbook to help your child study?",
        blocks: [
          {
            kind: "p",
            text: "Use the textbook as the answer key for understanding, because it is what the class is taught from. You can help your child study a hard chapter by finding your way around it together:",
          },
          {
            kind: "steps",
            items: [
              "**Read the headings first.** They show how the chapter is built and where the problem sits.",
              "**Find the key terms.** Many chapters define new words in bold or in a box.",
              "**Look for a worked example.** Match the homework question to the closest one in the chapter.",
              "**Read the figures and captions.** A diagram often explains what a paragraph makes hard.",
              "**Check the end-of-chapter summary.** It names the ideas the chapter expects students to know.",
            ],
          },
          {
            kind: "p",
            text: "Let your child do the finding while you ask where to look. Once they locate the right section, ask them to read it aloud and stop at the first sentence they can't explain. That sentence is usually where the real problem starts, and it is a far smaller problem than \"I don't get any of it\".",
          },
        ],
      },
      {
        id: "what-to-say",
        heading: "What should you say instead of giving the answer?",
        blocks: [
          {
            kind: "p",
            text: "Answer a request for the answer with a question that moves your child one step forward. A few common moments:",
          },
          {
            kind: "table",
            caption: "What to say instead of giving the answer",
            head: ["When your child says", "Instead of", "Try saying"],
            rows: [
              [
                '"I don\'t get any of it."',
                "Explaining the whole chapter",
                '"Show me the last part that made sense."',
              ],
              [
                '"Just tell me the answer."',
                "Giving the answer",
                "\"What's the first step you'd try?\"",
              ],
              ['"Is this right?"', '"Yes" or "No"', '"How could you check it using the chapter?"'],
              [
                '"I\'ve read it three times."',
                '"Read it again."',
                '"Close the book and tell me what you remember."',
              ],
              [
                '"I got it wrong again."',
                "Fixing it for them",
                '"Where did your answer and the example split?"',
              ],
              [
                '"This is pointless."',
                "Arguing about it",
                '"Let\'s do one more, then take a break."',
              ],
            ],
          },
          {
            kind: "p",
            text: "None of these replies needs subject knowledge. Each one hands the next move back to your child, which keeps the thinking with them. If a reply doesn't help after a couple of tries, that is a good sign the question belongs with the teacher.",
          },
        ],
      },
      {
        id: "when-to-step-back",
        heading: "When should you step back?",
        blocks: [
          {
            kind: "p",
            text: "Step back when frustration is bigger than the problem, or when you have both read the section and are still stuck. Pushing on late at night rarely helps, and a tired argument about fractions can make the next session harder.",
          },
          {
            kind: "p",
            text: "Help your child write down exactly where they got stuck and take that question to the teacher. If schoolwork is regularly causing real distress, talk to the teacher or school counselor.",
          },
        ],
      },
      {
        id: "ai-tutor-help",
        heading: "Can an AI tutor help with a hard chapter?",
        blocks: [
          {
            kind: "p",
            text: 'An AI tutor can explain a chapter when no one at home can, as long as it explains rather than answers. StudyMate AI, our product, lets a student [chat with their textbook](/features/chat-with-your-textbook): it answers from the chapter they have open and cites the page, so you can check an explanation against the book without knowing the subject. Follow-ups such as "Explain it simpler" and "Quiz me on this" keep it going.',
          },
          {
            kind: "p",
            text: "Our guide to [using AI for homework without cheating](/blog/ai-for-homework-without-cheating) covers where the line sits, and our [For Parents guides](/blog) cover more ways to help at home.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What if I explain it differently from the teacher?",
        a: "Go with the textbook's method. Different methods can confuse a child, especially in math, so ask your child to show you how the chapter or teacher does it and follow that.",
      },
      {
        q: "Should I learn the topic myself first?",
        a: "It isn't necessary. Skimming the chapter's headings and key terms for a few minutes helps you ask better questions, but your child should do the explaining.",
      },
      {
        q: "How long should I help before stepping back?",
        a: "Stop when the session stops moving forward. If you have both read the section and tried a worked example and are still stuck, write down the question for the teacher and move on.",
      },
      {
        q: "What if my child refuses help?",
        a: "Offer to listen instead of help. Ask them to explain what they are working on, and let them decide whether they want questions. Many children accept an audience more readily than a helper.",
      },
    ],
    sources: [
      {
        title: "Eliciting Self-Explanations Improves Understanding",
        publisher: "Chi, De Leeuw, Chiu & LaVancher, Cognitive Science",
        year: "1994",
        url: "https://doi.org/10.1207/s15516709cog1803_3",
      },
      {
        title:
          "Self-Explanations: How Students Study and Use Examples in Learning to Solve Problems",
        publisher: "Chi, Bassok, Lewis, Reimann & Glaser, Cognitive Science",
        year: "1989",
        url: "https://doi.org/10.1207/s15516709cog1302_1",
      },
      DUNLOSKY_2013,
      HILL_TYSON_2009,
    ],
    related: [
      "ai-for-homework-without-cheating",
      "feynman-technique",
      "track-your-childs-progress",
    ],
    cta: {
      heading: "Open the Chapter Together",
      text: "Set up a free StudyMate account with your child, open the chapter that is giving them trouble and check each answer against the cited page. Setup takes about five minutes and there is nothing to install.",
      link: START_FREE,
    },
  },
  {
    slug: "ai-tutor-vs-chatbot",
    category: "for-parents",
    title: "AI Tutor vs General AI Chatbot: What Parents Should Know",
    description:
      "How an AI tutor that works from your child's textbook differs from a general AI chatbot: where answers come from, checking them and homework rules.",
    h1: "AI Tutor vs General AI Chatbot: What's the Difference for Students?",
    label: "AI Tutor vs General AI Chatbot",
    excerpt:
      "Where the answers come from, whether you can check them and whether the tool teaches or simply answers.",
    published: "2026-10-28",
    modified: "2026-10-28",
    answer:
      "An AI tutor is a learning tool built to teach a set syllabus: it explains, checks understanding and tracks progress. A general AI chatbot is built to answer almost any question from general knowledge, not from your child's textbook. The main differences are where answers come from, whether they can be checked and whether the tool teaches.",
    takeaways: [
      "The biggest difference between an AI tutor and a general chatbot is where the answers come from.",
      "An AI tutor that works from a textbook can cite the page an answer came from, so a parent can check it.",
      "A general chatbot answers whatever it is asked, which can mean handing a student a finished answer.",
      "Any AI, tutor or chatbot, can be wrong, so a source you can check matters more than a confident tone.",
      "School rules on AI apply to both kinds of tool, so check what your child's school allows.",
    ],
    sections: [
      {
        id: "what-is-the-difference",
        heading: "What is the difference between an AI tutor and a chatbot?",
        blocks: [
          {
            kind: "p",
            text: "An AI tutor is designed around learning a subject, while a general chatbot is designed around answering questions. The tutor's job is to help a student understand and remember. The chatbot's job is to respond helpfully to whatever is typed.",
          },
          {
            kind: "p",
            text: "Both can explain things well. The difference shows up in the details parents care about: whether answers match the syllabus, whether they can be checked and whether the student ends up doing the thinking.",
          },
          {
            kind: "p",
            text: "The labels can blur, since a general chatbot may also offer a study or tutoring mode. So rather than going by the label on a tool, look at how it behaves. The questions later in this guide work on any tool, whatever it calls itself.",
          },
        ],
      },
      {
        id: "side-by-side",
        heading: "How do an AI tutor and a chatbot compare side by side?",
        blocks: [
          {
            kind: "p",
            text: "The table compares a general AI chatbot, as a category, with StudyMate AI, the AI tutor we make. General chatbots vary, so treat that column as typical rather than true of every product.",
          },
          {
            kind: "table",
            caption: "AI tutor vs chatbot: a general AI chatbot compared with StudyMate AI",
            head: ["", "General AI chatbot", "StudyMate AI (our AI tutor)"],
            rows: [
              [
                "Where answers come from",
                "General knowledge drawn from the internet",
                "The chapter of the student's syllabus textbook they have open",
              ],
              [
                "Follows the syllabus",
                "Doesn't know which syllabus a student follows",
                "Works within the country, board and class chosen at setup",
              ],
              [
                "Cites a source you can check",
                "Varies; often no source for a specific answer",
                "Cites the textbook page each answer came from",
              ],
              [
                "Explains vs hands over answers",
                "Answers what is asked, including finished homework",
                "Explains the reasoning, then tests understanding",
              ],
              [
                "Practice and progress",
                "Usually none built for a school syllabus",
                "Practice at three levels, chapter practice papers with instant evaluation and a progress report",
              ],
              [
                "Accuracy caveat",
                "Can be wrong, and may sound confident when it is",
                "Can occasionally be wrong too, which is why the page is cited",
              ],
            ],
          },
        ],
      },
      {
        id: "why-source-matters",
        heading: "Why does the source of an answer matter?",
        blocks: [
          {
            kind: "p",
            text: "The source decides whether an answer matches what your child is being taught and whether anyone can check it. A chatbot may explain a topic correctly but in a different way, at a different level or with different terms from the class textbook, which can confuse a student before a test.",
          },
          {
            kind: "p",
            text: "An answer tied to a textbook page can be checked by turning to that page. That puts a parent who doesn't know the subject on equal footing: you don't have to judge the explanation, only compare it with the book.",
          },
          {
            kind: "p",
            text: "It also helps students. Reading the cited page after an explanation sends them back to the textbook they will be tested on, so the AI becomes a guide to the book rather than a replacement for it. Over time, that habit of checking the source is worth as much as any single answer.",
          },
        ],
      },
      {
        id: "does-it-give-answers",
        heading: "Does an AI tutor for students just give the answers?",
        blocks: [
          {
            kind: "p",
            text: "A well-designed AI tutor for students should not; explaining before answering is a large part of what makes it a tutor. Bastani and colleagues (2025) tested this in a field experiment with high school math students. Students given a standard chatbot did better during practice but worse than students without access once it was taken away, while a tutor version with prompts designed to protect learning largely avoided that drop.",
          },
          {
            kind: "p",
            text: "That is one study in one subject, but it fits common sense: the thinking a student skips is learning they miss. Our guide to [using AI for homework without cheating](/blog/ai-for-homework-without-cheating) sets out where the line sits and the house rules families can use.",
          },
        ],
      },
      {
        id: "can-you-trust-it",
        heading: "Can you trust an AI tutor's answers?",
        blocks: [
          {
            kind: "p",
            text: "Trust an AI tutor's answers about as far as you can check them. No AI is right every time, whether it is a tutor or a chatbot, and StudyMate's own terms say AI-generated content may occasionally contain inaccuracies.",
          },
          {
            kind: "p",
            text: "That is why a cited source matters more than a confident tone. Teach your child to treat any AI answer as a first draft: read the page it points to, and ask the teacher when the book and the AI seem to disagree.",
          },
        ],
      },
      {
        id: "when-chatbot-fits",
        heading: "When is a general chatbot the better fit?",
        blocks: [
          {
            kind: "p",
            text: "A general chatbot can be more useful for questions outside the syllabus, such as general curiosity or a topic the textbook doesn't cover. It is broad by design, and that breadth has value when the goal isn't a school test.",
          },
          {
            kind: "p",
            text: "For homework and exam preparation, though, a tool that stays inside the syllabus is easier to check and harder to misuse. Our guide to [free AI study tools](/blog/free-ai-study-tools) explains what different kinds of tools are good for.",
          },
        ],
      },
      {
        id: "how-to-choose",
        heading: "How do you choose between an AI tutor and a chatbot?",
        blocks: [
          {
            kind: "p",
            text: "Ask a few questions of any tool before your child relies on it for schoolwork:",
          },
          {
            kind: "list",
            items: [
              "**Where do the answers come from?** A named source beats general knowledge.",
              "**Can I check an answer?** Look for a page or passage you can read yourself.",
              "**Does it explain before it answers?** Try asking it for a homework answer and see what it does.",
              "**Does it show progress?** Chapter results make it easier to plan the next week.",
              "**What does the school allow?** School AI rules apply whichever tool you choose.",
            ],
          },
          {
            kind: "p",
            text: "To see one answer, try the sample chat on the [StudyMate AI homepage](/), where a Class 8 Mathematics question is answered from the chapter with the page cited. More guides are in our [For Parents section](/blog).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is an AI tutor better than a chatbot for homework?",
        a: "For syllabus homework, a tutor that works from the textbook is usually easier to check and less likely to hand over finished work. A chatbot can still be useful for broader questions. Either way, the school's AI rules come first.",
      },
      {
        q: "Can an AI tutor take the place of a human tutor?",
        a: "No, and it isn't meant to. An AI tutor is available whenever a student is stuck and can explain a chapter or set practice, but teachers and human tutors notice things an AI won't. Many families use both.",
      },
      {
        q: "Do AI tutors make mistakes?",
        a: "Yes, any AI can occasionally be wrong. That is why it helps when an AI tutor cites the source of each answer, so a student or parent can check it against the textbook.",
      },
      {
        q: "What is the difference between an AI tutor and a chatbot in one sentence?",
        a: "An AI tutor is built to teach a syllabus and check understanding, while a general chatbot is built to answer any question from general knowledge. The tutor aims for learning, the chatbot for a response.",
      },
    ],
    sources: [BASTANI_2025],
    related: [
      "ai-for-homework-without-cheating",
      "free-ai-study-tools",
      "help-with-a-hard-chapter",
    ],
    cta: {
      heading: "See How an AI Tutor Answers From the Textbook",
      text: "Set up a free StudyMate account, open a chapter your child is studying and compare an answer with the cited page. New accounts get 5,000 free credits, and no card is required.",
      link: START_FREE,
    },
  },
];
