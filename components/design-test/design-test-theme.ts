/**
 * Design-test theme — #041329 bg · #111F34 cards · #E55614 primary · #FFFFFF / #A1A1AA text.
 */

export const dtColors = {
  bg: "#041329",
  card: "#111F34",
  primary: "#E55614",
  text: "#FFFFFF",
  muted: "#A1A1AA",
} as const;

/** Primary CTA — Get a Quote */
export const dtCta = {
  bg: "bg-[#E55614]",
  bgHover: "hover:bg-[#f06520]",
  fill: "bg-gradient-to-r from-[#E55614]/90 to-[#E55614]/50",
} as const;

/** @deprecated use dtCta */
export const dtCtaOrange = dtCta;

/** Scroll-stack card progress bar */
export const dtProgress = {
  track: "bg-[#111F34]",
  fill: dtCta.fill,
} as const;

export const dt = {
  badge:
    "inline-block rounded-full border border-[#b3b3b3]/30 bg-[#b3b3b3]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:text-[11px]",

  sectionBorder: "border-t border-white/10",

  section: "scroll-mt-14 py-8 sm:py-10",

  sectionAfterHero: "mb-6 sm:mb-8",

  heading: "text-white",

  sectionHeadline: "dt-section-headline",

  /** Technology Partners–style section header block */
  sectionHeader: "mx-auto max-w-3xl text-center",

  sectionHeadlineTp: "tp__headline mt-5",

  sectionDesc: "mt-3 text-sm leading-relaxed sm:text-[15px]",

  headingLg: "dt-section-headline mt-5 text-white",

  metaLabel:
    "text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A1A1AA] sm:text-[11px]",

  headingSub: "font-medium text-[#A1A1AA]",

  card:
    "rounded-2xl border border-white/10 bg-[#111F34] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/5",

  cardHover:
    "transition duration-300 hover:border-[#E55614]/35 hover:bg-[#111F34] hover:ring-[#E55614]/20 hover:shadow-[0_20px_44px_-12px_rgba(229,86,20,0.12)]",

  cardTopLine:
    "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E55614]/50 to-transparent opacity-80",

  iconBox:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E55614]/10 text-[#E55614] ring-1 ring-[#E55614]/25",

  iconBoxLg:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E55614]/10 text-[#E55614] ring-1 ring-[#E55614]/25",

  iconBoxSm:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E55614]/10 text-[#E55614] ring-1 ring-[#E55614]/25",

  iconBoxCard:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E55614]/10 text-[#E55614] ring-1 ring-[#E55614]/25 sm:h-12 sm:w-12 [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-[22px] sm:[&_svg]:w-[22px]",

  accentDash: "inline-block h-px w-6 bg-[#E55614]",

  link: "text-white transition hover:text-[#E55614]",

  linkSm: "text-[12px] font-medium text-white transition hover:text-[#E55614]",

  statValue: "text-white",

  statValueAlt: "text-[#E55614]",

  statLabel: "text-[#A1A1AA]",

  body: "text-[#A1A1AA]",

  number: "font-mono text-[11px] tabular-nums tracking-wider text-[#A1A1AA]/60",

  tag:
    "rounded-full border border-white/15 bg-[#111F34] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA]",

  logoCard:
    "rounded-xl border border-white/15 bg-[#111F34] shadow-sm ring-1 ring-white/5 transition duration-200 hover:-translate-y-0.5 hover:border-[#E55614]/30 hover:shadow-md sm:rounded-2xl",

  certPill:
    "inline-flex items-center rounded-md border border-white/15 bg-[#111F34] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA] sm:px-3 sm:py-1.5 sm:text-[11px]",

  ctaPanel:
    "rounded-3xl border border-white/10 bg-[#111F34] px-8 py-12 shadow-xl shadow-black/25 ring-1 ring-white/5 sm:py-14",

  glassCard:
    "border border-white/10 bg-[#111F34] shadow-lg shadow-black/15",

  glassFeatureCard:
    "border-white/10 bg-[#111F34] shadow-lg shadow-black/15 hover:border-[#E55614]/30 hover:shadow-md",

  glassSubtext: "text-[#A1A1AA]",

  glassLink: "text-white group-hover/card:text-[#E55614]",

  stackCard:
    "rounded-xl border border-white/10 bg-[#111F34] px-5 py-5 shadow-[0_8px_28px_-14px_rgba(0,0,0,0.45)] sm:px-6 sm:py-5",

  stackMeta: "text-[11px] font-medium uppercase tracking-[0.14em] text-[#A1A1AA]",

  stackTitle: "text-base font-bold leading-snug tracking-tight text-white sm:text-[17px]",

  stackBody: "mt-2 text-[13px] leading-relaxed text-[#A1A1AA] sm:text-sm",

  stackCardArticle:
    "group/stack relative overflow-hidden rounded-2xl border border-white/10 bg-[#111F34] ring-1 ring-white/5 transition-[border-color,box-shadow] duration-300 hover:border-[#E55614]/30 sm:rounded-3xl",

  stackCardVisual:
    "relative flex min-h-[9.5rem] items-center justify-center overflow-hidden border-b border-white/10 bg-[#041329] sm:min-h-[11rem] lg:min-h-[15rem] lg:border-b-0 lg:border-r lg:border-white/10",

  whyCard:
    "why-card-shell overflow-hidden rounded-2xl border border-white/10 bg-transparent shadow-[0_14px_40px_-16px_rgba(0,0,0,0.35)] ring-1 ring-white/5",

  whyCardHover:
    "transition duration-500 ease-out group-hover/card:-translate-y-2.5 group-hover/card:border-white/20 group-hover/card:shadow-[0_22px_44px_-14px_rgba(0,0,0,0.45)]",

  socialProofPanel:
    "relative overflow-hidden rounded-3xl border border-white/10 bg-[#111F34] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/5",

  socialProofStat:
    "flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#041329] px-4 py-5 text-center ring-1 ring-white/5 sm:px-5 sm:py-6",

  socialProofCert:
    "flex min-h-[4.5rem] min-w-[5.25rem] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#041329] px-4 py-3 ring-1 ring-white/5 sm:min-w-[5.75rem]",

  aboutOrgShell:
    "relative overflow-hidden rounded-3xl border border-white/10 bg-[#111F34] shadow-[0_20px_50px_-22px_rgba(0,0,0,0.55)] ring-1 ring-white/5",

  aboutOrgCell:
    "rounded-2xl border border-white/10 bg-[#041329] p-5 ring-1 ring-white/5 sm:p-6",

  aboutOrgMetric:
    "flex flex-col justify-center rounded-2xl border border-white/10 bg-[#041329] px-4 py-5 text-center ring-1 ring-white/5 sm:px-5",

  procurementMock:
    "rounded-2xl border border-white/10 bg-[#041329] p-4 ring-1 ring-white/5 sm:p-5",

  procurementSearch:
    "flex items-center gap-3 rounded-xl border border-white/10 bg-[#111F34] px-4 py-3 ring-1 ring-white/5",

  procurementChip:
    "flex h-full items-start gap-3 rounded-xl border border-white/10 bg-[#111F34] px-3.5 py-3 ring-1 ring-white/5 sm:px-4 sm:py-3.5",
} as const;
