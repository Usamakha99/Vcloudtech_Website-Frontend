import type { VendorNewsFeedType } from "./vendors";

export function classifyVendorArticle(
  title: string,
  snippet: string,
): { type: VendorNewsFeedType; tag: string } {
  const text = `${title} ${snippet}`.toLowerCase();

  if (/research|study|survey|report|analyst|whitepaper|benchmark/.test(text)) {
    return { type: "research", tag: topicTag(text) };
  }
  if (/announce|partnership|launch|available|introducing|general availability|ga\b|preview/.test(text)) {
    return { type: "announcement", tag: topicTag(text) };
  }

  return { type: "blog", tag: topicTag(text) };
}

function topicTag(text: string): string {
  if (/ai|machine learning|ml\b|llm|generative/.test(text)) return "AI/ML";
  if (/database|rds|sql|postgres|oracle/.test(text)) return "Databases";
  if (/sustainab|carbon|green|energy/.test(text)) return "Sustainability";
  if (/azure/.test(text)) return "Azure";
  if (/security|zero trust|threat/.test(text)) return "Security";
  if (/kubernetes|k8s|container|eks|gke/.test(text)) return "Kubernetes";
  if (/storage|backup|archive/.test(text)) return "Storage";
  if (/network|vpc|wan|sd-wan/.test(text)) return "Networking";
  return "Cloud";
}
