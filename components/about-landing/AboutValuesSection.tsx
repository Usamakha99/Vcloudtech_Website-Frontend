"use client";

import { dt } from "@/components/marketing/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import type { aboutValues } from "@/lib/marketing/about-page-content";

import { VALUE_ICONS } from "./ValueIcons";

type Props = {
  badge: string;
  title: string;
  items: typeof aboutValues.items;
};

const iconById: Record<(typeof aboutValues.items)[number]["id"], keyof typeof VALUE_ICONS> = {
  reliability: "reliability",
  integrity: "integrity",
  innovation: "innovation",
  security: "security",
};

/** Core values — minimal premium panels. */
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
        {items.map((value, index) => {
          const Icon = VALUE_ICONS[iconById[value.id]];
          return (
            <li key={value.id}>
              <DtScrollReveal delay={index * 0.07}>
                <article className="about-page__value-card" tabIndex={0}>
                  <div className="about-page__value-card-shine" aria-hidden />
                  <div className="about-page__value-mark" aria-hidden>
                    <Icon />
                  </div>
                  <h3 className="about-page__value-title">{value.title}</h3>
                  <p className="about-page__value-desc">{value.description}</p>
                </article>
              </DtScrollReveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
