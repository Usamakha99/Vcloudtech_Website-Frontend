/**
 * Whether `pathname` should highlight the nav item for `href`.
 * Handles nested routes (e.g. `/posts/slug` for Blog).
 */
export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
