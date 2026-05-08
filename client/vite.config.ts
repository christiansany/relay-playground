import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      // Ignore Relay's generated artifacts that live inside src/routes/**.
      routeFileIgnorePattern: '(__generated__|\\.graphql\\.ts$)',
    }),
    react({
      babel: {
        plugins: ['relay'],
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
