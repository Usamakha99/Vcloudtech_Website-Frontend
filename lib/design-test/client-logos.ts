/** Client seals in `public/clients/` (only files that exist in the repo). */
const CLIENT_LOGO_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12] as const;

export const clientLogos = CLIENT_LOGO_IDS.map((id) => ({
  name: `Trusted client ${id}`,
  src: `/clients/${id}.png`,
})) as ReadonlyArray<{ name: string; src: string }>;
