import { Link } from "react-router-dom";
import { isSampleSlug } from "../lib/constants";
import type { SampleReportSlug } from "../lib/constants";
import { sampleReports } from "../data/sampleReports";
import type { VcDirectoryEntry } from "../lib/types";

interface Props {
  entry: VcDirectoryEntry;
}

export default function DossierPreview({ entry }: Props) {
  const sample = isSampleSlug(entry.slug) ? sampleReports[entry.slug as SampleReportSlug] : null;

  return (
    <section className="border-b border-line bg-panel/20">
      <div className="px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="meta-label text-gold">Dossier preview</p>
            <h3 className="mt-1 font-display text-2xl text-ink">{entry.firm}</h3>
            <p className="mt-0.5 text-sm text-ink-soft">{entry.partner} · {entry.location}</p>
          </div>
          {sample && (
            <span className="meta-label shrink-0 rounded-full border border-gold/40 px-2 py-1 text-gold">
              Sample
            </span>
          )}
        </div>

        {/* Snapshot grid */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-panel p-3">
            <p className="meta-label text-ink-soft">Stage</p>
            <p className="mt-1 text-sm leading-snug text-ink">
              {sample?.snapshot.stageFocus ?? entry.stage}
            </p>
          </div>
          <div className="rounded-lg border border-line bg-panel p-3">
            <p className="meta-label text-ink-soft">Check size</p>
            <p className="mt-1 text-sm leading-snug text-ink">
              {sample?.snapshot.checkSize ?? entry.checkSize ?? "—"}
            </p>
          </div>
          <div className="rounded-lg border border-line bg-panel p-3">
            <p className="meta-label text-ink-soft">Geography</p>
            <p className="mt-1 text-sm leading-snug text-ink">
              {sample?.snapshot.geography ?? entry.location}
            </p>
          </div>
        </div>

        {/* Signals or knownFor */}
        {sample ? (
          <div>
            <p className="meta-label mb-3 text-ink-soft">Signals they reward</p>
            <ul className="space-y-2">
              {sample.signalsTheyReward.slice(0, 3).map((signal, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-ink-soft">
                  <span className="mt-0.5 shrink-0 text-gold">›</span>
                  {signal}
                </li>
              ))}
            </ul>
            {sample.signalsTheyReward.length > 3 && (
              <p className="mt-2 text-xs text-ink-soft">
                +{sample.signalsTheyReward.length - 3} more in the full dossier
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-ink-soft">{entry.knownFor}</p>
        )}

        {/* CTA */}
        <div className="mt-6 flex flex-wrap gap-3">
          {sample ? (
            <Link
              to={`/research/${entry.slug}`}
              className="meta-label inline-block rounded-md bg-gold px-4 py-2 text-bg transition-opacity hover:opacity-90"
            >
              Open full dossier →
            </Link>
          ) : (
            <Link
              to={`/firm/${entry.slug}`}
              className="meta-label inline-block rounded-md border border-line px-4 py-2 text-ink-soft transition-colors hover:text-ink"
            >
              View firm profile →
            </Link>
          )}
          <Link
            to="/directory"
            className="meta-label inline-block rounded-md border border-line px-4 py-2 text-ink-soft transition-colors hover:text-ink"
          >
            Browse all firms
          </Link>
        </div>
      </div>
    </section>
  );
}
