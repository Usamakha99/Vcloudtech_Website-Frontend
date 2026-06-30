import Image from "next/image";

import { dt } from "@/components/design-test/design-test-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { aboutPageHero } from "@/lib/design-test/about-page-content";

/** Full-width hero — matches contact page banner layout. */
export function AboutHero() {
  return (
    <header id="hero" className="about-page__hero" aria-labelledby="about-page-heading">
      <div className="about-page__hero-media" aria-hidden>
        <Image
          src={aboutPageHero.image}
          alt=""
          fill
          priority
          className="about-page__hero-image"
          sizes="100vw"
        />
        <div className="about-page__hero-overlay" />
      </div>

      <div className="about-page__hero-inner">
        <div className="about-page__hero-content">
          <p className={`${dt.badge} about-page__badge about-page__badge--accent`}>
            {aboutPageHero.badge}
          </p>
          <h1 id="about-page-heading" className="about-page__hero-title">
            {aboutPageHero.titleLead}{" "}
            <span className="about-page__hero-accent">{aboutPageHero.titleAccent}</span>
          </h1>
          <p className="about-page__hero-lede">{aboutPageHero.lede}</p>
          <div className="about-page__hero-actions">
            <ButtonLink
              href={aboutPageHero.learnMoreHref}
              variant="ctaWhite"
              className="about-page__btn about-page__btn--primary"
            >
              {aboutPageHero.learnMoreLabel}
            </ButtonLink>
            <ButtonLink
              href={aboutPageHero.contactHref}
              variant="outlineOnNavy"
              className="about-page__btn about-page__btn--secondary"
            >
              {aboutPageHero.contactLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
