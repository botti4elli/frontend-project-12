import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          formik: ['formik', 'yup'],
          i18n: ['i18next', 'react-i18next'],
          bootstrap: ['react-bootstrap'],
          toastify: ['react-toastify'],
        },
      },
    },
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
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer'
//
// export default defineConfig({
//   plugins: [
//     react(), // поддержка React JSX и Fast Refresh
//     visualizer({ open: true }), // анализ бандла, открывается автоматически после сборки
//   ],
//   build: {
//     outDir: 'dist',
//     emptyOutDir: true,
//     chunkSizeWarningLimit: 500, // увеличиваем лимит предупреждения по размеру чанков
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ['react', 'react-dom'], // выделяем React в отдельный чанк
//           formik: ['formik', 'yup'],     // formik и yup вместе
//           i18n: ['i18next', 'react-i18next'], // i18next и react-i18next
//           bootstrap: ['react-bootstrap'], // bootstrap
//           toastify: ['react-toastify'],   // react-toastify
//         },
//       },
//     },
//   },
//   server: {
//     port: 5002, // порт dev сервера
//     proxy: {
//       // Проксируем REST API запросы на backend по /api/* -> http://localhost:5001/api/*
//       '/api': {
//         target: 'http://localhost:5001',
//         changeOrigin: true,
//         secure: false,
//       },
//       // Проксируем WebSocket соединения на backend
//       '/socket.io': {
//         target: 'ws://localhost:5001',
//         ws: true,
//         rewriteWsOrigin: true,
//       },
//     },
//   },
// })
