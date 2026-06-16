/**
 * Shared types for the PitchGhost dossier schema, VC directory, and the
 * research request pipeline.
 */

/** Whether a dossier came back from the static sample set or a live research request. */
export type DossierSource = "sample" | "live";

export interface Source {
  title: string;
  url: string;
}

export type FitLabel = "Likely fit" | "Stretch" | "Mismatch";

export interface FitVerdict {
  label: FitLabel;
  reasoning: string;
}

export interface Snapshot {
  /** One-line read on the firm. */
  summary: string;
  stageFocus: string;
  checkSize: string;
  sectors: string[];
  geography: string;
  /** Present only when the founder supplied a one-line startup description. */
  fit?: FitVerdict;
}

/** A claim with an optional citation, so individual facts can be verified. */
export interface AttributedItem {
  label: string;
  source?: Source;
}

export interface PartnerDossier {
  name: string;
  background: string;
  notableInvestments: AttributedItem[];
  publicWriting: AttributedItem[];
  statedInterests: string[];
  sources: Source[];
}

export interface RecentActivityItem {
  title: string;
  description: string;
  date?: string;
  sources: Source[];
}

export interface FollowUpEmail {
  subject: string;
  body: string;
}

/**
 * The full structured intelligence dossier. All 8 product sections from the
 * spec map onto this shape:
 *  1. snapshot (incl. fit verdict)
 *  2. investmentThesis
 *  3. signalsTheyReward
 *  4. antiPatterns
 *  5. partnerDossier
 *  6. recentActivity
 *  7. questionsToAsk
 *  8. followUpEmail
 */
export interface Dossier {
  firm: string;
  partner?: string;
  startup?: string;
  /** ISO 8601 timestamp of when this dossier was generated. */
  generatedAt: string;
  /** How this specific dossier was produced. "sample" dossiers ship as static JSON. */
  source: DossierSource;
  snapshot: Snapshot;
  investmentThesis: string;
  signalsTheyReward: string[];
  antiPatterns: string[];
  partnerDossier?: PartnerDossier;
  recentActivity: RecentActivityItem[];
  questionsToAsk: string[];
  followUpEmail: FollowUpEmail;
}

export interface VcDirectoryEntry {
  /** URL-safe identifier, also used as the sample report lookup key. */
  slug: string;
  firm: string;
  partner: string;
  location: string;
  region: "US" | "UK/Europe" | "Global";
  stage: string;
  sectors: string[];
  knownFor: string;
  notableInvestments: string[];
  /** Rank (1-8) on the homepage "Trending intelligence targets" leaderboard. */
  trendingRank?: number;
  /** Typical investment size per round (e.g. "$1M–$10M"). */
  checkSize?: string;
  /** Approximate assets under management or latest fund size. */
  aum?: string;
}

export interface TrendingTarget {
  rank: number;
  slug: string;
  firm: string;
  partner: string;
  stage: string;
  sectors: string[];
}

export interface GhostRequestInput {
  firm: string;
  partner?: string;
  startup?: string;
}

export type GhostErrorKind = "rate-limited" | "network" | "config" | "server";

export class GhostError extends Error {
  kind: GhostErrorKind;

  constructor(kind: GhostErrorKind, message: string) {
    super(message);
    this.kind = kind;
    this.name = "GhostError";
  }
}

export interface GhostResult {
  dossier: Dossier;
  /** Whether this came back from the static sample set or a live research request. */
  source: DossierSource;
}
