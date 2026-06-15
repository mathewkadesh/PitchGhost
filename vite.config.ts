import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served from a GitHub Pages project page (mathewkadesh.github.io/PitchGhost),
// so assets are requested under /PitchGhost/. The router `basename` in
// src/main.tsx and public/404.html's pathSegmentsToKeep are kept in sync
// with this value.
export default defineConfig({
  base: "/PitchGhost/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
