import type { Metadata } from "next";

import { ContactUsSection } from "@/components/design-test/ContactUsSection";
import { FaqSection } from "@/components/design-test/FaqSection";
import { MeetExpertsCtaSection } from "@/components/design-test/MeetExpertsCtaSection";
import { AboutUsSnapshotSection } from "@/components/design-test/AboutUsSnapshotSection";
import { DesignTestSocialProofBar } from "@/components/design-test/DesignTestSocialProofBar";
import { TechnologyPartnersSection } from "@/components/design-test/TechnologyPartnersSection";
import { MinimalTestHero } from "@/components/hero-test/MinimalTestHero";
import { ClientsTestimonialsSection } from "@/components/design-test/ClientsTestimonialsSection";
import { ResourceHubSection } from "@/components/design-test/ResourceHubSection";
import { ServicesGrid } from "@/components/services/ServicesGrid";

import "@/components/design-test/design-test-glass-cards.css";
import "@/components/design-test/design-test-about-metrics.css";

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
    <>
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
        <MeetExpertsCtaSection />
        <ContactUsSection />
      </div>
    </>
  );
}
