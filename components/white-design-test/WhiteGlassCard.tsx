import type { ReactNode } from "react";

import "./white-glass-cards.css";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

const delayClass = {
  0: "",
  1: "wdt-glass-card--delay-1",
  2: "wdt-glass-card--delay-2",
  3: "wdt-glass-card--delay-3",
  4: "wdt-glass-card--delay-4",
  5: "wdt-glass-card--delay-5",
  6: "wdt-glass-card--delay-6",
} as const;

export function WhiteGlassCard({ children, className = "", delay = 0 }: Props) {
  return (
    <article className={`wdt-glass-card ${delayClass[delay]} ${className}`.trim()}>
      <span className="wdt-glass-card__gradient" aria-hidden />
      <div className="wdt-glass-card__inner">{children}</div>
    </article>
  );
}
