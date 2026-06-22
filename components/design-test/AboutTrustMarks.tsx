import Image from "next/image";

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
  iso: "/design-test/credentials/iso-9001-2015-white.png",
  gsa: "/design-test/credentials/gsa-white.png",
  sourcewell: "/design-test/credentials/sourcewell-white.png",
  tips: "/design-test/credentials/tips-white.png",
};

function CredentialMarkImage({ id }: { id: AboutTrustMarkId }) {
  return (
    <Image
      src={credentialImageById[id]}
      alt=""
      width={1280}
      height={1170}
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
