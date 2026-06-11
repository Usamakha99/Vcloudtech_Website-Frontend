/** True only on narrow phone/tablet portrait widths — not touch laptops. */
export function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}
