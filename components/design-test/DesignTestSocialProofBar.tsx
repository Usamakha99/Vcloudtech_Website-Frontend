import Image from "next/image";

import { dt } from "@/components/design-test/design-test-theme";

const partnerLogos = [
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "VMware", src: "/partners/vmware.png" },
] as const;

const stats = [
  { value: "500+", label: "Clients served" },
  { value: "15+", label: "Years in business" },
] as const;

const certifications = ["MBE", "SBE", "DBE", "ISO 9001"] as const;

/** Minimal social proof strip — vendor logos, stats, certifications. */
export function DesignTestSocialProofBar() {
  return (
    <section
      className="relative z-30 -mt-10 mb-10 pb-2 sm:-mt-14 sm:mb-12 sm:pb-4 lg:mb-14"
      aria-labelledby="social-proof-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`${dt.card} px-4 py-4 sm:px-6 sm:py-5`}>
          <p
            id="social-proof-heading"
            className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300/90 sm:text-[11px]"
          >
            Social proof — instant credibility
          </p>

          <div className="mt-4 flex flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-6">
            <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 lg:justify-start">
              {partnerLogos.map((logo) => (
                <li key={logo.name}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={40}
                    className="h-5 w-auto max-w-[4.5rem] object-contain opacity-80 brightness-0 invert sm:h-6 sm:max-w-[5.5rem]"
                  />
                </li>
              ))}
            </ul>

            <div className="hidden h-8 w-px bg-orange-500/15 lg:block" aria-hidden />

            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6">
              {stats.map((item, index) => (
                <li key={item.label} className="flex items-center gap-4 sm:gap-6">
                  {index > 0 ? (
                    <span className="hidden text-orange-500/25 sm:inline" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <div className="text-center sm:text-left">
                    <p className={`text-lg font-semibold tabular-nums tracking-tight text-white sm:text-xl`}>
                      {item.value}
                    </p>
                    <p className={`text-[11px] font-medium ${dt.statLabel}`}>{item.label}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden h-8 w-px bg-orange-500/15 lg:block" aria-hidden />

            <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {certifications.map((cert) => (
                <li key={cert}>
                  <span className={dt.certPill}>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
