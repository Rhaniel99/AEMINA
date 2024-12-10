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
    },

    resolve : {
        alias : {
            "@" : "/resources/js",
            shadcn: "/node_modules/@shadcn/ui", // Ajuste o caminho conforme necessário
            ziggy: '/vendor/tightenco/ziggy',
            "css" : "/resources/css",
        }
    }
});