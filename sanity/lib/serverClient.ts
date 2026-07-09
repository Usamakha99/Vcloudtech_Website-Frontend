import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/** Public blog reads — CDN is faster and more reliable than the live API. */
export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
