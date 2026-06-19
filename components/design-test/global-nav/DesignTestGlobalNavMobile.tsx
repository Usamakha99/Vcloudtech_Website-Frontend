"use client";

import Link from "next/link";

import { isNavActive } from "@/lib/navigation/active-path";
import type { DesignTestGlobalNavLink } from "@/lib/navigation/design-test-global-nav";
import { designTestGlobalNavCta } from "@/lib/navigation/design-test-global-nav";

import {
  globalNavMobileCtaClass,
  globalNavMobileLinkActiveClass,
  globalNavMobileLinkClass,
} from "./nav-styles";
import { NavCtaArrowIcon } from "./NavCtaArrowIcon";

type Props = {
  open: boolean;
  links: readonly DesignTestGlobalNavLink[];
  pathname: string;
  onClose: () => void;
};

/** Mobile drawer for global navigation. */
export function DesignTestGlobalNavMobile({ open, links, pathname, onClose }: Props) {
  return (
    <div
      id="design-test-global-nav-panel"
      className={`dt-global-nav__mobile${open ? " dt-global-nav__mobile--open" : ""}`}
      aria-hidden={!open}
    >
      <div className="dt-global-nav__mobile-inner">
        <nav aria-label="Global navigation">
          <ul className="dt-global-nav__mobile-list">
            {links.map((item) => {
              const active = isNavActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`${globalNavMobileLinkClass}${active ? ` ${globalNavMobileLinkActiveClass}` : ""}`}
                    aria-current={active ? "page" : undefined}
                    tabIndex={open ? undefined : -1}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="dt-global-nav__mobile-cta-wrap">
          <Link
            href={designTestGlobalNavCta.href}
            onClick={onClose}
            className={globalNavMobileCtaClass}
            tabIndex={open ? undefined : -1}
          >
            {designTestGlobalNavCta.label}
            <NavCtaArrowIcon className="dt-global-nav__cta-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
