import "./white-page-background.css";

/** Premium light page background — soft mesh and subtle orange accents. */
export function WhitePageBackground() {
  return (
    <div className="white-page-bg" aria-hidden>
      <div className="white-page-bg__base" />
      <div className="white-page-bg__mesh" />
      <div className="white-page-bg__orb white-page-bg__orb--tl" />
      <div className="white-page-bg__orb white-page-bg__orb--br" />
    </div>
  );
}
