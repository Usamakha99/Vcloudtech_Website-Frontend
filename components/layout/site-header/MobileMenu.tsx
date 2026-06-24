"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import { isNavActive, isNavGroupActive } from "@/lib/navigation/active-path";
import { siteNavigation, siteNavCta, siteSearchPath } from "@/lib/navigation/site-navigation";
import type { NavItem } from "@/lib/navigation/types";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      queueMicrotask(() => setSolutionsOpen(false));
      return;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const first =
        panelRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled])',
        );
      first?.focus();
    }, 100);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-[4.25rem] z-40 bg-slate-900/[0.12] backdrop-blur-[3px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            id="mobile-nav-panel"
            className="fixed bottom-0 left-0 right-0 top-[4.25rem] z-40 flex flex-col overflow-y-auto border-t border-slate-200/90 bg-white shadow-[0_-8px_40px_-12px_rgba(15,23,42,0.08)] lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex w-full max-w-lg flex-col gap-1 px-4 pb-8 pt-5">
              <Link
                href="/"
                className="mb-3 flex shrink-0 items-center self-start py-0 outline-none focus-visible:ring-2 focus-visible:ring-[#1B224B]/25 focus-visible:ring-offset-2"
                onClick={onClose}
                aria-label="vCloudTech home"
              >
                <VCloudTechLogoImage className="h-8 w-auto max-h-9 object-contain object-left sm:h-9" />
              </Link>
              {siteNavigation.map((item) =>
                item.type === "dropdown" ? (
                  <MobileDropdownRow
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    onNavigate={onClose}
                    solutionsOpen={solutionsOpen}
                    onToggleSolutions={() => setSolutionsOpen((v) => !v)}
                  />
                ) : (
                  <MobileLinkRow
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    onNavigate={onClose}
                  />
                ),
              )}
              <div className="my-4 h-px bg-slate-100" />
              <Link
                href={siteSearchPath}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B]/30"
                onClick={onClose}
              >
                <SearchGlyph className="h-5 w-5 text-slate-400" />
                Search
              </Link>
              <Link
                href={siteNavCta.href}
                className="mt-2 flex h-12 items-center justify-center rounded-full bg-[#1B224B] text-sm font-semibold tracking-[-0.01em] text-white shadow-sm transition-[background-color,transform] hover:bg-[#141a38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B]/35 active:scale-[0.99]"
                onClick={onClose}
              >
                {siteNavCta.label}
              </Link>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function MobileLinkRow({
  item,
  pathname,
  onNavigate,
}: {
  item: Extract<NavItem, { type: "link" }>;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isNavActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      className={`rounded-xl px-3 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B]/30 ${
        active
          ? "bg-slate-100 text-slate-900 ring-1 ring-slate-200/80"
          : "text-slate-600 hover:bg-slate-50"
      }`}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

function MobileDropdownRow({
  item,
  pathname,
  onNavigate,
  solutionsOpen,
  onToggleSolutions,
}: {
  item: Extract<NavItem, { type: "dropdown" }>;
  pathname: string;
  onNavigate: () => void;
  solutionsOpen: boolean;
  onToggleSolutions: () => void;
}) {
  const [openGroupIndex, setOpenGroupIndex] = useState<number | null>(null);

  const branchActive =
    isNavActive(pathname, item.href) ||
    item.groups.some((group) => isNavGroupActive(pathname, group));

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/60 ring-1 ring-slate-900/[0.02]">
      <div className="flex items-stretch">
        <Link
          href={item.href}
          className={`min-w-0 flex-1 px-3 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
            branchActive ? "text-slate-900" : "text-slate-700"
          }`}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        <button
          type="button"
          className="flex w-12 shrink-0 items-center justify-center border-l border-slate-100 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-600"
          aria-expanded={solutionsOpen}
          aria-controls="mobile-solutions-panel"
          onClick={onToggleSolutions}
        >
          <span className="sr-only">Toggle solutions submenu</span>
          <svg
            className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`}
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
        </button>
      </div>
      <AnimatePresence initial={false}>
        {solutionsOpen ? (
          <motion.div
            id="mobile-solutions-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="space-y-1 px-2 py-2">
              {item.groups.map((group, groupIndex) => {
                const groupOpen = openGroupIndex === groupIndex;
                const groupActive = isNavGroupActive(pathname, group);

                return (
                  <div
                    key={group.title}
                    className="overflow-hidden rounded-lg border border-slate-200/80 bg-white/70"
                  >
                    <div className="flex items-stretch">
                      <Link
                        href={group.overviewHref ?? item.href}
                        className={`min-w-0 flex-1 px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                          groupActive ? "text-slate-900" : "text-slate-700"
                        }`}
                        onClick={onNavigate}
                      >
                        {group.title}
                      </Link>
                      <button
                        type="button"
                        className="flex w-10 shrink-0 items-center justify-center border-l border-slate-100 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-600"
                        aria-expanded={groupOpen}
                        aria-controls={`mobile-solutions-group-${groupIndex}`}
                        onClick={() =>
                          setOpenGroupIndex((current) =>
                            current === groupIndex ? null : groupIndex,
                          )
                        }
                      >
                        <span className="sr-only">Toggle {group.title} pages</span>
                        <svg
                          className={`h-3.5 w-3.5 transition-transform ${groupOpen ? "rotate-180" : ""}`}
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
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {groupOpen ? (
                        <motion.div
                          id={`mobile-solutions-group-${groupIndex}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden border-t border-slate-100"
                        >
                          <ul className="space-y-0.5 px-2 py-2">
                            {group.items.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={`block rounded-md px-3 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                                    isNavActive(pathname, child.href)
                                      ? "bg-slate-50 font-medium text-slate-900"
                                      : "text-slate-600 hover:bg-slate-50"
                                  }`}
                                  onClick={onNavigate}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
