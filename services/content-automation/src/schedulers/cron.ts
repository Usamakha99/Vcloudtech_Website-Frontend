import cron from "node-cron";

import { env } from "../config/env.js";
import { logger } from "../lib/logger.js";

/**
 * Schedulers are separate from business logic so deployment can choose:
 * - long-running daemon (this module), or
 * - external cron invoking `npm run once` (GitHub Actions, Vercel cron hitting a worker URL in a later phase).
 */
export function startCronScheduler(task: () => Promise<void>): void {
  cron.schedule(env.cron.expression, async () => {
    logger.info("cron_tick", { expression: env.cron.expression });
    try {
      await task();
    } catch (err) {
      logger.error("cron_task_failed", {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  });
  logger.info("cron_registered", { expression: env.cron.expression });
}
