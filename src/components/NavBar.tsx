import { useState } from "react";
import { NavLink } from "react-router-dom";
import Wordmark from "./Wordmark";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/directory", label: "Directory" },
  { to: "/blog", label: "Briefings" },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return `meta-label transition-colors ${isActive ? "text-gold" : "text-ink-soft hover:text-ink"}`;
}

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <NavLink to="/" className="text-sm text-ink" aria-label="PitchGhost home">
          <Wordmark />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="meta-label text-ink-soft md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-4 py-4 md:hidden">
          <nav aria-label="Primary" className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
