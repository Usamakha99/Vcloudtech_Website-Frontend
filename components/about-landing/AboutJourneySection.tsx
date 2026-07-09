"use client";

import Image from "next/image";

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

/** Company journey — header + infographic image (timeline visuals paused). */
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
        <Image
          src={publicAssets.about.journeyInfographic}
          alt="VCloud Tech journey — founding through today"
          width={4344}
          height={2153}
          className="about-page__journey-image"
          sizes="(max-width: 768px) 94vw, (max-width: 1200px) 90vw, 1152px"
          priority={false}
        />
      </div>

      {/* <AboutTimeline milestones={milestones} /> */}
    </section>
  );
}
