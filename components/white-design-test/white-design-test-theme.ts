/**
 * White design-test theme — #FFFFFF bg · #F8FAFC secondary · #0F172A text · #E55614 accent.
 */

export const wdtColors = {
  bg: "#FFFFFF",
  bgSecondary: "#F8FAFC",
  card: "#FFFFFF",
  primary: "#E55614",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
} as const;

export const wdtCta = {
  bg: "bg-[#E55614]",
  bgHover: "hover:bg-[#d14d12]",
  fill: "bg-gradient-to-r from-[#E55614] to-[#f06520]",
} as const;

export const wdtProgress = {
  track: "bg-[#E2E8F0]",
  fill: wdtCta.fill,
} as const;

const cardShadow =
  "shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_-8px_rgba(15,23,42,0.08)]";
const cardShadowHover =
  "hover:shadow-[0_4px_12px_rgba(15,23,42,0.08),0_16px_40px_-12px_rgba(15,23,42,0.12)]";

export const wdt = {
  badge:
    "inline-block rounded-full border border-[#E55614]/25 bg-[#E55614]/8 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0F172A] sm:text-[11px]",

  sectionBorder: "border-t border-[#E2E8F0]",

  section: "scroll-mt-14 py-12 sm:py-16 lg:py-20",

  sectionAfterHero: "mb-6 sm:mb-8",

  heading: "text-[#0F172A]",

  headingLg:
    "mt-5 text-3xl font-semibold leading-snug tracking-tight text-[#0F172A] sm:text-4xl lg:text-[2.5rem] lg:leading-tight",

  metaLabel:
    "text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:text-[11px]",

  headingSub: "text-[#64748B]",

  card: `rounded-2xl border border-[#E2E8F0] bg-white ${cardShadow}`,

  cardHover: `transition duration-300 hover:border-[#E55614]/30 hover:-translate-y-1 ${cardShadowHover}`,

  cardTopLine:
    "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E55614]/40 to-transparent opacity-80",

  iconBox:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E55614]/8 text-[#E55614] ring-1 ring-[#E55614]/15",

  iconBoxLg:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E55614]/8 text-[#E55614] ring-1 ring-[#E55614]/15",

  iconBoxSm:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E55614]/8 text-[#E55614] ring-1 ring-[#E55614]/15",

  iconBoxCard:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E55614]/8 text-[#E55614] ring-1 ring-[#E55614]/15 sm:h-12 sm:w-12 [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-[22px] sm:[&_svg]:w-[22px]",

  accentDash: "inline-block h-px w-6 bg-[#E55614]",

  link: "text-[#0F172A] transition hover:text-[#E55614]",

  linkSm: "text-[12px] font-medium text-[#0F172A] transition hover:text-[#E55614]",

  statValue: "text-[#0F172A]",

  statValueAlt: "text-[#E55614]",

  statLabel: "text-[#64748B]",

  body: "text-[#64748B]",

  number: "font-mono text-[11px] tabular-nums tracking-wider text-[#64748B]/70",

  tag:
    "rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#64748B]",

  logoCard:
    "rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#E55614]/25 hover:shadow-md sm:rounded-2xl",

  certPill:
    "inline-flex items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#64748B] sm:px-3 sm:py-1.5 sm:text-[11px]",

  ctaPanel:
    "rounded-3xl border border-[#E2E8F0] bg-white px-8 py-12 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.1)] sm:py-14",

  glassCard: "border border-[#E2E8F0]/80 bg-white/70 backdrop-blur-xl shadow-lg shadow-slate-900/5",

  glassFeatureCard:
    "border-[#E2E8F0] bg-white/80 shadow-lg shadow-slate-900/5 hover:border-[#E55614]/25 hover:shadow-xl",

  glassSubtext: "text-[#64748B]",

  glassLink: "text-[#0F172A] group-hover/card:text-[#E55614]",

  stackCard:
    "rounded-xl border border-[#E2E8F0] bg-white px-5 py-5 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] sm:px-6 sm:py-5",

  stackMeta: "text-[11px] font-medium uppercase tracking-[0.14em] text-[#64748B]",

  stackTitle: "text-base font-semibold leading-snug tracking-tight text-[#0F172A] sm:text-[17px]",

  stackBody: "mt-2 text-[13px] leading-relaxed text-[#64748B] sm:text-sm",

  stackCardArticle:
    "group/stack relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:border-[#E55614]/25 hover:-translate-y-1 sm:rounded-3xl",

  stackCardVisual:
    "relative flex min-h-[9.5rem] items-center justify-center overflow-hidden border-b border-[#E2E8F0] bg-[#F8FAFC] sm:min-h-[11rem] lg:min-h-[15rem] lg:border-b-0 lg:border-r lg:border-[#E2E8F0]",

  whyCard:
    "overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_-8px_rgba(15,23,42,0.1)]",

  whyCardHover:
    "transition duration-500 ease-out group-hover/card:-translate-y-2 group-hover/card:border-[#E55614]/20 group-hover/card:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.12)]",

  socialProofPanel:
    "relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_8px_32px_-12px_rgba(15,23,42,0.1)]",

  socialProofStat:
    "flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-5 text-center sm:px-5 sm:py-6",

  socialProofCert:
    "flex min-h-[4.5rem] min-w-[5.25rem] flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 sm:min-w-[5.75rem]",

  aboutOrgShell:
    "relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_8px_32px_-12px_rgba(15,23,42,0.1)]",

  aboutOrgCell:
    "rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6",

  aboutOrgMetric:
    "flex flex-col justify-center rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-5 text-center sm:px-5",

  procurementMock:
    "rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5",

  procurementSearch:
    "flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 shadow-sm",

  procurementChip:
    "flex h-full items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-3 shadow-sm sm:px-4 sm:py-3.5",
} as const;
