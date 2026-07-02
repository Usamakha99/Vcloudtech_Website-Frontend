"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  GlobeIcon,
  HandshakeIcon,
  RocketIcon,
  ServerIcon,
  ShieldIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

import "./about-journey-towers.css";

type Milestone = {
  id: string;
  year: string;
  description: string;
};

type Props = {
  milestones: readonly Milestone[];
};

const MILESTONE_ICONS: Record<string, SectionIcon> = {
  founding: RocketIcon,
  growth: HandshakeIcon,
  scale: GlobeIcon,
  compliance: ShieldIcon,
  today: ServerIcon,
};

/** Milestone Towers — architectural pillars with glass panels and AI pipeline. */
export function AboutTimeline({ milestones }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [flowProgress, setFlowProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    milestones.map(() => false),
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateProgress = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.9;
      const end = viewport * 0.1;
      const span = rect.height + start - end;
      const traveled = start - rect.top;
      const progress = span <= 0 ? 1 : Math.min(1, Math.max(0, traveled / span));
      setFlowProgress(progress);
      setActiveIndex(
        Math.min(milestones.length - 1, Math.floor(progress * milestones.length + 0.1)),
      );
    };

    const observers: IntersectionObserver[] = [];

    if (!reducedMotion) {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              setVisibleItems((prev) => {
                if (prev[index]) return prev;
                const next = [...prev];
                next[index] = true;
                return next;
              });
              observer.disconnect();
            }
          },
          { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
        );
        observer.observe(item);
        observers.push(observer);
      });
    } else {
      setVisibleItems(milestones.map(() => true));
      setFlowProgress(1);
      setActiveIndex(milestones.length - 1);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [milestones]);

  const pipelineY = (index: number) => 268 - index * 36;
  const pipelinePath = milestones
    .map((_, i) => {
      const x = 100 + i * 200;
      const y = pipelineY(i);
      return `${i === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");

  return (
    <div
      ref={sectionRef}
      className="about-journey-towers"
      aria-label="Company journey milestone towers"
      style={
        {
          "--flow-progress": flowProgress,
          "--light-x": `${14 + flowProgress * 68}%`,
          "--light-y": `${68 - flowProgress * 36}%`,
        } as CSSProperties
      }
    >
      <div className="about-journey-towers__ambient" aria-hidden>
        <div className="about-journey-towers__blueprint" />
        <div className="about-journey-towers__geometry" />
        <div className="about-journey-towers__radial" />
        <svg className="about-journey-towers__network" viewBox="0 0 960 360" preserveAspectRatio="none">
          <circle cx="96" cy="280" r="2" />
          <circle cx="256" cy="232" r="2.5" />
          <circle cx="416" cy="188" r="2" />
          <circle cx="576" cy="142" r="2.5" />
          <circle cx="736" cy="98" r="2" />
          <circle cx="896" cy="58" r="2.5" />
          <path d="M96 280 L256 232 L416 188 L576 142 L736 98 L896 58" />
          <path d="M56 300 L140 285 M860 72 L944 52" opacity="0.55" />
        </svg>
      </div>

      <svg
        className="about-journey-towers__pipeline"
        viewBox="0 0 1000 320"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="about-journey-pipeline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b3b3b3" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <path className="about-journey-towers__pipeline-base" d={pipelinePath} pathLength={1} />
        <path
          className="about-journey-towers__pipeline-active"
          d={pipelinePath}
          pathLength={1}
        />
        <path className="about-journey-towers__pipeline-flow" d={pipelinePath} pathLength={1} />
        {milestones.map((_, index) => {
          const cx = 100 + index * 200;
          const cy = pipelineY(index);
          const lit = index <= activeIndex;

          return (
            <g key={index}>
              <circle
                className={`about-journey-towers__pipeline-node${lit ? " is-lit" : ""}`}
                cx={cx}
                cy={cy}
                r={5}
              />
              <circle
                className={`about-journey-towers__pipeline-pulse${lit ? " is-lit" : ""}`}
                cx={cx}
                cy={cy}
                r={9}
              />
            </g>
          );
        })}
      </svg>

      <div className="about-journey-towers__foundation" aria-hidden />

      <ol className="about-journey-towers__row">
        {milestones.map((milestone, index) => {
          const Icon = MILESTONE_ICONS[milestone.id] ?? RocketIcon;
          const isLinked = index <= activeIndex;
          const isCurrent = index === activeIndex;
          const isVisible = visibleItems[index];

          return (
            <li
              key={milestone.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={[
                "about-journey-towers__tower",
                isLinked ? "is-linked" : "",
                isCurrent ? "is-current" : "",
                isVisible ? "is-visible" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--tower-index": index, "--delay": `${index * 100}ms` } as CSSProperties}
            >
              <article
                className="about-journey-towers__panel"
                aria-label={`${milestone.year}: ${milestone.description}`}
              >
                <div className="about-journey-towers__panel-shine" aria-hidden />
                <div className="about-journey-towers__panel-glow" aria-hidden />

                <span className="about-journey-towers__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="about-journey-towers__icon-wrap">
                  <Icon className="about-journey-towers__icon" />
                </div>
                <h3 className="about-journey-towers__title">{milestone.year}</h3>
                <p className="about-journey-towers__desc">{milestone.description}</p>
              </article>

              <div className="about-journey-towers__pillar" aria-hidden>
                <span className="about-journey-towers__pillar-core" />
                <span className="about-journey-towers__pillar-light" />
              </div>

              <span className="about-journey-towers__base" aria-hidden />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
