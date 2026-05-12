import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";
import {
  SOLUTION_SLUGS,
  type SolutionSlug,
} from "@/lib/navigation/solutions";

const copy: Record<
  SolutionSlug,
  { title: string; lede: string; meta: string }
> = {
  microsoft: {
    title: "Microsoft solutions",
    lede: "Azure, Microsoft 365, and hybrid patterns for regulated and distributed enterprises.",
    meta: "Microsoft Azure, Microsoft 365, and hybrid enterprise solutions from vCloudTech.",
  },
  aws: {
    title: "AWS solutions",
    lede: "Landing zones, modernization, and operational excellence on Amazon Web Services.",
    meta: "AWS cloud solutions, migration, and managed services from vCloudTech.",
  },
  "cloud-infrastructure": {
    title: "Cloud infrastructure",
    lede: "Resilient architecture, multi-cloud strategy, and always-on infrastructure operations.",
    meta: "Enterprise cloud infrastructure design, migration, and managed operations.",
  },
  cybersecurity: {
    title: "Cybersecurity",
    lede: "Zero trust alignment, threat reduction, and security programs that match your risk profile.",
    meta: "Enterprise cybersecurity services and zero trust advisory from vCloudTech.",
  },
  "data-ai": {
    title: "Data & AI",
    lede: "Analytics platforms, governance, and responsible AI adoption with clear business outcomes.",
    meta: "Enterprise data platforms, analytics, and AI readiness from vCloudTech.",
  },
};

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isSolutionSlug(slug)) return {};
  const { title, meta } = copy[slug];
  return { title, description: meta };
}

function isSolutionSlug(s: string): s is SolutionSlug {
  return (SOLUTION_SLUGS as readonly string[]).includes(s);
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!isSolutionSlug(slug)) notFound();
  const { title, lede } = copy[slug];

  return <MarketingDocPage title={title} lede={lede} />;
}
