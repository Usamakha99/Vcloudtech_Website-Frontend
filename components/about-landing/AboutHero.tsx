import Image from "next/image";

import { aboutPageHero } from "@/lib/design-test/about-page-content";

/** Centered text hero with full-width background image. */
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
          <h1 id="about-page-heading" className="about-page__hero-title">
            {aboutPageHero.titlePrefix}{" "}
            <span className="about-page__hero-accent">{aboutPageHero.titleAccent}</span>
          </h1>
          <p className="about-page__hero-lede">{aboutPageHero.lede}</p>
        </div>
      </div>
    </header>
  );
}
