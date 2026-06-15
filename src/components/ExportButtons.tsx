import { useState } from "react";
import { LuCheck, LuCopy, LuDownload } from "react-icons/lu";
import { copyDossierAsMarkdown, exportDossierAsPdf } from "../lib/export";
import type { Dossier } from "../lib/types";

export default function ExportButtons({ dossier }: { dossier: Dossier }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyDossierAsMarkdown(dossier);
    setCopied(ok);
    if (ok) window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="no-print flex gap-2">
      <button
        type="button"
        onClick={() => exportDossierAsPdf(dossier)}
        className="meta-label inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-ink-soft transition-colors hover:text-ink"
      >
        <LuDownload className="h-3.5 w-3.5" aria-hidden="true" />
        Export PDF
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="meta-label inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-ink-soft transition-colors hover:text-ink"
      >
        {copied ? (
          <LuCheck className="h-3.5 w-3.5 text-ok" aria-hidden="true" />
        ) : (
          <LuCopy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span aria-live="polite">{copied ? "Copied!" : "Copy as Markdown"}</span>
      </button>
    </div>
  );
}
