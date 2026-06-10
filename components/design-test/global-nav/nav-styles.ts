/** Shared classes for design-test global navigation (black + orange glass). */

export const globalNavHeader =
  "sticky top-0 z-50 border-b border-orange-500/15 bg-black/55 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-md supports-[backdrop-filter]:bg-black/45";

export const globalNavInner =
  "mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8";

export const globalNavLinkBase =
  "rounded-md px-2 py-1.5 text-[13px] font-medium tracking-[-0.01em] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-orange-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

export function globalNavLinkClasses(active: boolean) {
  return active
    ? `${globalNavLinkBase} text-orange-100`
    : `${globalNavLinkBase} text-white/55 hover:text-orange-100/90`;
}

export const globalNavCta =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-orange-600 px-4 text-[12px] font-semibold tracking-[-0.01em] text-white shadow-sm transition duration-200 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500/50 active:scale-[0.98] sm:px-5 sm:text-[13px]";

export const globalNavSeparator = "hidden text-orange-500/30 select-none sm:inline";

export const globalNavMobilePanel =
  "border-t border-orange-500/15 bg-black/95 px-4 py-4 backdrop-blur-lg lg:hidden";
