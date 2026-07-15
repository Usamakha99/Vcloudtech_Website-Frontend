import {
  IndustryFloatingPanelsDaylightSection,
  IndustryFloatingPanelsSection,
} from "@/components/industries-landing/IndustryFloatingPanelsSection";

/** Industry landing page — night + daylight floating panel variants. */
export function IndustriesLandingPage() {
  return (
    <div className="marketing-page industry-page" data-nav-surface="dark">
      <IndustryFloatingPanelsSection />
      <IndustryFloatingPanelsDaylightSection />
    </div>
  );
}
