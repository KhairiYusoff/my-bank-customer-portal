import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "/src/main.tsx",
    },
  },
  server: {
    port: 5190,
    host: "127.0.0.1",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(dirname(fileURLToPath(import.meta.url)), "src"),
      "@app": resolve(dirname(fileURLToPath(import.meta.url)), "src/app"),
      "@components": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/components"
      ),
      "@constants": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/constants"
      ),
      "@features": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/features"
      ),
      "@pages": resolve(dirname(fileURLToPath(import.meta.url)), "src/pages"),
      "@types": resolve(dirname(fileURLToPath(import.meta.url)), "src/types"),
    },
  },
});
