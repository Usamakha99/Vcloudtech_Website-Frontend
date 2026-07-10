"use client";

import { dt } from "@/components/marketing/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { publicAssets } from "@/lib/public-assets";

// import { AboutTimeline } from "./AboutTimeline";

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

/** Company journey — header + transparent animated infographic (layout unchanged). */
export function AboutJourneySection({ badge, title, milestones: _milestones }: Props) {
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

      <div className="about-page__journey-image-wrap">
        {/* Native img keeps GIF animation + alpha; Next/Image strips animated GIF transparency */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="about-page__journey-image"
          src={publicAssets.about.journeyInfographic}
          width={1694}
          height={928}
          alt="VCloud Tech journey — founding through today"
          decoding="async"
          loading="lazy"
        />
      </div>

      {/* <AboutTimeline milestones={milestones} /> */}
    </section>
  );
}
