import './bootstrap';
import "css/app.css";
import "css/home.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AppSidebar from '@/app/layout';

const appName = "AEMINA";

createInertiaApp({
    progress: {
        color: '#65406A',
        showSpinner: true,
    },
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: name => {
        // Carrega as páginas
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        let page = pages[`./Pages/${name}.jsx`];

        // Verifica se a página está na pasta "Public"
        const isPublicPage = name.startsWith('Public/');

        // Define o layout: páginas públicas não usam sidebar
        page.default.layout = isPublicPage
            ? (page) => <>{page}</> // Sem layout
            : (page) => <AppSidebar>{page}</AppSidebar>; // Com sidebar
            console.log(page);
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
