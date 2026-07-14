"use client";

import Image from "next/image";

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
            <DtScrollReveal delay={index * 0.07}>
              <article className="about-page__value-card" tabIndex={0}>
                <div className="about-page__value-card-media" aria-hidden>
                  <Image
                    src={publicAssets.values[iconById[value.id]]}
                    alt=""
                    fill
                    className="about-page__value-card-media-img"
                    sizes="(max-width: 767px) 100vw, 30vw"
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
