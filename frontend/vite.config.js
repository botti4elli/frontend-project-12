import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './src/index.js',
    },
  },
  server: {
    proxy: {
      '/api/v1': 'http://localhost:5001',
    },
  },
});
