"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { isNavActive } from "@/lib/navigation/active-path";
import type { NavChild } from "@/lib/navigation/types";

import { navLinkClasses } from "./nav-link-styles";

type SolutionsDropdownProps = {
  label: string;
  overviewHref: string;
  items: readonly NavChild[];
  pathname: string;
};

export function SolutionsDropdown({
  label,
  overviewHref,
  items,
  pathname,
}: SolutionsDropdownProps) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

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

  const overviewActive =
    isNavActive(pathname, overviewHref) ||
    items.some((c) => isNavActive(pathname, c.href));

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={`group ${navLinkClasses(overviewActive || open)}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        id={`${menuId}-trigger`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {label}
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-labelledby={`${menuId}-trigger`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[min(100vw-2rem,22rem)] -translate-x-1/2 rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.03] backdrop-blur-sm"
          >
            <Link
              role="menuitem"
              href={overviewHref}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              onClick={close}
            >
              All solutions
              <span className="mt-0.5 block text-xs font-normal text-slate-500">
                Overview and capabilities
              </span>
            </Link>
            <div
              className="my-2 h-px bg-slate-100"
              role="separator"
              aria-hidden
            />
            <ul className="space-y-0.5" role="none">
              {items.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                      isNavActive(pathname, item.href)
                        ? "bg-slate-50 text-slate-900"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={close}
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.description ? (
                      <span className="mt-0.5 block text-xs leading-snug text-slate-500">
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
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
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
