import type { ContractVehicleDetail } from "@/lib/marketing/contract-vehicle-details";

type ContractVehicleDetailTableProps = {
  title: string;
  details: ContractVehicleDetail[];
  onClose: () => void;
};

const detailRows: { key: keyof ContractVehicleDetail; label: string }[] = [
  { key: "contractHolder", label: "Contract holder" },
  { key: "region", label: "Region" },
  { key: "manufacturers", label: "Manufacturers / publishers" },
  { key: "description", label: "Description" },
  { key: "term", label: "Term" },
];

function ContractDetailRows({ detail }: { detail: ContractVehicleDetail }) {
  return (
    <dl className="cv-detail__list">
      {detailRows.map((row) => (
        <div key={row.key} className="cv-detail__row">
          <dt>{row.label}</dt>
          <dd>{detail[row.key]}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Minimal contract detail tables shown when a vehicle chip is selected. */
export function ContractVehicleDetailTable({
  title,
  details,
  onClose,
}: ContractVehicleDetailTableProps) {
  return (
    <div className="cv-detail" role="region" aria-label={`${title} contract details`}>
      <div className="cv-detail__header">
        <h3 className="cv-detail__title">{title}</h3>
        <button type="button" className="cv-detail__close" onClick={onClose} aria-label="Close">
          <span aria-hidden>×</span>
        </button>
      </div>

      <div className="cv-detail__body">
        {details.map((detail, index) => (
          <article key={detail.contractNumber} className="cv-detail__block">
            <h4 className="cv-detail__block-title">{detail.contractNumber}</h4>
            <ContractDetailRows detail={detail} />
            {index < details.length - 1 ? <hr className="cv-detail__divider" /> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
