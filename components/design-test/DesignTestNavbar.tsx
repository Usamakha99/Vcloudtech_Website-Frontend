import Link from "next/link";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";

import { DesignTestThemeToggle } from "./DesignTestThemeToggle";

type NavLink = { label: string; href: string };

const defaultLinks: NavLink[] = [
  { label: "Hero", href: "#hero" },
  { label: "Why", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#cta" },
];

type Props = {
  homeHref?: string;
  links?: readonly NavLink[];
};

/** Minimal sticky header for lab-style section pages (glass on gradient). */
export function DesignTestNavbar({
  homeHref = "/",
  links = defaultLinks,
}: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link
          href={homeHref}
          className="flex shrink-0 items-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          aria-label="vCloudTech home"
        >
          <VCloudTechLogoImage priority className="h-6 w-auto max-h-6 brightness-0 invert opacity-90" />
        </Link>

        <nav aria-label="Page sections" className="hidden min-w-0 flex-1 md:block">
          <ul className="flex items-center gap-5">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <DesignTestThemeToggle variant="minimal" />
          <Link
            href="/"
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45 transition hover:text-white/90"
          >
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}
