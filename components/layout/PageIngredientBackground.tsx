import "./page-ingredient-background.css";

/** Fixed marketing page background — navy base with subtle brand glow. */
export function PageIngredientBackground() {
  return (
    <div className="page-ingredient-root" aria-hidden>
      <div className="page-ingredient-base" />
      <div className="page-ingredient-mesh" />
    </div>
  );
}
