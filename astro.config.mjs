// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      SPOTIFY_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      SPOTIFY_REDIRECT_URI: envField.string({
        context: "server",
        access: "public",
      }),
      SPOTIFY_REFRESH_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      BETTER_AUTH_URL: envField.string({
        context: "client",
        access: "public",
      }),
      BETTER_AUTH_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      TURSO_DATABASE_URL: envField.string({
        context: "server",
        access: "public",
      }),
      TURSO_AUTH_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      GOOGLE_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      GOOGLE_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      GOOGLE_REDIRECT_URI: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },

  integrations: [
    react(),
    AstroPWA({
      devOptions: {
        enabled: false,
      },
      includeManifestIcons: true,
      registerType: "autoUpdate",
      workbox: {
        navigateFallback: "/404",
        globIgnores: ["/_server-islands/*"],
      },
      manifest: {
        name: "Meghdip's Website",
        short_name: "Meghdip",
        description: "Meghdip's personal website",
        start_url: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  output: "server",

  vite: {
    // @ts-expect-error
    plugins: [tailwindcss()],
    resolve: {
      // alias: import.meta.env.PROD && {
      //   "react-dom/server": "react-dom/server.edge",
      // },
    },
  },

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
