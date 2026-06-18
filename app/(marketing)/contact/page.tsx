import type { Metadata } from "next";
import Link from "next/link";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact vCloudTech to speak with solutions architecture and enterprise IT experts.",
};

export default function ContactPage() {
  return (
    <>
      <MarketingDocPage
        title="Talk to an expert"
        lede="Share your priorities, timelines, and compliance context—we’ll route you to the right team."
      />
      <div className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-slate-900">Direct email</p>
          <Link
            href="mailto:info@vcloudtech.com?subject=vCloudTech%20inquiry"
            className="mt-2 inline-flex text-base font-semibold text-sky-700 underline-offset-4 hover:underline"
          >
           info@vcloudtech.com
          </Link>
          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            Typical response time is one business day. For urgent procurement
            or security matters, note that in your message subject line.
          </p>
        </div>
      </div>
    </>
  );
}
