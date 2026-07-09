const CONNECT_TIMEOUT_MS = 30_000;
const MAX_ATTEMPTS = 4;

function delay(attempt: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, 400 * 2 ** (attempt - 1));
  });
}

/** Retry Sanity HTTP calls with a longer connect timeout than the default 10s. */
export async function resilientSanityFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(input, {
        ...init,
        signal: init?.signal ?? AbortSignal.timeout(CONNECT_TIMEOUT_MS),
      });

      if (response.status >= 500 && attempt < MAX_ATTEMPTS) {
        await delay(attempt);
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        await delay(attempt);
      }
    }
  }

  throw lastError;
}
