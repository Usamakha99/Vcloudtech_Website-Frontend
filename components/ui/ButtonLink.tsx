import Link from "next/link";
import type { ComponentProps } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "primaryNavy"
  | "outlineDark"
  | "outlineOnNavy"
  | "ctaWhite";

const base =
  "inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-11 sm:text-[0.9375rem]";

const variants: Record<Variant, string> = {
  primary:
    "bg-sky-500 text-white shadow-sm hover:bg-sky-400 focus-visible:outline-sky-400 active:bg-sky-600",
  secondary:
    "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 focus-visible:outline-white/60",
  primaryNavy:
    "bg-[#1B224B] text-white shadow-sm hover:bg-[#141a38] focus-visible:outline-[#1B224B]/40 active:bg-[#12162f]",
  outlineDark:
    "border-2 border-slate-900/15 bg-white text-slate-900 shadow-sm hover:border-slate-900/25 hover:bg-slate-50 focus-visible:outline-[#1B224B]/30",
  outlineOnNavy:
    "border-2 border-white/70 bg-transparent text-white shadow-sm hover:border-white hover:bg-white/10 focus-visible:outline-white/50",
  ctaWhite:
    "border-0 bg-white text-[#1B224B] shadow-md hover:bg-slate-100 focus-visible:outline-white/70",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant: Variant;
  className?: string;
};

/**
 * Reusable CTA link styled as a button. Server Component–safe (no client JS).
 * Use for primary/secondary actions sitewide.
 */
export function ButtonLink({ variant, className = "", ...props }: Props) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
