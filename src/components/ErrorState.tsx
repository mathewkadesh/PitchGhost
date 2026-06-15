import { Link } from "react-router-dom";
import { GhostError, type GhostErrorKind } from "../lib/types";

const KIND_COPY: Record<GhostErrorKind, { title: string; hint: string }> = {
  "rate-limited": {
    title: "Daily limit reached",
    hint: "Live research is capped to keep this deployment's costs in check. Try again tomorrow, or explore a sample dossier in the meantime.",
  },
  network: {
    title: "Couldn't reach the research service",
    hint: "Check your connection and try again. If this keeps happening, the service may be temporarily down.",
  },
  config: {
    title: "Live research isn't configured yet",
    hint: "Browse the directory for a firm with a sample dossier, or check back once live research is set up for this deployment.",
  },
  server: {
    title: "Something went wrong generating this dossier",
    hint: "This is usually temporary — try again in a moment.",
  },
};

export default function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const kind: GhostErrorKind = error instanceof GhostError ? error.kind : "server";
  const message = error instanceof Error ? error.message : "Something went wrong.";
  const copy = KIND_COPY[kind];

  return (
    <div role="alert" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-lg border border-warn/40 bg-panel p-6">
        <p className="meta-label text-warn">{copy.title}</p>
        <p className="mt-2 text-ink">{message}</p>
        <p className="mt-2 text-sm text-ink-soft">{copy.hint}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="meta-label rounded-md bg-gold px-4 py-2 text-bg transition-opacity hover:opacity-90"
            >
              Try again
            </button>
          )}
          <Link to="/directory" className="meta-label text-gold underline decoration-line hover:decoration-gold">
            Browse the directory
          </Link>
        </div>
      </div>
    </div>
  );
}
