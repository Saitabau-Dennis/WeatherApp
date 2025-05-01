import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            // No input files needed for API-only backend
            refresh: true,
        }),
    ],
});
