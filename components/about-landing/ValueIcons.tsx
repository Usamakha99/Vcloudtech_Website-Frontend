import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Reliability First — server rack / infrastructure */
export function ReliabilityValueIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3" width="16" height="6" rx="1.25" />
      <rect x="4" y="11" width="16" height="6" rx="1.25" />
      <path d="M8 6h.01M8 14h.01M12 6h6M12 14h6" />
      <path d="M7 21h10" />
      <path d="M9 17v4M15 17v4" />
    </svg>
  );
}

/** Integrity — shield with check */
export function IntegrityValueIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.25 19.25 6.5v5.1c0 4.35-3.05 7.7-7.25 8.65-4.2-.95-7.25-4.3-7.25-8.65V6.5L12 3.25z" />
      <path d="m9.1 12.05 2 2 3.9-4.05" />
    </svg>
  );
}

/** Customer-Centric Innovation — connected nodes / AI spark */
export function InnovationValueIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5.5" r="1.85" />
      <circle cx="5.5" cy="16.5" r="1.85" />
      <circle cx="18.5" cy="16.5" r="1.85" />
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 7.35v2.9M10.85 13.1l-3.55 2.35M13.15 13.1l3.55 2.35" />
      <path d="M12 3.2v-.7M4.2 15.2l-.55-.55M19.8 15.2l.55-.55" />
    </svg>
  );
}

/** Security by Design — shield lock */
export function SecurityValueIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.25 19.25 6.5v5.1c0 4.35-3.05 7.7-7.25 8.65-4.2-.95-7.25-4.3-7.25-8.65V6.5L12 3.25z" />
      <rect x="9.25" y="11.1" width="5.5" height="4.4" rx="1" />
      <path d="M10.75 11.1v-1.35a1.25 1.25 0 0 1 2.5 0V11.1" />
    </svg>
  );
}

export const VALUE_ICONS = {
  reliability: ReliabilityValueIcon,
  integrity: IntegrityValueIcon,
  innovation: InnovationValueIcon,
  security: SecurityValueIcon,
} as const;
