import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="meta-label text-warn">404</p>
      <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Page not found</h1>
      <p className="mt-3 text-ink-soft">This page doesn't exist, or the dossier moved.</p>
      <Link
        to="/"
        className="meta-label mt-6 inline-block text-gold underline decoration-line hover:decoration-gold"
      >
        ← Back home
      </Link>
    </div>
  );
}
