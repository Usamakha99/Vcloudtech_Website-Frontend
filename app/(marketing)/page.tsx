import type { Metadata } from "next";

import { DesignTestFooter } from "@/components/design-test/DesignTestFooter";
import { ContactUsSection } from "@/components/design-test/ContactUsSection";
import { FaqSection } from "@/components/design-test/FaqSection";
import { MeetExpertsCtaSection } from "@/components/design-test/MeetExpertsCtaSection";
import { DesignTestGlobalNavbar } from "@/components/design-test/global-nav";
import { AboutUsSnapshotSection } from "@/components/design-test/AboutUsSnapshotSection";
import { DesignTestSocialProofBar } from "@/components/design-test/DesignTestSocialProofBar";
import { TechnologyPartnersSection } from "@/components/design-test/TechnologyPartnersSection";
import { MinimalTestHero } from "@/components/hero-test/MinimalTestHero";
import { PageIngredientBackground } from "@/components/hero-test/PageIngredientBackground";
import { ClientsTestimonialsSection } from "@/components/design-test/ClientsTestimonialsSection";
import { ResourceHubSection } from "@/components/design-test/ResourceHubSection";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { poppins } from "@/lib/fonts/poppins";

import "@/components/design-test/design-test-lab-full-width.css";
import "@/components/design-test/design-test-glass-cards.css";
import "@/components/design-test/design-test-responsive.css";
import "@/components/design-test/design-test-about-metrics.css";
import "@/components/hero-test/minimal-hero.css";
import "@/components/design-test/design-test-typography.css";

export const metadata: Metadata = {
  title: "Enterprise IT solutions",
  description:
    "vCloudTech delivers secure cloud migration, managed infrastructure, and 24/7 operations for enterprises that demand reliability and governance.",
  openGraph: {
    title: "vCloudTech — Enterprise IT solutions",
    description:
      "Secure, scalable infrastructure for modern enterprises. Migration, modernization, and always-on support.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div
      className={`design-test-lab-page ${poppins.variable} relative min-h-full overflow-x-clip font-sans text-white`}
    >
      <PageIngredientBackground />
      <DesignTestGlobalNavbar />
      <main className="relative">
        <div id="hero" className="leading-none" data-nav-surface="dark">
          <MinimalTestHero offsetForFixedHeader fullPageGradient showCarousel />
        </div>
        <DesignTestSocialProofBar belowHero />
        <AboutUsSnapshotSection />
        <TechnologyPartnersSection />
        <div className="relative z-20">
          <div id="services">
            <ServicesGrid surface="glass" />
          </div>
          <ResourceHubSection />
          <ClientsTestimonialsSection />
          <FaqSection />
          <ContactUsSection />
        </div>
      </main>
      <MeetExpertsCtaSection />
      <DesignTestFooter />
    </div>
  );
}
