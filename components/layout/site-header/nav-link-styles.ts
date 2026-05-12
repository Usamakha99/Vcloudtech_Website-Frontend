/** Shared desktop nav + Solutions trigger — premium underline + focus ring. */
export const navTriggerBase =
  "relative inline-flex items-center gap-1 rounded-lg px-3 py-2.5 text-[0.8125rem] font-medium tracking-[-0.01em] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#1B224B]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export function navLinkClasses(active: boolean) {
  if (active) {
    return `${navTriggerBase} text-slate-900 after:pointer-events-none after:absolute after:bottom-1.5 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-[#E31E24] after:content-['']`;
  }
  return `${navTriggerBase} text-slate-500 after:pointer-events-none after:absolute after:bottom-1.5 after:left-3 after:right-3 after:h-px after:rounded-full after:bg-transparent after:transition-colors after:content-[''] hover:text-slate-900 hover:after:bg-slate-300/90`;
}
