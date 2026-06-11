import "./page-ingredient-background.css";

/** Page background #0F0F0F with primary orange glow. */
export function PageIngredientBackground() {
  return (
    <div className="page-ingredient-root" aria-hidden>
      <div className="page-ingredient-base" />
      <div className="page-ingredient-mesh" />
    </div>
  );
}
