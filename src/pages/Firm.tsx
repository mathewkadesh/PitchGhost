import { Link, useParams } from "react-router-dom";
import FirmLogo from "../components/FirmLogo";
import { vcDirectory } from "../data/vcDirectory";
import { isSampleSlug } from "../lib/constants";

export default function Firm() {
  const { slug } = useParams<{ slug: string }>();
  const v = vcDirectory.find((x) => x.slug === slug);

  if (!v) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-ink-soft">That firm isn't in the directory.</p>
        <Link to="/directory" className="mt-4 inline-block underline text-gold">
          Back to the directory
        </Link>
      </main>
    );
  }

  const hasDossier = isSampleSlug(v.slug);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link to="/directory" className="meta-label text-ink-soft hover:text-ink">
        ← Directory
      </Link>

      <header className="mt-6 flex items-start gap-4">
        <FirmLogo slug={v.slug} firm={v.firm} size={64} />
        <div>
          <h1 className="font-display text-4xl leading-none text-ink">{v.firm}</h1>
          <p className="mt-2 text-sm text-ink-soft">
            {v.partner} · {v.location} · {v.region}
          </p>
        </div>
      </header>

      <section className="mt-8">
        <p className="meta-label text-ink-soft">Known for</p>
        <p className="mt-2 text-lg leading-relaxed text-ink">{v.knownFor}</p>
      </section>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="meta-label text-ink-soft">Stage focus</p>
          <p className="mt-2 text-ink">{v.stage}</p>
        </div>
        <div>
          <p className="meta-label text-ink-soft">Sectors</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {v.sectors.map((s) => (
              <span
                key={s}
                className="meta-label rounded-full border border-line px-2 py-1 text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        {v.checkSize && (
          <div>
            <p className="meta-label text-ink-soft">Typical check</p>
            <p className="mt-2 text-ink">{v.checkSize}</p>
          </div>
        )}
        {v.aum && (
          <div>
            <p className="meta-label text-ink-soft">Fund size</p>
            <p className="mt-2 text-ink">{v.aum}</p>
          </div>
        )}
      </div>

      <section className="mt-8">
        <p className="meta-label text-ink-soft">Notable investments</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {v.notableInvestments.map((c) => (
            <span
              key={c}
              className="rounded-md border border-line bg-panel px-3 py-1 text-sm text-ink"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-line bg-panel p-5">
        {hasDossier ? (
          <>
            <p className="meta-label text-gold">Full intelligence dossier available</p>
            <p className="mt-2 text-sm text-ink-soft">
              Signals they reward, anti-patterns, a partner profile, questions to ask in the
              room, and a draft follow-up email — pre-written, no tokens needed.
            </p>
            <Link
              to={`/research/${v.slug}`}
              className="mt-4 inline-block rounded-lg bg-gold px-4 py-2 text-sm font-medium text-bg"
            >
              Open full dossier →
            </Link>
          </>
        ) : (
          <p className="text-sm text-ink-soft">
            This is {v.firm}'s curated profile from public data. Full eight-section
            dossiers (signals, anti-patterns, partner background, follow-up email)
            are hand-verified for marquee firms to keep every claim accurate.
          </p>
        )}
      </section>
    </main>
  );
}
