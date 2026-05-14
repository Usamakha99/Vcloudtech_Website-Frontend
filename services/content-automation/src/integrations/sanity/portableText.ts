import { randomKey } from "../../utils/slug.js";

function block(text: string) {
  return {
    _type: "block" as const,
    _key: randomKey(),
    style: "normal" as const,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: randomKey(),
        text,
        marks: [],
      },
    ],
  };
}

/** Portable Text blocks compatible with `blockContent` schema in Studio */
export function buildVendorUpdateBody(summary: string, businessImpact: string): unknown[] {
  const parts = [block(summary)];
  if (businessImpact.trim()) {
    parts.push(block(businessImpact));
  }
  return parts;
}
