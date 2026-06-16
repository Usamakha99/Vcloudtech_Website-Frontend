import { AboutTrustMark, procurementCredentialItems } from "@/components/design-test/AboutTrustMarks";

import "./design-test-credentials-strip.css";

/** Procurement credentials — prominent trust strip below About. */
export function DesignTestCredentialsStrip() {
  return (
    <section
      className="dt-cred-strip"
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
