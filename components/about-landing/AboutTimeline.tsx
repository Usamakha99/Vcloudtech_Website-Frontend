"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  ChipIcon,
  CertificateIcon,
  GlobeIcon,
  GovernmentIcon,
  LightbulbIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

import "./about-process-flow.css";

type Milestone = {
  id: string;
  year: string;
  description: string;
};

type Props = {
  milestones: readonly Milestone[];
};

const MILESTONE_ICONS: Record<string, SectionIcon> = {
  founding: LightbulbIcon,
  growth: GovernmentIcon,
  scale: GlobeIcon,
  compliance: CertificateIcon,
  today: ChipIcon,
};

const FEATURED_IDS = new Set(["scale"]);

const PATH_VIEWBOX = { width: 1200, height: 160 } as const;

/** Wave lift per node — center (Scale) sits on the spine for emphasis. */
const WAVE_LIFT = [-1, 1, 0, 1, -1] as const;

type HubPoint = { x: number; y: number };

type PathGeometry = {
  hubPoints: HubPoint[];
  primaryPath: string;
};

function round(n: number) {
  return Math.round(n * 10) / 10;
}

/** C¹-smooth curve through all hubs — one continuous stroke, no kinks. */
function buildSmoothPath(points: HubPoint[]): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M${round(points[0].x)} ${round(points[0].y)} L${round(points[1].x)} ${round(points[1].y)}`;
  }

  let d = `M${round(points[0].x)} ${round(points[0].y)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C${round(cp1x)} ${round(cp1y)},${round(cp2x)} ${round(cp2y)},${round(p2.x)} ${round(p2.y)}`;
  }

  return d;
}

function buildHubPoints(xs: number[], baselineY: number, amplitude: number): HubPoint[] {
  return xs.map((x, index) => ({
    x,
    y: baselineY + WAVE_LIFT[index % WAVE_LIFT.length] * amplitude,
  }));
}

function measureNodeXs(
  laneEl: HTMLElement,
  nodeEls: readonly (HTMLElement | null)[],
): number[] {
  const laneRect = laneEl.getBoundingClientRect();
  if (laneRect.width <= 0) return [];

  return nodeEls.map((node) => {
    if (!node) return 0;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2 - laneRect.left;
    return (cx / laneRect.width) * PATH_VIEWBOX.width;
  });
}

const FALLBACK_XS = [80, 310, 600, 890, 1120];

function fallbackGeometry(count: number): PathGeometry {
  const xs = FALLBACK_XS.slice(0, count);
  const hubs = buildHubPoints(xs, 80, 36);
  return { hubPoints: hubs, primaryPath: buildSmoothPath(hubs) };
}

export function AboutTimeline({ milestones }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const laneRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [flowProgress, setFlowProgress] = useState(1);
  const [activeIndex, setActiveIndex] = useState(milestones.length - 1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    milestones.map(() => false),
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pathGeometry, setPathGeometry] = useState<PathGeometry>(() =>
    fallbackGeometry(milestones.length),
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);

    const updateProgress = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.9;
      const end = viewport * 0.2;
      const span = rect.height + start - end;
      const traveled = start - rect.top;
      const progress = span <= 0 ? 1 : Math.min(1, Math.max(0, traveled / span));
      setFlowProgress(progress);
      setActiveIndex(
        Math.min(milestones.length - 1, Math.floor(progress * milestones.length + 0.12)),
      );
    };

    const observers: IntersectionObserver[] = [];

    if (!prefersReduced) {
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
          { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
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

  useEffect(() => {
    const lane = laneRef.current;
    if (!lane) return;

    const updateGeometry = () => {
      if (window.innerWidth < 768) return;

      const xs = measureNodeXs(lane, nodeRefs.current);
      if (xs.length < 2 || xs.some((x) => !Number.isFinite(x) || x <= 0)) return;

      const hubs = buildHubPoints(xs, 80, 36);
      setPathGeometry({ hubPoints: hubs, primaryPath: buildSmoothPath(hubs) });
    };

    const run = () => requestAnimationFrame(updateGeometry);
    run();
    run();

    const resizeObserver = new ResizeObserver(run);
    resizeObserver.observe(lane);
    window.addEventListener("resize", run);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [milestones, visibleItems]);

  const litProgress = reducedMotion ? 1 : flowProgress;
  const highlightIndex = hoveredIndex ?? activeIndex;

  return (
    <div
      ref={sectionRef}
      className="about-process-flow"
      aria-label="VCloud Tech enterprise transformation journey"
      style={{ "--flow-progress": litProgress } as CSSProperties}
      data-reduced-motion={reducedMotion ? "true" : undefined}
    >
      <div className="about-process-flow__ambient" aria-hidden>
        <div className="about-process-flow__blueprint" />
        <div className="about-process-flow__radial" />
      </div>

      <div ref={laneRef} className="about-process-flow__path-lane" aria-hidden>
        <svg
          className="about-process-flow__path"
          viewBox={`0 0 ${PATH_VIEWBOX.width} ${PATH_VIEWBOX.height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="apf-spine-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b3b3b3" stopOpacity="0.35" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#b3b3b3" stopOpacity="0.4" />
            </linearGradient>
            <filter id="apf-spine-glow" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            className="about-process-flow__spine-glow"
            d={pathGeometry.primaryPath}
            pathLength={1}
          />
          <path
            className="about-process-flow__spine-base"
            d={pathGeometry.primaryPath}
            pathLength={1}
          />
          <path
            className="about-process-flow__spine-lit"
            d={pathGeometry.primaryPath}
            pathLength={1}
          />

          {!reducedMotion ? (
            <path
              className="about-process-flow__spine-pulse"
              d={pathGeometry.primaryPath}
              pathLength={1}
            />
          ) : null}
        </svg>
      </div>

      <svg
        className="about-process-flow__mobile-spine"
        viewBox="0 0 40 720"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          className="about-process-flow__spine-base"
          d="M20 24 C20 90, 8 140, 20 200 C32 260, 8 320, 20 380 C32 440, 8 500, 20 560 C28 620, 20 680, 20 700"
          pathLength={1}
        />
        <path
          className="about-process-flow__spine-lit"
          d="M20 24 C20 90, 8 140, 20 200 C32 260, 8 320, 20 380 C32 440, 8 500, 20 560 C28 620, 20 680, 20 700"
          pathLength={1}
        />
      </svg>

      <ol className="about-process-flow__stages">
        {milestones.map((milestone, index) => {
          const Icon = MILESTONE_ICONS[milestone.id] ?? LightbulbIcon;
          const isLinked = index <= activeIndex;
          const isCurrent = index === activeIndex;
          const isHot = index === highlightIndex;
          const isVisible = visibleItems[index];
          const featured = FEATURED_IDS.has(milestone.id);
          const waveLift = WAVE_LIFT[index % WAVE_LIFT.length];

          return (
            <li
              key={milestone.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={[
                "about-process-flow__stage",
                featured ? "is-featured" : "",
                isLinked ? "is-linked" : "",
                isCurrent ? "is-current" : "",
                isHot ? "is-hot" : "",
                isVisible ? "is-visible" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--stage-index": index,
                  "--delay": `${index * 90}ms`,
                  "--wave-lift": waveLift,
                } as CSSProperties
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
            >
              <button
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                type="button"
                className="about-process-flow__node"
                aria-label={`Stage ${String(index + 1).padStart(2, "0")}: ${milestone.year}`}
              >
                <span className="about-process-flow__node-glow" aria-hidden />
                <span className="about-process-flow__node-ring" aria-hidden />
                <span className="about-process-flow__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="about-process-flow__icon-wrap">
                  <Icon className="about-process-flow__icon" />
                </span>
                <span className="about-process-flow__node-title">{milestone.year}</span>
              </button>

              <span className="about-process-flow__stem" aria-hidden />

              <article className="about-process-flow__card">
                <div className="about-process-flow__card-shine" aria-hidden />
                <div className="about-process-flow__card-head">
                  <span className="about-process-flow__card-icon-wrap" aria-hidden>
                    <Icon className="about-process-flow__card-icon" />
                  </span>
                  <h3 className="about-process-flow__card-title">{milestone.year}</h3>
                </div>
                <p className="about-process-flow__card-desc">{milestone.description}</p>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
