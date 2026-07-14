import type { ContractVehicleDetail } from "@/lib/marketing/contract-vehicle-details";

type ContractVehicleDetailTableProps = {
  title: string;
  details: ContractVehicleDetail[];
  onClose: () => void;
};

const detailRows: { key: keyof ContractVehicleDetail; label: string; prominent?: boolean }[] = [
  { key: "contractNumber", label: "Contract No", prominent: true },
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
        <div
          key={row.key}
          className={`cv-detail__row${row.prominent ? " cv-detail__row--prominent" : ""}`}
        >
          <dt>{row.label}</dt>
          <dd>{detail[row.key]}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Contract details — multiple contracts render as separate cards. */
export function ContractVehicleDetailTable({
  title,
  details,
  onClose,
}: ContractVehicleDetailTableProps) {
  const multiple = details.length > 1;

  return (
    <div className="cv-detail" role="region" aria-label={`${title} contract details`}>
      <div className="cv-detail__header">
        <h3 className="cv-detail__title">{title}</h3>
        <button type="button" className="cv-detail__close" onClick={onClose} aria-label="Close">
          <span aria-hidden>×</span>
        </button>
      </div>

      <div className={`cv-detail__body${multiple ? " cv-detail__body--cards" : ""}`}>
        {details.map((detail, index) => (
          <article
            key={detail.contractNumber}
            className={`cv-detail__card${multiple ? " cv-detail__card--split" : ""}`}
            aria-label={`Contract ${detail.contractNumber}`}
          >
            {multiple ? (
              <header className="cv-detail__card-head">
                <p className="cv-detail__card-label">
                  <strong>
                    Contract {index + 1} of {details.length}
                  </strong>
                </p>
                <h4 className="cv-detail__card-number">
                  <strong>{detail.contractNumber}</strong>
                </h4>
              </header>
            ) : null}

            <ContractDetailRows detail={detail} />
          </article>
        ))}
      </div>
    </div>
  );
}
