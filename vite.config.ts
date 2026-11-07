import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          lucide: ["lucide-react"],
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: "next/link", replacement: path.resolve(__dirname, "./src/shims/next-link.tsx") },
      { find: "next/navigation", replacement: path.resolve(__dirname, "./src/shims/next-navigation.ts") },
      { find: /^next$/, replacement: path.resolve(__dirname, "./src/shims/next.ts") },
      { find: "@", replacement: path.resolve(__dirname, "./") },
    ],
  },
  server: {
    port: 3000,
    open: false,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
});
