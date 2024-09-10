/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path"; // Import path for resolving aliases

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Set the alias for the `src` directory
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/", "./setupTests.ts"],
    },
  },
});
