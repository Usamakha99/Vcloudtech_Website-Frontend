import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";

/**
 * Resolve paths from this file so env loads correctly whether you run:
 * - `npm run automation:once` from repo root (`npm --prefix` sets cwd to **service** dir), or
 * - `npm run once` from inside `services/content-automation/`.
 *
 * `process.cwd()` alone breaks with `--prefix` because root `.env.local` is not under cwd.
 */
function loadEnvFiles(): void {
  const configDir = dirname(fileURLToPath(import.meta.url));
  const serviceRoot = join(configDir, "..", "..");
  const repoRoot = join(serviceRoot, "..", "..");

  const paths = [
    join(serviceRoot, ".env"),
    join(serviceRoot, ".env.local"),
    join(repoRoot, ".env"),
    join(repoRoot, ".env.local"),
  ];

  for (const p of paths) {
    if (existsSync(p)) {
      config({ path: p, override: true });
    }
  }
}

loadEnvFiles();

function required(name: string): string {
  const v = process.env[name];
  if (!v?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v.trim();
}

/** First non-empty env among candidates (shared vars with Next.js use `NEXT_PUBLIC_*`). */
function requiredFirst(...names: string[]): string {
  for (const name of names) {
    const v = process.env[name]?.trim();
    if (v) return v;
  }
  throw new Error(`Missing required environment variable: one of ${names.join(", ")}`);
}

function optional(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

/** First non-empty env among names; otherwise `fallback` (for optional vars with Next.js aliases). */
function optionalFirst(fallback: string, ...names: string[]): string {
  for (const name of names) {
    const v = process.env[name]?.trim();
    if (v) return v;
  }
  return fallback;
}

function optionalInt(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/** Centralized runtime configuration — single place to read env vars. */
export const env = {
  sanity: {
    projectId: requiredFirst("SANITY_PROJECT_ID", "NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: requiredFirst("SANITY_DATASET", "NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: optionalFirst("2026-05-11", "SANITY_API_VERSION", "NEXT_PUBLIC_SANITY_API_VERSION"),
    /** Token with *create* (and read) permissions on the dataset */
    writeToken: requiredFirst("SANITY_API_WRITE_TOKEN", "SANITY_API_TOKEN"),
  },
  openai: {
    apiKey: required("OPENAI_API_KEY"),
    model: optional("OPENAI_MODEL", "gpt-4o-mini"),
  },
  pipeline: {
    maxItemsPerVendor: optionalInt("MAX_ITEMS_PER_VENDOR", 8),
  },
  cron: {
    expression: optional("CRON_EXPRESSION", "0 */6 * * *"),
  },
  logging: {
    level: optional("LOG_LEVEL", "info") as "debug" | "info" | "warn" | "error",
    json: optional("LOG_JSON", "false") === "true",
  },
} as const;
