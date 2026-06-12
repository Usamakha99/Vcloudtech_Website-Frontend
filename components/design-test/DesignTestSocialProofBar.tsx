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

/** Partner logo marquee — minimal strip below hero. */
export function DesignTestSocialProofBar() {
  const marqueeLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section
      className={`relative z-30 mt-8 sm:mt-10 lg:mt-12 ${dt.sectionAfterHero}`}
      aria-label="Technology partners"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={dt.socialProofPanel}>
          <span className={dt.cardTopLine} aria-hidden />

          <div className="relative overflow-hidden px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
            <span
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent sm:w-20"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent sm:w-20"
              aria-hidden
            />

            <ul className="animate-social-proof-marquee flex w-max items-center gap-3 py-1 sm:gap-4">
              {marqueeLogos.map((logo, index) => (
                <li key={`${logo.name}-${index}`} className="shrink-0">
                  <LogoPill logo={logo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoPill({ logo }: { logo: (typeof partnerLogos)[number] }) {
  return (
    <div className="flex h-14 w-[8.25rem] items-center justify-center rounded-xl border border-white/20 bg-white px-3 shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:h-[4.75rem] sm:w-[10.75rem] sm:rounded-2xl sm:px-4">
      <Image
        src={logo.src}
        alt={logo.name}
        width={180}
        height={56}
        className="h-auto max-h-9 w-auto max-w-full scale-110 object-contain sm:max-h-11 sm:scale-[1.12]"
        sizes="140px"
      />
    </div>
  );
}
