import Image from "next/image";
import Link from "next/link";

const partners = [
  { name: "Apple", src: "/partners/apple.png" },
  { name: "Adobe", src: "/partners/adobe.png" },
 
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Barracuda", src: "/partners/barracuda.png" },
  { name: "Check Point", src: "/partners/checkpoint.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "DataCore", src: "/partners/datacore.png" },
  { name: "Dell Technologies", src: "/partners/dell.png" },
  { name: "Fortinet", src: "/partners/fortinet.png" },
  { name: "HPE", src: "/partners/hpe.png" },
  { name: "HP", src: "/partners/hp.png" },
  { name: "IBM", src: "/partners/ibm.png" },
  { name: "Intel", src: "/partners/intel.png" },
  { name: "Lenovo", src: "/partners/lenovo.png" },
  { name: "Malwarebytes", src: "/partners/malwarebytes.png" },
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "Okta", src: "/partners/okta.png" },
  { name: "Palo Alto Networks", src: "/partners/palo-alto.png" },
  { name: "Samsung", src: "/partners/samsung.png" },
  { name: "VMware", src: "/partners/vmware.png" },
  { name: "Zoom", src: "/partners/zoom.png" },
] as const;

export function HomePartnersSection() {
  return (
    <section
      className="border-t border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40 py-14 sm:py-16 lg:py-20"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-center">
          <h2
            id="partners-heading"
            className="inline-block rounded-full border border-slate-200/80 bg-white/90 px-5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm ring-1 ring-slate-900/[0.04] sm:text-xs sm:tracking-[0.22em]"
          >
            Access to leading technology partners
          </h2>
        </div>

        <ul className="mx-auto mt-11 grid max-w-7xl grid-cols-4 gap-2 sm:mt-12 sm:gap-2.5 md:grid-cols-7 md:gap-x-2 md:gap-y-3 lg:gap-x-3 lg:gap-y-4">
          {partners.map((partner, index) => (
            <li
              key={partner.name}
              className="animate-partner-float min-w-0 motion-reduce:animate-none hover:[animation-play-state:paused]"
              style={{ animationDelay: `${(index % 4) * 0.12}s` }}
            >
              <div className="group flex h-[4rem] w-full flex-col items-center justify-center rounded-lg border border-slate-200/90 bg-white px-1.5 py-1.5 shadow-sm ring-1 ring-slate-900/[0.03] transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-sky-200/70 hover:shadow-md sm:h-[4.25rem] sm:rounded-xl sm:px-2 sm:py-2 md:h-[4.875rem] md:rounded-2xl md:px-2 md:py-2 lg:h-[5.75rem] lg:px-3 lg:py-3">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={260}
                  height={104}
                  className="h-auto max-h-8 w-auto max-w-full object-contain contrast-[1.04] sm:max-h-9 md:max-h-[2.35rem] lg:max-h-[3.2rem] xl:max-h-[3.45rem]"
                  sizes="(max-width: 767px) 22vw, (max-width: 1279px) 12vw, 160px"
                />
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-11 text-center sm:mt-12">
          <Link
            href="/solutions"
            className="text-sm font-semibold text-sky-700 underline-offset-4 hover:text-sky-900 hover:underline"
          >
            View All Partner →
          </Link>
        </p>
      </div>
    </section>
  );
}
