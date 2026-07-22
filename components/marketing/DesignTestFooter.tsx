import Image from "next/image";
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
import { publicAssets } from "@/lib/public-assets";

import "./design-test-footer.css";

function FooterPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="dt-footer__meta-icon">
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

function FooterPhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="dt-footer__meta-icon">
      <path
        d="M7.2 3.8h2.4l1.2 3.2-1.5 1.5a12.5 12.5 0 0 0 5.7 5.7l1.5-1.5 3.2 1.2v2.4c0 .9-.7 1.7-1.6 1.8A15.8 15.8 0 0 1 3.4 5.4c.1-.9.9-1.6 1.8-1.6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const footerOffices = [
  {
    id: "texas",
    country: "United States",
    title: "Texas - Headquarter",
    lines: designTestFooterLocations.headquarters.lines,
    mapsUrl: designTestFooterLocations.headquarters.mapsUrl,
    ariaLabel: designTestFooterLocations.headquarters.ariaLabel,
    iconSrc: publicAssets.footerLocationIcons.texas,
  },
  {
    id: "california",
    country: null,
    title: "California",
    lines: designTestFooterLocations.office.lines,
    mapsUrl: designTestFooterLocations.office.mapsUrl,
    ariaLabel: designTestFooterLocations.office.ariaLabel,
    iconSrc: publicAssets.footerLocationIcons.california,
  },
  {
    id: "canada",
    country: "Canada",
    title: "Ontario",
    lines: designTestFooterLocations.canada.lines,
    mapsUrl: designTestFooterLocations.canada.mapsUrl,
    ariaLabel: designTestFooterLocations.canada.ariaLabel,
    iconSrc: publicAssets.footerLocationIcons.canada,
  },
] as const;

type FooterOffice = (typeof footerOffices)[number];

function FooterOfficeCard({
  office,
  phoneHref,
}: {
  office: FooterOffice;
  phoneHref: string;
}) {
  return (
    <li
      className={`dt-footer__office${office.id === "canada" ? " dt-footer__office--canada" : ""}`}
    >
      <p className={`dt-footer__country${office.country ? "" : " dt-footer__country--spacer"}`}>
        {office.country ?? "\u00A0"}
      </p>
      <p className="dt-footer__office-title">{office.title}</p>

      <div className="dt-footer__office-visual" aria-hidden>
        <Image
          src={office.iconSrc}
          alt=""
          width={520}
          height={320}
          className="dt-footer__office-img"
          sizes="(max-width: 767px) 85vw, 28vw"
        />
      </div>

      <a
        href={office.mapsUrl}
        className="dt-footer__office-meta"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={office.ariaLabel}
      >
        <FooterPinIcon />
        <span>
          {office.lines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </span>
      </a>

      <a href={phoneHref} className="dt-footer__office-meta">
        <FooterPhoneIcon />
        <span>{designTestContactInfo.phone}</span>
      </a>
    </li>
  );
}

function FooterOfficeCards() {
  const phoneHref = `tel:${designTestContactInfo.phone.replace(/\D/g, "")}`;

  return (
    <ul className="dt-footer__offices" aria-label="Office locations">
      {footerOffices.map((office) => (
        <FooterOfficeCard key={office.id} office={office} phoneHref={phoneHref} />
      ))}
    </ul>
  );
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

        <FooterOfficeCards />

        <div className="dt-footer__lower">
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

        <div className="dt-footer__social-wrap">
          <FooterSocialLinks links={designTestFooterSocial} />
        </div>

        <div className="dt-footer__bottom">
          <p className="dt-footer__copyright">vCloud Tech &copy; 2026  All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
