import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";
import { HomeHowWeWorkSection } from "@/components/home/HomeHowWeWorkSection";
import { HomeIndustriesSection } from "@/components/home/HomeIndustriesSection";
import { HomePartnersSection } from "@/components/home/HomePartnersSection";
import { HomeSolutionsSection } from "@/components/home/HomeSolutionsSection";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";

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
    <div className="flex min-h-full flex-col bg-white">
      <Hero />
      <HomeTrustBar />
      <HomeSolutionsSection />
      <HomeIndustriesSection />
      <HomePartnersSection />
      <HomeHowWeWorkSection />
      <HomeCtaBand />
      <section
        id="contact"
        className="border-t border-slate-200/80 bg-[#1B224B] py-16"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="contact-heading"
              className="text-2xl font-semibold tracking-tight text-white"
            >
              Talk to solutions architecture
            </h2>
            <p className="mt-3 text-slate-300">
              Share your roadmap and compliance requirements—we&apos;ll respond
              within one business day.
            </p>
            <a
              href="mailto:info@vcloudtech.com?subject=vCloudTech%20inquiry"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-lg border border-white/25 bg-white px-6 text-sm font-semibold text-[#1B224B] shadow-sm transition-colors hover:bg-slate-100"
            >
              Email info@vcloudtech.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
