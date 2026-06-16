import Image from "next/image";

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

const darkLogoClass =
  "h-auto max-h-[4.5rem] w-auto max-w-[14rem] object-contain opacity-90 brightness-0 invert transition duration-300 hover:opacity-100 sm:max-h-24 sm:max-w-[17rem] lg:max-h-28 lg:max-w-[20rem]";

const lightLogoClass =
  "h-auto max-h-[4.5rem] w-auto max-w-[14rem] object-contain opacity-60 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 sm:max-h-24 sm:max-w-[17rem] lg:max-h-28 lg:max-w-[20rem]";

const darkMicrosoftLogoClass =
  "h-auto max-h-24 w-auto max-w-[18rem] object-contain opacity-90 brightness-0 invert transition duration-300 hover:opacity-100 sm:max-h-28 sm:max-w-[21rem] lg:max-h-32 lg:max-w-[24rem]";

const lightMicrosoftLogoClass =
  "h-auto max-h-24 w-auto max-w-[18rem] object-contain opacity-60 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 sm:max-h-28 sm:max-w-[21rem] lg:max-h-32 lg:max-w-[24rem]";

function logoClassFor(name: string, fadeFrom: "dark" | "light") {
  if (name === "Microsoft") {
    return fadeFrom === "light" ? lightMicrosoftLogoClass : darkMicrosoftLogoClass;
  }
  return fadeFrom === "light" ? lightLogoClass : darkLogoClass;
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
        compact ? "py-7 sm:py-8 lg:py-10" : "py-10 sm:py-12 lg:py-16"
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

      <ul className="dt-partner-marquee animate-social-proof-marquee flex w-max items-center gap-14 py-1 sm:gap-20 lg:gap-24">
        {marqueeLogos.map((logo, index) => (
          <li key={`${logo.name}-${index}`} className="flex shrink-0 items-center px-1 sm:px-2">
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.name === "Microsoft" ? 360 : 300}
              height={logo.name === "Microsoft" ? 120 : 100}
              className={logoClassFor(logo.name, fadeFrom)}
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
        <header className="border-b border-white/10 bg-[#041329] px-4 pb-5 pt-5 text-center sm:px-6 sm:pb-6 sm:pt-6 lg:px-8">
          <h2
            id="strategic-partners-heading"
            className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
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
