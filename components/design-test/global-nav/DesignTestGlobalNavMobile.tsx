"use client";

import Link from "next/link";

import { isNavActive } from "@/lib/navigation/active-path";
import type { DesignTestGlobalNavLink } from "@/lib/navigation/design-test-global-nav";
import { designTestGlobalNavCta } from "@/lib/navigation/design-test-global-nav";

import { globalNavCta, globalNavLinkClasses } from "./nav-styles";

type Props = {
  open: boolean;
  links: readonly DesignTestGlobalNavLink[];
  pathname: string;
  onClose: () => void;
};

/** Mobile drawer for global navigation. */
export function DesignTestGlobalNavMobile({ open, links, pathname, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      id="design-test-global-nav-panel"
      className="border-t border-white/10 bg-[#1B224B]/95 px-4 py-4 backdrop-blur-lg lg:hidden"
    >
      <nav aria-label="Global navigation">
        <ul className="flex flex-col gap-1">
          {links.map((item) => {
            const active = isNavActive(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded-lg px-3 py-2.5 ${globalNavLinkClasses(active)}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-4 border-t border-white/10 pt-4">
        <Link href={designTestGlobalNavCta.href} onClick={onClose} className={`${globalNavCta} w-full`}>
          {designTestGlobalNavCta.label}
        </Link>
      </div>
    </div>
  );
}
