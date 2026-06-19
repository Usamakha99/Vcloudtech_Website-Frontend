"use client";

import Link from "next/link";

import { isNavActive } from "@/lib/navigation/active-path";
import type { DesignTestGlobalNavLink } from "@/lib/navigation/design-test-global-nav";

import { globalNavLinkActiveClass, globalNavLinkClass } from "./nav-styles";

type Props = {
  links: readonly DesignTestGlobalNavLink[];
  pathname: string;
  onNavigate?: () => void;
  className?: string;
};

/** Desktop global nav links with animated underline. */
export function DesignTestGlobalNavLinks({
  links,
  pathname,
  onNavigate,
  className = "",
}: Props) {
  return (
    <ul className={`dt-global-nav__links-list ${className}`}>
      {links.map((item) => {
        const active = isNavActive(pathname, item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`${globalNavLinkClass}${active ? ` ${globalNavLinkActiveClass}` : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
              <span className="dt-global-nav__link-underline" aria-hidden />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
