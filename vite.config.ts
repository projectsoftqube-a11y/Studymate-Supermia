// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },

  // Build for Vercel, not Cloudflare.
  //
  // The shared config defaults Nitro to the `cloudflare-module` preset, which
  // emits a Worker bundle plus `.output/server/wrangler.json`. Vercel does not
  // read either, so it served the static assets but had no working server
  // handler behind them: any request that needed SSR fell through and the
  // deployment errored. `NITRO_PRESET` overrides this at build time.
  //
  // If this project is ever moved back to Cloudflare Pages, drop the env var
  // rather than editing the preset name here.
  nitro: { preset: process.env.NITRO_PRESET ?? "vercel" },
});
