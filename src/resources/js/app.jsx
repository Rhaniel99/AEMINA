import './bootstrap';
import "../css/app.css";

import { createRoot } from "react-dom/client"; // Importe createRoot
import { createInertiaApp } from "@inertiajs/react";
// import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
// import Layout from '@/Layouts/Layout';
import AppSidebar from '@/app/layout';

const appName = "AEMINA";

createInertiaApp({
    progress: {
        color: '#65406A',
        showSpinner: true,
      },
      
    title: (title) => title ? `${title} - ${appName}` : appName,
    // resolve: (name) =>
    //     resolvePageComponent(
    //         `./Pages/${name}.jsx`,
    //         import.meta.glob("./Pages/**/*.jsx")
    //     ),
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages [`./Pages/${name}.jsx`];

        page.default.layout = page.default.layout || ((page) => <AppSidebar children={page} />);
        
        return page;
      },
      
    setup({ el, App, props }) {
        // Use createRoot em vez de render
        createRoot(el).render(<App {...props} />);
    },
});