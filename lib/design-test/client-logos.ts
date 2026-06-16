/** Client seals in `public/clients/` (1.png–12.png). */
export const clientLogos = Array.from({ length: 12 }, (_, index) => {
  const id = index + 1;
  return {
    name: `Trusted client ${id}`,
    src: `/clients/${id}.png`,
  };
}) as ReadonlyArray<{ name: string; src: string }>;
