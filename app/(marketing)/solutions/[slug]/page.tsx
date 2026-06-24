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
  "ai-data-center": {
    title: "AI Data Center Solutions",
    lede: "Design, procure, and operate AI-ready data center environments—from compute to power and lifecycle programs.",
    meta: "AI data center solutions for procurement, deployment, and operations from vCloudTech.",
  },
  "ai-infrastructure-procurement": {
    title: "AI Infrastructure Procurement",
    lede: "Source and stage AI-ready compute, storage, and facility components through authorized channels and compliant contracts.",
    meta: "AI infrastructure procurement for enterprise and public sector data center programs.",
  },
  "data-center-hardware": {
    title: "Data Center Hardware",
    lede: "Servers, racks, and facility-ready hardware configured for high-density AI and enterprise workloads.",
    meta: "Enterprise data center hardware sourcing and deployment from vCloudTech.",
  },
  "data-center-networking": {
    title: "Networking",
    lede: "High-bandwidth network fabrics designed for AI training clusters, inference pipelines, and resilient operations.",
    meta: "Data center networking for AI and enterprise infrastructure from vCloudTech.",
  },
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
  "power-infrastructure": {
    title: "Power Infrastructure",
    lede: "Power distribution, cooling alignment, and resilient energy design for modern data center facilities.",
    meta: "Data center power infrastructure planning and deployment from vCloudTech.",
  },
  "lifecycle-management": {
    title: "Lifecycle Management",
    lede: "Deployment, maintenance, refresh, and decommission programs that keep AI data centers current and compliant.",
    meta: "Data center lifecycle management services from vCloudTech.",
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
