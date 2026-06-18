/** Shared classes for design-test global navigation — glass over page content. */

export const globalNavHeader =
  "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#041329]/15 shadow-none backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[#041329]/10";

export const globalNavInner =
  "mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8";

export const globalNavLinkBase =
  "rounded-md px-2 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-white outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#b3b3b3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

export function globalNavLinkClasses(active: boolean) {
  return active
    ? `${globalNavLinkBase} text-white`
    : `${globalNavLinkBase} text-[#A1A1AA] hover:text-white`;
}

export const globalNavCta =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#E55614] px-4 text-[12px] font-semibold tracking-[-0.01em] text-white shadow-sm shadow-[#E55614]/25 transition duration-200 hover:bg-[#b3b3b3] hover:text-[#041329] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b3b3b3]/50 active:scale-[0.98] sm:px-5 sm:text-[13px]";

export const globalNavSeparator = "hidden text-[#A1A1AA]/50 select-none sm:inline";

export const globalNavMobilePanel =
  "border-t border-white/10 bg-[#041329]/25 px-4 py-4 backdrop-blur-xl lg:hidden";
