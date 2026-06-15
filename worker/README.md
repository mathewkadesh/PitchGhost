# PitchGhost worker (live research proxy)

This is the Cloudflare Worker that powers **live research**: it holds the
Anthropic API key server-side and proxies research requests from the
PitchGhost frontend, so visitors get fresh, web-searched dossiers for any
firm without a sample dossier, without needing their own API key.

**This is a scaffold.** The code, config, and this README exist so the
architecture is complete and reviewable, but nothing here has been deployed.
Until this worker is deployed and `VITE_GHOST_API_URL` is set in the frontend
build, the deployed site can still render its six static sample dossiers (no
network call) — researching any other firm shows a "not configured yet"
message.

## How it fits together

```
Browser (research a firm without a sample dossier)
  → POST https://<worker>.workers.dev/ghost   { firm, partner?, startup? }
  → Worker checks per-IP / global daily rate limits (Cloudflare KV)
  → Worker calls Anthropic Messages API with web search enabled,
    using the shared system prompt + schema
    (imported from ../src/lib/prompt.ts and ../src/lib/anthropicResponse.ts)
  → Worker returns the parsed dossier JSON
  ← Browser renders it with <Dossier />, exactly like a sample dossier
```

Sharing `src/lib/prompt.ts` and `src/lib/anthropicResponse.ts` between the
frontend and the worker means the JSON dossier schema can't drift between
the sample dossiers and live research — both follow the same shape.

## Rate limiting

`/ghost` is rate-limited using a Cloudflare KV namespace (`RATE_LIMIT_KV`):

- **Per IP**: `DAILY_LIMIT_PER_IP` requests per UTC day (default `5`)
- **Global**: `DAILY_GLOBAL_LIMIT` requests per UTC day across all visitors
  (default `200`), so a single deployment's Anthropic spend has a hard
  ceiling regardless of traffic source

Counts are stored under `ip:<ip>:<date>` and `global:<date>` keys with a
~26 hour TTL. This is a soft limit — KV reads/writes are eventually
consistent, so a burst of concurrent requests could slightly exceed the cap.
For a strict limit, replace the KV counters with a
[Durable Object](https://developers.cloudflare.com/durable-objects/).

When a limit is hit, the worker returns `429`, which the frontend's
`runGhost()` (`src/lib/ghost.ts`) turns into a `GhostError` with kind
`"rate-limited"` and a friendly message suggesting a sample dossier in the
meantime.

## CORS

The worker only sets `Access-Control-Allow-Origin` to the single configured
`ALLOWED_ORIGIN` (your deployed Pages URL). Requests from any other origin
will fail the browser's CORS check.

## Setup & deploy

These steps are **not required** for the static site to work — the sample
dossiers need none of this. Run them only if you want to enable live research
for every other firm.

1. Install dependencies:

   ```sh
   cd worker
   npm install
   ```

2. Create a KV namespace for rate limiting:

   ```sh
   npx wrangler kv namespace create RATE_LIMIT_KV
   ```

   Copy the returned `id` into `wrangler.toml` under `[[kv_namespaces]]`.

3. Edit `wrangler.toml`:
   - Set `ALLOWED_ORIGIN` to your deployed Pages origin, e.g.
     `https://your-username.github.io` (no trailing slash).
   - Adjust `DAILY_LIMIT_PER_IP` / `DAILY_GLOBAL_LIMIT` if desired.

4. Add your Anthropic API key as a secret (never committed to the repo):

   ```sh
   npx wrangler secret put ANTHROPIC_API_KEY
   ```

5. Deploy:

   ```sh
   npx wrangler deploy
   ```

   Wrangler prints the worker's URL, e.g.
   `https://pitchghost-ghost.<your-subdomain>.workers.dev`.

6. Point the frontend at it by setting `VITE_GHOST_API_URL` (see the root
   `.env.example`) to that URL, then rebuild and redeploy the Pages site.
   Researching any firm without a sample dossier will then run live.

## Local development

```sh
cd worker
npx wrangler dev
```

This serves the worker locally (default `http://localhost:8787`). Point
`VITE_GHOST_API_URL` at that address during local frontend development to
exercise live research end-to-end. You'll still need a real
`ANTHROPIC_API_KEY` secret (or local `.dev.vars` file, which is gitignored)
for the upstream call to succeed.
