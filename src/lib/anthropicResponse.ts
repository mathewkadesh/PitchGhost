/**
 * Shared helpers for turning a raw Anthropic Messages API response into the
 * PitchGhost dossier JSON. Used by the Cloudflare Worker proxy in
 * worker/index.ts (and shares its shape with src/lib/ghost.ts) so both stay
 * in sync.
 */

export interface AnthropicContentBlock {
  type: string;
  text?: string;
}

export interface AnthropicMessage {
  content?: AnthropicContentBlock[];
}

export function extractFinalText(response: AnthropicMessage): string {
  if (!Array.isArray(response.content)) return "";
  return response.content
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text)
    .join("\n");
}

export function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) return undefined;

  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return undefined;
  }
}
