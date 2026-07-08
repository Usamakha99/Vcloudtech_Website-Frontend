import { aboutPageHero } from "@/lib/marketing/about-page-content";

/** Full-width hero — left copy, optimized looping background video. */
export function AboutHero() {
  return (
    <header id="hero" className="about-page__hero" aria-labelledby="about-page-heading">
      <div className="about-page__hero-media" aria-hidden>
        <video
          className="about-page__hero-image about-page__hero-image--gif is-active"
          src={aboutPageHero.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="about-page__hero-overlay" />
      </div>

      <div className="about-page__hero-inner">
        <div className="about-page__hero-content">
          <h1 id="about-page-heading" className="about-page__hero-title">
            <span className="about-page__hero-title-line">{aboutPageHero.titleLines[0]}</span>
            <span className="about-page__hero-title-line">{aboutPageHero.titleLines[1]}</span>
          </h1>
          <p className="about-page__hero-lede">{aboutPageHero.lede}</p>
        </div>
      </div>
    </header>
  );
}
