import { publicAssets } from "@/lib/public-assets";

/** Top 5 contract holder logos on the homepage section. */
export const topContractHolderItems = [
  { id: "sourcewell", label: "Sourcewell", src: publicAssets.topContractHolders.sourcewell },
  { id: "costars", label: "COSTARS", src: publicAssets.topContractHolders.costars },
  { id: "buyboard", label: "BuyBoard Purchasing Cooperative", src: publicAssets.topContractHolders.buyboard },
  { id: "cmas", label: "CMAS", src: publicAssets.topContractHolders.cmas },
  { id: "tips", label: "TIPS", src: publicAssets.topContractHolders.tips },
] as const;

export type TopContractHolderId = (typeof topContractHolderItems)[number]["id"];

export function contractHolderVisualClass(id: TopContractHolderId) {
  return `tp__partner-logo--contract-${id}`;
}
