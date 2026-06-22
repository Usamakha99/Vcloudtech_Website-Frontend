import Image from "next/image";
import type { ReactNode } from "react";

export type AboutTrustMarkId = "iso" | "gsa" | "sourcewell" | "sewp";

export const procurementCredentialItems: {
  id: AboutTrustMarkId;
  label: string;
}[] = [
  { id: "iso", label: "ISO 9001:2015 Certified" },
  { id: "gsa", label: "GSA Schedule Holder" },
  { id: "sourcewell", label: "Sourcewell Contract" },
  { id: "sewp", label: "SEWP V" },
];

export function AboutTrustMark({
  id,
  variant = "tile",
}: {
  id: AboutTrustMarkId;
  variant?: "tile" | "inline" | "strip";
}) {
  return (
    <span
      className={`about-trust-mark${id === "iso" ? " about-trust-mark--iso" : ""}${variant === "inline" ? " about-trust-mark--inline" : ""}${variant === "strip" ? " about-trust-mark--strip" : ""}`}
      aria-hidden
    >
      {markById[id]}
    </span>
  );
}

const stroke = "currentColor";

const markById: Record<AboutTrustMarkId, ReactNode> = {
  iso: (
    <Image
      src="/design-test/credentials/iso-9001-2015-white.png"
      alt=""
      width={1024}
      height={936}
      className="about-trust-mark__img about-trust-mark__img--iso"
      unoptimized
    />
  ),
  gsa: (
    <svg viewBox="0 0 40 40" fill="none" className="about-trust-mark__svg">
      <path
        d="M8 32V14l12-6 12 6v18"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M14 32V20h4v12M22 20h4v12M18 20v-3h4v3"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 8v3M17 6h6" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
  sourcewell: (
    <svg viewBox="0 0 40 40" fill="none" className="about-trust-mark__svg">
      <circle cx="20" cy="20" r="13" stroke={stroke} strokeWidth="1.25" strokeOpacity="0.35" />
      <circle cx="15" cy="18" r="5" stroke={stroke} strokeWidth="1.25" />
      <circle cx="25" cy="18" r="5" stroke={stroke} strokeWidth="1.25" />
      <path d="M12 28c2.5-2 5.5-3 8-3s5.5 1 8 3" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
  sewp: (
    <svg viewBox="0 0 40 40" fill="none" className="about-trust-mark__svg">
      <path
        d="M11 9h14l5 5v17H11V9z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M25 9v5h5" stroke={stroke} strokeWidth="1.25" strokeLinejoin="round" />
      <text
        x="20"
        y="22"
        textAnchor="middle"
        dominantBaseline="middle"
        className="about-trust-mark__text about-trust-mark__text--sewp"
      >
        SEWP V
      </text>
    </svg>
  ),
};
