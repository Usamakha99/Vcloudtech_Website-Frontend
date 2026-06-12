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
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent sm:w-20"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent sm:w-20"
          aria-hidden
        />

        <ul className="animate-social-proof-marquee flex w-max items-center gap-8 py-1 sm:gap-10">
          {marqueeLogos.map((logo, index) => (
            <li key={`${logo.name}-${index}`} className="flex shrink-0 items-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={180}
                height={56}
                className="h-auto max-h-9 w-auto max-w-[8.5rem] scale-110 object-contain opacity-90 brightness-0 invert sm:max-h-11 sm:max-w-[10rem] sm:scale-[1.12]"
                sizes="140px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
