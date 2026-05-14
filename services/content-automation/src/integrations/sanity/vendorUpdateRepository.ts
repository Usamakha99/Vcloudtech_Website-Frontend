import type { SanityClient } from "@sanity/client";

import type { VendorUpdateDraft } from "../../types/index.js";
import { logger } from "../../lib/logger.js";
import { vendorUpdateExistsBySourceId } from "./duplicateChecker.js";

/**
 * Creates a vendor update document. Caller must verify duplicate first.
 */
export async function createVendorUpdate(client: SanityClient, doc: VendorUpdateDraft): Promise<void> {
  if (await vendorUpdateExistsBySourceId(client, doc.sourceId)) {
    logger.warn("sanity_create_skipped_duplicate_race", { sourceId: doc.sourceId });
    return;
  }

  await client.create(doc);
  logger.info("sanity_vendor_update_created", {
    sourceId: doc.sourceId,
    vendor: doc.vendor,
    slug: doc.slug.current,
  });
}
