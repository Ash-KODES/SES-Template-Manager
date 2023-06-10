import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import UnoCSS from "unocss/vite";
import preact from "@preact/preset-vite";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), preact(), ViteAliases(), removeConsole()],
});
