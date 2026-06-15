/**
 * PitchGhost live-research proxy.
 *
 * A small Cloudflare Worker that:
 *  - holds the Anthropic API key server-side (never shipped to the browser)
 *  - calls Claude with web search enabled, using the same system prompt and
 *    schema as the frontend (imported from ../src/lib so the two never drift)
 *  - rate-limits requests per IP and globally, per day, using a KV namespace
 *  - restricts CORS to the deployed Pages origin
 *
 * This file is a scaffold: it is not deployed as part of the static site
 * build. See worker/README.md for setup and deploy instructions.
 */
import { extractFinalText, extractJson } from "../src/lib/anthropicResponse";
import { buildGhostUserPrompt, GHOST_SYSTEM_PROMPT } from "../src/lib/prompt";
import type { GhostRequestInput } from "../src/lib/types";

export interface Env {
  /** Anthropic API key. Set with `wrangler secret put ANTHROPIC_API_KEY`. */
  ANTHROPIC_API_KEY: string;
  /** Origin of the deployed Pages site, e.g. "https://username.github.io". */
  ALLOWED_ORIGIN: string;
  /** Max requests per IP per UTC day. Defaults to 5. */
  DAILY_LIMIT_PER_IP?: string;
  /** Max total requests across all IPs per UTC day. Defaults to 200. */
  DAILY_GLOBAL_LIMIT?: string;
  /** KV namespace used to track per-IP and global request counts. */
  RATE_LIMIT_KV: KVNamespace;
}

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_MODEL = "claude-sonnet-4-5";
const ONE_DAY_SECONDS = 60 * 60 * 24;

function jsonResponse(body: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

function corsHeaders(env: Env): Record<string, string> {
  // Always advertise the configured Pages origin. If the actual request
  // came from elsewhere, the browser's CORS check will fail closed since
  // the response origin won't match the request origin.
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

async function readCount(kv: KVNamespace, key: string): Promise<number> {
  const raw = await kv.get(key);
  return raw ? Number(raw) || 0 : 0;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const headers = corsHeaders(env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/ghost") {
      return jsonResponse({ error: "not_found" }, 404, headers);
    }

    let input: GhostRequestInput;
    try {
      const body = (await request.json()) as Partial<GhostRequestInput>;
      if (!body.firm || typeof body.firm !== "string") {
        throw new Error("missing firm");
      }
      input = { firm: body.firm, partner: body.partner, startup: body.startup };
    } catch {
      return jsonResponse({ error: "bad_request", message: "Body must include a \"firm\" string." }, 400, headers);
    }

    // --- Rate limiting -----------------------------------------------
    // Soft limits backed by KV. KV writes are eventually consistent and
    // not atomic, so under heavy concurrent load a few requests could
    // slip past the cap — acceptable for a free demo proxy. For strict
    // enforcement, swap this for a Durable Object counter.
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const day = todayKey();
    const ipKey = `ip:${ip}:${day}`;
    const globalKey = `global:${day}`;
    const ipLimit = Number(env.DAILY_LIMIT_PER_IP ?? "5");
    const globalLimit = Number(env.DAILY_GLOBAL_LIMIT ?? "200");

    const [ipCount, globalCount] = await Promise.all([
      readCount(env.RATE_LIMIT_KV, ipKey),
      readCount(env.RATE_LIMIT_KV, globalKey),
    ]);

    if (ipCount >= ipLimit) {
      return jsonResponse(
        { error: "rate_limited", message: "Daily research limit reached for this IP." },
        429,
        headers,
      );
    }
    if (globalCount >= globalLimit) {
      return jsonResponse(
        { error: "rate_limited", message: "Daily research limit reached for this deployment." },
        429,
        headers,
      );
    }

    // Record the attempt before calling Anthropic, so a flood of slow or
    // failing requests still counts against the caps.
    ctx.waitUntil(
      Promise.all([
        env.RATE_LIMIT_KV.put(ipKey, String(ipCount + 1), { expirationTtl: ONE_DAY_SECONDS }),
        env.RATE_LIMIT_KV.put(globalKey, String(globalCount + 1), { expirationTtl: ONE_DAY_SECONDS }),
      ]),
    );

    // --- Call Anthropic ------------------------------------------------
    let upstream: Response;
    try {
      upstream = await fetch(ANTHROPIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: ANTHROPIC_MODEL,
          max_tokens: 4096,
          system: GHOST_SYSTEM_PROMPT,
          messages: [{ role: "user", content: buildGhostUserPrompt(input) }],
          tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
        }),
      });
    } catch {
      return jsonResponse({ error: "upstream_unreachable" }, 502, headers);
    }

    if (!upstream.ok) {
      const errorBody = await upstream.text();
      console.error("Anthropic upstream error", upstream.status, errorBody);
      return jsonResponse({ error: "upstream_error", status: upstream.status }, 502, headers);
    }

    const data = await upstream.json();
    const text = extractFinalText(data as { content?: { type: string; text?: string }[] });
    const dossier = extractJson(text);

    if (!dossier) {
      console.error("Failed to parse dossier from response", JSON.stringify(data).slice(0, 2000));
      return jsonResponse({ error: "parse_error" }, 502, headers);
    }

    return jsonResponse(dossier, 200, headers);
  },
} satisfies ExportedHandler<Env>;
