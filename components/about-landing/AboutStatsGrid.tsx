"use client";

import { useEffect, useRef, useState } from "react";

import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import { aboutStatsSection, type aboutStats } from "@/lib/design-test/about-page-content";
import { dt } from "@/components/design-test/design-test-theme";

type Stat = (typeof aboutStats)[number];

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function AboutStatCard({
  stat,
  active,
  delayMs,
}: {
  stat: Stat;
  active: boolean;
  delayMs: number;
}) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      hasAnimated.current = true;
      setValue(stat.target);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const duration = stat.target >= 100 ? 2000 : 1400;

    const timeout = window.setTimeout(() => {
      const tick = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setValue(Math.round(easeOutCubic(progress) * stat.target));
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          hasAnimated.current = true;
        }
      };
      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, delayMs, stat.target]);

  return (
    <article className="about-page__stat-card">
      <p className="about-page__stat-value" aria-label={`${stat.target}${stat.suffix}`}>
        {value}
        {stat.suffix}
      </p>
      <p className="about-page__stat-label">{stat.label}</p>
    </article>
  );
}

type Props = {
  stats: readonly Stat[];
};

/** Premium animated count-up stat cards. */
export function AboutStatsGrid({ stats }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-page__section about-page__stats"
      aria-label="Company statistics"
    >
      <DtScrollReveal>
        <header className="about-page__stats-header">
          <p className={`${dt.metaLabel} about-page__stats-badge`}>{aboutStatsSection.badge}</p>
        </header>

        <div className="about-page__stats-panel">
          <div className="about-page__stats-grid">
            {stats.map((stat, index) => (
              <AboutStatCard
                key={stat.label}
                stat={stat}
                active={isVisible}
                delayMs={index * 160}
              />
            ))}
          </div>
        </div>
      </DtScrollReveal>
    </section>
  );
}
