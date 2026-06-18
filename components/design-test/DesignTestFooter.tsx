import Link from "next/link";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import { FooterNewsletter } from "@/components/design-test/FooterNewsletter";
import { dt } from "@/components/design-test/design-test-theme";
import {
  designTestFooterCerts,
  designTestFooterLinks,
} from "@/lib/design-test/footer-content";

import "./design-test-footer.css";

/** Enterprise footer for dark design-test lab. */
export function DesignTestFooter() {
  return (
    <footer className="dt-footer" aria-label="Site footer">
      <div className="dt-footer__inner">
        <FooterNewsletter />

        <div className="dt-footer__grid">
          <div>
            <VCloudTechLogoImage variant="light" className="h-7 w-auto sm:h-8" />
            <p className="dt-footer__brand-text">
              Enterprise IT procurement, cloud, security, and managed services — delivered with
              nationwide scale and accountable teams.
            </p>
            <div className="dt-footer__certs">
              {designTestFooterCerts.map((cert) => (
                <span key={cert.acronym} className={dt.certPill} title={cert.label}>
                  {cert.acronym}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="dt-footer__col-title">Services</p>
            <ul className="dt-footer__links">
              {designTestFooterLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="dt-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="dt-footer__col-title">Company</p>
            <ul className="dt-footer__links">
              {designTestFooterLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="dt-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="dt-footer__col-title">Contact</p>
            <ul className="dt-footer__links">
              {designTestFooterLinks.contact.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="dt-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dt-footer__bottom">
          <p>&copy; {new Date().getFullYear()} vCloud Tech. All rights reserved.</p>
          <p>Design lab — Version A (Dark)</p>
        </div>
      </div>
    </footer>
  );
}
