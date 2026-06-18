import Link from "next/link";

import { HeroFeaturePanel } from "@/components/home/HeroFeaturePanel";
import { HeroStats, type HeroStat } from "@/components/home/HeroStats";
import { ButtonLink } from "@/components/ui/ButtonLink";

const defaultStats: HeroStat[] = [
  { value: 500, suffix: "+", label: "Enterprise clients" },
  { value: 99.9, suffix: "%", label: "Platform availability", decimals: 1 },
  { value: 15, suffix: "+", label: "Years in IT services" },
  { value: 24, suffix: "/7", label: "Operations support" },
];

const checklist = [
  "SOC-aligned practices and documented controls",
  "Multi-cloud and hybrid architecture expertise",
  "Procurement support across leading manufacturers",
  "24/7 operations and solutions architecture access",
] as const;

type HeroProps = {
  stats?: HeroStat[];
};

/**
 * Enterprise split hero: light left column + dark capability panel + results card.
 */
export function Hero({ stats = defaultStats }: HeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[min(100%,560px)] rounded-full bg-sky-500/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="max-w-xl lg:max-w-none">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Enterprise IT solutions
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
            >
              Cloud, cybersecurity, procurement &amp; Microsoft solutions for
              organizations that demand scale and governance.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              vCloudTech helps enterprises migrate, modernize, and run critical
              workloads—with the reliability, compliance posture, and partner
              access your teams expect from a national solutions provider.
            </p>

            <ul className="mt-8 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700 sm:text-[0.9375rem]">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700"
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href="/#contact" variant="primaryNavy">
                Request a consultation
              </ButtonLink>
              <ButtonLink href="/contact" variant="outlineDark">
                Talk to an expert
              </ButtonLink>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              <Link
                href="/posts"
                className="font-semibold text-sky-700 underline-offset-4 hover:text-sky-800 hover:underline"
              >
                Blog
              </Link>
              <span className="mx-2 text-slate-300" aria-hidden>
                ·
              </span>
              <Link
                href="/vendor-updates"
                className="font-semibold text-sky-700 underline-offset-4 hover:text-sky-800 hover:underline"
              >
                News
              </Link>
              <span className="mx-2 text-slate-300" aria-hidden>
                ·
              </span>
              <Link
                href="mailto:info@vcloudtech.com"
                className="font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
              >
                info@vcloudtech.com
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:max-w-none">
            <HeroFeaturePanel />
            <HeroStats stats={stats} tone="light" layout="card" />
          </div>
        </div>
      </div>
    </section>
  );
}
