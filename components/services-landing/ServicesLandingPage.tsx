import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import {
  servicesPageGrid,
  servicesPageHero,
} from "@/lib/marketing/services-page-content";

import "@/components/marketing/marketing-page-hero.css";
import "./services-landing.css";

/** Services landing page — hero + service cards grid. */
export function ServicesLandingPage() {
  return (
    <div className="marketing-page services-page" data-nav-surface="dark">
      <MarketingPageHero
        title={servicesPageHero.title}
        lede={servicesPageHero.lede}
        image={servicesPageHero.image}
        imageAlt={servicesPageHero.imageAlt}
        headingId="services-page-heading"
      />

      <div className="marketing-page__body services-page__body">
        <ServicesGrid
          heading={servicesPageGrid.heading}
          subheading=""
          surface="glass"
          className="services-page__grid pt-0"
        />
      </div>
    </div>
  );
}
