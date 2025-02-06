import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: '0.0.0.0',         // continua escutando em todas as interfaces
    port: 3000,
    open: false,
    cors: true,              // Habilita CORS
    origin: 'http://localhost:3000',  // Define a URL que será injetada no cliente
    hmr: {
      // Caso necessário, ajuste também as configurações de HMR
      host: 'localhost',     // O host que o navegador deverá usar para HMR
      protocol: 'ws',
      clientPort: 3000,
    },
    proxy: {
      '/app': {
        target: 'ws://reverb-test.test:8080',
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/resources/js",
      shadcn: "/node_modules/@shadcn/ui",
      ziggy: '/vendor/tightenco/ziggy',
      "css": "/resources/css",
      "uppy-css": "/node_modules/@uppy/core/dist/style.css",
      "uppy-dashboard-css": "/node_modules/@uppy/dashboard/dist/style.css",
    },
  },
});
