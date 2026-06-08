/** Fixed full-page rich gradient + color orbs (design / hero test routes). */
export function PageIngredientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="page-ingredient-gradient absolute inset-0" />
      <div className="hero-test-orb absolute -left-[12%] top-[8%] h-[min(70vw,28rem)] w-[min(70vw,28rem)] rounded-full bg-violet-500/40 blur-[90px]" />
      <div className="hero-test-orb hero-test-orb-delay absolute -right-[8%] top-[18%] h-[min(65vw,26rem)] w-[min(65vw,26rem)] rounded-full bg-cyan-400/35 blur-[85px]" />
      <div className="hero-test-orb absolute top-[42%] left-[25%] h-64 w-64 rounded-full bg-fuchsia-500/30 blur-[75px]" />
      <div className="hero-test-orb hero-test-orb-delay absolute top-[55%] right-[20%] h-72 w-72 rounded-full bg-amber-400/25 blur-[80px]" />
      <div className="hero-test-orb absolute bottom-[8%] left-[10%] h-80 w-80 rounded-full bg-indigo-500/35 blur-[90px]" />
      <div className="hero-test-orb hero-test-orb-delay absolute bottom-[5%] right-[5%] h-64 w-64 rounded-full bg-rose-500/25 blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(255,255,255,0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,10,46,0.15)_0%,rgba(15,10,46,0.35)_100%)]" />
    </div>
  );
}
