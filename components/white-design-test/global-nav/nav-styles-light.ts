/** Shared classes for white-design-test global navigation. */

export const whiteGlobalNavHeader =
  "sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/85 shadow-[0_1px_3px_rgba(15,23,42,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75";

export const whiteGlobalNavInner =
  "mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8";

export const whiteGlobalNavLinkBase =
  "rounded-md px-2 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-[#0F172A] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#E55614]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export function whiteGlobalNavLinkClasses(active: boolean) {
  return active
    ? `${whiteGlobalNavLinkBase} text-[#0F172A]`
    : `${whiteGlobalNavLinkBase} text-[#64748B] hover:text-[#0F172A]`;
}

export const whiteGlobalNavCta =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#E55614] px-4 text-[12px] font-semibold tracking-[-0.01em] text-white shadow-sm transition duration-200 hover:bg-[#d14d12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E55614]/50 active:scale-[0.98] sm:px-5 sm:text-[13px]";

export const whiteGlobalNavSeparator = "hidden text-[#CBD5E1] select-none sm:inline";

export const whiteGlobalNavMobilePanel =
  "border-t border-[#E2E8F0] bg-white px-4 py-4 shadow-lg backdrop-blur-lg lg:hidden";

export const whiteLabSwitcher =
  "hidden items-center gap-1 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] sm:inline-flex";

export function whiteLabSwitcherLink(active: boolean) {
  return active
    ? "rounded-full bg-white px-2.5 py-1 text-[#0F172A] shadow-sm"
    : "rounded-full px-2.5 py-1 text-[#64748B] transition hover:text-[#0F172A]";
}
