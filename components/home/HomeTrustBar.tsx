/**
 * Social proof strip under hero — headline, industry row, certification badges.
 */
const NAVY = "#002855";
const BADGE_BLUE = "#0056B3";

const sectors = [
  { label: "School districts", icon: SchoolDistrictIcon },
  { label: "Government agencies", icon: GovernmentAgenciesIcon },
  { label: "Higher education", icon: GraduationCapIcon },
  { label: "Healthcare", icon: HealthcareIcon },
  { label: "Enterprise clients", icon: EnterpriseSkylineIcon },
] as const;

export function HomeTrustBar() {
  return (
    <section
      className="relative z-10 border-y border-slate-200/70 bg-slate-100 py-10 sm:py-12 lg:py-14"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          id="trust-heading"
          className="text-center text-[11px] font-bold uppercase leading-snug tracking-[0.16em] sm:text-xs sm:tracking-[0.18em]"
          style={{ color: NAVY }}
        >
          Trusted by organizations across the U.S.
        </h2>

        <div className="mt-9 flex flex-col items-center gap-10 lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <ul
            className="grid w-full min-w-0 flex-1 grid-cols-5 items-start justify-items-center gap-x-1.5 sm:gap-x-2.5 md:gap-x-4 lg:gap-x-3 xl:gap-x-5"
          >
            {sectors.map(({ label, icon: Icon }) => (
              <li key={label} className="flex min-w-0 flex-col items-center px-0.5 text-center sm:px-1">
                <span className="text-[#0056B3]" aria-hidden>
                  <Icon />
                </span>
                <span
                  className="mt-2 w-full text-[9px] font-bold uppercase leading-snug tracking-[0.06em] sm:text-[10px] sm:tracking-[0.07em] md:text-[11px]"
                  style={{ color: NAVY }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <ul className="flex flex-1 flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
            <li>
              <AcronymCertCard acronym="MBE" />
            </li>
            <li>
              <AcronymCertCard acronym="SBE" />
            </li>
            <li>
              <AcronymCertCard acronym="DBE" />
            </li>
            <li>
              <IsoCertCard />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function AcronymCertCard({ acronym }: { acronym: string }) {
  return (
    <div className="flex min-h-[4.25rem] min-w-[5.5rem] flex-col items-center justify-center rounded-md border border-slate-200/95 bg-white px-4 py-2.5 shadow-sm sm:min-w-[6rem]">
      <span className="text-xl font-bold leading-none sm:text-2xl" style={{ color: BADGE_BLUE }}>
        {acronym}
      </span>
      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-[10px]">
        Certified
      </span>
    </div>
  );
}

function IsoCertCard() {
  return (
    <div className="flex max-w-[15rem] items-center gap-3 rounded-md border border-slate-200/95 bg-white px-3 py-2.5 shadow-sm sm:gap-3.5 sm:px-4">
      <div className="relative h-11 w-11 shrink-0 text-[#0056B3]" aria-hidden>
        <svg className="h-full w-full" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.25">
          <circle cx="22" cy="22" r="18" strokeOpacity="0.35" />
          <circle cx="22" cy="22" r="14" />
          <path d="M22 10v6M22 28v6M10 22h6M28 22h6" strokeLinecap="round" strokeOpacity="0.4" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold tracking-tight text-[#002855]">
          ISO
        </span>
      </div>
      <p className="min-w-0 text-left text-[10px] font-bold uppercase leading-snug tracking-wide text-[#002855] sm:text-[11px]">
        ISO 9001:2015
        <br />
        <span className="font-semibold uppercase tracking-wide text-slate-600">Certified</span>
      </p>
    </div>
  );
}

function SchoolDistrictIcon() {
  return (
    <svg className="mx-auto h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
      <path d="M5 26V13l11-6 11 6v13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 26v-7h12v7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7v2M14 5h4" strokeLinecap="round" />
      <path
        d="M20 8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M18 10v1.5" strokeLinecap="round" />
    </svg>
  );
}

function GovernmentAgenciesIcon() {
  return (
    <svg className="mx-auto h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
      <path d="M5 28h22M7 28V12l9-5 9 5v16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 28V18h3v10M14.5 18h3M17.5 18H21v10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7v3M12 10h8" strokeLinecap="round" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg className="mx-auto h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
      <path d="M4 14l12-5 12 5-12 5-12-5z" strokeLinejoin="round" />
      <path d="M9 16.5V22c0 2 5.5 3.5 7 3.5s7-1.5 7-3.5v-5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 12v-2l2-1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HealthcareIcon() {
  return (
    <svg className="mx-auto h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
      <circle cx="16" cy="15" r="8.5" strokeLinecap="round" />
      <path d="M16 11v8M12 15h8" strokeLinecap="round" />
    </svg>
  );
}

function EnterpriseSkylineIcon() {
  return (
    <svg className="mx-auto h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
      <path d="M4 26V16h4v10M8 16h4v10M12 14h5v12M17 18h4v8M21 12h7v14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 26h24" strokeLinecap="round" />
      <path d="M14 14v-2h2v2M23 12v-2h2v2" strokeLinecap="round" />
    </svg>
  );
}
