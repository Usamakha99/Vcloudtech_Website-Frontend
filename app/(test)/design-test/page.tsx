import type { Metadata } from "next";

import { DesignTestCta } from "@/components/design-test/DesignTestCta";
import { DesignTestNavbar } from "@/components/design-test/DesignTestNavbar";
import { FeaturesGrid } from "@/components/design-test/FeaturesGrid";
import { WhyVCloudSection } from "@/components/design-test/WhyVCloudSection";
import { MinimalTestHero } from "@/components/hero-test/MinimalTestHero";
import { PageIngredientBackground } from "@/components/hero-test/PageIngredientBackground";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { IntroVideoSplash } from "@/components/intro/IntroVideoSplash";

import "@/components/hero-test/minimal-hero.css";

export const metadata: Metadata = {
  title: "Design Test",
  description: "UI component lab — navbar, hero, services, features, and CTA.",
  robots: { index: false, follow: false },
};

export default function DesignTestPage() {
  return (
    <div className="relative min-h-full text-white">
      <IntroVideoSplash />
      <PageIngredientBackground />
      <DesignTestNavbar />
      <main className="relative">
        <div id="hero">
          <MinimalTestHero offsetForFixedHeader={false} fullPageGradient />
        </div>
        <WhyVCloudSection />
        <div id="services">
          <ServicesGrid
            heading="Services"
            subheading="3-column grid with hover lift and icons."
            surface="glass"
          />
        </div>
        <FeaturesGrid surface="glass" />
        <DesignTestCta surface="glass" />
      </main>
    </div>
  );
}
