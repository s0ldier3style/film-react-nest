import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/scss'],
      },
    },
  },
  server: {
    proxy: {
      '/api/afisha': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/content/afisha': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
