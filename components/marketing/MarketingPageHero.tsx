import Image from "next/image";

import "./marketing-page-hero.css";

type MarketingPageHeroProps = {
  title: string;
  lede?: string;
  image: string;
  imageAlt?: string;
  headingId: string;
};

/** Full-width marketing hero — image background, left gradient, left-aligned title (matches homepage inset). */
export function MarketingPageHero({
  title,
  lede,
  image,
  imageAlt = "",
  headingId,
}: MarketingPageHeroProps) {
  return (
    <section id="hero" className="marketing-page__hero" aria-labelledby={headingId}>
      <div className="marketing-page__hero-media" aria-hidden>
        <Image
          src={image}
          alt={imageAlt}
          width={1920}
          height={800}
          priority
          className="marketing-page__hero-image"
          sizes="100vw"
        />
        <div className="marketing-page__hero-overlay" />
      </div>

      <div className="marketing-page__hero-inner">
        <div className="marketing-page__hero-content">
          <h1 id={headingId} className="marketing-page__hero-title">
            {title}
          </h1>
          {lede ? <p className="marketing-page__hero-lede">{lede}</p> : null}
        </div>
      </div>
    </section>
  );
}
