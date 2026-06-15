import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isSampleSlug } from "../lib/constants";
import { vcDirectory } from "../data/vcDirectory";

const QUICK_FILL = vcDirectory.filter((entry) => isSampleSlug(entry.slug));

export default function ResearchPanel() {
  const navigate = useNavigate();
  const [firm, setFirm] = useState("");
  const [partner, setPartner] = useState("");
  const [startup, setStartup] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!firm.trim()) return;

    navigate("/research/custom", {
      state: {
        input: {
          firm: firm.trim(),
          partner: partner.trim() || undefined,
          startup: startup.trim() || undefined,
        },
      },
    });
  }

  return (
    <section id="research" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="meta-label text-gold">Research panel</p>
        <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Generate a dossier</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Enter any VC firm — sample dossiers for the firms below render instantly with no network call;
          everything else runs fresh research with web search.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:max-w-xl">
          <label className="flex flex-col gap-2">
            <span className="meta-label text-ink-soft">Firm *</span>
            <input
              required
              value={firm}
              onChange={(event) => setFirm(event.target.value)}
              placeholder="e.g. Sequoia Capital"
              className="rounded-md border border-line bg-panel px-3 py-2 text-ink placeholder:text-ink-soft/60 focus-visible:border-gold"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="meta-label text-ink-soft">Partner (optional)</span>
            <input
              value={partner}
              onChange={(event) => setPartner(event.target.value)}
              placeholder="e.g. Pat Grady"
              className="rounded-md border border-line bg-panel px-3 py-2 text-ink placeholder:text-ink-soft/60 focus-visible:border-gold"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="meta-label text-ink-soft">What you're building (optional)</span>
            <textarea
              value={startup}
              onChange={(event) => setStartup(event.target.value)}
              placeholder="One sentence — used for the fit verdict."
              rows={2}
              className="rounded-md border border-line bg-panel px-3 py-2 text-ink placeholder:text-ink-soft/60 focus-visible:border-gold"
            />
          </label>

          <button
            type="submit"
            className="meta-label mt-2 w-fit rounded-md bg-gold px-5 py-3 text-bg transition-opacity hover:opacity-90"
          >
            Generate dossier →
          </button>
        </form>

        <div className="mt-8 flex flex-wrap gap-2">
          <span className="meta-label text-ink-soft">Try:</span>
          {QUICK_FILL.map((entry) => (
            <button
              key={entry.slug}
              type="button"
              onClick={() => setFirm(entry.firm)}
              className="meta-label rounded-full border border-line px-3 py-1 text-ink-soft transition-colors hover:border-gold hover:text-gold"
            >
              {entry.firm}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
