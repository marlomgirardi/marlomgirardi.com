import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://marlomgirardi.com",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark-default",
    },
  },
  integrations: [tailwind(), mdx(), sitemap()],
  // https://vercel.com/docs/frameworks/astro
  // https://docs.astro.build/en/guides/integrations-guide/vercel/
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
