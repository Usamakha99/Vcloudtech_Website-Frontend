import type { Metadata } from "next";

import { ServicesGrid } from "@/components/services/ServicesGrid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional and managed services for cloud, security, and enterprise IT from vCloudTech.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-full bg-white">
      <div className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            vCloudTech
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Advisory, implementation, and managed operations tailored to enterprise governance
            and uptime requirements.
          </p>
        </div>
      </div>
      <ServicesGrid heading="What we deliver" subheading="" className="pt-0" />
    </div>
  );
}
