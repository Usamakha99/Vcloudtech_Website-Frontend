import { createHash } from "node:crypto";

/**
 * Stable id for duplicate detection: same logical article must always map to the same id.
 */
export function hashSourceUrl(url: string): string {
  const normalized = url.trim().split("#")[0] ?? url;
  return createHash("sha256").update(normalized, "utf8").digest("hex");
}
