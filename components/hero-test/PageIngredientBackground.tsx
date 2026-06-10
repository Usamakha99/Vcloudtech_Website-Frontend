import "./page-ingredient-background.css";

/**
 * Fixed full-page dark ingredient background for design / hero test routes.
 *
 * Layer stack (bottom → top):
 * 1. Base — near-black + brand navy
 * 2. Mesh — slow shifting sky / accent wash
 * 3. Orbs — soft depth (sky, navy, accent red)
 * 4. Grid — subtle organization grid (very faint)
 * 5. Vignette — top highlight + bottom depth
 */
export function PageIngredientBackground() {
  return (
    <div className="page-ingredient-root" aria-hidden>
      <div className="page-ingredient-base" />
      <div className="page-ingredient-mesh" />
      <div className="page-ingredient-orb page-ingredient-orb--sky" />
      <div className="page-ingredient-orb page-ingredient-orb--navy" />
      <div className="page-ingredient-orb page-ingredient-orb--accent" />
      <div className="page-ingredient-orb page-ingredient-orb--depth" />
      <div className="page-ingredient-grid" />
      <div className="page-ingredient-vignette" />
    </div>
  );
}
