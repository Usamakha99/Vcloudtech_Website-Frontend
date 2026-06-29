import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

const delayClass = {
  0: "",
  1: "dt-glass-card--delay-1",
  2: "dt-glass-card--delay-2",
  3: "dt-glass-card--delay-3",
  4: "dt-glass-card--delay-4",
  5: "dt-glass-card--delay-5",
  6: "dt-glass-card--delay-6",
} as const;

export function GlassCard({ children, className = "", delay = 0 }: Props) {
  return (
    <article className={`dt-glass-card ${delayClass[delay]} ${className}`.trim()}>
      <span className="dt-glass-card__gradient" aria-hidden />
      <div className="dt-glass-card__inner">{children}</div>
    </article>
  );
}
