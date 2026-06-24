import type { Metadata } from "next";

import { DesignTestNavbar } from "@/components/design-test/DesignTestNavbar";
import { MinimalTestHero } from "@/components/hero-test/MinimalTestHero";
import { PageIngredientBackground } from "@/components/hero-test/PageIngredientBackground";
import { ServicesGrid } from "@/components/services/ServicesGrid";

import "@/components/hero-test/minimal-hero.css";

export const metadata: Metadata = {
  title: "Hero",
  description: "Hero section preview with animated carousel and services grid.",
  robots: { index: false, follow: false },
};

const navLinks = [
  { label: "Hero", href: "#hero" },
  { label: "Services", href: "#services" },
] as const;

export default function HeroTestPage() {
  return (
    <div className="relative min-h-full text-white">
      <PageIngredientBackground />
      <DesignTestNavbar homeHref="/" links={navLinks} />
      <main className="relative">
        <div id="hero">
          <MinimalTestHero offsetForFixedHeader={false} fullPageGradient />
        </div>
        <div id="services">
          <ServicesGrid
            heading="Services"
            subheading="Explore our core capabilities and managed offerings."
            surface="glass"
          />
        </div>
      </main>
    </div>
  );
}
