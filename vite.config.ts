import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Allows network access
    allowedHosts: [
      "https://65863fcc9ee2.ngrok-free.app/", // 👈 Add the specific domain from your error
      ".ngrok-free.app", // 👈 OR add this to allow ALL ngrok domains (Recommended)
      "all", // 👈 OR use "all" to disable this check completely (Easiest for dev)
    ],
  },
});
