import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };

  return (
    <section className="hairline-grid relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
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
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl"
        >
          Know the partner before you walk into the room.
        </motion.h1>

        <motion.p
          initial={initial}
          animate={animate}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg text-ink-soft"
        >
          PitchGhost turns a firm and a partner's name into a structured dossier: their thesis, what
          they reward, what kills a deal, and a follow-up email that sounds like you actually listened.
          Start with a sample dossier — no account, no API key.
        </motion.p>

        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-4"
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
      </div>
    </section>
  );
}
