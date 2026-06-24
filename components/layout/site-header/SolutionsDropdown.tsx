"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { isNavActive, isNavGroupActive } from "@/lib/navigation/active-path";
import type { NavGroup } from "@/lib/navigation/types";

import { navLinkClasses } from "./nav-link-styles";

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
              className="pointer-events-none absolute -top-1.5 left-6 h-3 w-3 rotate-45 border border-slate-200/90 bg-white/98 shadow-[-2px_-2px_4px_-2px_rgba(15,23,42,0.06)]"
              aria-hidden
            />
            <div className="relative w-[min(100vw-2rem,16rem)] overflow-visible rounded-2xl border border-slate-200/90 bg-white/[0.98] p-2 shadow-[0_28px_60px_-20px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.03)] ring-1 ring-slate-900/[0.02] backdrop-blur-md">
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
                        className={`flex items-center rounded-lg transition-colors ${
                          flyoutOpen || groupActive
                            ? "bg-slate-50"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <Link
                          role="menuitem"
                          href={group.overviewHref ?? overviewHref}
                          aria-haspopup="true"
                          aria-expanded={flyoutOpen}
                          className={`min-w-0 flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                            groupActive ? "text-slate-900" : "text-slate-800"
                          }`}
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
                            className="absolute left-full top-0 z-[60] ml-2 w-[min(100vw-2rem,18rem)] rounded-2xl border border-slate-200/90 bg-white/[0.98] p-2 shadow-[0_28px_60px_-20px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.03)] ring-1 ring-slate-900/[0.02] backdrop-blur-md"
                          >
                            {group.overviewDescription ? (
                              <p className="px-3 pb-2 pt-1 text-xs leading-snug text-slate-500">
                                {group.overviewDescription}
                              </p>
                            ) : null}
                            <ul className="space-y-0.5" role="none">
                              {group.items.map((item) => (
                                <li key={item.href} role="none">
                                  <Link
                                    role="menuitem"
                                    href={item.href}
                                    className={`group/item block rounded-lg border border-transparent px-3 py-2.5 transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                                      isNavActive(pathname, item.href)
                                        ? "border-slate-200/80 bg-slate-50 shadow-sm"
                                        : "hover:border-slate-200/60 hover:bg-slate-50/80"
                                    }`}
                                    onClick={close}
                                  >
                                    <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                      <span
                                        className={`h-1 w-1 shrink-0 rounded-full transition-colors ${
                                          isNavActive(pathname, item.href)
                                            ? "bg-[#E31E24]"
                                            : "bg-slate-300 group-hover/item:bg-[#E31E24]/70"
                                        }`}
                                        aria-hidden
                                      />
                                      {item.label}
                                    </span>
                                    {item.description ? (
                                      <span className="mt-1 block pl-3 text-xs leading-snug text-slate-500">
                                        {item.description}
                                      </span>
                                    ) : null}
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
      className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:text-slate-600 ${
        open ? "rotate-180" : ""
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

function ChevronRightIcon() {
  return (
    <svg
      className="mr-2.5 h-3.5 w-3.5 shrink-0 text-slate-400"
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
