import type { TrendingTarget, VcDirectoryEntry } from "../lib/types";
import vcDirectoryData from "./vcDirectory.json";

/**
 * Static VC directory. Works fully offline — this is the baseline value
 * every visitor gets even before generating a single dossier. Entries whose
 * slug is in `SAMPLE_REPORT_SLUGS` have a fully pre-generated sample dossier
 * in `sampleReports.ts`; the rest are an illustrative cross-section of
 * well-known VC firms used to research with live results.
 */
export const vcDirectory: VcDirectoryEntry[] = vcDirectoryData as unknown as VcDirectoryEntry[];

export const sectorOptions = [
  "AI/ML",
  "Fintech",
  "SaaS",
  "Consumer",
  "Deep Tech",
  "Health",
  "Climate",
  "Crypto",
  "Gaming",
] as const;

export const regionOptions = ["US", "UK/Europe", "Global"] as const;

export const stageOptions = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Growth",
] as const;

/**
 * The homepage "Trending intelligence targets" leaderboard, derived from
 * `vcDirectory` entries that carry a `trendingRank`.
 */
export function getTrendingTargets(): TrendingTarget[] {
  return vcDirectory
    .filter((entry): entry is VcDirectoryEntry & { trendingRank: number } =>
      typeof entry.trendingRank === "number",
    )
    .sort((a, b) => a.trendingRank - b.trendingRank)
    .map((entry) => ({
      rank: entry.trendingRank,
      slug: entry.slug,
      firm: entry.firm,
      partner: entry.partner,
      stage: entry.stage,
      sectors: entry.sectors,
    }));
}

export function getDirectoryEntry(slug: string): VcDirectoryEntry | undefined {
  return vcDirectory.find((entry) => entry.slug === slug);
}

export const fundingTickerItems = [
  "AI Infrastructure",
  "European Fintech",
  "Defence Tech",
  "Climate Hardware",
  "Foundation Models",
  "Vertical SaaS",
  "B2B Marketplaces",
  "AI Agents",
  "Cybersecurity",
  "Digital Health",
  "Creator Economy",
  "Supply Chain AI",
];
