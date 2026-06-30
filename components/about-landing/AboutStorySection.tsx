"use client";

import Image from "next/image";

import { dt } from "@/components/design-test/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";

/** Story section — centered header, text alongside illustration. */
export function AboutStorySection({
  badge,
  title,
  paragraphs,
  image,
  imageAlt,
}: {
  badge: string;
  title: string;
  paragraphs: readonly string[];
  image: string;
  imageAlt: string;
}) {
  return (
    <section
      id="about-story"
      className="about-page__section about-page__story scroll-mt-28"
      aria-labelledby="about-story-heading"
    >
      <DtScrollReveal>
        <div className="about-page__story-header">
          <p className={`${dt.badge} about-page__badge about-page__badge--accent`}>{badge}</p>
          <h2 id="about-story-heading" className="about-page__section-title about-page__story-title">
            {title}
          </h2>
        </div>
      </DtScrollReveal>

      <div className="about-page__story-grid">
        <div className="about-page__story-copy">
          <DtScrollReveal delay={0.08}>
            <div className="about-page__story-body">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="about-page__story-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </DtScrollReveal>
        </div>

        <DtScrollReveal delay={0.12} className="about-page__story-visual-wrap">
          <figure className="about-page__story-visual">
            <Image
              src={image}
              alt={imageAlt}
              width={960}
              height={600}
              className="about-page__story-image"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </figure>
        </DtScrollReveal>
      </div>
    </section>
  );
}
