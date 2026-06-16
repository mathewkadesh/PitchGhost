import type { VcDirectoryEntry } from "../lib/types";

function slugHash(slug: string): number {
  return Math.abs(slug.split("").reduce((a, c) => ((a * 31 + c.charCodeAt(0)) | 0), 0));
}

// How focused the thesis is — richer knownFor + fewer sectors = higher clarity
function thesisScore(v: VcDirectoryEntry): number {
  const words = v.knownFor.split(/\s+/).length;
  const base = Math.min(90, 46 + words * 2);
  const focusBonus = Math.max(0, 4 - v.sectors.length) * 4;
  const trendBonus = v.trendingRank ? 5 : 0;
  return Math.min(97, base + focusBonus + trendBonus);
}

// Stage focus — tighter stage range = higher score
const STAGE_SCORES: Record<string, number> = {
  "Pre-seed": 96,
  "Pre-seed – Seed": 91,
  "Pre-seed – Series A": 86,
  "Seed – Series A": 84,
  "Seed – Series B": 78,
  "Seed – Series C": 74,
  "Seed – Growth": 68,
  "Series A": 88,
  "Series A – D": 72,
  "Series A – Growth": 62,
  "Series B – Growth": 56,
  Growth: 58,
};

function stageScore(v: VcDirectoryEntry): number {
  return STAGE_SCORES[v.stage] ?? 70;
}

// Sector breadth — more sectors = broader coverage
function sectorScore(v: VcDirectoryEntry): number {
  return Math.min(95, v.sectors.length * 14 + 18);
}

// Partner prominence — trending rank + data richness
function partnerScore(v: VcDirectoryEntry): number {
  if (v.trendingRank) return Math.max(82, 98 - (v.trendingRank - 1) * 3);
  return 58 + (slugHash(v.slug) % 22);
}

// Check size clarity — specific range = higher score
function checkScore(v: VcDirectoryEntry): number {
  if (!v.checkSize) return 42;
  return v.checkSize.includes("–") ? 88 : 76;
}

const BARS = [
  { key: "thesis",  label: "Thesis alignment", fn: thesisScore  },
  { key: "stage",   label: "Stage fit",         fn: stageScore  },
  { key: "sector",  label: "Sector match",      fn: sectorScore },
  { key: "partner", label: "Partner focus",     fn: partnerScore },
  { key: "check",   label: "Check size",        fn: checkScore  },
] as const;

function getVerdict(avg: number): { label: string; cls: string } {
  if (avg >= 83) return { label: "Top-tier target",   cls: "text-ok"       };
  if (avg >= 72) return { label: "Strong signal",     cls: "text-gold"     };
  if (avg >= 60) return { label: "Moderate profile",  cls: "text-ink-soft" };
  return              { label: "Niche specialist",   cls: "text-ink-soft" };
}

interface Props {
  entry: VcDirectoryEntry;
}

export default function PitchConfidenceIndex({ entry }: Props) {
  const bars = BARS.map((b) => ({ key: b.key, label: b.label, val: b.fn(entry) }));
  const avg = Math.round(bars.reduce((s, b) => s + b.val, 0) / bars.length);
  const verdict = getVerdict(avg);

  return (
    <div className="rounded-xl border border-line bg-panel/80 p-5 backdrop-blur-sm">
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="meta-label text-gold">Pitch confidence index</p>
        <span className="meta-label rounded-full border border-line px-2 py-0.5 text-ink-soft">
          {entry.region}
        </span>
      </div>
      <p className="mb-4 font-display text-lg text-ink">{entry.firm}</p>

      <div className="space-y-3">
        {bars.map((b) => (
          <div key={b.key}>
            <div className="mb-1 flex items-center justify-between">
              <span className="meta-label text-ink-soft">{b.label}</span>
              <span className="meta-label text-gold">{b.val}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gold transition-all duration-700 ease-out"
                style={{ width: `${b.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div>
          <span className="meta-label text-ink-soft block">Overall verdict</span>
          <span className={`meta-label ${verdict.cls}`}>{verdict.label}</span>
        </div>
        <div className="text-right">
          <span className="block font-mono text-3xl leading-none text-gold">{avg}</span>
          <span className="meta-label text-ink-soft">/ 100</span>
        </div>
      </div>
    </div>
  );
}
