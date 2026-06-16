import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import type { VcDirectoryEntry } from "../lib/types";
import PitchConfidenceIndex from "./PitchConfidenceIndex";

interface HeroProps {
  activeFirm: VcDirectoryEntry;
}

export default function Hero({ activeFirm }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };

  return (
    <section className="hairline-grid relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left — headline */}
          <div>
            <motion.p
              initial={initial}
              animate={animate}
              transition={{ duration: 0.5 }}
              className="meta-label text-gold"
            >
              Founder intelligence, before you pitch
            </motion.p>

            <motion.h1
              initial={initial}
              animate={animate}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl"
            >
              Know the partner before you walk into the room.
            </motion.h1>

            <motion.p
              initial={initial}
              animate={animate}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 text-base text-ink-soft sm:text-lg"
            >
              PitchGhost turns a firm and a partner's name into a structured dossier: their thesis,
              what they reward, what kills a deal, and a follow-up email that sounds like you
              actually listened.
            </motion.p>

            <motion.div
              initial={initial}
              animate={animate}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-7 flex flex-wrap gap-4"
            >
              <a
                href="#research"
                className="meta-label rounded-md bg-gold px-5 py-3 text-bg transition-opacity hover:opacity-90"
              >
                Generate a dossier
              </a>
              <Link
                to="/directory"
                className="meta-label rounded-md border border-line px-5 py-3 text-ink-soft transition-colors hover:text-ink"
              >
                Browse the directory
              </Link>
            </motion.div>

            <motion.p
              initial={initial}
              animate={animate}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-5 text-xs text-ink-soft"
            >
              Hover a firm in the leaderboard to update the confidence index →
            </motion.p>
          </div>

          {/* Right — Pitch Confidence Index */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
          >
            <PitchConfidenceIndex entry={activeFirm} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
