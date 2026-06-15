import Hero from "../components/Hero";
import ResearchPanel from "../components/ResearchPanel";
import StatsStrip from "../components/StatsStrip";
import VcRow from "../components/VcRow";
import { fundingTickerItems, getTrendingTargets } from "../data/vcDirectory";

export default function Home() {
  const trending = getTrendingTargets();

  return (
    <>
      <Hero />

      <StatsStrip />

      <section className="border-b border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <span className="meta-label text-ink-soft">Tracking:</span>
            {fundingTickerItems.map((item) => (
              <span key={item} className="meta-label rounded-full border border-line px-3 py-1 text-ink-soft">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="meta-label text-gold">Leaderboard</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Trending intelligence targets</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            The six firms founders are researching most this cycle. Each has a hand-built sample dossier —
            click through to see exactly what PitchGhost produces.
          </p>

          <div className="mt-8">
            {trending.map((target, index) => (
              <VcRow
                key={target.slug}
                slug={target.slug}
                firm={target.firm}
                partner={target.partner}
                stage={target.stage}
                sectors={target.sectors}
                rank={target.rank}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <ResearchPanel />
    </>
  );
}
