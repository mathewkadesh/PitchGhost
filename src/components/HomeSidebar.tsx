import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { vcDirectory, sectorOptions } from "../data/vcDirectory";

// ── Stage distribution ──────────────────────────────────────────────────────

function computeStageData() {
  let early = 0, mid = 0, late = 0;
  for (const v of vcDirectory) {
    const s = v.stage;
    if (/pre-seed/i.test(s) || s === "Seed – Series A" || s === "Series A") {
      early++;
    } else if (/growth/i.test(s) && !/^seed/i.test(s)) {
      late++;
    } else {
      mid++;
    }
  }
  return [
    { label: "Early stage",  count: early, color: "#C9A24B" },
    { label: "Mid stage",    count: mid,   color: "#7A5E2A" },
    { label: "Growth",       count: late,  color: "#3D2E13" },
  ];
}

function DonutChart({ data }: { data: Array<{ label: string; count: number; color: string }> }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  const R = 36, cx = 48, cy = 48;
  const C = 2 * Math.PI * R;
  let cumFrac = 0;

  return (
    <div className="flex items-center gap-4">
      <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
        {/* background ring */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--color-line)" strokeWidth="14" />
        {data.map((d, i) => {
          const frac = d.count / total;
          const segment = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${frac * C} ${C}`}
              strokeDashoffset={C * (1 - cumFrac)}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          );
          cumFrac += frac;
          return segment;
        })}
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          fill="var(--color-ink)"
          fontFamily="var(--font-mono, monospace)"
        >
          {total}
        </text>
      </svg>

      <div className="space-y-1.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ background: d.color }}
            />
            <span className="meta-label text-ink-soft">{d.label}</span>
            <span className="meta-label ml-auto pl-3 text-ink">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Region breakdown ────────────────────────────────────────────────────────

function computeRegionData() {
  const counts: Record<string, number> = {};
  for (const v of vcDirectory) {
    counts[v.region] = (counts[v.region] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));
}

function RegionBars({ data }: { data: Array<{ label: string; count: number }> }) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between">
            <span className="meta-label text-ink-soft">{d.label}</span>
            <span className="meta-label text-ink">{d.count}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-gold"
              style={{ width: `${(d.count / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Sector bubble cloud ─────────────────────────────────────────────────────

function computeSectorData() {
  return [...sectorOptions]
    .map((s) => ({
      label: s,
      count: vcDirectory.filter((v) => v.sectors.includes(s)).length,
    }))
    .sort((a, b) => b.count - a.count);
}

function SectorBubbles({ data }: { data: Array<{ label: string; count: number }> }) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="flex flex-wrap gap-2">
      {data.map((d) => {
        const intensity = 0.35 + (d.count / max) * 0.65;
        return (
          <span
            key={d.label}
            className="meta-label rounded-full border px-2.5 py-1"
            style={{
              borderColor: `rgba(201, 162, 75, ${intensity})`,
              color: `rgba(201, 162, 75, ${intensity})`,
            }}
          >
            {d.label}
            <span className="ml-1.5 opacity-70">{d.count}</span>
          </span>
        );
      })}
    </div>
  );
}

// ── Quick research ──────────────────────────────────────────────────────────

function QuickResearch() {
  const navigate = useNavigate();
  const [firm, setFirm] = useState("");
  const [partner, setPartner] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!firm.trim()) return;
    navigate("/research/custom", {
      state: { input: { firm: firm.trim(), partner: partner.trim() || undefined } },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <input
        required
        value={firm}
        onChange={(e) => setFirm(e.target.value)}
        placeholder="Firm name *"
        className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus-visible:border-gold focus-visible:outline-none"
      />
      <input
        value={partner}
        onChange={(e) => setPartner(e.target.value)}
        placeholder="Partner (optional)"
        className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus-visible:border-gold focus-visible:outline-none"
      />
      <button
        type="submit"
        className="meta-label w-full rounded-md bg-gold py-2.5 text-bg transition-opacity hover:opacity-90"
      >
        Ghost this VC →
      </button>
    </form>
  );
}

// ── Main sidebar ────────────────────────────────────────────────────────────

const stageData  = computeStageData();
const regionData = computeRegionData();
const sectorData = computeSectorData();

export default function HomeSidebar() {
  return (
    <div className="divide-y divide-line">
      {/* Stage distribution */}
      <div className="px-5 py-6">
        <p className="meta-label mb-4 text-gold">Stage distribution</p>
        <DonutChart data={stageData} />
      </div>

      {/* Region breakdown */}
      <div className="px-5 py-6">
        <p className="meta-label mb-4 text-gold">Region breakdown</p>
        <RegionBars data={regionData} />

        {/* Hot-sector bubble cloud */}
        <p className="meta-label mb-3 mt-6 text-gold">Hot sectors</p>
        <SectorBubbles data={sectorData} />
      </div>

      {/* Quick research */}
      <div className="px-5 py-6">
        <p className="meta-label mb-1 text-gold">Quick research</p>
        <p className="mb-4 text-xs text-ink-soft">Run a live dossier on any firm.</p>
        <QuickResearch />
      </div>
    </div>
  );
}
