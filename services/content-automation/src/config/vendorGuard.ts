import type { VendorId } from "../types/index.js";

const ALLOWED: readonly VendorId[] = ["microsoft", "aws", "dell", "nvidia", "cisco"];

export function assertVendorId(v: string): asserts v is VendorId {
  if (!ALLOWED.includes(v as VendorId)) {
    throw new Error(`Invalid vendor id in feed config: ${v}`);
  }
}
