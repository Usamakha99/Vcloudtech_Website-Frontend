"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { aboutCta } from "@/lib/design-test/about-page-content";

/** Full-width premium CTA banner. */
export function AboutFinalCta() {
  return (
    <section className="about-page__cta-band" aria-labelledby="about-cta-heading">
      <div className="about-page__cta-band-inner">
        <DtScrollReveal>
          <h2 id="about-cta-heading" className="about-page__cta-title">
            {aboutCta.title}
          </h2>
          <p className="about-page__cta-lede">{aboutCta.lede}</p>
          <ButtonLink
            href={aboutCta.buttonHref}
            variant="ctaWhite"
            className="about-page__btn about-page__btn--primary about-page__cta-btn"
          >
            {aboutCta.buttonLabel}
          </ButtonLink>
        </DtScrollReveal>
      </div>
    </section>
  );
}
