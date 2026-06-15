import Link from "next/link";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import { wdt } from "@/components/white-design-test/white-design-test-theme";
import {
  designTestFooterCerts,
  designTestFooterLinks,
} from "@/lib/design-test/footer-content";

import "./white-design-test-footer.css";

/** Premium enterprise footer for white design-test lab. */
export function WhiteDesignTestFooter() {
  return (
    <footer className="wdt-footer" aria-label="Site footer">
      <div className="wdt-footer__inner">
        <div className="wdt-footer__grid">
          <div>
            <VCloudTechLogoImage className="h-7 w-auto sm:h-8" />
            <p className="wdt-footer__brand-text">
              Enterprise IT procurement, cloud, security, and managed services — delivered with
              nationwide scale and accountable teams.
            </p>
            <div className="wdt-footer__certs">
              {designTestFooterCerts.map((cert) => (
                <span key={cert.acronym} className={wdt.certPill} title={cert.label}>
                  {cert.acronym}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="wdt-footer__col-title">Services</p>
            <ul className="wdt-footer__links">
              {designTestFooterLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="wdt-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="wdt-footer__col-title">Company</p>
            <ul className="wdt-footer__links">
              {designTestFooterLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="wdt-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="wdt-footer__col-title">Contact</p>
            <ul className="wdt-footer__links">
              {designTestFooterLinks.contact.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="wdt-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="wdt-footer__bottom">
          <p>&copy; {new Date().getFullYear()} vCloud Tech. All rights reserved.</p>
          <p>Design lab — Version B (Premium Light)</p>
        </div>
      </div>
    </footer>
  );
}
