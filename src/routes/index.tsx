import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { resetRefreshLatch } from "@/lib/scroll-refresh";
import { SiteHeader } from "@/components/sections/SiteHeader";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AnalyticsSection from "@/components/sections/AnalyticsSection";
import ChatTextbookSection from "@/components/sections/ChatTextbookSection";
import AdaptiveSection from "@/components/sections/AdaptiveSection";
import FAQSection from "@/components/sections/FAQSection";
import ClosingCTASection from "@/components/sections/ClosingCTASection";
import Footer from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

/**
 * The page is deliberately short.
 *
 * Five sections were removed rather than rebuilt, because each repeated ground
 * already covered and every repetition weakens the section that said it first:
 *
 *   Features       nine cards restating the hero strip, How It Works, Chat and
 *                  Analytics, with nothing new in any of them
 *   Journey        the same overwhelmed-to-confident arc the Problem section
 *                  tells, but as an abstract diagram instead of with the renders
 *   Walkthrough    hand-built fake UI, now beaten by the real transcript in Chat
 *                  and the real dashboard in Analytics
 *   LearnYourWay   a four-learner-types claim the product does not actually make
 *   MeetStudyMate  a "meet your tutor" beat with no distinct argument left once
 *                  Chat shows the tutor working
 *
 * Testimonials is also out of the page for now: its quotes were placeholders,
 * and invented endorsements attributed to students are not something to ship.
 * The file is kept so real quotes can drop straight back in.
 */
function Index() {
  /* Lenis drives the whole page, so it is installed once at the route level
     rather than inside any one section. */
  useSmoothScroll();

  /* The font-ready refresh is latched once per page load so that nine sections
     asking for it produce one refresh rather than nine racing ones. Clear the
     latch on unmount, or navigating away and back would skip it entirely. */
  useEffect(() => resetRefreshLatch, []);

  return (
    <main>
      {/* Header is mounted here rather than inside the hero, so it survives the
          hero being swapped or removed. It is `fixed`, and the hero's video panel
          sits beneath it by design — no spacer, the copy is centred in the panel
          and clears the pill on its own. */}
      <SiteHeader />

      {/* The argument, in order: what it is, why you need it, how to start,
          whether it works, and finally the thing itself working. */}
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <AnalyticsSection />
      <ChatTextbookSection />
      {/* Sixth: Chat shows the tutor answering one question, which raises the
          obvious follow-up of what happens on the fifth, or on a wrong answer.
          This demonstrates the adapting rather than asserting it. */}
      {/* The adaptive quiz closes the page: finishing it ends on an invitation
          to carry on practising in the real product, so the last thing a reader
          does is the conversion step. */}
      <AdaptiveSection />
      {/* Last: the quiz ends by inviting a signup, and the gap between finishing
          it and clicking is where unspoken doubts surface. These answer them,
          and carry the page's FAQPage structured data. */}
      <FAQSection />
      {/* The close. Carries `id="start"`, so every "Start free" button on the
          page scrolls here rather than to a dead anchor. */}
      <ClosingCTASection />
      <Footer />
    </main>
  );
}
