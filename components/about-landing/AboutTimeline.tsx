import type { CSSProperties } from "react";

import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";

type Milestone = {
  id: string;
  year: string;
  description: string;
};

type Props = {
  milestones: readonly Milestone[];
};

/** Isometric 3D staircase — theme-aligned journey milestones. */
export function AboutTimeline({ milestones }: Props) {
  return (
    <DtScrollReveal delay={0.06}>
      <div className="about-page__iso-stairs" aria-label="Company journey timeline">
        <ol className="about-page__iso-stairs-track">
          {milestones.map((milestone, index) => (
            <li
              key={milestone.id}
              className="about-page__iso-step"
              style={{ "--step": index } as CSSProperties}
            >
              <article
                className="about-page__iso-step-copy"
                aria-label={`${milestone.year}: ${milestone.description}`}
              >
                <span className="about-page__iso-step-badge" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="about-page__iso-step-title">{milestone.year}</h3>
                <p className="about-page__iso-step-desc">{milestone.description}</p>
              </article>

              <div className="about-page__iso-step-block" aria-hidden>
                <div className="about-page__iso-step-top">
                  <span>{index + 1}</span>
                </div>
                <div className="about-page__iso-step-front">
                  <span className="about-page__iso-step-label">{milestone.year}</span>
                </div>
                <div className="about-page__iso-step-side" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </DtScrollReveal>
  );
}
