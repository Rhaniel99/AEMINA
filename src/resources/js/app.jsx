import './bootstrap';

import "../css/app.css";

import { createRoot } from "react-dom/client"; // Importe createRoot
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";

import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Layout from '@/Layouts/Layout';

const appName = "AEMINA";

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    // resolve: (name) =>
    //     resolvePageComponent(
    //         `./Pages/${name}.jsx`,
    //         import.meta.glob("./Pages/**/*.jsx")
    //     ),
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages [`./Pages/${name}.jsx`];

        page.default.layout = page.default.layout || ((page) => <Layout children={page} />);
        
        return page;
      },
      
    setup({ el, App, props }) {
        // Use createRoot em vez de render
        createRoot(el).render(<App {...props} />);
    },
});

// Defina a cor de escolha para o progresso da Inertia
InertiaProgress.init(
    { color: "#fff" }
);