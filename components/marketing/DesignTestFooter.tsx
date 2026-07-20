import Link from "next/link";
import { Fragment } from "react";

import { FooterNewsletter } from "@/components/marketing/FooterNewsletter";
import { FooterSocialLinks } from "@/components/marketing/FooterSocialIcons";
import { designTestContactInfo } from "@/lib/marketing/contact-options";
import {
  designTestFooterLinks,
  designTestFooterLocations,
  designTestFooterSocial,
} from "@/lib/marketing/footer-content";
// import Image from "next/image";
// import { publicAssets } from "@/lib/public-assets";

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
  country?: string;
  region: string;
  lines: readonly string[];
  mapsUrl: string;
  ariaLabel: string;
};

function FooterLocationLink({
  country,
  region,
  lines,
  mapsUrl,
  ariaLabel,
}: FooterLocationLinkProps) {
  return (
    <a
      href={mapsUrl}
      className="dt-footer__location-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {country ? <span className="dt-footer__location-country">{country}</span> : null}
      <span className="dt-footer__location-region">{region}</span>
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

function FooterLocationDivider() {
  return <span className="dt-footer__location-divider" aria-hidden />;
}

function FooterContactInfo() {
  return (
    <div className="dt-footer__contact" aria-label="Contact information">
      <div className="dt-footer__contact-card">
        <p className="dt-footer__contact-card-title">Contact</p>
        <div className="dt-footer__contact-rows">
          <div className="dt-footer__contact-row">
            <span className="dt-footer__contact-row-label">Email</span>
            <a
              href={`mailto:${designTestContactInfo.email}`}
              className="dt-footer__contact-row-value"
            >
              {designTestContactInfo.email}
            </a>
          </div>
          <div className="dt-footer__contact-row">
            <span className="dt-footer__contact-row-label">Phone</span>
            <a
              href={`tel:${designTestContactInfo.phone.replace(/\D/g, "")}`}
              className="dt-footer__contact-row-value"
            >
              {designTestContactInfo.phone}
            </a>
          </div>
          <div className="dt-footer__contact-row">
            <span className="dt-footer__contact-row-label">Business hours</span>
            <span className="dt-footer__contact-row-value dt-footer__contact-row-value--plain">
              {designTestContactInfo.hours}
            </span>
          </div>
        </div>
        <p className="dt-footer__contact-note">{designTestContactInfo.enterpriseNote}</p>
      </div>
    </div>
  );
}

/** Enterprise footer for dark design-test lab. */
export function DesignTestFooter() {
  return (
    <footer className="dt-footer" aria-label="Site footer">
      <div className="dt-footer__inner">
        <FooterNewsletter />

        <div className="dt-footer__grid">
          <div className="dt-footer__brand">
            <div className="dt-footer__locations">
              <FooterLocationLink
                country={designTestFooterLocations.headquarters.country}
                region={designTestFooterLocations.headquarters.region}
                lines={designTestFooterLocations.headquarters.lines}
                mapsUrl={designTestFooterLocations.headquarters.mapsUrl}
                ariaLabel={designTestFooterLocations.headquarters.ariaLabel}
              />
              <FooterLocationDivider />
              <FooterLocationLink
                country={designTestFooterLocations.office.country}
                region={designTestFooterLocations.office.region}
                lines={designTestFooterLocations.office.lines}
                mapsUrl={designTestFooterLocations.office.mapsUrl}
                ariaLabel={designTestFooterLocations.office.ariaLabel}
              />
              <FooterLocationDivider />
              <FooterLocationLink
                country={designTestFooterLocations.canada.country}
                region={designTestFooterLocations.canada.region}
                lines={designTestFooterLocations.canada.lines}
                mapsUrl={designTestFooterLocations.canada.mapsUrl}
                ariaLabel={designTestFooterLocations.canada.ariaLabel}
              />
            </div>
            <FooterSocialLinks links={designTestFooterSocial} />
          </div>

          <div className="dt-footer__mid">
            <div className="dt-footer__mid-links">
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
            </div>
          </div>

          <FooterContactInfo />
        </div>

        {/* vCloudTech logo mark — hidden for now
        <div className="dt-footer__mark" aria-hidden>
          <Image
            src={publicAssets.brand.markOutline}
            alt=""
            width={1600}
            height={360}
            className="dt-footer__mark-img"
            sizes="100vw"
            priority={false}
          />
          <span className="dt-footer__mark-shine" />
        </div>
        */}

        <div className="dt-footer__bottom">
          <p className="dt-footer__copyright">vCloud Tech &copy; 2026  All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
