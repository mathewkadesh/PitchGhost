/**
 * Curated 2-4 letter "marks" for directory firms, styled like an ink-stamp
 * seal. Keyed by `slug` from `vcDirectory`. Firms not in the map (e.g.
 * custom live-research dossiers) fall back to `deriveMark`.
 */
const FIRM_MARKS: Record<string, string> = {
  "sequoia-capital": "SQ",
  a16z: "a16z",
  "index-ventures": "IV",
  "balderton-capital": "BC",
  accel: "AC",
  "y-combinator": "YC",
  "general-catalyst": "GC",
  lightspeed: "LS",
  "20vc": "20VC",
  seedcamp: "SC",
  conviction: "CV",
  "forerunner-ventures": "FV",
  northzone: "NZ",
  "founders-fund": "FF",
};

const MARK_STOPWORDS = new Set(["the", "of", "and", "ventures", "capital", "partners", "fund"]);

function deriveMark(firm: string): string {
  const cleaned = firm.replace(/\(.*?\)/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  const significant = words.filter((word) => !MARK_STOPWORDS.has(word.toLowerCase()));
  const pool = significant.length ? significant : words;
  if (pool.length === 1) return pool[0].slice(0, 2).toUpperCase();
  return pool
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

interface FirmMarkProps {
  firm: string;
  slug?: string;
  className?: string;
}

/** Deterministic small hash so each firm gets a stable, repeatable accent. */
function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** Stamped-seal style monogram badge for a VC firm, used in lieu of real logos. */
export default function FirmMark({ firm, slug, className = "" }: FirmMarkProps) {
  const label = (slug && FIRM_MARKS[slug]) || deriveMark(firm);
  // Subtle per-firm hue-rotate so dozens of gold badges don't look identical.
  const hueRotate = (hashString(slug || firm) % 41) - 20;

  return (
    <span
      aria-hidden="true"
      style={{ filter: hueRotate ? `hue-rotate(${hueRotate}deg)` : undefined }}
      className={`meta-label inline-flex shrink-0 -rotate-3 items-center justify-center rounded-md border border-gold/40 bg-panel text-center leading-none text-gold transition-transform duration-300 ease-out group-hover:rotate-0 group-hover:scale-105 ${className}`}
    >
      {label}
    </span>
  );
}
