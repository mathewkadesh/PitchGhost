import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { isSampleSlug } from "../lib/constants";
import FirmMark from "./FirmMark";
import SectorIcon from "./SectorIcon";

interface VcRowProps {
  slug: string;
  firm: string;
  partner: string;
  stage: string;
  sectors: string[];
  rank?: number;
  location?: string;
  knownFor?: string;
  /** Position within the list, used to stagger the scan-reveal animation. */
  index?: number;
}

export default function VcRow({ slug, firm, partner, stage, sectors, rank, location, knownFor, index = 0 }: VcRowProps) {
  return (
    <Link
      to={isSampleSlug(slug) ? `/research/${slug}` : `/firm/${slug}`}
      style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
      className="scan-reveal group flex flex-col gap-3 border-b border-line py-5 transition-colors hover:bg-panel sm:flex-row sm:items-center sm:gap-6 sm:px-4"
    >
      <div className="meta-label w-10 shrink-0 text-ink-soft">
        {typeof rank === "number" ? String(rank).padStart(2, "0") : "—"}
      </div>

      <FirmMark firm={firm} slug={slug} className="h-11 w-11 text-xs" />

      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-xl text-ink sm:text-2xl">{firm}</h3>
          <span className="text-sm text-ink-soft">{partner}</span>
        </div>
        {(location || knownFor) && (
          <p className="mt-1 text-sm text-ink-soft">{[location, knownFor].filter(Boolean).join(" · ")}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:max-w-xs sm:justify-end">
        <span className="meta-label rounded-full border border-line px-2 py-1 text-ink-soft">{stage}</span>
        {sectors.slice(0, 2).map((sector) => (
          <span
            key={sector}
            className="meta-label inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-ink-soft"
          >
            <SectorIcon sector={sector} className="h-3.5 w-3.5" />
            {sector}
          </span>
        ))}
        {isSampleSlug(slug) && (
          <span className="meta-label rounded-full border border-gold/40 px-2 py-1 text-gold">Sample</span>
        )}
      </div>

      <div
        className="hidden text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-gold sm:block"
        aria-hidden="true"
      >
        <LuArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
