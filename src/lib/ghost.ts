import { getSampleReport } from "../data/sampleReports";
import { vcDirectory } from "../data/vcDirectory";
import { isSampleSlug } from "./constants";
import {
  Dossier,
  DossierSource,
  GhostError,
  GhostRequestInput,
  GhostResult,
} from "./types";

function findSampleSlug(firm: string): string | undefined {
  const normalized = firm.trim().toLowerCase();
  const entry = vcDirectory.find(
    (e) =>
      isSampleSlug(e.slug) &&
      (e.firm.toLowerCase() === normalized || e.slug.toLowerCase() === normalized),
  );
  return entry?.slug;
}

/**
 * Runs a research request. Firms with a hand-built sample dossier render
 * instantly with no network call; everything else goes to the live research
 * worker.
 */
export async function runGhost(input: GhostRequestInput): Promise<GhostResult> {
  const slug = input.firm ? findSampleSlug(input.firm) : undefined;
  const sample = slug ? getSampleReport(slug) : undefined;

  if (sample) {
    return {
      dossier: { ...sample, startup: input.startup || sample.startup },
      source: "sample",
    };
  }

  return runLive(input);
}

async function runLive(input: GhostRequestInput): Promise<GhostResult> {
  const base = import.meta.env.VITE_GHOST_API_URL;
  if (!base) {
    throw new GhostError(
      "config",
      `Live research isn't configured for this deployment yet. Try one of the sample dossiers on the homepage, or browse the directory for "${input.firm}".`,
    );
  }

  let response: Response;
  try {
    response = await fetch(`${base.replace(/\/$/, "")}/ghost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    throw new GhostError(
      "network",
      "Couldn't reach the PitchGhost research service. Check your connection and try again.",
    );
  }

  if (response.status === 429) {
    throw new GhostError(
      "rate-limited",
      "You've hit today's research limit. Try again tomorrow, or explore a sample dossier in the meantime.",
    );
  }

  if (!response.ok) {
    throw new GhostError(
      "server",
      "The research service hit an error generating this dossier. Please try again in a moment.",
    );
  }

  const data = (await response.json()) as Partial<Dossier>;
  return { dossier: normalizeDossier(data, input, "live"), source: "live" };
}

function normalizeDossier(data: Partial<Dossier>, input: GhostRequestInput, source: DossierSource): Dossier {
  return {
    firm: input.firm,
    partner: input.partner ?? data.partner,
    startup: input.startup,
    generatedAt: new Date().toISOString(),
    source,
    snapshot: data.snapshot ?? {
      summary: "",
      stageFocus: "",
      checkSize: "",
      sectors: [],
      geography: "",
    },
    investmentThesis: data.investmentThesis ?? "",
    signalsTheyReward: data.signalsTheyReward ?? [],
    antiPatterns: data.antiPatterns ?? [],
    partnerDossier: data.partnerDossier,
    recentActivity: data.recentActivity ?? [],
    questionsToAsk: data.questionsToAsk ?? [],
    followUpEmail: data.followUpEmail ?? { subject: "", body: "" },
  };
}
