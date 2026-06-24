"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { isNavActive, isNavGroupActive } from "@/lib/navigation/active-path";
import type { NavGroup } from "@/lib/navigation/types";

import { navLinkClasses } from "./nav-link-styles";

const solutionsDropdownSurface =
  "border-[#b3b3b3]/25 bg-[linear-gradient(160deg,#041329_0%,#152a42_46%,color-mix(in_srgb,#041329_68%,#b3b3b3)_100%)] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.45),0_0_0_1px_rgba(179,179,179,0.12)] ring-1 ring-[#b3b3b3]/10";

type SolutionsDropdownProps = {
  label: string;
  overviewHref: string;
  groups: readonly NavGroup[];
  pathname: string;
};

export function SolutionsDropdown({
  label,
  overviewHref,
  groups,
  pathname,
}: SolutionsDropdownProps) {
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
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={`group ${navLinkClasses(branchActive || open)}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        id={`${menuId}-trigger`}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            openMenu();
          }
        }}
      >
        {label}
        <ChevronDownIcon open={open} />
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
            className="absolute left-0 top-full z-50 mt-2.5 overflow-visible"
          >
            <span
              className="pointer-events-none absolute -top-1.5 left-6 h-3 w-3 rotate-45 border border-[#b3b3b3]/30 border-b-0 border-r-0 bg-[#152a42] shadow-[-2px_-2px_4px_-2px_rgba(0,0,0,0.25)]"
              aria-hidden
            />
            <div
              className={`solutions-dropdown__panel relative w-[min(100vw-2rem,16rem)] overflow-visible rounded-2xl p-2 backdrop-blur-md before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:h-0.5 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-[#E55614] before:to-transparent before:opacity-90 ${solutionsDropdownSurface}`}
            >
              <ul className="space-y-0.5" role="none">
                {groups.map((group, groupIndex) => {
                  const groupActive = isNavGroupActive(pathname, group);
                  const flyoutOpen = activeGroupIndex === groupIndex;

                  return (
                    <li
                      key={group.title}
                      role="none"
                      className="relative"
                      onMouseEnter={() => setActiveGroupIndex(groupIndex)}
                      onMouseLeave={() => setActiveGroupIndex(null)}
                      onFocus={() => setActiveGroupIndex(groupIndex)}
                    >
                      <div
                        className={`solutions-dropdown__parent group/parent relative flex items-center overflow-hidden rounded-lg pl-1 transition-[background-color] duration-200 ${
                          flyoutOpen || groupActive
                            ? "bg-[#E55614]/[0.07]"
                            : "hover:bg-[#E55614]/[0.04]"
                        }`}
                      >
                        <span
                          className={`absolute bottom-2 left-0 top-2 w-[3px] rounded-r bg-[#E55614] transition-all duration-200 ${
                            flyoutOpen || groupActive
                              ? "opacity-100"
                              : "opacity-0 group-hover/parent:opacity-70"
                          }`}
                          aria-hidden
                        />
                        <Link
                          role="menuitem"
                          href={group.overviewHref ?? overviewHref}
                          aria-haspopup="true"
                          aria-expanded={flyoutOpen}
                          className={`min-w-0 flex-1 rounded-lg py-2.5 pl-3 pr-3 text-sm font-semibold tracking-[-0.01em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E55614]/40 ${
                            flyoutOpen || groupActive ? "text-white" : "text-[#b3b3b3]"
                          }`}
                          onClick={close}
                        >
                          {group.title}
                        </Link>
                        <ChevronRightIcon active={flyoutOpen || groupActive} />
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
                            className={`solutions-dropdown__flyout absolute left-full top-0 z-[60] ml-2 w-[min(100vw-2rem,18rem)] overflow-hidden rounded-2xl p-2 backdrop-blur-md before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:h-0.5 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-[#E55614] before:to-transparent before:opacity-90 ${solutionsDropdownSurface}`}
                          >
                            <ul className="space-y-0.5" role="none">
                              {group.items.map((item) => (
                                <li key={item.href} role="none">
                                  <Link
                                    role="menuitem"
                                    href={item.href}
                                    className={`group/item relative block overflow-hidden rounded-lg border border-transparent py-2.5 pl-3 pr-3 transition-[background-color,border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E55614]/40 ${
                                      isNavActive(pathname, item.href)
                                        ? "border-[#E55614]/20 bg-[#E55614]/[0.08]"
                                        : "hover:border-[#E55614]/15 hover:bg-[#E55614]/[0.05]"
                                    }`}
                                    onClick={close}
                                  >
                                    <span
                                      className={`absolute bottom-2 left-0 top-2 w-[3px] rounded-r bg-[#E55614] transition-opacity duration-200 ${
                                        isNavActive(pathname, item.href)
                                          ? "opacity-100"
                                          : "opacity-0 group-hover/item:opacity-80"
                                      }`}
                                      aria-hidden
                                    />
                                    <span className="block pl-2 text-sm font-medium text-white/90 group-hover/item:text-white">
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
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-[color,transform] duration-200 ${
        open ? "rotate-180 text-[#E55614]" : "text-slate-400 group-hover:text-[#E55614]/80"
      }`}
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

function ChevronRightIcon({ active }: { active?: boolean }) {
  return (
    <svg
      className={`mr-2.5 h-3.5 w-3.5 shrink-0 transition-colors duration-200 ${
        active ? "text-[#E55614]" : "text-[#b3b3b3]/80"
      }`}
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
