import type { ComponentType } from "react";

import { HomeAboutSection } from "@/components/home/sections/about/AboutSection";
import { HomeContactSection } from "@/components/home/sections/contact/ContactSection";
import { HomeFaqSection } from "@/components/home/sections/faq/FaqSection";
import { HomeHeroSection } from "@/components/home/sections/hero/HeroSection";
import { HomeTechnologyPartnersSection } from "@/components/home/sections/partners/PartnersSection";
import { HomeResourceHubSection } from "@/components/home/sections/resource-hub/ResourceHubSection";
import { HomeServicesSection } from "@/components/home/sections/services/ServicesSection";
import { HomeSocialProofSection } from "@/components/home/sections/social-proof/SocialProofSection";
import { HomeTestimonialsSection } from "@/components/home/sections/testimonials/TestimonialsSection";

export type HomeSectionEntry = {
  id: string;
  label: string;
  component: ComponentType;
  /** Optional wrapper className on the section root */
  wrapperClassName?: string;
  /** When true, section is rendered outside the main content stack */
  standalone?: boolean;
  /** Props passed when the section accepts configuration */
  props?: Record<string, unknown>;
};

/** Ordered homepage sections — edit here to reorder or toggle sections. */
export const HOME_SECTIONS: HomeSectionEntry[] = [
  {
    id: "hero",
    label: "Hero",
    component: HomeHeroSection,
    standalone: true,
    props: { offsetForFixedHeader: true, fullPageGradient: true, showCarousel: true },
  },
  {
    id: "social-proof",
    label: "Strategic Partners Strip",
    component: HomeSocialProofSection,
    standalone: true,
    props: { belowHero: true },
  },
  {
    id: "about",
    label: "About Us & Industries",
    component: HomeAboutSection,
  },
  {
    id: "partners",
    label: "Technology Partners",
    component: HomeTechnologyPartnersSection,
  },
  {
    id: "solutions",
    label: "Solutions",
    component: HomeServicesSection,
  },
  {
    id: "resource-hub",
    label: "Resource Hub",
    component: HomeResourceHubSection,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    component: HomeTestimonialsSection,
  },
  {
    id: "faq",
    label: "FAQ",
    component: HomeFaqSection,
  },
  {
    id: "contact",
    label: "Contact",
    component: HomeContactSection,
  },
];

export const HOME_STACKED_SECTIONS = HOME_SECTIONS.filter((section) => !section.standalone);

export const HOME_STANDALONE_SECTIONS = HOME_SECTIONS.filter((section) => section.standalone);
