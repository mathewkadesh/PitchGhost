/** The PitchGhost wordmark with a blinking terminal cursor. Respects prefers-reduced-motion via tokens.css. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono uppercase tracking-[0.2em] ${className}`}>
      Pitch<span className="text-gold">Ghost</span>
      <span className="animate-cursor text-gold" aria-hidden="true">
        _
      </span>
    </span>
  );
}
