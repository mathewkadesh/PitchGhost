import { lazy, Suspense, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import SectorIcon from "../components/SectorIcon";
import VcRow from "../components/VcRow";
import { regionOptions, sectorOptions, vcDirectory } from "../data/vcDirectory";

// Lazy-loaded: pulls in recharts, which is sizeable and only needed on this page.
const DirectoryStats = lazy(() => import("../components/DirectoryStats"));

const STAGE_ORDER = ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Growth"];

function stageRange(stage: string): [number, number] {
  const found = STAGE_ORDER.map((s, i) => (stage.includes(s) ? i : -1)).filter((i) => i >= 0);
  if (!found.length) return [0, STAGE_ORDER.length - 1];
  return [Math.min(...found), Math.max(...found)];
}

function matchesStage(entryStage: string, selected: string): boolean {
  if (selected === "All") return true;
  const idx = STAGE_ORDER.indexOf(selected);
  const [min, max] = stageRange(entryStage);
  return idx >= min && idx <= max;
}

export default function Directory() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [stage, setStage] = useState("All");
  const [sectors, setSectors] = useState<string[]>([]);

  function toggleSector(sector: string) {
    setSectors((prev) => (prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]));
  }

  function clearFilters() {
    setQuery("");
    setRegion("All");
    setStage("All");
    setSectors([]);
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vcDirectory.filter((entry) => {
      if (region !== "All" && entry.region !== region) return false;
      if (!matchesStage(entry.stage, stage)) return false;
      if (sectors.length && !sectors.some((s) => entry.sectors.includes(s))) return false;
      if (q && !`${entry.firm} ${entry.partner} ${entry.location}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, region, stage, sectors]);

  const hasFilters = query || region !== "All" || stage !== "All" || sectors.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="meta-label text-gold">Directory</p>
      <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">VC directory</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        {vcDirectory.length} firms, filterable by sector, stage, and region — this page works fully
        offline. Firms marked "Sample" also have a hand-built dossier you can open instantly; the rest
        are illustrative entries you can research live.
      </p>

      <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-md border border-line bg-panel/40" />}>
        <DirectoryStats />
      </Suspense>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <label className="flex flex-col gap-2">
          <span className="meta-label text-ink-soft">Search</span>
          <div className="relative">
            <LuSearch
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Firm, partner, or location"
              className="w-full rounded-md border border-line bg-panel px-3 py-2 pl-9 text-ink placeholder:text-ink-soft/60 focus-visible:border-gold"
            />
          </div>
        </label>

        <div className="flex gap-4">
          <label className="flex flex-1 flex-col gap-2">
            <span className="meta-label text-ink-soft">Region</span>
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="rounded-md border border-line bg-panel px-3 py-2 text-ink focus-visible:border-gold"
            >
              <option>All</option>
              {regionOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-1 flex-col gap-2">
            <span className="meta-label text-ink-soft">Stage</span>
            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              className="rounded-md border border-line bg-panel px-3 py-2 text-ink focus-visible:border-gold"
            >
              <option>All</option>
              {STAGE_ORDER.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="meta-label text-ink-soft">Sector</span>
        {sectorOptions.map((sector) => {
          const active = sectors.includes(sector);
          return (
            <button
              key={sector}
              type="button"
              onClick={() => toggleSector(sector)}
              aria-pressed={active}
              className={`meta-label inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors ${
                active ? "border-gold text-gold" : "border-line text-ink-soft hover:text-ink"
              }`}
            >
              <SectorIcon sector={sector} className="h-3.5 w-3.5" />
              {sector}
            </button>
          );
        })}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="meta-label ml-2 text-ink-soft underline decoration-line hover:text-ink"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="meta-label mt-8 text-ink-soft">
        {results.length} {results.length === 1 ? "firm" : "firms"}
      </p>

      <div className="mt-2">
        {results.map((entry, index) => (
          <VcRow
            key={entry.slug}
            slug={entry.slug}
            firm={entry.firm}
            partner={entry.partner}
            stage={entry.stage}
            sectors={entry.sectors}
            location={entry.location}
            knownFor={entry.knownFor}
            index={index}
          />
        ))}
        {results.length === 0 && (
          <p className="border-b border-line py-8 text-ink-soft">No firms match those filters.</p>
        )}
      </div>
    </div>
  );
}
