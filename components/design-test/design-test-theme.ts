/**
 * Design-test theme — black + warm orange (matches page ingredient background).
 * Import these tokens in lab sections for consistent cards, badges, and copy.
 */

export const dt = {
  badge:
    "inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300 sm:text-[11px]",

  sectionBorder: "border-t border-orange-500/10",

  headingSub: "text-orange-100/60",

  card:
    "rounded-2xl border border-orange-500/20 bg-black/55 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] ring-1 ring-orange-400/10 backdrop-blur-xl",

  cardHover:
    "transition duration-300 hover:border-orange-400/35 hover:bg-black/70 hover:ring-orange-400/20 hover:shadow-[0_20px_44px_-12px_rgba(249,115,22,0.12)]",

  cardTopLine:
    "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/45 to-transparent opacity-80",

  iconBox:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/25",

  iconBoxLg:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/25",

  iconBoxSm:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/25",

  /** Unified card icon — same size & SVG scale across lab sections */
  iconBoxCard:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/25 sm:h-12 sm:w-12 [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-[22px] sm:[&_svg]:w-[22px]",

  accentDash: "inline-block h-px w-6 bg-orange-500/80",

  link: "text-orange-300 transition hover:text-orange-100",

  linkSm: "text-[12px] font-medium text-orange-300 transition hover:text-orange-100",

  statValue: "text-orange-400",

  statValueAlt: "text-orange-300",

  statLabel: "text-orange-100/65",

  body: "text-orange-50/75",

  number: "font-mono text-[11px] tabular-nums tracking-wider text-orange-200/35",

  tag:
    "rounded-full border border-orange-400/25 bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-300",

  logoCard:
    "rounded-xl border border-orange-200/30 bg-orange-50/95 shadow-sm ring-1 ring-orange-200/40 transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/70 hover:shadow-md sm:rounded-2xl",

  certPill:
    "inline-flex items-center rounded-md border border-orange-500/20 bg-orange-500/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-200/90 sm:px-3 sm:py-1.5 sm:text-[11px]",

  ctaPanel:
    "rounded-3xl border border-orange-500/25 bg-black/50 px-8 py-12 shadow-xl shadow-black/25 backdrop-blur-md ring-1 ring-orange-400/10 sm:py-14",

  glassCard:
    "border border-orange-500/20 bg-black/55 shadow-lg shadow-black/15 backdrop-blur-md group-hover/card:border-transparent group-focus-within/card:border-transparent group-hover/card:bg-black/65 group-hover/card:shadow-xl group-hover/card:shadow-orange-500/10 group-hover/card:ring-0",

  glassFeatureCard:
    "border-orange-500/20 bg-black/50 shadow-lg shadow-black/15 backdrop-blur-md hover:border-orange-400/30 hover:bg-black/60",

  glassSubtext: "text-orange-100/70",

  glassLink: "text-orange-300 group-hover/card:text-orange-200",

  /** Minimal sticky stack cards */
  stackCard:
    "rounded-xl border border-orange-500/15 bg-black/45 px-5 py-5 shadow-[0_8px_28px_-14px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-6 sm:py-5",

  stackMeta: "text-[11px] font-medium uppercase tracking-[0.14em] text-orange-400/70",

  stackTitle: "text-base font-semibold leading-snug tracking-tight text-white sm:text-[17px]",

  stackBody: "mt-2 text-[13px] leading-relaxed text-orange-100/55 sm:text-sm",

  /** Why vCloud — large minimal overlap cards */
  whyCard:
    "rounded-2xl border border-orange-500/15 bg-gradient-to-br from-black/60 via-black/50 to-orange-950/20 shadow-[0_14px_40px_-16px_rgba(0,0,0,0.5)] ring-1 ring-orange-400/8 backdrop-blur-xl",

  whyCardHover:
    "transition duration-500 ease-out group-hover:-translate-y-2.5 group-hover:border-orange-400/25 group-hover:shadow-[0_24px_48px_-14px_rgba(249,115,22,0.15)]",

  /** Social proof — hero credibility panel */
  socialProofPanel:
    "relative overflow-hidden rounded-3xl border border-orange-500/15 bg-gradient-to-b from-black/65 via-black/50 to-orange-950/25 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-orange-400/10 backdrop-blur-xl",

  socialProofStat:
    "flex flex-col items-center justify-center rounded-2xl border border-orange-500/12 bg-black/35 px-4 py-5 text-center ring-1 ring-orange-400/8 sm:px-5 sm:py-6",

  socialProofCert:
    "flex min-h-[4.5rem] min-w-[5.25rem] flex-col items-center justify-center rounded-xl border border-orange-500/18 bg-orange-500/6 px-4 py-3 ring-1 ring-orange-400/10 sm:min-w-[5.75rem]",

  /** About — organizational blueprint panel */
  aboutOrgShell:
    "relative overflow-hidden rounded-3xl border border-orange-500/15 bg-gradient-to-br from-black/65 via-black/50 to-orange-950/20 shadow-[0_20px_50px_-22px_rgba(0,0,0,0.55)] ring-1 ring-orange-400/10 backdrop-blur-xl",

  aboutOrgCell:
    "rounded-2xl border border-orange-500/12 bg-black/35 p-5 ring-1 ring-orange-400/8 sm:p-6",

  aboutOrgMetric:
    "flex flex-col justify-center rounded-2xl border border-orange-500/12 bg-black/40 px-4 py-5 text-center ring-1 ring-orange-400/8 sm:px-5",
} as const;
