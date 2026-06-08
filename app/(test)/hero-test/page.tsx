import type { Metadata } from "next";

import { DesignTestNavbar } from "@/components/design-test/DesignTestNavbar";
import { MinimalTestHero } from "@/components/hero-test/MinimalTestHero";
import { PageIngredientBackground } from "@/components/hero-test/PageIngredientBackground";
import { ServicesGrid } from "@/components/services/ServicesGrid";

import "@/components/hero-test/minimal-hero.css";

export const metadata: Metadata = {
  title: "Hero Test",
  description: "Minimal hero test page with animated gradient and fade-in.",
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
      <DesignTestNavbar homeHref="/hero-test" links={navLinks} />
      <main className="relative">
        <div id="hero">
          <MinimalTestHero offsetForFixedHeader={false} fullPageGradient />
        </div>
        <div id="services">
          <ServicesGrid
            heading="Services grid preview"
            subheading="3-column cards with hover lift — test layout only."
            surface="glass"
          />
        </div>
      </main>
    </div>
  );
}
