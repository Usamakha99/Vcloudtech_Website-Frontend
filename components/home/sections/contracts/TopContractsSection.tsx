import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/marketing/design-test-theme";
import { publicAssets } from "@/lib/public-assets";

import "./top-contracts.css";

const contractLogos = [
  { id: "iso", name: "ISO 9001:2015", src: publicAssets.credentials.iso },
  { id: "gsa", name: "GSA Schedule", src: publicAssets.credentials.gsa },
  { id: "sourcewell", name: "Sourcewell", src: publicAssets.credentials.sourcewell },
  { id: "tips", name: "TIPS", src: publicAssets.credentials.tips },
] as const;

/** Top performing contracts holder — logos row after Solutions. */
export function HomeTopContractsSection() {
  return (
    <section
      id="contracts"
      className={`tc relative z-10 scroll-mt-24 py-14 sm:py-16 lg:py-20 ${dt.sectionBorder}`}
      aria-labelledby="top-contracts-heading"
    >
      <div className="tc__inner">
        <header className={dt.sectionHeader}>
          <h2 id="top-contracts-heading" className={dt.sectionHeadlineTp}>
            Top Performing Contracts Holder
          </h2>
        </header>

        <ul className="tc__logos" aria-label="Contract vehicles and certifications">
          {contractLogos.map((logo) => (
            <li key={logo.id} className="tc__logo-cell">
              <div className="tc__logo-slot">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  unoptimized
                  className={`tc__logo tc__logo--${logo.id}`}
                  sizes="(max-width: 640px) 28vw, 140px"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="tc__footer">
          <Link href="/contracts" className="tc__cta">
            View all contracts
            <span className="tc__cta-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
