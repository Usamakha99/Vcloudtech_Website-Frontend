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

const logoClass =
  "h-auto max-h-[4.5rem] w-auto max-w-[14rem] object-contain transition duration-300 hover:scale-[1.03] sm:max-h-24 sm:max-w-[17rem] lg:max-h-28 lg:max-w-[20rem]";

const compactLogoClass =
  "h-auto max-h-9 w-auto max-w-[10rem] object-contain transition duration-300 hover:scale-[1.03] sm:max-h-11 sm:max-w-[12rem] lg:max-h-12 lg:max-w-[14rem]";

const microsoftLogoClass =
  "h-auto max-h-24 w-auto max-w-[18rem] object-contain transition duration-300 hover:scale-[1.03] sm:max-h-28 sm:max-w-[21rem] lg:max-h-32 lg:max-w-[24rem]";

const compactMicrosoftLogoClass =
  "h-auto max-h-10 w-auto max-w-[12rem] object-contain transition duration-300 hover:scale-[1.03] sm:max-h-11 sm:max-w-[14rem] lg:max-h-12 lg:max-w-[16rem]";

function logoClassFor(name: string, compact = false) {
  if (name === "Microsoft") {
    return compact ? compactMicrosoftLogoClass : microsoftLogoClass;
  }
  return compact ? compactLogoClass : logoClass;
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
        compact ? "py-4 sm:py-5 lg:py-6" : "py-10 sm:py-12 lg:py-16"
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

      <ul className={`dt-partner-marquee animate-social-proof-marquee flex w-max items-center py-0.5 ${compact ? "gap-10 sm:gap-14 lg:gap-16" : "gap-14 sm:gap-20 lg:gap-24"}`}>
        {marqueeLogos.map((logo, index) => (
          <li key={`${logo.name}-${index}`} className="flex shrink-0 items-center px-1 sm:px-2">
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.name === "Microsoft" ? 360 : 300}
              height={logo.name === "Microsoft" ? 120 : 100}
              className={logoClassFor(logo.name, compact)}
              sizes={logo.name === "Microsoft" ? "320px" : "(max-width: 640px) 220px, 300px"}
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
