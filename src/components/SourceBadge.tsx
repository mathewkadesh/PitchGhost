import type { DossierSource } from "../lib/types";

const SOURCE_LABEL: Record<DossierSource, string> = {
  sample: "Sample dossier",
  live: "Live research",
};

const SOURCE_CLASS: Record<DossierSource, string> = {
  sample: "border-line text-ink-soft",
  live: "border-ok text-ok",
};

export default function SourceBadge({ source }: { source: DossierSource }) {
  return (
    <span
      className={`meta-label inline-flex items-center gap-2 rounded-full border px-3 py-1 ${SOURCE_CLASS[source]}`}
    >
      <span aria-hidden="true">●</span>
      {SOURCE_LABEL[source]}
    </span>
  );
}
