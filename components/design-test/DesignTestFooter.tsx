import Link from "next/link";
import { Fragment } from "react";

import { VCloudTechLogoImage } from "@/components/brand/VCloudTechLogoImage";
import { FooterNewsletter } from "@/components/design-test/FooterNewsletter";
import { FooterSocialLinks } from "@/components/design-test/FooterSocialIcons";
import {
  designTestFooterLinks,
  designTestFooterLocations,
  designTestFooterSocial,
} from "@/lib/design-test/footer-content";

import "./design-test-footer.css";

function FooterLocationPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="dt-footer__location-pin"
    >
      <path
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

type FooterLocationLinkProps = {
  heading: string;
  lines: readonly string[];
  mapsUrl: string;
  ariaLabel: string;
};

function FooterLocationLink({ heading, lines, mapsUrl, ariaLabel }: FooterLocationLinkProps) {
  return (
    <a
      href={mapsUrl}
      className="dt-footer__location-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <span className="dt-footer__location-heading">{heading}</span>
      <span className="dt-footer__location-body">
        <FooterLocationPinIcon />
        <span className="dt-footer__location-address">
          {lines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </span>
      </span>
    </a>
  );
}

/** Enterprise footer for dark design-test lab. */
export function DesignTestFooter() {
  return (
    <footer className="dt-footer" aria-label="Site footer">
      <div className="dt-footer__inner">
        <FooterNewsletter />

        <div className="dt-footer__grid">
          <div>
            <VCloudTechLogoImage variant="light" className="h-7 w-auto sm:h-8" />
            <div className="dt-footer__locations">
              <FooterLocationLink
                heading={designTestFooterLocations.headquarters.heading}
                lines={designTestFooterLocations.headquarters.lines}
                mapsUrl={designTestFooterLocations.headquarters.mapsUrl}
                ariaLabel={designTestFooterLocations.headquarters.ariaLabel}
              />
              <FooterLocationLink
                heading={designTestFooterLocations.office.heading}
                lines={designTestFooterLocations.office.lines}
                mapsUrl={designTestFooterLocations.office.mapsUrl}
                ariaLabel={designTestFooterLocations.office.ariaLabel}
              />
            </div>
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
