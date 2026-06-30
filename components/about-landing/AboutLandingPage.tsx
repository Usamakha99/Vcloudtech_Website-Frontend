import { dt } from "@/components/design-test/design-test-theme";
import { OrgMetricsRail } from "@/components/home/sections/about/OrgMetricsRail";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  aboutCta,
  aboutJourney,
  aboutPageHero,
  aboutStats,
  aboutStory,
  aboutValues,
} from "@/lib/design-test/about-page-content";

import { AboutTimeline } from "./AboutTimeline";

import "@/components/home/shared/styles/about-metrics.css";
import "./about-landing.css";

/** About page — SEO content: hero, story, stats, journey, values, CTA. */
export function AboutLandingPage() {
  return (
    <div className="about-page" data-nav-surface="dark">
      {/* Section 1 — Hero */}
      <section id="hero" className="about-page__hero" aria-labelledby="about-page-heading">
        <div className="about-page__hero-inner">
          <p className={`${dt.badge} about-page__badge`}>{aboutPageHero.badge}</p>
          <h1 id="about-page-heading" className="about-page__hero-title">
            {aboutPageHero.titleLead}{" "}
            <span className="about-page__hero-accent">{aboutPageHero.titleAccent}</span>
          </h1>
          <p className="about-page__hero-lede">{aboutPageHero.lede}</p>
        </div>
      </section>

      <div className="about-page__body">
        {/* Section 2 — Our Story */}
        <section className="about-page__section about-page__story" aria-labelledby="about-story-heading">
          <header className="about-page__section-header">
            <p className={`${dt.badge} about-page__badge`}>{aboutStory.badge}</p>
            <h2 id="about-story-heading" className="about-page__section-title">
              {aboutStory.title}
            </h2>
          </header>
          <div className="about-page__story-body">
            {aboutStory.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="about-page__story-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Section 3 — Stats */}
        <section className="about-page__section" aria-label="Company metrics">
          <OrgMetricsRail metrics={aboutStats} className="about-page__metrics" />
        </section>

        {/* Section 4 — Journey timeline */}
        <section className="about-page__section" aria-labelledby="about-journey-heading">
          <header className="about-page__section-header">
            <p className={`${dt.badge} about-page__badge`}>{aboutJourney.badge}</p>
            <h2 id="about-journey-heading" className="about-page__section-title">
              {aboutJourney.title}
            </h2>
          </header>
          <AboutTimeline milestones={aboutJourney.milestones} />
        </section>

        {/* Section 5 — Core values */}
        <section className="about-page__section" aria-labelledby="about-values-heading">
          <header className="about-page__section-header">
            <p className={`${dt.badge} about-page__badge`}>{aboutValues.badge}</p>
            <h2 id="about-values-heading" className="about-page__section-title">
              {aboutValues.title}
            </h2>
          </header>
          <ul className="about-page__values-grid">
            {aboutValues.items.map((value) => (
              <li key={value.id} className="about-page__value-card">
                <h3 className="about-page__value-title">{value.title}</h3>
                <p className="about-page__value-desc">{value.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6 — CTA */}
        <section className="about-page__cta" aria-labelledby="about-cta-heading">
          <div className="about-page__cta-inner">
            <h2 id="about-cta-heading" className="about-page__cta-title">
              {aboutCta.title}
            </h2>
            <p className="about-page__cta-lede">{aboutCta.lede}</p>
            <ButtonLink href={aboutCta.buttonHref} variant="ctaWhite" className="about-page__cta-btn">
              {aboutCta.buttonLabel}
            </ButtonLink>
          </div>
        </section>
      </div>
    </div>
  );
}
