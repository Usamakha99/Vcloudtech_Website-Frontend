import Image from "next/image";
import { dt } from "@/components/design-test/design-test-theme";

import { GlassCard } from "@/components/design-test/GlassCard";

const vendors = [
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "HP", src: "/partners/hp.png" },
  { name: "Lenovo", src: "/partners/lenovo.png" },
  { name: "VMware", src: "/partners/vmware.png" },
] as const;

/** Vendor & technology partners — minimal logo strip with glass tiles. */
export function VendorPartnersStripSection() {
  return (
    <section
      id="vendor-partners"
      className={`scroll-mt-24 ${dt.section} ${dt.sectionBorder}`}
      aria-labelledby="vendor-partners-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>Partners</p>
          <h2
            id="vendor-partners-heading"
            className={`${dt.sectionHeadline} mt-5 text-white`}
          >
            Vendor &amp; technology partners
          </h2>
          <p className={`mt-3 text-sm leading-relaxed ${dt.headingSub}`}>
            Authorized programs and direct routes to the platforms your teams already run.
          </p>
        </header>

        <ul className="mt-8 flex flex-wrap items-stretch justify-center gap-3 sm:mt-10 sm:gap-4">
          {vendors.map((vendor, index) => (
            <li key={vendor.name} className="w-[calc(50%-0.375rem)] sm:w-auto sm:min-w-[7.5rem]">
              <GlassCard delay={Math.min(index + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6}>
                <div className="flex h-[4.25rem] flex-col items-center justify-center gap-2 px-4 py-3 sm:h-20 sm:px-5">
                  <Image
                    src={vendor.src}
                    alt={vendor.name}
                    width={88}
                    height={28}
                    className="h-6 w-auto max-w-[5rem] object-contain opacity-85 brightness-0 invert sm:h-7 sm:max-w-[5.5rem]"
                  />
                  <span className={`text-[10px] font-medium uppercase tracking-wider ${dt.statLabel}`}>
                    {vendor.name}
                  </span>
                </div>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
