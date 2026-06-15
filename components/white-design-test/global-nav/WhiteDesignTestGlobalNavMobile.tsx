"use client";

import Link from "next/link";

import { isNavActive } from "@/lib/navigation/active-path";
import type { DesignTestGlobalNavLink } from "@/lib/navigation/design-test-global-nav";
import { designTestGlobalNavCta } from "@/lib/navigation/design-test-global-nav";

import {
  whiteGlobalNavCta,
  whiteGlobalNavLinkClasses,
  whiteGlobalNavMobilePanel,
} from "./nav-styles-light";

type Props = {
  open: boolean;
  links: readonly DesignTestGlobalNavLink[];
  pathname: string;
  onClose: () => void;
};

export function WhiteDesignTestGlobalNavMobile({ open, links, pathname, onClose }: Props) {
  if (!open) return null;

  return (
    <div id="white-design-test-global-nav-panel" className={whiteGlobalNavMobilePanel}>
      <nav aria-label="Global navigation">
        <ul className="flex flex-col gap-1">
          {links.map((item) => {
            const active = isNavActive(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded-lg px-3 py-2.5 ${whiteGlobalNavLinkClasses(active)}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-4 border-t border-[#E2E8F0] pt-4">
        <Link href={designTestGlobalNavCta.href} onClick={onClose} className={`${whiteGlobalNavCta} w-full`}>
          {designTestGlobalNavCta.label}
        </Link>
      </div>
    </div>
  );
}
