// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
//
// export default defineConfig({
//   // root: '.', // корень проекта
//   plugins: [react()],
//   build: {
//     outDir: 'dist',
//     emptyOutDir: true,
//   },
//   server: {
//     proxy: {
//       '/api/v1': 'http://localhost:5001',
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5002,
    proxy: {
      // Проксируем REST API
      '/api': {
        target: 'http://localhost:5001',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
