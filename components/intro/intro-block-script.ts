/** Runs before React hydrates — hides page until intro finishes on every load. */
export const INTRO_BLOCK_SCRIPT = `(function(){document.documentElement.classList.add("intro-pending")})();`;
