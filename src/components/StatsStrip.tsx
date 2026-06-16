import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "Firms tracked",  value: 72 },
  { label: "Sectors",        value: 14 },
  { label: "Regions",        value: 4  },
  { label: "Full dossiers",  value: 8  },
];

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return controls.stop;
  }, [inView, reduceMotion, value]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsStrip() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4 sm:px-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl text-gold sm:text-5xl">
              <CountUp value={stat.value} />
            </p>
            <p className="meta-label mt-2 text-ink-soft">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
