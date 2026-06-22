import Link from "next/link";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import { FooterNewsletter } from "@/components/design-test/FooterNewsletter";
import { FooterSocialLinks } from "@/components/design-test/FooterSocialIcons";
import {
  designTestFooterAddress,
  designTestFooterLinks,
  designTestFooterSocial,
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
            <address className="dt-footer__address not-italic">
              {designTestFooterAddress.line1}
              <br />
              {designTestFooterAddress.line2}
            </address>
            <FooterSocialLinks links={designTestFooterSocial} />
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
          <p className="dt-footer__copyright">&copy; 2026 vCloudTech</p>
        </div>
      </div>
    </footer>
  );
}
