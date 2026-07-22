"use client";

import { dt } from "@/components/marketing/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import type { aboutValues } from "@/lib/marketing/about-page-content";
import { publicAssets } from "@/lib/public-assets";

type Props = {
  badge: string;
  title: string;
  items: typeof aboutValues.items;
};

const iconById: Record<
  (typeof aboutValues.items)[number]["id"],
  keyof typeof publicAssets.values
> = {
  reliability: "reliability",
  integrity: "integrity",
  innovation: "innovation",
  security: "security",
};

/** Core values — premium enterprise split cards with custom icons. */
export function AboutValuesSection({ badge, title, items }: Props) {
  return (
    <section
      className="about-page__section about-page__values"
      aria-labelledby="about-values-heading"
    >
      <header className="about-page__section-header">
        <DtScrollReveal>
          <p className={`${dt.badge} about-page__badge about-page__badge--accent`}>{badge}</p>
          <h2 id="about-values-heading" className="about-page__section-title">
            {title}
          </h2>
        </DtScrollReveal>
      </header>

      <ul className="about-page__values-grid">
        {items.map((value, index) => (
          <li key={value.id}>
            <DtScrollReveal delay={index * 0.1}>
              <article className="about-page__value-card" tabIndex={0}>
                <span className="about-page__value-card-glow" aria-hidden />
                <div className="about-page__value-card-media" aria-hidden>
                  <span className="about-page__value-card-media-aura" />
                  {/* Native img keeps PNG alpha; next/image can flatten transparent PNGs */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={`about-page__value-card-media-img about-page__value-card-media-img--${value.id}`}
                    src={publicAssets.values[iconById[value.id]]}
                    alt=""
                    width={320}
                    height={292}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div className="about-page__value-card-divider" aria-hidden />
                <div className="about-page__value-card-body">
                  <h3 className="about-page__value-title">{value.title}</h3>
                  <p className="about-page__value-desc">{value.description}</p>
                </div>
              </article>
            </DtScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
