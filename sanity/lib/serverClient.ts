import { createClient } from "next-sanity";

import { resilientSanityFetch } from "@/lib/blog/sanity-resilient-fetch";

import { apiVersion, dataset, projectId } from "../env";

/** Public blog reads — CDN + resilient fetch retries/timeouts. */
export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  fetch: resilientSanityFetch,
});
