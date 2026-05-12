"use client";

import dynamic from "next/dynamic";

/** Sanity Studio uses `window` during render; disable SSR for this subtree (allowed inside Client Components). */
const Studio = dynamic(() => import("./Studio"), { ssr: false });

export default function StudioLoader() {
  return <Studio />;
}
