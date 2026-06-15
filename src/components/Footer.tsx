import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Wordmark className="text-sm" />
        <p className="mt-3 max-w-2xl text-sm text-ink-soft">
          Marquee firms come with hand-built sample dossiers that render instantly with zero network
          calls. Every other firm runs fresh research with web search through a rate-limited proxy — see
          the README for how it's deployed.
        </p>
        <p className="meta-label mt-6 text-ink-soft">
          Built with React, Vite, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
