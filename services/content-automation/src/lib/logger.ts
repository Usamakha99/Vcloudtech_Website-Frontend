import { env } from "../config/env.js";

type Level = "debug" | "info" | "warn" | "error";

const order: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };

function shouldLog(level: Level): boolean {
  return order[level] >= order[env.logging.level];
}

function basePayload(level: Level, msg: string, context?: Record<string, unknown>) {
  return {
    ts: new Date().toISOString(),
    level,
    msg,
    ...context,
  };
}

/**
 * Minimal structured logger — stdout JSON for log aggregators, or plain lines locally.
 * Why: avoids pulling a heavy logging framework in Phase 1 while staying production-usable.
 */
export const logger = {
  debug(msg: string, context?: Record<string, unknown>) {
    if (!shouldLog("debug")) return;
    emit("debug", msg, context);
  },
  info(msg: string, context?: Record<string, unknown>) {
    if (!shouldLog("info")) return;
    emit("info", msg, context);
  },
  warn(msg: string, context?: Record<string, unknown>) {
    if (!shouldLog("warn")) return;
    emit("warn", msg, context);
  },
  error(msg: string, context?: Record<string, unknown>) {
    if (!shouldLog("error")) return;
    emit("error", msg, context);
  },
};

function emit(level: Level, msg: string, context?: Record<string, unknown>) {
  const payload = basePayload(level, msg, context);
  if (env.logging.json) {
    console[level === "debug" ? "log" : level](JSON.stringify(payload));
  } else {
    const ctx = context && Object.keys(context).length ? ` ${JSON.stringify(context)}` : "";
    console[level === "debug" ? "log" : level](`[${payload.ts}] ${level.toUpperCase()} ${msg}${ctx}`);
  }
}
