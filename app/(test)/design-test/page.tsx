import type { Metadata } from "next";

import { DesignTestCta } from "@/components/design-test/DesignTestCta";
import { DesignTestGlobalNavbar } from "@/components/design-test/global-nav";
import { FeaturesGrid } from "@/components/design-test/FeaturesGrid";
import { DesignTestSocialProofBar } from "@/components/design-test/DesignTestSocialProofBar";
import { ScrollStackCardsSection } from "@/components/design-test/ScrollStackCardsSection";
import { TechnologyPartnersSection } from "@/components/design-test/TechnologyPartnersSection";
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
      <DesignTestGlobalNavbar />
      <main className="relative">
        <div id="hero">
          <MinimalTestHero offsetForFixedHeader={false} fullPageGradient />
        </div>
        <DesignTestSocialProofBar />
        <WhyVCloudSection reducedHeroOverlap />
        <TechnologyPartnersSection />
        <ScrollStackCardsSection />
        <div className="relative z-20">
          <div id="services">
            <ServicesGrid
              heading="Services"
              subheading="3-column grid with hover lift and icons."
              surface="glass"
            />
          </div>
          <FeaturesGrid surface="glass" />
          <DesignTestCta surface="glass" />
        </div>
      </main>
    </div>
  );
}
