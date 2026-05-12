"use client";

import Link from "next/link";

import { isNavActive } from "@/lib/navigation/active-path";
import { siteNavigation } from "@/lib/navigation/site-navigation";
import type { NavItem } from "@/lib/navigation/types";

import { navLinkClasses } from "./nav-link-styles";
import { SolutionsDropdown } from "./SolutionsDropdown";

type DesktopNavProps = {
  pathname: string;
};

export function DesktopNav({ pathname }: DesktopNavProps) {
  return (
    <nav
      className="hidden items-center justify-center gap-0.5 lg:flex xl:gap-1"
      aria-label="Primary"
    >
      {siteNavigation.map((item) => (
        <NavEntry
          key={item.type === "link" ? item.href : item.href}
          item={item}
          pathname={pathname}
        />
      ))}
    </nav>
  );
}

function NavEntry({ item, pathname }: { item: NavItem; pathname: string }) {
  if (item.type === "dropdown") {
    return (
      <SolutionsDropdown
        label={item.label}
        overviewHref={item.href}
        items={item.children}
        pathname={pathname}
      />
    );
  }

  const active = isNavActive(pathname, item.href);

  return (
    <Link href={item.href} className={navLinkClasses(active)}>
      {item.label}
    </Link>
  );
}
