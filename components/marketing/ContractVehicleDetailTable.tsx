import type { ContractVehicleDetail } from "@/lib/marketing/contract-vehicle-details";

type ContractVehicleDetailTableProps = {
  title: string;
  details: ContractVehicleDetail[];
  onClose: () => void;
};

const detailRows: { key: keyof ContractVehicleDetail; label: string }[] = [
  { key: "contractNumber", label: "Contract number" },
  { key: "contractHolder", label: "Contract holder" },
  { key: "region", label: "Region" },
  { key: "manufacturers", label: "Manufacturers / publishers" },
  { key: "description", label: "Description" },
  { key: "term", label: "Term" },
];

function ContractDetailRows({ detail }: { detail: ContractVehicleDetail }) {
  return (
    <table className="cv-detail__table">
      <tbody>
        {detailRows.map((row) => (
          <tr key={row.key}>
            <th scope="row">{row.label}</th>
            <td>{detail[row.key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
        <button type="button" className="cv-detail__close" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="cv-detail__body">
        {details.map((detail, index) => (
          <div key={detail.contractNumber} className="cv-detail__block">
            {details.length > 1 ? (
              <p className="cv-detail__contract-label">{detail.contractNumber}</p>
            ) : null}
            <ContractDetailRows detail={detail} />
            {index < details.length - 1 ? <hr className="cv-detail__divider" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
