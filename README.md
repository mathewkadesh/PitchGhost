# PitchGhost

**PitchGhost** is a founder-facing research tool: enter a VC firm (and
optionally a partner and a one-line startup description), and it generates a
structured intelligence dossier — what the firm actually rewards, what gets a
"no," a profile of the partner with sourced claims, sharp questions to ask in
the room, and a draft follow-up email.

It's designed to be deployed as a static site on GitHub Pages.

## How research works

A static site can't hold a server-side API key, so "AI research tool" and
"pure static site" are normally in tension. PitchGhost resolves that with one
research path that works for every visitor, no key or sign-in required:

| Firm | What happens |
| --- | --- |
| One of six marquee firms with a **sample dossier** | Renders instantly from hand-written, fact-checked static data, with **zero network calls**. Labeled "Sample dossier" in the UI. |
| Any other firm | **Live research** — calls a small Cloudflare Worker (`worker/`) that holds an Anthropic API key server-side, runs the same prompt with web search (`src/lib/prompt.ts`), and is rate-limited per IP and globally so spend has a hard ceiling. Labeled "Live research." |

The routing is a single function, `src/lib/ghost.ts#runGhost` — sample slug
→ static JSON, otherwise → the worker. The six sample dossiers mean the
deployed site is fully functional — including for a recruiter on a phone —
without ever requiring secrets in this repo. Live research is powered by a
small Cloudflare Worker (see [`worker/README.md`](worker/README.md)); if
`VITE_GHOST_API_URL` is unset for a given build, researching a non-sample
firm instead shows a clear "not configured yet" message pointing at the
directory and sample dossiers, rather than a broken "Failed to fetch."

## Stack

- **React 19 + Vite 7 + TypeScript** (strict)
- **React Router 7** for `/`, `/directory`, `/blog`, `/blog/:slug`,
  `/research/:slug`
- **Tailwind CSS v4** (CSS-first `@theme` design tokens in
  `src/styles/tokens.css`)
- **Framer Motion** for entrance animations, respecting
  `prefers-reduced-motion`
- **Cloudflare Workers** for the live-research proxy (deployed separately,
  see [`worker/README.md`](worker/README.md))

## Project structure

```text
src/
  components/        # Dossier renderer, nav, hero, forms, export buttons
  data/              # vcDirectory.ts, sampleReports.ts (6 sample dossiers), blogPosts.ts + markdown
  lib/
    types.ts         # Dossier schema shared by sample and live research
    prompt.ts        # System prompt + schema, shared with worker/
    anthropicResponse.ts  # Response parsing, shared with worker/
    ghost.ts         # runGhost(input) — sample dossier or live research
    export.ts        # PDF export + "copy as markdown"
  pages/             # Home, Directory, Blog, BlogPost, Research, NotFound
worker/              # Cloudflare Worker for live research (deployed separately)
public/404.html      # SPA deep-link redirect for GitHub Pages
.github/workflows/deploy.yml  # Build + deploy to GitHub Pages
```

## Setup

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Opens at `http://localhost:5173`. The six sample dossiers work immediately
with no configuration. To exercise live research locally, run the worker
(`worker/README.md`) and point `VITE_GHOST_API_URL` at it.

Other scripts:

```bash
npm run build       # tsc -b && vite build
npm run typecheck   # tsc -b --noEmit
npm run preview     # preview the production build locally
```

## Environment variables

See `.env.example`. Only one variable is used, and it's optional:

- `VITE_GHOST_API_URL` — base URL of the deployed live-research Cloudflare
  Worker (e.g. `https://pitchghost-ghost.<subdomain>.workers.dev`). If unset,
  researching a non-sample firm shows a friendly "not configured yet"
  message; the sample dossiers and directory are unaffected.

No Anthropic API key is ever stored in this repo or shipped to the browser —
the worker holds its key as a Cloudflare secret (`worker/README.md`).

## Pages

- `/` — Hero, funding-news ticker, trending-firms leaderboard, and the
  research form
- `/directory` — Filterable directory of VC firms (search, region, stage,
  sector)
- `/blog` and `/blog/:slug` — Editorial articles (rendered from markdown)
- `/research/:slug` — The dossier itself: snapshot (with fit verdict),
  investment thesis, signals rewarded / anti-patterns, partner profile,
  recent activity, questions to ask, and a follow-up email draft. Exportable
  as PDF or markdown.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the app and publishes `dist/` to GitHub Pages via
`actions/deploy-pages`. The site is served as a project page at
`https://mathewkadesh.github.io/PitchGhost/` (`base: "/PitchGhost/"` in
`vite.config.ts`, matched by the router `basename` in `src/main.tsx`), and
`public/404.html` handles deep-link refreshes (e.g. landing directly on
`/research/sequoia-capital`) using the
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) redirect
trick.

To enable live research in the deployed build, deploy `worker/` (see its
README), then add a `VITE_GHOST_API_URL` repository secret pointing at the
worker URL.

## Disclaimer

Every generated dossier — sample or live — includes a verification
disclaimer: this is research assistance from public information, and may be
incomplete or out of date. Investors are individuals, not formulas.
