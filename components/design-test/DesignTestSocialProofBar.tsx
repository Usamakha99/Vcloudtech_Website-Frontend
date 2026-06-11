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

const stats = [
  { value: "500+", label: "Clients served", accent: "orange" as const },
  { value: "15+", label: "Years in business", accent: "amber" as const },
  { value: "50", label: "States served", accent: "orange" as const },
] as const;

const certifications = [
  { kind: "acronym" as const, label: "MBE" },
  { kind: "acronym" as const, label: "SBE" },
  { kind: "acronym" as const, label: "DBE" },
  { kind: "iso" as const, label: "ISO 9001" },
] as const;

/** Premium social proof panel — stats, partner marquee, certifications. */
export function DesignTestSocialProofBar() {
  const marqueeLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section
      className={`relative z-30 mt-8 sm:mt-10 lg:mt-12 ${dt.sectionAfterHero}`}
      aria-labelledby="social-proof-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={dt.socialProofPanel}>
          <span
            className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-[#E55614]/12 blur-3xl"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-48 rounded-full bg-[#E55614]/10 blur-3xl"
            aria-hidden
          />
          <span className={dt.cardTopLine} aria-hidden />

          <div className="relative px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10 lg:px-10">
            <header className="mx-auto max-w-2xl text-center">
              <p className={dt.badge}>Social proof</p>
              <h2
                id="social-proof-heading"
                className="mt-5 text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-[1.75rem]"
              >
                Instant credibility at a glance
              </h2>
              <p className={`mt-3 text-sm leading-relaxed ${dt.headingSub}`}>
                Enterprise teams trust vCloud Tech for procurement, licensing, and IT solutions nationwide.
              </p>
            </header>

            <ul className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3 lg:gap-4">
              {stats.map((item) => (
                <li key={item.label}>
                  <StatBlock item={item} />
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-10">
              <p className={`text-center ${dt.metaLabel}`}>
                Trusted technology partners
              </p>

              <div className="relative mt-4 overflow-hidden sm:mt-5">
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

            <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
              <p className={`text-center ${dt.metaLabel}`}>
                Certifications & designations
              </p>
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:mt-5 sm:gap-3">
                {certifications.map((cert) => (
                  <li key={cert.label}>
                    {cert.kind === "iso" ? <IsoCertCard /> : <AcronymCertCard acronym={cert.label} />}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ item }: { item: (typeof stats)[number] }) {
  const valueColor = item.accent === "orange" ? dt.statValue : dt.statValueAlt;

  return (
    <div className={dt.socialProofStat}>
      <p className={`text-xl font-bold tabular-nums tracking-tight sm:text-3xl lg:text-[2rem] ${valueColor}`}>
        {item.value}
      </p>
      <p className={`mt-1 text-[9px] font-medium leading-snug sm:mt-1.5 sm:text-[11px] ${dt.statLabel}`}>{item.label}</p>
    </div>
  );
}

function LogoPill({ logo }: { logo: (typeof partnerLogos)[number] }) {
  return (
    <div className={`flex h-12 w-[7.5rem] items-center justify-center px-3 sm:h-16 sm:w-[9.5rem] sm:px-4 ${dt.logoCard}`}>
      <Image
        src={logo.src}
        alt={logo.name}
        width={160}
        height={48}
        className="h-auto max-h-7 w-auto max-w-full object-contain contrast-[1.02] sm:max-h-8"
        sizes="120px"
      />
    </div>
  );
}

function AcronymCertCard({ acronym }: { acronym: string }) {
  return (
    <div className={dt.socialProofCert}>
      <span className="text-xl font-bold leading-none text-white sm:text-2xl">{acronym}</span>
      <span className={`mt-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px] ${dt.statLabel}`}>
        Certified
      </span>
    </div>
  );
}

function IsoCertCard() {
  return (
    <div className={`flex min-h-[4.5rem] items-center gap-3 px-3.5 py-3 sm:gap-3.5 sm:px-4 ${dt.socialProofCert}`}>
      <div className="relative h-10 w-10 shrink-0 text-[#A1A1AA] sm:h-11 sm:w-11" aria-hidden>
        <svg className="h-full w-full" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.25">
          <circle cx="22" cy="22" r="18" strokeOpacity="0.35" />
          <circle cx="22" cy="22" r="14" />
          <path d="M22 10v6M22 28v6M10 22h6M28 22h6" strokeLinecap="round" strokeOpacity="0.4" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold tracking-tight text-white">
          ISO
        </span>
      </div>
      <p className="min-w-0 text-left text-[10px] font-bold uppercase leading-snug tracking-wide text-white sm:text-[11px]">
        ISO 9001:2015
        <br />
        <span className={`font-semibold ${dt.statLabel}`}>Certified</span>
      </p>
    </div>
  );
}
