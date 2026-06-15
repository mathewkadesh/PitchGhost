import type { ReactNode } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { vcDirectory } from "../data/vcDirectory";
import { VERIFY_DISCLAIMER } from "../lib/constants";
import type { AttributedItem, Dossier as DossierData, FitLabel, Source } from "../lib/types";
import ExportButtons from "./ExportButtons";
import FirmMark from "./FirmMark";
import FitGauge from "./FitGauge";
import SectorIcon from "./SectorIcon";
import SourceBadge from "./SourceBadge";

const FIT_STYLES: Record<FitLabel, string> = {
  "Likely fit": "border-ok text-ok",
  Stretch: "border-gold text-gold",
  Mismatch: "border-warn text-warn",
};

function Section({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <section className="scan-reveal border-b border-line py-8" style={{ animationDelay: `${index * 60}ms` }}>
      <p className="meta-label text-gold">{String(index + 1).padStart(2, "0")}</p>
      <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="meta-label text-ink-soft">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}

function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
      {sources.map((source) => (
        <li key={source.url}>
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="meta-label inline-flex items-center gap-1 text-gold underline decoration-line hover:decoration-gold"
          >
            {source.title}
            <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function AttributedList({ title, items }: { title: string; items: AttributedItem[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-4">
      <p className="meta-label text-ink-soft">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item.label} className="text-ink">
            {item.label}
            {item.source && (
              <a
                href={item.source.url}
                target="_blank"
                rel="noreferrer"
                className="meta-label ml-2 inline-flex items-center gap-1 text-gold underline decoration-line hover:decoration-gold"
              >
                source
                <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dossier({ dossier }: { dossier: DossierData }) {
  const pd = dossier.partnerDossier;
  const directoryEntry = vcDirectory.find((entry) => entry.firm.toLowerCase() === dossier.firm.toLowerCase());

  return (
    <div className="print-area mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="border-b border-line pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SourceBadge source={dossier.source} />
          <ExportButtons dossier={dossier} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <FirmMark
            firm={dossier.firm}
            slug={directoryEntry?.slug}
            className="h-14 w-14 text-sm sm:h-16 sm:w-16 sm:text-base"
          />
          <div>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">{dossier.firm}</h1>
            {dossier.partner && <p className="mt-2 text-lg text-ink-soft">{dossier.partner}</p>}
          </div>
        </div>
        {dossier.startup && <p className="mt-1 text-sm text-ink-soft">Prepared for: {dossier.startup}</p>}
        <p className="meta-label mt-4 text-ink-soft">
          Generated {new Date(dossier.generatedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </header>

      <Section index={0} title="Snapshot">
        <p className="text-ink">{dossier.snapshot.summary}</p>
        <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Meta label="Stage focus" value={dossier.snapshot.stageFocus} />
          <Meta label="Check size" value={dossier.snapshot.checkSize} />
          <Meta label="Geography" value={dossier.snapshot.geography} />
          <div className="col-span-2 sm:col-span-4">
            <dt className="meta-label text-ink-soft">Sectors</dt>
            <dd className="mt-1.5 flex flex-wrap gap-2">
              {dossier.snapshot.sectors.map((sector) => (
                <span
                  key={sector}
                  className="meta-label inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-ink-soft"
                >
                  <SectorIcon sector={sector} className="h-3.5 w-3.5" />
                  {sector}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        {dossier.snapshot.fit && (
          <div className={`mt-4 flex items-center gap-4 rounded-md border px-4 py-3 ${FIT_STYLES[dossier.snapshot.fit.label]}`}>
            <FitGauge label={dossier.snapshot.fit.label} />
            <div>
              <p className="meta-label">Fit verdict — {dossier.snapshot.fit.label}</p>
              <p className="mt-1 text-sm text-ink">{dossier.snapshot.fit.reasoning}</p>
            </div>
          </div>
        )}
      </Section>

      <Section index={1} title="Investment thesis">
        <p className="text-ink">{dossier.investmentThesis}</p>
      </Section>

      <Section index={2} title="Signals they reward">
        <ul className="space-y-2">
          {dossier.signalsTheyReward.map((item) => (
            <li key={item} className="flex gap-3 text-ink">
              <span className="mt-0.5 text-ok" aria-hidden="true">
                +
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section index={3} title="Anti-patterns">
        <ul className="space-y-2">
          {dossier.antiPatterns.map((item) => (
            <li key={item} className="flex gap-3 text-ink">
              <span className="mt-0.5 text-warn" aria-hidden="true">
                −
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {pd && (
        <Section index={4} title="Partner dossier">
          <h3 className="font-display text-2xl text-ink">{pd.name}</h3>
          <p className="mt-2 text-ink">{pd.background}</p>
          <p className="mt-4 rounded-md border border-line bg-panel px-4 py-3 text-sm text-ink-soft">
            {VERIFY_DISCLAIMER}
          </p>
          <AttributedList title="Notable investments" items={pd.notableInvestments} />
          <AttributedList title="Public writing" items={pd.publicWriting} />
          {pd.statedInterests.length > 0 && (
            <div className="mt-4">
              <p className="meta-label text-ink-soft">Stated interests</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {pd.statedInterests.map((interest) => (
                  <li key={interest} className="meta-label rounded-full border border-line px-3 py-1 text-ink-soft">
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-4">
            <p className="meta-label text-ink-soft">Sources</p>
            <Sources sources={pd.sources} />
          </div>
        </Section>
      )}

      <Section index={pd ? 5 : 4} title="Recent activity">
        <div className="space-y-6">
          {dossier.recentActivity.map((item) => (
            <article key={item.title} className="border-b border-line pb-6 last:border-0 last:pb-0">
              <h4 className="font-display text-lg text-ink">
                {item.title}
                {item.date && <span className="ml-2 text-sm text-ink-soft">{item.date}</span>}
              </h4>
              <p className="mt-1 text-ink-soft">{item.description}</p>
              <Sources sources={item.sources} />
            </article>
          ))}
        </div>
      </Section>

      <Section index={pd ? 6 : 5} title="Questions to ask in the room">
        <ol className="list-inside list-decimal space-y-2">
          {dossier.questionsToAsk.map((question) => (
            <li key={question} className="text-ink">
              {question}
            </li>
          ))}
        </ol>
      </Section>

      <Section index={pd ? 7 : 6} title="Follow-up email draft">
        <div className="rounded-md border border-line bg-panel p-4">
          <p className="meta-label text-ink-soft">Subject</p>
          <p className="mt-1 text-ink">{dossier.followUpEmail.subject}</p>
          <p className="meta-label mt-4 text-ink-soft">Body</p>
          <p className="mt-1 whitespace-pre-line text-ink">{dossier.followUpEmail.body}</p>
        </div>
      </Section>
    </div>
  );
}
