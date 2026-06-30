"use client";

import { useEffect, useRef, useState } from "react";

import { dt } from "@/components/design-test/design-test-theme";

import "@/components/home/shared/styles/about-metrics.css";

const defaultOrgMetrics = [
  { target: 15, suffix: "+", label: "Years in business" },
  { target: 800, suffix: "+", label: "Clients served" },
  { target: 50, suffix: "", label: "States & territories" },
] as const;

export type OrgMetric = {
  target: number;
  suffix: string;
  label: string;
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function LiveStatValue({
  target,
  suffix,
  active,
  delayMs,
}: {
  target: number;
  suffix: string;
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
      setValue(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const duration = target >= 100 ? 2000 : 1400;

    const timeout = window.setTimeout(() => {
      const tick = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setValue(Math.round(easeOutCubic(progress) * target));
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
  }, [active, delayMs, target]);

  return (
    <p className="dt-metrics__value" aria-label={`${target}${suffix}`}>
      {value}
      {suffix}
    </p>
  );
}

/** Organization metrics — design-test only (isolated from shared about-enterprise__stat styles). */
export function OrgMetricsRail({
  className = "",
  metrics = defaultOrgMetrics,
}: {
  className?: string;
  metrics?: readonly OrgMetric[];
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = railRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={railRef}
      className={`dt-metrics__rail ${className}`.trim()}
      aria-label="Organization metrics"
    >
      {metrics.map((metric, index) => (
        <li key={metric.label} className="dt-metrics__cell">
          <LiveStatValue
            target={metric.target}
            suffix={metric.suffix}
            active={isVisible}
            delayMs={index * 180}
          />
          <p className={`dt-metrics__label mt-1 text-[10px] font-medium uppercase tracking-wider sm:text-[11px] ${dt.statLabel}`}>
            {metric.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
