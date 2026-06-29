"use client";

import Link from "next/link";
import { useState } from "react";

import { HERO_SLIDES, HeroCarousel } from "@/components/home/sections/hero/HeroCarousel";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  offsetForFixedHeader?: boolean;
  fullPageGradient?: boolean;
};

export function CarouselHeroSection({
  offsetForFixedHeader = true,
  fullPageGradient = false,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = HERO_SLIDES[activeIndex];

  return (
    <section
      className={`hero-test-hero-section--carousel ${
        fullPageGradient ? "bg-transparent" : "hero-test-gradient"
      } ${offsetForFixedHeader ? "hero-test-hero-section--offset-nav" : ""}`}
      aria-labelledby="hero-test-heading"
    >
      <div className="hero-test-hero-media">
        <HeroCarousel onActiveIndexChange={setActiveIndex} />
      </div>

      <div className="hero-test-hero-scrim" aria-hidden />

      <div className="hero-test-hero-overlay">
        <div className="hero-test-hero-content">
          <p className="hero-test-fade-in hero-test-hero-badge">
            <span className="hero-test-hero-badge__dot" aria-hidden />
            Trusted enterprise technology partner
          </p>

          <h1 id="hero-test-heading" className="hero-test-fade-in hero-test-fade-in-delay-1 hero-test-hero-title">
            {slide.headline}
          </h1>

          <p className="hero-test-fade-in hero-test-fade-in-delay-2 hero-test-hero-desc">{slide.description}</p>

          <div className="hero-test-fade-in hero-test-fade-in-delay-3 hero-test-hero-actions">
            <ButtonLink href={slide.primaryCta.href} variant="ctaWhite" className="hero-test-hero-cta-primary">
              {slide.primaryCta.label}
            </ButtonLink>
            <Link href={slide.secondaryCta.href} className="hero-test-hero-cta-secondary">
              {slide.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
