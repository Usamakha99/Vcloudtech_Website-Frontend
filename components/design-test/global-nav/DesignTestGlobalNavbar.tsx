"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import {
  designTestGlobalNavBrand,
  designTestGlobalNavCta,
  designTestGlobalNavLinks,
} from "@/lib/navigation/design-test-global-nav";

import { DesignTestGlobalNavLinks } from "./DesignTestGlobalNavLinks";
import { DesignTestGlobalNavMobile } from "./DesignTestGlobalNavMobile";
import { globalNavCta, globalNavHeader, globalNavInner } from "./nav-styles";

type Props = {
  /** Optional lab exit link (e.g. back to main site home). */
  showLabExit?: boolean;
  labExitHref?: string;
  labExitLabel?: string;
};

/**
 * Minimal sticky global navigation for design-test lab pages.
 * Config: `lib/navigation/design-test-global-nav.ts`
 */
export function DesignTestGlobalNavbar({
  showLabExit = true,
  labExitHref = "/",
  labExitLabel = "Exit lab",
}: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMobileOpen(false));
  }, [pathname]);

  return (
    <header className={globalNavHeader}>
      <div className={globalNavInner}>
        <Link
          href={designTestGlobalNavBrand.href}
          className="flex shrink-0 items-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
          aria-label={designTestGlobalNavBrand.ariaLabel}
        >
          <VCloudTechLogoImage
            priority
            className="h-7 w-auto max-h-7 brightness-0 invert opacity-95 sm:h-8 sm:max-h-8"
          />
        </Link>

        <nav
          aria-label="Global navigation"
          className="hidden min-w-0 flex-1 justify-center lg:flex"
        >
          <DesignTestGlobalNavLinks links={designTestGlobalNavLinks} pathname={pathname} />
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link href={designTestGlobalNavCta.href} className={`${globalNavCta} hidden sm:inline-flex`}>
            {designTestGlobalNavCta.label}
          </Link>

          {showLabExit ? (
            <Link
              href={labExitHref}
              className="hidden text-[11px] font-medium uppercase tracking-[0.12em] text-[#A1A1AA] transition hover:text-white md:inline"
            >
              {labExitLabel}
            </Link>
          ) : null}

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="design-test-global-nav-panel"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <DesignTestGlobalNavMobile
        open={mobileOpen}
        links={designTestGlobalNavLinks}
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
