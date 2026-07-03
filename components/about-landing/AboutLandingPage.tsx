import {
  aboutJourney,
  aboutStats,
  aboutStory,
  aboutValues,
} from "@/lib/marketing/about-page-content";

import { AboutHero } from "./AboutHero";
import { AboutJourneySection } from "./AboutJourneySection";
import { AboutStatsGrid } from "./AboutStatsGrid";
import { AboutStorySection } from "./AboutStorySection";
import { AboutValuesSection } from "./AboutValuesSection";

import "./about-landing.css";

/** Enterprise About Us landing page — hero, story, stats, journey, values, CTA. */
export function AboutLandingPage() {
  return (
    <main className="about-page" data-nav-surface="dark">
      <AboutHero />

      <AboutStatsGrid stats={aboutStats} />

      <div className="about-page__body">
        <AboutStorySection
          badge={aboutStory.badge}
          title={aboutStory.title}
          titleLines={aboutStory.titleLines}
          paragraphs={aboutStory.paragraphs}
          image={aboutStory.image}
          imageAlt={aboutStory.imageAlt}
        />

        <AboutJourneySection
          badge={aboutJourney.badge}
          title={aboutJourney.title}
          milestones={aboutJourney.milestones}
        />

        <AboutValuesSection
          badge={aboutValues.badge}
          title={aboutValues.title}
          items={aboutValues.items}
        />
      </div>
    </main>
  );
}
