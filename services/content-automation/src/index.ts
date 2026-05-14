/**
 * Bootstrap: load env (via `dotenv/config` in `config/env.ts`), run pipeline once or on a schedule.
 */
import { env } from "./config/env.js";
import { createSanityWriteClient } from "./integrations/sanity/sanityClient.js";
import { runVendorFeedsJob } from "./jobs/runVendorFeedsJob.js";
import { logger } from "./lib/logger.js";
import { startCronScheduler } from "./schedulers/cron.js";

async function run(): Promise<void> {
  const client = createSanityWriteClient();
  await runVendorFeedsJob(client);
}

const daemon = process.argv.includes("--daemon");
const once = process.argv.includes("--once") || !daemon;

async function main(): Promise<void> {
  if (daemon) {
    logger.info("bootstrap_daemon", { cron: env.cron.expression });
    await run();
    startCronScheduler(run);
    return;
  }

  if (once) {
    logger.info("bootstrap_once");
    await run();
    process.exit(0);
  }
}

main().catch((err) => {
  logger.error("bootstrap_fatal", { error: err instanceof Error ? err.message : String(err) });
  process.exit(1);
});
