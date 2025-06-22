import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Obtenemos todas las páginas posibles una sola vez.
        const pages = import.meta.glob('./pages/**/*.page.tsx');

        const lastSegment = name.includes('/') ? name.substring(name.lastIndexOf('/') + 1) : name;

        const potentialPaths = [`./pages/${name}.page.tsx`, `./pages/${name}/${lastSegment}.page.tsx`];

        const pagePath = potentialPaths.find((path) => pages[path]) || `./pages/${name}.page.tsx`;

        return resolvePageComponent(pagePath, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
