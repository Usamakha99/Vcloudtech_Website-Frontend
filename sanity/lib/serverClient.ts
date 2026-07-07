import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/** Fresh API reads for blog content (no CDN delay after Studio edits). */
export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
