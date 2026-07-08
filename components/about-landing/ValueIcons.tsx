import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.35,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Always-on infrastructure & uptime */
export function ReliabilityValueIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 17V7M8 17V11M12 17V5M16 17V9M20 17V13" />
    </svg>
  );
}

/** Transparent partnerships & honest guidance */
export function IntegrityValueIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="8.25" cy="12" r="2.75" />
      <circle cx="15.75" cy="12" r="2.75" />
      <path d="M11 12h2" />
    </svg>
  );
}

/** Customer-led innovation & intelligent automation */
export function InnovationValueIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="2.25" />
      <path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" />
      <path d="M7.05 7.05l2.12 2.12M14.83 14.83l2.12 2.12M16.95 7.05l-2.12 2.12M9.17 14.83l-2.12 2.12" />
    </svg>
  );
}

/** Security engineered into every layer */
export function SecurityValueIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5l7 3.5v5.25c0 4.15-2.9 7.35-7 8.25-4.1-.9-7-4.1-7-8.25V7l7-3.5z" />
      <path d="M9.25 12.25l1.75 1.75 3.75-3.75" />
    </svg>
  );
}

export const VALUE_ICONS = {
  reliability: ReliabilityValueIcon,
  integrity: IntegrityValueIcon,
  innovation: InnovationValueIcon,
  security: SecurityValueIcon,
} as const;
