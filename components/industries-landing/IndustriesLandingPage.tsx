import { IndustryFloatingPanelsSection } from "@/components/industries-landing/IndustryFloatingPanelsSection";

/** Industry landing page — dark cards; daylight art on hover. */
export function IndustriesLandingPage() {
  return (
    <div className="marketing-page industry-page" data-nav-surface="dark">
      <IndustryFloatingPanelsSection />
    </div>
  );
}
