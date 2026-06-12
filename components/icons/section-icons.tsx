import type { ReactElement, SVGProps } from "react";

export type SectionIcon = (props: IconProps) => ReactElement;

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  "aria-hidden": true,
} as const;

/** Cloud migration & infrastructure */
export function CloudIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18a4 4 0 01-1-7.87 5 5 0 019.9-1A3.5 3.5 0 0117 18H7z" strokeLinejoin="round" />
    </svg>
  );
}

/** Managed infrastructure & servers */
export function ServerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <circle cx="8" cy="7" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8" cy="17" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Cybersecurity & compliance */
export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" strokeLinejoin="round" />
    </svg>
  );
}

/** Solutions architecture & strategy */
export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5L10 14l-2.5-2.5L12 10l2.5-0.5z" strokeLinejoin="round" />
    </svg>
  );
}

/** Procurement, licensing & IT buying */
export function CartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6h15l-2 9H8L6 6zm0 0L5 3H3M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" strokeLinejoin="round" />
    </svg>
  );
}

/** Managed support & 24/7 operations */
export function HeadsetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 14v-2a8 8 0 0116 0v2" strokeLinecap="round" />
      <path d="M4 14a2 2 0 002 2h1v-3H4zm16 0a2 2 0 01-2 2h-1v-3h3z" strokeLinejoin="round" />
      <path d="M10 19h4" strokeLinecap="round" />
    </svg>
  );
}

/** Solutions & services portfolio */
export function SolutionsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" strokeLinejoin="round" />
      <path d="M3 12l9 5 9-5" strokeLinejoin="round" />
      <path d="M3 17l9 5 9-5" strokeLinejoin="round" />
    </svg>
  );
}

/** Licensing & contracts */
export function ContractIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4h8l4 4v12H7V4z" strokeLinejoin="round" />
      <path d="M15 4v4h4" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="3" />
      <path d="M10.5 14l1 1 2-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Team & culture */
export function TeamIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5" strokeLinecap="round" />
      <path d="M14 19c0-2.5 1.5-4 3.5-4.5" strokeLinecap="round" />
    </svg>
  );
}

/** Fast deployment */
export function RocketIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 15c-3-2.5-5-6-5-9a5 5 0 0110 0c0 3-2 6.5-5 9z" strokeLinejoin="round" />
      <path d="M12 15v6M9 21h6" strokeLinecap="round" />
    </svg>
  );
}

/** Partner programs & vendor access */
export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 11l2-2 3 3 5-5 2 2-7 7-5-5z" strokeLinejoin="round" />
      <path d="M4 14l3 3M17 4l3 3" strokeLinecap="round" />
    </svg>
  );
}

/** Government & federal agencies */
export function GovernmentIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20h16M6 20V10l6-4 6 4v10" strokeLinejoin="round" />
      <path d="M10 20v-5h4v5M12 10v3" strokeLinecap="round" />
    </svg>
  );
}

/** Education & academic institutions */
export function EducationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8.5L12 4l8 4.5-8 4.5-8-4.5z" strokeLinejoin="round" />
      <path d="M7 10.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-5.5" strokeLinecap="round" />
      <path d="M20 9v7" strokeLinecap="round" />
    </svg>
  );
}

/** Healthcare & hospital systems */
export function HealthcareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      <path d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinejoin="round" />
    </svg>
  );
}

/** Municipal & civic public sector */
export function PublicSectorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 20V8l6-3 6 3v12" strokeLinejoin="round" />
      <path d="M4 20h16" strokeLinecap="round" />
      <path d="M10 20v-4h4v4" strokeLinejoin="round" />
      <path d="M12 8v3" strokeLinecap="round" />
    </svg>
  );
}
