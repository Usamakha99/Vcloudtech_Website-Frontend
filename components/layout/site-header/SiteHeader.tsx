"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import { siteNavCta, siteSearchPath } from "@/lib/navigation/site-navigation";

import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMobileOpen(false));
  }, [pathname]);

  return (
    <>
      <motion.header
        layout={false}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-slate-200/90 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.08)] backdrop-blur-md"
            : "border-white/30 bg-white/90 shadow-none backdrop-blur-xl supports-[backdrop-filter]:bg-white/80"
        }`}
        initial={false}
        animate={{ opacity: 1 }}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="flex h-[4.25rem] shrink-0 items-center py-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B]/35"
            aria-label="vCloudTech home"
          >
            <VCloudTechLogoImage
              priority
              className="h-[28px] w-auto max-h-8 object-contain object-left sm:h-9 sm:max-h-9"
            />
          </Link>

          <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center lg:flex">
            <DesktopNav pathname={pathname} />
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <Link
              href={siteSearchPath}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-[#1B224B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B]/30"
              aria-label="Search"
            >
              <SearchIcon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
            </Link>
            <Link
              href={siteNavCta.href}
              className="hidden h-10 items-center rounded-full bg-[#1B224B] px-5 text-[13px] font-semibold tracking-[-0.01em] text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#141a38] hover:shadow-md hover:shadow-slate-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B]/40 active:scale-[0.98] sm:inline-flex"
            >
              {siteNavCta.label}
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#1B224B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B224B]/30 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="sr-only">
                {mobileOpen ? "Close menu" : "Open menu"}
              </span>
              <Hamburger open={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

function SearchIcon({
  className,
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-[14px] w-5">
      <motion.span
        className="absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute left-0 top-[6px] block h-0.5 w-5 rounded-full bg-current"
        animate={open ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute left-0 top-[12px] block h-0.5 w-5 rounded-full bg-current"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </span>
  );
}
