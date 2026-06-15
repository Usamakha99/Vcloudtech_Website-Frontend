"use client";

import Link from "next/link";

import { isNavActive } from "@/lib/navigation/active-path";
import type { DesignTestGlobalNavLink } from "@/lib/navigation/design-test-global-nav";

import {
  whiteGlobalNavLinkClasses,
  whiteGlobalNavSeparator,
} from "./nav-styles-light";

type Props = {
  links: readonly DesignTestGlobalNavLink[];
  pathname: string;
  onNavigate?: () => void;
  className?: string;
};

export function WhiteDesignTestGlobalNavLinks({
  links,
  pathname,
  onNavigate,
  className = "",
}: Props) {
  return (
    <ul className={`flex flex-wrap items-center gap-1 sm:gap-0 ${className}`}>
      {links.map((item, index) => {
        const active = isNavActive(pathname, item.href);

        return (
          <li key={item.href} className="flex items-center">
            {index > 0 ? (
              <span className={whiteGlobalNavSeparator} aria-hidden>
                ·
              </span>
            ) : null}
            <Link
              href={item.href}
              onClick={onNavigate}
              className={whiteGlobalNavLinkClasses(active)}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
