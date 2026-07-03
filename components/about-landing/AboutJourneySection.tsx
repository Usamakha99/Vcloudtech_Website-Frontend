"use client";

import { dt } from "@/components/marketing/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";

import { AboutTimeline } from "./AboutTimeline";

type Milestone = {
  id: string;
  year: string;
  description: string;
};

type Props = {
  badge: string;
  title: string;
  milestones: readonly Milestone[];
};

/** Company journey — header + horizontal timeline. */
export function AboutJourneySection({ badge, title, milestones }: Props) {
  return (
    <section className="about-page__section about-page__journey" aria-labelledby="about-journey-heading">
      <header className="about-page__section-header">
        <DtScrollReveal>
          <p className={`${dt.badge} about-page__badge about-page__badge--accent`}>{badge}</p>
          <h2 id="about-journey-heading" className="about-page__section-title">
            {title}
          </h2>
        </DtScrollReveal>
      </header>
      <AboutTimeline milestones={milestones} />
    </section>
  );
}
