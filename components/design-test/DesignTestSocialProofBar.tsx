import Image from "next/image";

import { dt } from "@/components/design-test/design-test-theme";

const partnerLogos = [
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "VMware", src: "/partners/vmware.png" },
  { name: "Adobe", src: "/partners/adobe.png" },
  { name: "Fortinet", src: "/partners/fortinet.png" },
  { name: "HPE", src: "/partners/hpe.png" },
] as const;

/** Square artwork (e.g. Microsoft) needs a boost to match wide logo marks in the same rail. */
const LOGO_IMAGE_SCALE: Partial<Record<(typeof partnerLogos)[number]["name"], string>> = {
  Microsoft: "scale-[1.62] sm:scale-[1.68] lg:scale-[1.74]",
};

/** Fixed logo rail — every partner occupies the same visual footprint. */
const logoBoxClass =
  "flex h-28 w-52 shrink-0 items-center justify-center sm:h-32 sm:w-60 lg:h-36 lg:w-[17rem]";

const logoBoxClassCompact =
  "flex h-24 w-48 shrink-0 items-center justify-center sm:h-28 sm:w-56 lg:h-32 lg:w-64";

const logoImageClass =
  "h-full w-full object-contain object-center transition duration-300 hover:scale-[1.04]";

function logoImageClassFor(name: (typeof partnerLogos)[number]["name"]) {
  const boost = LOGO_IMAGE_SCALE[name];
  return boost ? `${logoImageClass} ${boost}` : logoImageClass;
}

function logoDimensions(name: (typeof partnerLogos)[number]["name"]) {
  return name === "Microsoft" ? { width: 200, height: 200 } : { width: 253, height: 100 };
}

function PartnerLogoMarquee({
  fadeFrom,
  compact = false,
}: {
  fadeFrom: "dark" | "light";
  compact?: boolean;
}) {
  const marqueeLogos = [...partnerLogos, ...partnerLogos];
  const fadeClass =
    fadeFrom === "light"
      ? "from-white via-white/80 to-transparent"
      : "from-[#041329] via-[#041329]/80 to-transparent";

  return (
    <div
      className={`relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 ${
        compact ? "py-6 sm:py-7 lg:py-9" : "py-10 sm:py-12 lg:py-16"
      }`}
    >
      <span
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r ${fadeClass} sm:w-20`}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l ${fadeClass} sm:w-20`}
        aria-hidden
      />

      <ul className={`dt-partner-marquee animate-social-proof-marquee flex w-max items-center ${compact ? "gap-10 sm:gap-14 lg:gap-16" : "gap-12 sm:gap-16 lg:gap-20"}`}>
        {marqueeLogos.map((logo, index) => (
          <li
            key={`${logo.name}-${index}`}
            className={compact ? logoBoxClassCompact : logoBoxClass}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              {...logoDimensions(logo.name)}
              className={logoImageClassFor(logo.name)}
              sizes="(max-width: 640px) 192px, 256px"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Partner logo marquee — heading on dark, logos on white when below hero. */
export function DesignTestSocialProofBar({ belowHero = false }: { belowHero?: boolean }) {
  if (belowHero) {
    return (
      <section className="relative z-30" aria-labelledby="strategic-partners-heading">
        <header className="border-b border-white/10 bg-[#041329] px-4 pb-3 pt-3 text-center sm:px-6 sm:pb-3.5 sm:pt-3.5 lg:px-8">
          <h2
            id="strategic-partners-heading"
            className={`${dt.sectionHeadline} text-white`}
          >
            Strategic{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
        </header>

        <div className="border-b border-[#111A45]/10 bg-white">
          <PartnerLogoMarquee fadeFrom="light" compact />
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative z-30 mb-6 border-b border-t border-white/10 bg-[#041329] sm:mb-8"
      aria-label="Technology partners"
    >
      <PartnerLogoMarquee fadeFrom="dark" />
    </section>
  );
}
