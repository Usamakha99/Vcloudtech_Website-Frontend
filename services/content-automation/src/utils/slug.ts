import { randomBytes } from "node:crypto";

const MAX_SLUG_LEN = 80;

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LEN);
  return base || "update";
}

/** Ensures uniqueness when titles collide */
export function uniqueSlug(base: string, suffix: string): string {
  const extra = suffix.slice(0, 12);
  const trimmed = base.slice(0, Math.max(1, MAX_SLUG_LEN - extra.length - 1));
  return `${trimmed}-${extra}`;
}

export function randomKey(): string {
  return randomBytes(6).toString("hex");
}
