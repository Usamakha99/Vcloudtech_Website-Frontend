/** Shared classes for design-test global navigation (#0F0F0F + #E55614 primary). */

export const globalNavHeader =
  "sticky top-0 z-50 border-b border-white/10 bg-[#0F0F0F]/90 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-md supports-[backdrop-filter]:bg-[#0F0F0F]/80";

export const globalNavInner =
  "mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8";

export const globalNavLinkBase =
  "rounded-md px-2 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-white outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#E55614]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F]";

export function globalNavLinkClasses(active: boolean) {
  return active
    ? `${globalNavLinkBase} text-white`
    : `${globalNavLinkBase} text-[#A1A1AA] hover:text-white`;
}

export const globalNavCta =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#E55614] px-4 text-[12px] font-semibold tracking-[-0.01em] text-white shadow-sm transition duration-200 hover:bg-[#f06520] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E55614]/50 active:scale-[0.98] sm:px-5 sm:text-[13px]";

export const globalNavSeparator = "hidden text-[#A1A1AA]/50 select-none sm:inline";

export const globalNavMobilePanel =
  "border-t border-white/10 bg-[#1A1A1A] px-4 py-4 backdrop-blur-lg lg:hidden";
