/** Unique government / cooperative contract vehicles — single source of truth. */
export const contractVehicles = [
  { id: "gsa", label: "GSA Schedule" },
  { id: "tips", label: "TIPS" },
  { id: "costars", label: "COSTARS" },
  { id: "epic6", label: "EPIC6" },
  { id: "allied", label: "Allied States Cooperative" },
  { id: "sourcewell", label: "Sourcewell" },
  { id: "buyboard", label: "BuyBoard" },
  { id: "cmas", label: "CMAS GSA" },
  { id: "pca", label: "PCA" },
  { id: "region7", label: "Region 7 Purchasing & Vendor Services" },
  { id: "equalis", label: "Equalis Group" },
  { id: "goodbuy", label: "Goodbuy" },
  { id: "region18", label: "Region 18 ESC" },
  { id: "texbuy", label: "TEX BUY" },
  { id: "setx", label: "Southeast Texas Purchasing Cooperative" },
  { id: "northwest-isd", label: "Northwest ISD" },
  { id: "frisco-isd", label: "Frisco ISD" },
  { id: "fort-worth-isd", label: "Fort Worth ISD" },
  { id: "edge-public", label: "Edge Public / AFI Alliance for Innovation" },
  { id: "ohio-sts", label: "Ohio STS" },
  { id: "tx-dir-idiq", label: "State of Texas DIR" },
  { id: "naspo", label: "NASPO" },
  { id: "ncpa-promark", label: "NCPA under Promark" },
  { id: "td-snx-omnia", label: "TD SNX-OMNIA R250307" },
] as const;

export type ContractVehicle = (typeof contractVehicles)[number];
