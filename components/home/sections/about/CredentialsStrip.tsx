import { AboutTrustMark, procurementCredentialItems } from "@/components/home/sections/about/AboutTrustMarks";

import "./credentials-strip.css";

/** Procurement credentials — prominent trust strip below About. */
export function DesignTestCredentialsStrip({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      className={`dt-cred-strip${embedded ? " dt-cred-strip--embedded" : ""}`}
      aria-label="Certifications and contract vehicles"
    >
      <div className="dt-cred-strip__inner">
        <ul className="dt-cred-strip__list">
          {procurementCredentialItems.map((item, index) => (
            <li key={item.id} className="dt-cred-strip__group">
              {index > 0 ? (
                <span className="dt-cred-strip__sep" aria-hidden>
                  ◆
                </span>
              ) : null}
              <div className="dt-cred-strip__item">
                <AboutTrustMark id={item.id} variant="strip" />
                <span className="dt-cred-strip__label">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
