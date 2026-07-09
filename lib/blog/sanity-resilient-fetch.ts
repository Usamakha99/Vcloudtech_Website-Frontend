const CONNECT_TIMEOUT_MS = 30_000;
const MAX_ATTEMPTS = 4;

function delay(attempt: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, 400 * 2 ** (attempt - 1));
  });
}

/** Retry Sanity client.fetch calls with backoff. */
export async function withSanityRetries<T>(fetcher: () => Promise<T>): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await Promise.race([
        fetcher(),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Sanity fetch timed out")), CONNECT_TIMEOUT_MS);
        }),
      ]);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        await delay(attempt);
      }
    }
  }

  throw lastError;
}
