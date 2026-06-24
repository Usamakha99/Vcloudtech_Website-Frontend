"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { isNavActive, isNavGroupActive } from "@/lib/navigation/active-path";
import type { NavGroup } from "@/lib/navigation/types";

import { globalNavLinkActiveClass, globalNavLinkClass } from "./nav-styles";

type Props = {
  label: string;
  overviewHref: string;
  groups: readonly NavGroup[];
  pathname: string;
};

/** Desktop Solutions menu — parent below tab; children fly out to the right. */
export function DesignTestGlobalNavDropdown({
  label,
  overviewHref,
  groups,
  pathname,
}: Props) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setActiveGroupIndex(null);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    setActiveGroupIndex(groups.length === 1 ? 0 : null);
  }, [groups.length]);

  useEffect(() => {
    queueMicrotask(() => close());
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const branchActive =
    isNavActive(pathname, overviewHref) ||
    groups.some((group) => isNavGroupActive(pathname, group));

  return (
    <div ref={rootRef} className="dt-global-nav__dropdown">
      <button
        type="button"
        className={`${globalNavLinkClass} dt-global-nav__dropdown-trigger${
          branchActive || open ? ` ${globalNavLinkActiveClass}` : ""
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        id={`${menuId}-trigger`}
        onClick={() => (open ? close() : openMenu())}
      >
        {label}
        <ChevronDownIcon open={open} />
        <span className="dt-global-nav__link-underline" aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-labelledby={`${menuId}-trigger`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="dt-global-nav__dropdown-panel dt-global-nav__dropdown-panel--mega"
          >
            <span className="dt-global-nav__dropdown-caret" aria-hidden />
            <ul className="dt-global-nav__dropdown-parent-list" role="none">
              {groups.map((group, groupIndex) => {
                const groupActive = isNavGroupActive(pathname, group);
                const flyoutOpen = activeGroupIndex === groupIndex;

                return (
                  <li
                    key={group.title}
                    role="none"
                    className="dt-global-nav__dropdown-parent"
                    onMouseEnter={() => setActiveGroupIndex(groupIndex)}
                    onMouseLeave={() => setActiveGroupIndex(null)}
                    onFocus={() => setActiveGroupIndex(groupIndex)}
                  >
                    <div
                      className={`dt-global-nav__dropdown-parent-row${
                        flyoutOpen || groupActive
                          ? " dt-global-nav__dropdown-parent-row--active"
                          : ""
                      }`}
                    >
                      <Link
                        role="menuitem"
                        href={group.overviewHref ?? overviewHref}
                        aria-haspopup="true"
                        aria-expanded={flyoutOpen}
                        className="dt-global-nav__dropdown-parent-link"
                        onClick={close}
                      >
                        {group.title}
                      </Link>
                      <ChevronRightIcon />
                    </div>

                    <AnimatePresence>
                      {flyoutOpen ? (
                        <motion.div
                          role="menu"
                          aria-label={group.title}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="dt-global-nav__dropdown-flyout"
                        >
                          <ul className="dt-global-nav__dropdown-list" role="none">
                            {group.items.map((item) => (
                              <li key={item.href} role="none">
                                <Link
                                  role="menuitem"
                                  href={item.href}
                                  className={`dt-global-nav__dropdown-item${
                                    isNavActive(pathname, item.href)
                                      ? " dt-global-nav__dropdown-item--active"
                                      : ""
                                  }`}
                                  onClick={close}
                                >
                                  <span className="dt-global-nav__dropdown-item-label">
                                    {item.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`dt-global-nav__dropdown-chevron${open ? " dt-global-nav__dropdown-chevron--open" : ""}`}
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

function ChevronRightIcon() {
  return (
    <svg
      className="dt-global-nav__dropdown-parent-chevron"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
