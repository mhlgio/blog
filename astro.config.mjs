import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://mhlg.io",
  integrations: [sitemap(), mdx(), pagefind(), icon()],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
