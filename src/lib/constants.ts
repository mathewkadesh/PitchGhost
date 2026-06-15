/**
 * Slugs for the six firms shipped with a fully pre-generated, hand-checked
 * "Sample dossier". Selecting any of these renders instantly with no
 * network call.
 */
export const SAMPLE_REPORT_SLUGS = [
  "sequoia-capital",
  "a16z",
  "index-ventures",
  "balderton-capital",
  "accel",
  "y-combinator",
] as const;

export type SampleReportSlug = (typeof SAMPLE_REPORT_SLUGS)[number];

export function isSampleSlug(slug: string): slug is SampleReportSlug {
  return (SAMPLE_REPORT_SLUGS as readonly string[]).includes(slug);
}

/**
 * Persistent, quiet disclaimer shown on every dossier. Investors are
 * individuals, not formulas — this honesty is part of the product's
 * credibility, not a liability.
 */
export const VERIFY_DISCLAIMER =
  "This dossier is research assistance generated from public information and may be incomplete or out of date. Verify specifics before relying on them — investors are individuals, not formulas.";
