import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/random-city",
  assetsInclude: ["**/*.png"],
  plugins: [
    eslint({
      include: ["**/*.ts", "**/*.tsx"],
      lintOnStart: true,
    }),

    checker({
      typescript: true,
    }),
    react(),
  ],
});
