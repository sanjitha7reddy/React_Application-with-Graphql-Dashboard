import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true,
    middlewareMode: false,
    setupMiddlewares(middlewares) {
      middlewares.unshift(history());
      return middlewares;
    }
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
  }
});
