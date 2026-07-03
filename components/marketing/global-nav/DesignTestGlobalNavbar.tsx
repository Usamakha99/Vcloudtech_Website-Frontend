"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import {
  globalNavBrand,
  globalNavCta,
  globalNavItems,
} from "@/lib/navigation/global-nav";

import { DesignTestGlobalNavLinks } from "./DesignTestGlobalNavLinks";
import { DesignTestGlobalNavMobile } from "./DesignTestGlobalNavMobile";
import { NavCtaArrowIcon } from "./NavCtaArrowIcon";
import { globalNavCtaClass } from "./nav-styles";
import { useNavSurfaceTheme } from "./useNavSurfaceTheme";

import "./design-test-global-nav.css";

/**
 * Sticky global navigation for marketing pages.
 * Config: `lib/navigation/global-nav.ts`
 */
export function DesignTestGlobalNavbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const surface = useNavSurfaceTheme(headerRef);

  useEffect(() => {
    queueMicrotask(() => setMobileOpen(false));
  }, [pathname]);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = [
    "dt-global-nav",
    mounted ? "dt-global-nav--mounted" : "",
    scrolled || mobileOpen ? "dt-global-nav--scrolled" : "",
    surface === "light" ? "dt-global-nav--surface-light" : "dt-global-nav--surface-dark",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header ref={headerRef} className={navClass}>
      <div className="dt-global-nav__shell">
        <div className="dt-global-nav__bar">
          <Link
            href={globalNavBrand.href}
            className="dt-global-nav__brand"
            aria-label={globalNavBrand.ariaLabel}
          >
            <VCloudTechLogoImage
            priority
            variant={surface === "light" ? "default" : "light"}
            className="dt-global-nav__logo"
          />
          </Link>

          <nav aria-label="Global navigation" className="dt-global-nav__links">
            <DesignTestGlobalNavLinks items={globalNavItems} pathname={pathname} />
          </nav>

          <div className="dt-global-nav__actions">
            <Link href={globalNavCta.href} className={globalNavCtaClass}>
              {globalNavCta.label}
              <NavCtaArrowIcon className="dt-global-nav__cta-icon" />
            </Link>

            <button
              type="button"
              className="dt-global-nav__menu-btn"
              aria-expanded={mobileOpen}
              aria-controls="design-test-global-nav-panel"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <DesignTestGlobalNavMobile
        open={mobileOpen}
        items={globalNavItems}
        pathname={pathname}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
