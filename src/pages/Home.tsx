import { useState } from "react";
import DossierPreview from "../components/DossierPreview";
import Hero from "../components/Hero";
import HomeSidebar from "../components/HomeSidebar";
import ResearchPanel from "../components/ResearchPanel";
import StatsStrip from "../components/StatsStrip";
import VcRow from "../components/VcRow";
import { fundingTickerItems, getDirectoryEntry, getTrendingTargets } from "../data/vcDirectory";
import type { VcDirectoryEntry } from "../lib/types";

export default function Home() {
  const trending = getTrendingTargets();

  // Hydrate each trending target into its full VcDirectoryEntry so we can
  // pass rich data to the PCI panel and dossier preview.
  const trendingEntries: VcDirectoryEntry[] = trending
    .map((t) => getDirectoryEntry(t.slug))
    .filter((e): e is VcDirectoryEntry => e !== undefined);

  const [activeFirm, setActiveFirm] = useState<VcDirectoryEntry>(trendingEntries[0]);

  return (
    <>
      {/* Hero — full width, PCI panel on the right reacts to activeFirm */}
      <Hero activeFirm={activeFirm} />

      {/* Stats strip — full width */}
      <StatsStrip />

      {/* Two-column layout: main content left, sidebar right */}
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_320px] lg:items-start">

        {/* ── Left column ── */}
        <div className="min-w-0 lg:border-r lg:border-line">

          {/* Funding-topic ticker */}
          <div className="border-b border-line bg-panel/40">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                <span className="meta-label text-ink-soft">Tracking:</span>
                {fundingTickerItems.map((item) => (
                  <span
                    key={item}
                    className="meta-label rounded-full border border-line px-3 py-1 text-ink-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trending leaderboard */}
          <div className="border-b border-line px-4 py-12 sm:px-6">
            <p className="meta-label text-gold">Leaderboard</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Trending intelligence targets
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              The firms founders are researching most this cycle. Hover a row to update the
              confidence panel — click to open the full dossier.
            </p>

            <div className="mt-8">
              {trendingEntries.map((entry, index) => (
                <div
                  key={entry.slug}
                  onMouseEnter={() => setActiveFirm(entry)}
                  onFocus={() => setActiveFirm(entry)}
                  className={`rounded-sm transition-colors ${
                    activeFirm.slug === entry.slug ? "bg-panel/60" : ""
                  }`}
                >
                  <VcRow
                    slug={entry.slug}
                    firm={entry.firm}
                    partner={entry.partner}
                    stage={entry.stage}
                    sectors={entry.sectors}
                    rank={entry.trendingRank}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dossier preview — updates with activeFirm */}
          <DossierPreview entry={activeFirm} />
        </div>

        {/* ── Right sidebar ── */}
        <aside className="border-t border-line lg:sticky lg:top-16 lg:border-t-0 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <HomeSidebar />
        </aside>
      </div>

      {/* Research panel — full width below */}
      <ResearchPanel />
    </>
  );
}
