import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.home.mhlg.io",
  integrations: [sitemap(), mdx(), pagefind()],
  vite: {
    plugins: [
      // Bridge Vite's internal dev-client import so Astro dev resolves it.
      {
        name: "resolve-vite-env-client",
        enforce: "pre",
        resolveId(id) {
          if (id === "@vite/env") {
            return "/@vite/env";
          }
        },
      },
      tailwindcss(),
    ],
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
