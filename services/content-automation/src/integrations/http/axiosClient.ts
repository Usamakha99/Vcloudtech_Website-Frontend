import axios, { type AxiosInstance } from "axios";

/**
 * Shared HTTP client for non-RSS vendor APIs (Phase 2+).
 * RSS uses `rss-parser` directly; axios stays here to avoid ad-hoc `fetch` sprawl later.
 */
export function createHttpClient(): AxiosInstance {
  return axios.create({
    timeout: 30_000,
    headers: {
      "User-Agent": "vCloudTech-ContentAutomation/1.0",
    },
    validateStatus: (s) => s >= 200 && s < 300,
  });
}
