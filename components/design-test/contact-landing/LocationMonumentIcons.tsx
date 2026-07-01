import type { SVGProps } from "react";

type MonumentProps = SVGProps<SVGSVGElement>;

/** Golden Gate Bridge — line-art fallback until California asset is added. */
export function GoldenGateMonument(props: MonumentProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" aria-hidden {...props}>
      <g
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 72 Q30 52 60 58 Q90 64 116 54" opacity="0.55" />
        <path d="M22 98 V42 M22 42 H34 V98 M34 98 V32 M34 32 H86 V98 M86 98 V42 M86 42 H98 V98" />
        <path d="M22 52 H34 M22 68 H34 M86 52 H98 M86 68 H98" />
        <path d="M30 32 H90 M28 26 H92" />
        <path d="M22 48 Q60 24 98 48" />
        <path d="M22 56 Q60 32 98 56" />
        <path d="M22 64 Q60 40 98 64" />
        <path d="M22 72 Q60 48 98 72" />
        <path d="M22 80 Q60 56 98 80" />
        <path d="M8 98 H112" strokeWidth="1.5" />
        <path d="M6 108 Q22 102 38 108 T70 108 T102 108 T114 108" opacity="0.7" />
        <path d="M4 118 Q28 112 52 118 T96 118 T116 118" opacity="0.55" />
        <path d="M8 128 Q36 122 60 128 T108 128" opacity="0.4" />
      </g>
    </svg>
  );
}

export function LocationMonumentFallback({
  id,
  className,
}: {
  id: "golden-gate";
  className?: string;
}) {
  if (id === "golden-gate") {
    return <GoldenGateMonument className={className} />;
  }
  return null;
}
