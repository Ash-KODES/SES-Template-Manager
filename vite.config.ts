import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), ViteAliases()],
});
