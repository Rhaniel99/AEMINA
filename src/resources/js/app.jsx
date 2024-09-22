import './bootstrap';

import "../css/app.css";

import { createRoot } from "react-dom/client"; // Importe createRoot
import { createInertiaApp } from "@inertiajs/inertia-react";

import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "AEMINA";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        // Use createRoot em vez de render
        createRoot(el).render(<App {...props} />);
    },
});

// Defina a cor de escolha para o progresso da Inertia
InertiaProgress.init({ color: "#4B5563" });