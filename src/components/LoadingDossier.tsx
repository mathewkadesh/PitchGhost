import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STATUS_MESSAGES = [
  "Scanning public sources…",
  "Cross-referencing recent activity…",
  "Profiling the partner…",
  "Drafting the dossier…",
];

function Bar({ width = "100%" }: { width?: string }) {
  return <div className="h-3 animate-pulse rounded bg-line" style={{ width }} />;
}

export default function LoadingDossier() {
  const reduceMotion = useReducedMotion();
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 1800);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6" aria-busy="true">
      <p className="meta-label text-gold">
        Researching<span className="animate-cursor" aria-hidden="true">_</span>
      </p>
      <p className="sr-only" role="status">
        Generating dossier — this can take up to a minute while we search and write it up.
      </p>

      {!reduceMotion && (
        <>
          <div className="mt-3 h-5" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-ink-soft"
              >
                {STATUS_MESSAGES[statusIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <motion.div
              className="h-full w-1/3 rounded-full bg-gold"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </>
      )}

      <div className="mt-6 space-y-3">
        <Bar width="40%" />
        <Bar width="60%" />
      </div>

      <div className="mt-12 space-y-10">
        {[0, 1, 2].map((section) => (
          <div key={section} className="space-y-3 border-b border-line pb-8">
            <Bar width="20%" />
            <Bar width="90%" />
            <Bar width="75%" />
            <Bar width="85%" />
          </div>
        ))}
      </div>
    </div>
  );
}
