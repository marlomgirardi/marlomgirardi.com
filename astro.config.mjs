import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: "https://marlomgirardi.com",
  integrations: [tailwind(), mdx(), sitemap()],
  // https://vercel.com/docs/frameworks/astro
  // https://docs.astro.build/en/guides/integrations-guide/vercel/
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
