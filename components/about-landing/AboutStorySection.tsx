"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { dt } from "@/components/design-test/design-test-theme";
import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";

type MilestoneProps = {
  index: number;
  paragraph: string;
  isLast: boolean;
};

function StoryMilestone({ index, paragraph, isLast }: MilestoneProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -8% 0px" });

  return (
    <motion.li
      ref={ref}
      className={`about-page__story-milestone${inView ? " is-active" : ""}${isLast ? " is-last" : ""}`}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
      transition={{
        duration: 0.75,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="about-page__story-milestone-node" aria-hidden>
        <span className="about-page__story-milestone-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="about-page__story-milestone-pulse" />
      </div>
      <div className="about-page__story-milestone-panel">
        <p className="about-page__story-paragraph">{paragraph}</p>
      </div>
      {!isLast ? <span className="about-page__story-milestone-connector" aria-hidden /> : null}
    </motion.li>
  );
}

type VisualProps = {
  image: string;
  imageAlt: string;
};

function StoryVisualStage({ image, imageAlt }: VisualProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "-10% 0px" });
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.55, 0.4]);

  return (
    <div ref={stageRef} className="about-page__story-stage">
      <div className="about-page__story-stage-backdrop" aria-hidden>
        <div className="about-page__story-stage-grid" />
        <div className="about-page__story-stage-dots" />
        <motion.div className="about-page__story-stage-radial" style={{ opacity: glowOpacity }} />
        <div className="about-page__story-stage-glass about-page__story-stage-glass--rear" />
        <div className="about-page__story-stage-glass about-page__story-stage-glass--mid" />
      </div>

      <span className="about-page__story-stage-accent about-page__story-stage-accent--tl" aria-hidden />
      <span className="about-page__story-stage-accent about-page__story-stage-accent--br" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="about-page__story-stage-float" style={{ y: floatY }}>
          <figure className="about-page__story-visual">
            <div className="about-page__story-visual-glow" aria-hidden />
            <div className="about-page__story-visual-frame" aria-hidden />
            <Image
              src={image}
              alt={imageAlt}
              width={960}
              height={600}
              className="about-page__story-image"
              sizes="(max-width: 1023px) 100vw, 46vw"
            />
            <div className="about-page__story-visual-tint" aria-hidden />
          </figure>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Premium enterprise story — vertical journey timeline with layered visual stage. */
export function AboutStorySection({
  badge,
  title,
  titleLines,
  paragraphs,
  image,
  imageAlt,
}: {
  badge: string;
  title: string;
  titleLines: readonly string[];
  paragraphs: readonly string[];
  image: string;
  imageAlt: string;
}) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const journeyInView = useInView(journeyRef, { once: true, margin: "-72px" });

  return (
    <section
      id="about-story"
      className="about-page__section about-page__story scroll-mt-28"
      aria-labelledby="about-story-heading"
    >
      <div className="about-page__story-backdrop" aria-hidden>
        <div className="about-page__story-backdrop-grid" />
        <div className="about-page__story-backdrop-mesh" />
        <div className="about-page__story-backdrop-radial" />
      </div>

      <DtScrollReveal>
        <header className="about-page__section-header about-page__story-header">
          <p className={`${dt.badge} about-page__badge about-page__badge--accent`}>{badge}</p>
          <h2
            id="about-story-heading"
            className="about-page__section-title about-page__story-title"
            aria-label={title}
          >
            {titleLines.map((line) => (
              <span key={line} className="about-page__story-title-line">
                {line}
              </span>
            ))}
          </h2>
        </header>
      </DtScrollReveal>

      <div className="about-page__story-experience">
        <div ref={journeyRef} className="about-page__story-journey">
          <div className="about-page__story-timeline-rail" aria-hidden>
            <motion.span
              className="about-page__story-timeline-progress"
              initial={{ scaleY: 0 }}
              animate={journeyInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <ol className="about-page__story-milestones">
            {paragraphs.map((paragraph, index) => (
              <StoryMilestone
                key={paragraph.slice(0, 40)}
                index={index}
                paragraph={paragraph}
                isLast={index === paragraphs.length - 1}
              />
            ))}
          </ol>
        </div>

        <StoryVisualStage image={image} imageAlt={imageAlt} />
      </div>
    </section>
  );
}
