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
        host: '0.0.0.0',
        port: 3000,
        open: false,
        hmr: true,
        proxy: {
            '/app': {
              target: 'ws://reverb-test.test:8080', // Ou 'wss://', dependendo do seu servidor
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