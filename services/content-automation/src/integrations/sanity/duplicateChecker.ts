import type { SanityClient } from "@sanity/client";

/**
 * Duplicate strategy (Phase 1, no DB):
 * Use deterministic `sourceId` (hash of canonical URL) and query Sanity before create.
 * Why: single source of truth, survives service restarts, works with Vercel Cron / any host.
 */
export async function vendorUpdateExistsBySourceId(
  client: SanityClient,
  sourceId: string,
): Promise<boolean> {
  const id = await client.fetch<string | null>(
    `*[_type == "vendorUpdate" && sourceId == $sourceId][0]._id`,
    { sourceId },
  );
  return Boolean(id);
}
