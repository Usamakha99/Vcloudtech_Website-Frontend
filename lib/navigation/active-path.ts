import type { NavGroup } from "@/lib/navigation/types";

/**
 * Whether `pathname` should highlight the nav item for `href`.
 * Handles nested routes (e.g. `/blog/slug`, `/vendor-updates` for News).
 */
export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavGroupActive(pathname: string, group: NavGroup): boolean {
  if (group.overviewHref && isNavActive(pathname, group.overviewHref)) return true;
  return group.items.some((item) => isNavActive(pathname, item.href));
}
