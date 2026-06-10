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
} as const;
