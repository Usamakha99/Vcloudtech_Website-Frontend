import type { ComponentType } from "react";

import {
  HOME_STACKED_SECTIONS,
  HOME_STANDALONE_SECTIONS,
  type HomeSectionEntry,
} from "./home-sections";

import "@/components/home/shared/styles/glass-cards.css";
import "@/components/home/shared/styles/about-metrics.css";

function renderStandaloneSection(entry: HomeSectionEntry) {
  if (entry.id === "hero") {
    const Hero = entry.component as typeof import("@/components/home/sections/hero/HeroSection").HomeHeroSection;
    return (
      <div key={entry.id} id={entry.id} className="leading-none" data-nav-surface="dark">
        <Hero offsetForFixedHeader fullPageGradient showCarousel />
      </div>
    );
  }

  if (entry.id === "social-proof") {
    const SocialProof = entry.component as ComponentType<{ belowHero?: boolean }>;
    return <SocialProof key={entry.id} belowHero />;
  }

  const Section = entry.component;
  return <Section key={entry.id} />;
}

/** Composes all homepage sections in configured order. */
export function HomePage() {
  return (
    <>
      {HOME_STANDALONE_SECTIONS.map(renderStandaloneSection)}

      <div className="relative z-20">
        {HOME_STACKED_SECTIONS.map((entry) => {
          const Section = entry.component;
          return <Section key={entry.id} />;
        })}
      </div>
    </>
  );
}
