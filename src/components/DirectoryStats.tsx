import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { sectorOptions, stageOptions, vcDirectory } from "../data/vcDirectory";

const TOOLTIP_STYLE = {
  background: "var(--color-panel)",
  border: "1px solid var(--color-line)",
  borderRadius: 6,
  fontFamily: "var(--font-mono)",
  fontSize: 11,
};

const AXIS_TICK = {
  fill: "var(--color-ink-soft)",
  fontSize: 11,
  fontFamily: "var(--font-mono)",
};

/** Small sector + stage distribution charts for the full directory dataset. */
export default function DirectoryStats() {
  const sectorData = useMemo(
    () =>
      sectorOptions.map((sector) => ({
        name: sector,
        count: vcDirectory.filter((entry) => entry.sectors.includes(sector)).length,
      })),
    [],
  );

  const stageData = useMemo(
    () =>
      stageOptions.map((stage) => ({
        name: stage,
        count: vcDirectory.filter((entry) => entry.stage.includes(stage)).length,
      })),
    [],
  );

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2">
      <div className="rounded-md border border-line p-4">
        <p className="meta-label text-ink-soft">Firms by sector</p>
        <div className="mt-3 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <XAxis type="number" hide allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={72}
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "var(--color-line)" }}
                contentStyle={TOOLTIP_STYLE}
                labelStyle={{ color: "var(--color-ink)" }}
                itemStyle={{ color: "var(--color-gold)" }}
                formatter={(value) => [`${value} firms`, ""]}
              />
              <Bar dataKey="count" fill="var(--color-gold)" radius={[0, 4, 4, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-md border border-line p-4">
        <p className="meta-label text-ink-soft">Firms by stage focus</p>
        <div className="mt-3 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageData} margin={{ top: 0, right: 8, bottom: 24, left: -24 }}>
              <XAxis
                dataKey="name"
                tick={AXIS_TICK}
                axisLine={{ stroke: "var(--color-line)" }}
                tickLine={false}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={48}
              />
              <YAxis hide allowDecimals={false} />
              <Tooltip
                cursor={{ fill: "var(--color-line)" }}
                contentStyle={TOOLTIP_STYLE}
                labelStyle={{ color: "var(--color-ink)" }}
                itemStyle={{ color: "var(--color-gold)" }}
                formatter={(value) => [`${value} firms`, ""]}
              />
              <Bar dataKey="count" fill="var(--color-gold)" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
