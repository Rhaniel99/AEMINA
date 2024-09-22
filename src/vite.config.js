// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/css/app.css', 'resources/js/app.js'],
//             refresh: true,
//         }),
//     ],
// });

import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
        }),
        react(),
    ],
    server: {
       host: '0.0.0.0',
       port: 3000,
       open: false,
    }
});