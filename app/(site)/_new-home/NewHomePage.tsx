import {
  NhEnterpriseAiSection,
  NhGlobalSection,
  NhGovernmentSection,
  NhHeroSection,
  NhIndustriesSection,
  NhPartnersSection,
  NhResourcesSection,
  NhSolutionsSection,
  NhSuccessSection,
} from "@/components/new-homepage/NewHomeSections";

import "@/components/new-homepage/new-homepage.css";

/**
 * NewHomepage — CloudTech-style enterprise layout (white content + navy bands).
 * Route: /new-homepage — does not change the current dark `/` homepage.
 */
export function NewHomePage() {
  return (
    <div className="nh" data-theme="light">
      <NhHeroSection />
      <NhPartnersSection />
      <NhSolutionsSection />
      <NhIndustriesSection />
      <NhGovernmentSection />
      <NhEnterpriseAiSection />
      <NhSuccessSection />
      <NhResourcesSection />
      <NhGlobalSection />
    </div>
  );
}
