import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served from the root of a GitHub Pages user/org site (username.github.io)
// or a custom domain, so base stays "/". If this ever moves to a project
// page (username.github.io/<repo>), change this to "/<repo>/" and update
// the router `basename` in src/main.tsx to match.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
