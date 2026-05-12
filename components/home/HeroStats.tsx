"use client";

import { useEffect, useRef, useState } from "react";

export type HeroStat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

export type HeroStatsTone = "dark" | "light";
export type HeroStatsLayout = "grid" | "card";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function StatGlyph({ tone }: { tone: HeroStatsTone }) {
  const stroke = tone === "light" ? "#0284c7" : "#38bdf8";
  return (
    <span
      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border sm:h-11 sm:w-11 ${
        tone === "light"
          ? "border-sky-200 bg-sky-50"
          : "border-white/15 bg-white/5"
      }`}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M20 6L9 17l-5-5"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function StatCell({
  stat,
  delayMs,
  tone,
  showGlyph,
}: {
  stat: HeroStat;
  delayMs: number;
  tone: HeroStatsTone;
  showGlyph: boolean;
}) {
  const { value, suffix = "", prefix = "", label, decimals = 0 } = stat;
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(0);

  const isLight = tone === "light";
  const numClass = isLight ? "text-[#1B224B]" : "text-white";
  const accentClass = isLight ? "text-sky-600" : "text-sky-400/90";
  const labelClass = isLight ? "text-slate-600" : "text-slate-400";

  useEffect(() => {
    if (prefersReducedMotion() || prefersCoarsePointer()) {
      queueMicrotask(() => setDisplay(value));
      return;
    }

    let cancelled = false;
    const duration = 1600;
    const start = performance.now() + delayMs;

    const tick = (now: number) => {
      if (cancelled) return;
      if (now < start) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      setDisplay(value * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const safetyMs = delayMs + duration + 1200;
    const safetyId = window.setTimeout(() => {
      if (!cancelled) setDisplay(value);
    }, safetyMs);

    const stuckId = window.setTimeout(() => {
      if (cancelled) return;
      setDisplay((d) => (value !== 0 && Math.abs(d) < 1e-6 ? value : d));
    }, 450);

    const onVisible = () => {
      if (cancelled || document.visibilityState !== "visible") return;
      setDisplay((d) => (d < value * 0.999 ? value : d));
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearTimeout(safetyId);
      window.clearTimeout(stuckId);
      document.removeEventListener("visibilitychange", onVisible);
      cancelAnimationFrame(rafRef.current);
    };
  }, [value, delayMs]);

  const text =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString("en-US");

  if (showGlyph) {
    return (
      <div className="flex gap-4 text-left sm:gap-5">
        <StatGlyph tone={tone} />
        <div className="min-w-0">
          <p
            className={`font-mono text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl ${numClass}`}
            suppressHydrationWarning
          >
            <span className={accentClass}>{prefix}</span>
            <span className={numClass}>{text}</span>
            <span className={accentClass}>{suffix}</span>
          </p>
          <p className={`mt-1 text-xs font-medium leading-snug sm:text-sm ${labelClass}`}>
            {label}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center sm:text-left">
      <p
        className={`font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl ${numClass}`}
        suppressHydrationWarning
      >
        <span className={accentClass}>{prefix}</span>
        <span className={numClass}>{text}</span>
        <span className={accentClass}>{suffix}</span>
      </p>
      <p className={`mt-1 text-xs font-medium uppercase tracking-widest ${labelClass}`}>
        {label}
      </p>
    </div>
  );
}

type HeroStatsProps = {
  stats: HeroStat[];
  tone?: HeroStatsTone;
  layout?: HeroStatsLayout;
};

/**
 * Metrics: grid on dark, or “results” card on light. Phones use final values
 * immediately (coarse pointer); desktop animates.
 */
export function HeroStats({
  stats,
  tone = "dark",
  layout = "grid",
}: HeroStatsProps) {
  if (layout === "card") {
    return (
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/[0.04] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          The results
        </p>
        <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
          Real partnerships. Real impact.
        </p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
          {stats.map((stat, i) => (
            <StatCell
              key={stat.label}
              stat={stat}
              delayMs={i * 120}
              tone={tone}
              showGlyph
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-10 sm:mt-20 sm:grid-cols-4 sm:gap-x-10 sm:pt-12">
      {stats.map((stat, i) => (
        <div key={stat.label} className="text-center sm:text-left">
          <StatCell
            stat={stat}
            delayMs={i * 120}
            tone={tone}
            showGlyph={false}
          />
        </div>
      ))}
    </div>
  );
}
