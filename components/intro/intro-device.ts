/** Phones / touch devices — intro is skipped. */
export function isMobileDevice() {
  if (typeof window === "undefined") return false;

  if (window.matchMedia("(max-width: 767px)").matches) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (navigator.maxTouchPoints > 0) return true;

  return false;
}
