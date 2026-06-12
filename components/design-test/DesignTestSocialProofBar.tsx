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

/** Partner logo marquee — logos only on dark background. */
export function DesignTestSocialProofBar() {
  const marqueeLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section
      className={`relative z-30 mt-8 bg-[#0F0F0F] sm:mt-10 lg:mt-12 ${dt.sectionAfterHero}`}
      aria-label="Technology partners"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent sm:w-20"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent sm:w-20"
          aria-hidden
        />

        <ul className="animate-social-proof-marquee flex w-max items-center gap-10 py-1 sm:gap-14 lg:gap-16">
          {marqueeLogos.map((logo, index) => (
            <li key={`${logo.name}-${index}`} className="flex shrink-0 items-center px-1 sm:px-2">
              <Image
                src={logo.src}
                alt={logo.name}
                width={240}
                height={72}
                className="h-auto max-h-12 w-auto max-w-[10.5rem] object-contain opacity-90 brightness-0 invert sm:max-h-14 sm:max-w-[12.5rem] lg:max-h-16 lg:max-w-[14rem]"
                sizes="200px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
