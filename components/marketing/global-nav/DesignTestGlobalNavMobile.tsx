"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { isNavActive, isNavGroupActive } from "@/lib/navigation/active-path";
import type { GlobalNavItem } from "@/lib/navigation/global-nav";
import { globalNavCta } from "@/lib/navigation/global-nav";
import type { NavGroup } from "@/lib/navigation/types";

import {
  globalNavMobileCtaClass,
  globalNavMobileLinkActiveClass,
  globalNavMobileLinkClass,
} from "./nav-styles";
import { NavCtaArrowIcon } from "./NavCtaArrowIcon";

type Props = {
  open: boolean;
  items: readonly GlobalNavItem[];
  pathname: string;
  onClose: () => void;
};

/** Mobile drawer for global navigation. */
export function DesignTestGlobalNavMobile({ open, items, pathname, onClose }: Props) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [openGroupIndex, setOpenGroupIndex] = useState<number | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setSolutionsOpen(false);
      setOpenGroupIndex(null);
    });
  }, [pathname]);

  return (
    <div
      id="design-test-global-nav-panel"
      className={`dt-global-nav__mobile${open ? " dt-global-nav__mobile--open" : ""}`}
      aria-hidden={!open}
    >
      <div className="dt-global-nav__mobile-inner">
        <nav aria-label="Global navigation">
          <ul className="dt-global-nav__mobile-list">
            {items.map((item) => {
              if (item.type === "dropdown") {
                const branchActive =
                  isNavActive(pathname, item.href) ||
                  item.groups.some((group) => isNavGroupActive(pathname, group));

                return (
                  <li key={item.href} className="dt-global-nav__mobile-dropdown">
                    <div className="dt-global-nav__mobile-dropdown-head">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`${globalNavMobileLinkClass}${
                          branchActive ? ` ${globalNavMobileLinkActiveClass}` : ""
                        }`}
                        tabIndex={open ? undefined : -1}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="dt-global-nav__mobile-dropdown-toggle"
                        aria-expanded={solutionsOpen}
                        aria-controls="dt-global-nav-solutions-panel"
                        onClick={() => setSolutionsOpen((value) => !value)}
                        tabIndex={open ? undefined : -1}
                      >
                        <span className="sr-only">Toggle solutions submenu</span>
                        <ChevronIcon open={solutionsOpen} />
                      </button>
                    </div>
                    {solutionsOpen ? (
                      <div
                        id="dt-global-nav-solutions-panel"
                        className="dt-global-nav__mobile-dropdown-panel"
                      >
                        {item.groups.map((group, groupIndex) => (
                          <MobileSolutionsGroup
                            key={group.title}
                            group={group}
                            groupIndex={groupIndex}
                            fallbackHref={item.href}
                            pathname={pathname}
                            open={open}
                            groupOpen={openGroupIndex === groupIndex}
                            onToggleGroup={() =>
                              setOpenGroupIndex((current) =>
                                current === groupIndex ? null : groupIndex,
                              )
                            }
                            onClose={onClose}
                          />
                        ))}
                      </div>
                    ) : null}
                  </li>
                );
              }

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
            href={globalNavCta.href}
            onClick={onClose}
            className={globalNavMobileCtaClass}
            tabIndex={open ? undefined : -1}
          >
            {globalNavCta.label}
            <NavCtaArrowIcon className="dt-global-nav__cta-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileSolutionsGroup({
  group,
  groupIndex,
  fallbackHref,
  pathname,
  open,
  groupOpen,
  onToggleGroup,
  onClose,
}: {
  group: NavGroup;
  groupIndex: number;
  fallbackHref: string;
  pathname: string;
  open: boolean;
  groupOpen: boolean;
  onToggleGroup: () => void;
  onClose: () => void;
}) {
  const groupActive = isNavGroupActive(pathname, group);

  return (
    <div className="dt-global-nav__mobile-dropdown-group">
      <div className="dt-global-nav__mobile-dropdown-group-head">
        <Link
          href={group.overviewHref ?? fallbackHref}
          onClick={onClose}
          className={`dt-global-nav__mobile-dropdown-group-link${
            groupActive ? " dt-global-nav__mobile-dropdown-group-link--active" : ""
          }`}
          tabIndex={open ? undefined : -1}
        >
          {group.title}
        </Link>
        <button
          type="button"
          className="dt-global-nav__mobile-dropdown-group-toggle"
          aria-expanded={groupOpen}
          aria-controls={`dt-global-nav-solutions-group-${groupIndex}`}
          onClick={onToggleGroup}
          tabIndex={open ? undefined : -1}
        >
          <span className="sr-only">Toggle {group.title} pages</span>
          <ChevronIcon open={groupOpen} small />
        </button>
      </div>
      {groupOpen ? (
        <ul
          id={`dt-global-nav-solutions-group-${groupIndex}`}
          className="dt-global-nav__mobile-dropdown-list"
        >
          {group.items.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onClose}
                className={`dt-global-nav__mobile-dropdown-link${
                  isNavActive(pathname, child.href)
                    ? " dt-global-nav__mobile-dropdown-link--active"
                    : ""
                }`}
                tabIndex={open ? undefined : -1}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ChevronIcon({ open, small }: { open: boolean; small?: boolean }) {
  return (
    <svg
      className={`dt-global-nav__mobile-dropdown-chevron${
        open ? " dt-global-nav__mobile-dropdown-chevron--open" : ""
      }${small ? " dt-global-nav__mobile-dropdown-chevron--small" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
