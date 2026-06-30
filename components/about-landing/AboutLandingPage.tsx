"use client";

import Image from "next/image";

import { OrgMetricsRail } from "@/components/home/sections/about/OrgMetricsRail";
import {
  aboutMilestones,
  aboutPageHero,
  aboutVision,
} from "@/lib/design-test/about-page-content";

import "@/components/home/shared/styles/about-metrics.css";
import "./about-landing.css";

/** About page — hero, milestones, and vision (reference-inspired, vCloud theme). */
export function AboutLandingPage() {
  return (
    <div className="about-page" data-nav-surface="dark">
      <section id="hero" className="about-page__hero" aria-labelledby="about-page-heading">
        <div className="about-page__hero-inner">
          <h1 id="about-page-heading" className="about-page__hero-title">
            {aboutPageHero.titlePrefix}{" "}
            <span className="about-page__hero-brand">{aboutPageHero.titleBrand}</span>
          </h1>
          <p className="about-page__hero-lede">{aboutPageHero.lede}</p>
        </div>
      </section>

      <div className="about-page__body">
        <section className="about-page__section" aria-labelledby="about-milestones-heading">
          <p id="about-milestones-heading" className="about-page__eyebrow">
            Our milestones
          </p>
          <OrgMetricsRail
            metrics={aboutMilestones}
            className="about-page__metrics dt-metrics__rail--4"
          />
        </section>

        <section className="about-page__section about-page__vision" aria-labelledby="about-vision-heading">
          <div className="about-page__vision-copy">
            <p className="about-page__eyebrow">{aboutVision.eyebrow}</p>
            <h2 id="about-vision-heading" className="about-page__vision-title">
              {aboutVision.title}
            </h2>
            <p className="about-page__vision-body">{aboutVision.body}</p>
          </div>

          <figure className="about-page__vision-media">
            <Image
              src={aboutVision.image}
              alt={aboutVision.imageAlt}
              width={960}
              height={600}
              className="about-page__vision-image"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </figure>
        </section>
      </div>
    </div>
  );
}
