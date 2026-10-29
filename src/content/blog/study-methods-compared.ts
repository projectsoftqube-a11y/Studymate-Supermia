import { APP_URL } from "@/lib/site";
import type { BlogPost } from "@/content/blog/types";

/**
 * "Study Methods Compared": the hub post for the study-skills guides.
 *
 * Built around one primary source, Dunlosky et al. (2013), a review of ten
 * learning techniques that rated each one's utility as high, moderate or low.
 * The table reproduces those ratings only; the DOI was verified against
 * Crossref (title, authors, journal, year). Techniques the review did not
 * cover (the Feynman technique, the Pomodoro technique) are marked "not rated"
 * rather than given a rating the paper does not contain.
 */
export const STUDY_METHODS_COMPARED: BlogPost = {
  slug: "study-methods-compared",
  category: "study-skills",
  title: "Study Methods Compared: What the Research Says",
  description:
    "Ten common study methods compared by how well the research supports them, from practice testing and spacing to highlighting and rereading.",
  h1: "Study Methods Compared: Which Techniques Does the Research Support?",
  label: "Study Methods Compared",
  excerpt:
    "Practice testing and spaced review have the strongest research behind them. Highlighting and rereading have the weakest.",
  published: "2026-10-28",
  modified: "2026-10-28",
  answer:
    "The study methods with the strongest research support are practice testing and spacing review out over time. A 2013 review of ten techniques by Dunlosky and colleagues rated both as high utility, rated self-explanation and interleaving as moderate, and rated highlighting, summarizing and rereading as low.",
  takeaways: [
    "Practice testing, also called active recall, received the review's highest utility rating.",
    "Spreading study sessions out over days and weeks received the same high rating.",
    "Highlighting and rereading feel productive but were rated low utility in the 2013 review.",
    "A low rating means the benefit was limited or inconsistent across students and materials, not that the method never helps.",
    "The most useful habit combines two high-rated methods: testing yourself, then testing again a few days later.",
  ],
  sections: [
    {
      id: "what-the-research-reviewed",
      heading: "What Did the Research Actually Compare?",
      blocks: [
        {
          kind: "p",
          text: "The most cited comparison is a 2013 review by John Dunlosky, Katherine Rawson, Elizabeth Marsh, Mitchell Nathan and Daniel Willingham, published in Psychological Science in the Public Interest. The authors looked at ten learning techniques that students commonly use and asked how well each one is supported by research.",
        },
        {
          kind: "p",
          text: "Each technique received a utility rating of high, moderate or low. The rating reflects how well the benefit held up across different kinds of students, study materials, tests and time delays. A technique that helped only in narrow conditions scored lower than one that helped broadly.",
        },
      ],
    },
    {
      id: "comparison-table",
      heading: "Which Study Methods Work Best?",
      blocks: [
        {
          kind: "p",
          text: "Practice testing and distributed practice were the two techniques rated high utility. The table lists all ten techniques from the review, plus two popular methods the review did not cover.",
        },
        {
          kind: "table",
          caption: "Study techniques and their utility rating in Dunlosky et al. (2013)",
          head: ["Technique", "What the student does", "Rating"],
          rows: [
            ["**Practice testing**", "Answers questions from memory instead of rereading", "High"],
            ["**Distributed practice**", "Spreads study of a topic over several sessions", "High"],
            ["**Elaborative interrogation**", "Asks why a fact is true and answers it", "Moderate"],
            [
              "**Self-explanation**",
              "Explains how new information connects to what they know",
              "Moderate",
            ],
            [
              "**Interleaved practice**",
              "Mixes different types of problems in one session",
              "Moderate",
            ],
            ["**Summarization**", "Writes summaries of what was read", "Low"],
            ["**Highlighting**", "Marks key passages while reading", "Low"],
            ["**Keyword mnemonic**", "Links new words to memorable keywords and images", "Low"],
            ["**Imagery for text**", "Forms mental pictures while reading", "Low"],
            ["**Rereading**", "Reads the same material again", "Low"],
            ["**Feynman technique**", "Explains a topic in plain words to find gaps", "Not rated"],
            ["**Pomodoro technique**", "Studies in short timed blocks with breaks", "Not rated"],
          ],
        },
        {
          kind: "p",
          text: "The two unrated methods are not bad methods. They simply were not part of this review, so the table does not give them a rating the paper does not contain.",
        },
      ],
    },
    {
      id: "practice-testing",
      heading: "Why Does Practice Testing Rank So High?",
      blocks: [
        {
          kind: "p",
          text: "Practice testing ranks high because pulling information out of memory strengthens it more than reading it again. Roediger and Karpicke (2006) found that students who took a test on a passage remembered more of it days later than students who spent the same time restudying it.",
        },
        {
          kind: "p",
          text: "The test does not have to be formal. Closing the book and writing down everything you remember, answering the questions at the end of a chapter or taking a practice paper all count. Our guide to [active recall](/blog/active-recall) covers simple ways to do it for school subjects.",
        },
      ],
    },
    {
      id: "distributed-practice",
      heading: "Why Should Study Be Spread Out?",
      blocks: [
        {
          kind: "p",
          text: "Study should be spread out because review split across several sessions holds up better than the same review crammed into one. Dunlosky and colleagues (2013) rated distributed practice high utility for exactly that reason. Cepeda and colleagues (2006) reviewed 317 experiments on spacing and found that the best gap between sessions grows with the time left before the test.",
        },
        {
          kind: "p",
          text: "In practice, that means returning to a chapter a few days after first studying it, then again a week or two later. Our guide to [spaced repetition](/blog/spaced-repetition) includes a simple review schedule you can copy.",
        },
      ],
    },
    {
      id: "low-rated-methods",
      heading: "Are Highlighting and Rereading a Waste of Time?",
      blocks: [
        {
          kind: "p",
          text: "Highlighting and rereading are not a waste of time, but they are weak on their own. The 2013 review rated both low utility because their benefits were small or inconsistent, and because they can make material feel familiar without making it recallable.",
        },
        {
          kind: "p",
          text: "That feeling of familiarity is the trap. A chapter that has been reread three times looks easy, so a student moves on before checking whether they can actually answer questions on it. Rereading works better as a quick step before a self-test than as the whole study session.",
        },
      ],
    },
    {
      id: "combining-methods",
      heading: "How Can a Student Combine the Best Methods?",
      blocks: [
        {
          kind: "p",
          text: "The simplest strong routine combines the two high-rated methods: test yourself on a chapter, then test yourself on it again a few days later. Moderate-rated methods fit inside that routine as ways to fix what the test reveals.",
        },
        {
          kind: "steps",
          items: [
            "**Read the chapter once, with questions in mind.** Our guide on [how to study a textbook chapter](/blog/how-to-study-a-textbook-chapter) walks through this step.",
            "**Test yourself the same day.** Close the book and answer questions from memory.",
            "**Explain what you got wrong.** Work out why the right answer is right, in your own words.",
            "**Test again a few days later.** Mix in questions from earlier chapters as well.",
            "**Keep going on the weakest chapters.** Spend the most time where the results are lowest.",
          ],
        },
        {
          kind: "p",
          text: "StudyMate AI, our product, is built around this loop. It turns any chapter of a student's own textbook into a [practice paper](/features/practice-tests) with instant evaluation, explains wrong answers from the chapter with the page cited, and ranks chapters weakest first so the next session starts in the right place. More guides are in [study skills](/blog).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is the most effective way to study?",
      a: "Research points to practice testing combined with spaced review. Dunlosky and colleagues (2013) rated both high utility, the top rating in their review of ten techniques. Testing yourself on a chapter, then again a few days later, uses both at once.",
    },
    {
      q: "Is rereading notes a good way to revise?",
      a: "Rereading on its own is one of the weaker methods. The 2013 review rated it low utility because it makes material feel familiar without testing whether it can be recalled. It works better as a short step before a self-test.",
    },
    {
      q: "Does highlighting help you remember?",
      a: "Highlighting was rated low utility in the 2013 review, mainly because its benefits were small and inconsistent. Turning the highlighted points into questions to answer later makes much better use of the time.",
    },
    {
      q: "Is the Feynman technique backed by research?",
      a: "The Feynman technique was not part of the 2013 review, so it has no rating there. It overlaps with self-explanation, which the review rated moderate, because both ask the student to explain ideas in their own words.",
    },
  ],
  sources: [
    {
      title: "Improving Students' Learning With Effective Learning Techniques",
      publisher:
        "Dunlosky, Rawson, Marsh, Nathan & Willingham, Psychological Science in the Public Interest",
      year: "2013",
      url: "https://doi.org/10.1177/1529100612453266",
    },
    {
      title: "Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention",
      publisher: "Roediger & Karpicke, Psychological Science",
      year: "2006",
      url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
    },
    {
      title: "Distributed practice in verbal recall tasks: A review and quantitative synthesis",
      publisher: "Cepeda, Pashler, Vul, Wixted & Rohrer, Psychological Bulletin",
      year: "2006",
      url: "https://doi.org/10.1037/0033-2909.132.3.354",
    },
  ],
  related: ["active-recall", "spaced-repetition", "feynman-technique"],
  cta: {
    heading: "Put the Two Best Methods to Work",
    text: "StudyMate turns any chapter into a practice paper and shows which chapters to test again. Parents and older students can set up a free account in about five minutes.",
    link: { label: "Start free", href: APP_URL },
  },
};
