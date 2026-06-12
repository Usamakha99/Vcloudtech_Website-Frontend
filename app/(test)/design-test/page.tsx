import type { Metadata } from "next";

import { DesignTestCta } from "@/components/design-test/DesignTestCta";
import { DesignTestGlobalNavbar } from "@/components/design-test/global-nav";
import { FeaturesGrid } from "@/components/design-test/FeaturesGrid";
import { AboutUsSnapshotSection } from "@/components/design-test/AboutUsSnapshotSection";
import { DesignTestSocialProofBar } from "@/components/design-test/DesignTestSocialProofBar";
import { ScrollStackCardsSection } from "@/components/design-test/ScrollStackCardsSection";
import { TechnologyPartnersSection } from "@/components/design-test/TechnologyPartnersSection";
import { WhyVCloudSection } from "@/components/design-test/WhyVCloudSection";
import { MinimalTestHero } from "@/components/hero-test/MinimalTestHero";
import { PageIngredientBackground } from "@/components/hero-test/PageIngredientBackground";
import { ClientsTestimonialsSection } from "@/components/design-test/ClientsTestimonialsSection";
import { ProcurementEngineSection } from "@/components/design-test/ProcurementEngineSection";
import { ResourceHubSection } from "@/components/design-test/ResourceHubSection";
import { VendorPartnersStripSection } from "@/components/design-test/VendorPartnersStripSection";
import { WhyChooseUsSection } from "@/components/design-test/WhyChooseUsSection";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import "@/components/design-test/design-test-glass-cards.css";
import "@/components/design-test/design-test-responsive.css";
import "@/components/hero-test/minimal-hero.css";

export const metadata: Metadata = {
  title: "Design Test",
  description: "UI component lab — navbar, hero, services, features, and CTA.",
  robots: { index: false, follow: false },
};

export default function DesignTestPage() {
  return (
    <div className="relative min-h-full overflow-x-clip text-white">
      <PageIngredientBackground />
      <DesignTestGlobalNavbar />
      <main className="relative">
        <div id="hero">
          <MinimalTestHero offsetForFixedHeader fullPageGradient showCarousel />
        </div>
        <DesignTestSocialProofBar />
        <AboutUsSnapshotSection />
        <WhyVCloudSection reducedHeroOverlap />
        <TechnologyPartnersSection />
        <ScrollStackCardsSection />
        <div className="relative z-20">
          <div id="services">
            <ServicesGrid surface="glass" />
          </div>
          <ProcurementEngineSection />
          <WhyChooseUsSection />
          <ResourceHubSection />
          <ClientsTestimonialsSection />
          <VendorPartnersStripSection />
          <FeaturesGrid surface="glass" />
          <DesignTestCta surface="glass" />
        </div>
      </main>
    </div>
  );
}
