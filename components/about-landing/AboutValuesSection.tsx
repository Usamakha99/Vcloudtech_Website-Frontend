"use client";

import { dt } from "@/components/design-test/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import {
  HandshakeIcon,
  RocketIcon,
  ServerIcon,
  ShieldIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";
import type { aboutValues } from "@/lib/design-test/about-page-content";

const valueIcons: Record<(typeof aboutValues.items)[number]["icon"], SectionIcon> = {
  server: ServerIcon,
  handshake: HandshakeIcon,
  rocket: RocketIcon,
  shield: ShieldIcon,
};

type Props = {
  badge: string;
  title: string;
  items: typeof aboutValues.items;
};

/** Core values — premium feature cards with icons. */
export function AboutValuesSection({ badge, title, items }: Props) {
  return (
    <section className="about-page__section" aria-labelledby="about-values-heading">
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
          const Icon = valueIcons[value.icon];
          return (
            <li key={value.id}>
              <DtScrollReveal delay={index * 0.07}>
                <article className="about-page__value-card">
                  <div className="about-page__value-icon" aria-hidden>
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
