import Image from "next/image";

import { publicAssets } from "@/lib/public-assets";

export type AboutTrustMarkId = "iso" | "gsa" | "sourcewell" | "tips";

export const procurementCredentialItems: {
  id: AboutTrustMarkId;
  label: string;
}[] = [
  { id: "iso", label: "ISO 9001:2015 Certified" },
  { id: "gsa", label: "GSA Schedule Holder" },
  { id: "sourcewell", label: "Sourcewell Contract" },
  { id: "tips", label: "TIPS" },
];

const credentialImageById: Record<AboutTrustMarkId, string> = {
  iso: publicAssets.credentials.iso,
  gsa: publicAssets.credentials.gsa,
  sourcewell: publicAssets.credentials.sourcewell,
  tips: publicAssets.credentials.tips,
};

function CredentialMarkImage({ id }: { id: AboutTrustMarkId }) {
  return (
    <Image
      src={credentialImageById[id]}
      alt=""
      fill
      sizes="68px"
      className={`about-trust-mark__img about-trust-mark__img--${id}`}
      unoptimized
    />
  );
}

export function AboutTrustMark({
  id,
  variant = "tile",
}: {
  id: AboutTrustMarkId;
  variant?: "tile" | "inline" | "strip";
}) {
  return (
    <span
      className={`about-trust-mark about-trust-mark--${id}${variant === "inline" ? " about-trust-mark--inline" : ""}${variant === "strip" ? " about-trust-mark--strip" : ""}`}
      aria-hidden
    >
      <CredentialMarkImage id={id} />
    </span>
  );
}
