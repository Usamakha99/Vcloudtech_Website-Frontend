import { createClient, type SanityClient } from "@sanity/client";

import { env } from "../../config/env.js";

/**
 * CMS write client — isolated factory so tests can inject a mock client later.
 */
export function createSanityWriteClient(): SanityClient {
  return createClient({
    projectId: env.sanity.projectId,
    dataset: env.sanity.dataset,
    apiVersion: env.sanity.apiVersion,
    token: env.sanity.writeToken,
    useCdn: false,
  });
}
