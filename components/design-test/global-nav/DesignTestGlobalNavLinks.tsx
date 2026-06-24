"use client";

import Link from "next/link";

import { isNavActive } from "@/lib/navigation/active-path";
import type { DesignTestGlobalNavItem } from "@/lib/navigation/design-test-global-nav";

import { DesignTestGlobalNavDropdown } from "./DesignTestGlobalNavDropdown";
import { globalNavLinkActiveClass, globalNavLinkClass } from "./nav-styles";

type Props = {
  items: readonly DesignTestGlobalNavItem[];
  pathname: string;
  onNavigate?: () => void;
  className?: string;
};

/** Desktop global nav items — links and Solutions dropdown. */
export function DesignTestGlobalNavLinks({
  items,
  pathname,
  onNavigate,
  className = "",
}: Props) {
  return (
    <ul className={`dt-global-nav__links-list ${className}`}>
      {items.map((item) => {
        if (item.type === "dropdown") {
          return (
            <li key={item.href}>
              <DesignTestGlobalNavDropdown
                label={item.label}
                overviewHref={item.href}
                groups={item.groups}
                pathname={pathname}
              />
            </li>
          );
        }

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
