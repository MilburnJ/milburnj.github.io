// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://milburnj.github.io",
  output: "static",
  trailingSlash: "ignore",
  integrations: [react(), mdx(), sitemap()],
  // Tailwind v4 ships as a Vite plugin; the old @astrojs/tailwind integration is deprecated.
  vite: { plugins: [tailwindcss()] },
  build: { format: "directory" },
});
