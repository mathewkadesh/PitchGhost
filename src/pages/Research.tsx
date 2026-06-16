import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Dossier from "../components/Dossier";
import ErrorState from "../components/ErrorState";
import LoadingDossier from "../components/LoadingDossier";
import { getDirectoryEntry } from "../data/vcDirectory";
import { isSampleSlug } from "../lib/constants";
import { runGhost } from "../lib/ghost";
import type { Dossier as DossierData, GhostRequestInput } from "../lib/types";

export default function Research() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  // For non-sample directory firms, redirect to the offline profile page
  // so we never try to call the live research worker for them.
  const redirectToFirm =
    slug && slug !== "custom" && !isSampleSlug(slug) && Boolean(getDirectoryEntry(slug));

  const input = useMemo<GhostRequestInput | undefined>(() => {
    if (redirectToFirm) return undefined;
    if (slug === "custom") {
      const state = location.state as { input?: GhostRequestInput } | null;
      return state?.input;
    }
    const entry = slug ? getDirectoryEntry(slug) : undefined;
    return entry ? { firm: entry.firm, partner: entry.partner } : undefined;
  }, [slug, location.state, redirectToFirm]);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [dossier, setDossier] = useState<DossierData>();
  const [error, setError] = useState<unknown>();
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(() => {
    if (!input) return;
    setStatus("loading");
    setError(undefined);

    runGhost(input)
      .then((result) => {
        setDossier(result.dossier);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        setError(err);
        setStatus("error");
      });
  }, [input]);

  useEffect(() => {
    load();
  }, [load, attempt]);

  if (redirectToFirm) {
    return <Navigate to={`/firm/${slug}`} replace />;
  }

  if (!input) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="meta-label text-warn">Nothing to research yet</p>
        <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Start from the homepage</h1>
        <p className="mt-3 text-ink-soft">
          Custom research requests don't survive a page refresh in this static build — head back and
          submit the form again.
        </p>
        <Link
          to="/"
          className="meta-label mt-6 inline-block text-gold underline decoration-line hover:decoration-gold"
        >
          ← Back home
        </Link>
      </div>
    );
  }

  return (
    <div aria-live="polite">
      {status === "loading" && <LoadingDossier />}
      {status === "error" && <ErrorState error={error} onRetry={() => setAttempt((a) => a + 1)} />}
      {status === "ready" && dossier && <Dossier dossier={dossier} />}
    </div>
  );
}
