import type { FitLabel } from "../lib/types";

/** Illustrative fill level per verdict — these are presentation only, not a precision score. */
const FIT_VALUE: Record<FitLabel, number> = {
  "Likely fit": 88,
  Stretch: 55,
  Mismatch: 20,
};

const FIT_COLOR: Record<FitLabel, string> = {
  "Likely fit": "var(--color-ok)",
  Stretch: "var(--color-gold)",
  Mismatch: "var(--color-warn)",
};

const SIZE = 56;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Small radial gauge that mirrors the fit verdict's colour. */
export default function FitGauge({ label }: { label: FitLabel }) {
  const value = FIT_VALUE[label];
  const offset = CIRCUMFERENCE * (1 - value / 100);
  const color = FIT_COLOR[label];

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-14 w-14 shrink-0"
      role="img"
      aria-label={`Fit gauge: ${label}`}
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={STROKE}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill="var(--color-ink)"
      >
        {value}
      </text>
    </svg>
  );
}
