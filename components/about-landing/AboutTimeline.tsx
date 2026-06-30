import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";

type Milestone = {
  id: string;
  year: string;
  description: string;
};

type Props = {
  milestones: readonly Milestone[];
};

/** Continuous marquee timeline — same motion pattern as trusted client logos. */
export function AboutTimeline({ milestones }: Props) {
  const marqueeItems = [...milestones, ...milestones];

  return (
    <DtScrollReveal delay={0.06}>
      <div className="about-page__timeline-marquee" aria-label="Company journey timeline">
        <span className="about-page__timeline-fade about-page__timeline-fade--left" aria-hidden />
        <span className="about-page__timeline-fade about-page__timeline-fade--right" aria-hidden />

        <div className="about-page__timeline-marquee-group">
          <ul className="about-page__timeline-marquee-track">
            {marqueeItems.map((milestone, index) => (
              <li key={`${milestone.id}-${index}`} className="about-page__timeline-marquee-item">
                <article
                  className="about-page__timeline-card"
                  aria-label={`${milestone.year}: ${milestone.description}`}
                  aria-hidden={index >= milestones.length ? true : undefined}
                >
                  <span className="about-page__timeline-index" aria-hidden>
                    {String((index % milestones.length) + 1).padStart(2, "0")}
                  </span>
                  <h3 className="about-page__timeline-year">{milestone.year}</h3>
                  <p className="about-page__timeline-desc">{milestone.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DtScrollReveal>
  );
}
