import OpenAI from "openai";

import { env } from "../../config/env.js";
import type { AiEnrichedContent, NormalizedFeedItem } from "../../types/index.js";
import { logger } from "../../lib/logger.js";

const openai = new OpenAI({ apiKey: env.openai.apiKey });

const SYSTEM_PROMPT = `You are an enterprise technology editor. Given an RSS news item, produce concise JSON for a B2B audience.
Rules:
- seoTitle: max 90 chars, compelling, no clickbait
- summary: 2-3 sentences, factual
- businessImpact: 1-2 sentences on why IT/procurement leadership should care
- category: single short label (e.g. Security, Cloud, Networking, AI, Hardware, Data)
- tags: 3-8 lowercase kebab-case or single-word tags, no hashtags
Output valid JSON only, matching the schema exactly.`;

/**
 * AI layer — isolated from RSS and Sanity so prompts/models can evolve independently.
 */
export async function summarizeFeedItem(
  item: NormalizedFeedItem,
  vendorLabel: string,
): Promise<AiEnrichedContent> {
  const userContent = JSON.stringify({
    vendor: vendorLabel,
    title: item.title,
    link: item.link,
    snippet: item.contentSnippet ?? "",
  });

  try {
    const response = await openai.chat.completions.create({
      model: env.openai.model,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `${userContent}\n\nRespond with JSON: {"seoTitle":"","summary":"","businessImpact":"","category":"","tags":[]}`,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) {
      throw new Error("Empty OpenAI response");
    }

    const parsed = JSON.parse(raw) as AiEnrichedContent;
    if (!parsed.seoTitle || !parsed.summary) {
      throw new Error("Invalid AI payload");
    }
    return parsed;
  } catch (err) {
    logger.error("openai_summarize_failed", {
      link: item.link,
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}
