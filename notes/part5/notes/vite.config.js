import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
    coverage: {
      provider: "v8", // motor de cobertura
      reporter: ["text", "html", "json"],
      // "text" -> tabla en consola
      // "html" -> informe navegable en coverage/index.html
      // "json" -> útil si luego quieres integrarlo con CI
    },
  },
});

// Recordar primero iniciar el back y luego el front para que no de error el proxy
