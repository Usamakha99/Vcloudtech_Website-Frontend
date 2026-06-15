import type { Metadata } from "next";

import { AboutUsSnapshotSection } from "@/components/white-design-test/AboutUsSnapshotSection";
import { ClientsTestimonialsSection } from "@/components/white-design-test/ClientsTestimonialsSection";
import { ProcurementEngineSection } from "@/components/white-design-test/ProcurementEngineSection";
import { ResourceHubSection } from "@/components/white-design-test/ResourceHubSection";
import { TechnologyPartnersSection } from "@/components/white-design-test/TechnologyPartnersSection";
import { VendorPartnersStripSection } from "@/components/white-design-test/VendorPartnersStripSection";
import { WhiteDesignTestCta } from "@/components/white-design-test/WhiteDesignTestCta";
import { WhiteDesignTestFooter } from "@/components/white-design-test/WhiteDesignTestFooter";
import { WhiteDesignTestSocialProofBar } from "@/components/white-design-test/WhiteDesignTestSocialProofBar";
import { WhyChooseUsSection } from "@/components/white-design-test/WhyChooseUsSection";
import { WhiteDesignTestGlobalNavbar } from "@/components/white-design-test/global-nav/WhiteDesignTestGlobalNavbar";
import { WhiteMinimalHero } from "@/components/white-design-test/WhiteMinimalHero";
import { WhitePageBackground } from "@/components/white-design-test/WhitePageBackground";
import { ServicesGrid } from "@/components/services/ServicesGrid";

import "@/components/services/services-grid-glass.css";
import "@/components/white-design-test/white-design-test-footer.css";
import "@/components/white-design-test/white-design-test-overrides.css";
import "@/components/white-design-test/white-design-test-responsive.css";
import "@/components/white-design-test/white-glass-cards.css";

export const metadata: Metadata = {
  title: "White Design Test",
  description: "Premium light theme UI lab — executive B2B design direction.",
  robots: { index: false, follow: false },
};

export default function WhiteDesignTestPage() {
  return (
    <div className="white-design-test white-design-test-responsive relative flex min-h-full flex-col overflow-x-clip bg-white text-[#0F172A]">
      <WhitePageBackground />
      <WhiteDesignTestGlobalNavbar />
      <main className="relative flex-1">
        <div id="hero" className="leading-none">
          <WhiteMinimalHero showCarousel />
        </div>
        <AboutUsSnapshotSection />
        <TechnologyPartnersSection />
        <WhiteDesignTestSocialProofBar />
        <div className="relative z-20">
          <div id="services" className="wdt-section--white">
            <ServicesGrid surface="premium-light" />
          </div>
          <ProcurementEngineSection />
          <WhyChooseUsSection />
          <ResourceHubSection />
          <ClientsTestimonialsSection />
          {/* <VendorPartnersStripSection /> */}
          {/* <WhiteDesignTestCta /> */}
          <WhiteDesignTestFooter />
        </div>
      </main>
    </div>
  );
}
