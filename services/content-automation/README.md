# Content automation service (Phase 1)

Separate **Node.js + TypeScript** worker that ingests vendor **RSS** and publishes **`vendorUpdate`** documents to **Sanity** (RSS fields → Portable Text). **OpenAI summarization** is implemented in `src/integrations/openai/summarizer.ts` but **not wired** from the pipeline (see commented blocks in `ingestVendorFeed.ts` and `config/env.ts`); restore those when you want AI summaries again. The Next.js site stays a consumer only (ISR / live queries).

## Why this is a separate package

- **Deploy independently** (VM, systemd, Railway, Fly.io, GitHub Actions cron, etc.) without coupling to the Vercel Next runtime.
- **Secrets isolation**: write tokens and OpenAI keys never ship to the browser bundle.
- **Scaling path**: you can later split queues or add a database without rewriting the Next app.

## Directory map

| Path | Purpose |
|------|---------|
| `src/config/` | **Env + static feed list** — single source of truth for URLs and tuning knobs. |
| `src/types/` | **Shared contracts** between RSS, AI, and CMS layers. |
| `src/lib/` | **Cross-cutting** utilities (logger). |
| `src/integrations/` | **Outbound adapters** — RSS, OpenAI, Sanity, HTTP (axios stub for future REST vendors). |
| `src/services/pipeline/` | **Orchestration** — composes integrations into a business flow (`ingestVendorFeed`). |
| `src/jobs/` | **Entry-level jobs** — what cron or CLI invokes (`runVendorFeedsJob`). |
| `src/schedulers/` | **Time-based triggers** — `node-cron` wiring only; no business logic here. |
| `src/utils/` | **Pure helpers** — hashing, slugging (easy to unit test). |

## Data flow

1. `fetchRssFeed` → normalized `{ title, link, snippet, pubDate }`.
2. `hashSourceUrl(link)` → deterministic `sourceId`.
3. `vendorUpdateExistsBySourceId` → skip if already in Sanity (**duplicate strategy**).
4. `buildVendorDraftFromRssItem` → title from RSS, summary from snippet (HTML stripped), tags `[vendor]`, category = feed label.  
   **FUTURE — OpenAI:** uncomment branch in `ingestVendorFeed.ts` + env in `env.ts`; then `summarizeFeedItem` enriches fields before `createVendorUpdate`.
5. `createVendorUpdate` → Sanity `create()` with Portable Text body.

## Duplicate detection (no PostgreSQL)

- **Primary key**: `sourceId` = SHA-256 of normalized URL (fragment stripped).
- **Check**: GROQ `*[_type == "vendorUpdate" && sourceId == $sourceId][0]` before create (when OpenAI is re-enabled, this avoids paying for duplicates).
- **Race guard**: `createVendorUpdate` re-checks before `create()` to reduce double-publish under concurrency.

## Environment

Copy `.env.example` → `services/content-automation/.env`, **or** put shared vars in the **repo root** `.env.local` (same file Next.js uses).

Env files are loaded in order (later overrides earlier):

1. `services/content-automation/.env`
2. `services/content-automation/.env.local`
3. `.env` (repo root)
4. `.env.local` (repo root)

**Sanity project & dataset:** you can use either `SANITY_PROJECT_ID` / `SANITY_DATASET` **or** the same `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` values as the Next app (no duplication needed).

`SANITY_API_WRITE_TOKEN` (or `SANITY_API_TOKEN`) must be set somewhere in those files (not public in the browser). **`OPENAI_API_KEY`** is unused until you restore the OpenAI branch in code (see `env.ts` / `ingestVendorFeed.ts`).

| Variable | Description |
|----------|-------------|
| `RSS_ONLY` | **Ignored for now** (pipeline is RSS-only). Kept in `.env.example` for when OpenAI branch is restored. |
| `SANITY_PROJECT_ID` | Optional if `NEXT_PUBLIC_SANITY_PROJECT_ID` is set (root `.env.local`) |
| `SANITY_DATASET` | Optional if `NEXT_PUBLIC_SANITY_DATASET` is set |
| `SANITY_API_WRITE_TOKEN` | Required — token with **create** document permission (alias: `SANITY_API_TOKEN`) |
| `OPENAI_API_KEY` | Optional until OpenAI path is re-enabled in source |
| `OPENAI_MODEL` | Default `gpt-4o-mini` (used when OpenAI is re-enabled) |
| `MAX_ITEMS_PER_VENDOR` | Max **new** documents to create per vendor per run (default `8`) |
| `MAX_FEED_SCAN_PER_VENDOR` | How many RSS rows to walk when hunting for new items (default `60`) |
| `CRON_EXPRESSION` | Default every 6 hours: `0 */6 * * *` |
| `LOG_LEVEL` | `debug` \| `info` \| `warn` \| `error` |
| `LOG_JSON` | `true` for one JSON object per line |

## Commands

```bash
# from repo root
npm run automation:install

# one-shot run (CI / manual / Vercel cron calling a worker later)
npm run automation:once

# long-running + cron (VPS / container)
npm run automation:daemon
```

Local dev from service folder:

```bash
cd services/content-automation
cp .env.example .env   # fill values
npm run once
```

## Sanity schema

Adds document type **`vendorUpdate`** (see `sanity/schemaTypes/vendorUpdateType.ts`). Run Studio and deploy schema before relying on automation.

## Frontend

- Listing: `/vendor-updates`
- Detail: `/vendor-updates/[slug]`

Uses `VENDOR_UPDATES_QUERY` / `VENDOR_UPDATE_BY_SLUG_QUERY` in `sanity/lib/queries.ts`.

## Error handling philosophy

- **Per-item try/catch**: one bad RSS item or OpenAI failure must not abort the whole vendor batch.
- **Per-vendor try/catch** in `runVendorFeedsJob`: one dead feed URL should not block other vendors.
- **Fatal only on bootstrap** misconfiguration (missing env) — fail fast at process start.

## Operational notes

- Tune `MAX_ITEMS_PER_VENDOR` to control OpenAI cost on first runs.
- Replace feed URLs in `src/config/feeds.ts` when vendors change endpoints.
- **axios** is wired as `integrations/http/axiosClient.ts` for future non-RSS vendor APIs (Phase 2).

## Build (compiled JS)

```bash
npm run automation:build
npm run start --prefix services/content-automation
```

Requires `npm run build` inside `services/content-automation` first (`tsc` emits to `dist/`).
