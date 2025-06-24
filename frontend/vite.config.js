// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer'
// export default defineConfig({
//   plugins: [
//     react(),
//     visualizer({ open: true }),
//   ],
//   build: {
//     outDir: 'dist',
//     emptyOutDir: true,
//     chunkSizeWarningLimit: 500,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ['react', 'react-dom'],
//           formik: ['formik', 'yup'],
//           i18n: ['i18next', 'react-i18next'],
//           bootstrap: ['react-bootstrap'],
//           toastify: ['react-toastify'],
//         },
//       },
//     },
//   },
//   server: {
//     port: 5002,
//     proxy: {
//       // Проксируем REST API
//       '/api': {
//         target: 'http://localhost:5001',
//       },
//       // Проксируем WebSocket соединения
//       '/socket.io': {
//         target: 'ws://localhost:5001',
//         ws: true,
//         rewriteWsOrigin: true,
//       },
//     },
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
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
      '/api': {
        target: 'http://localhost:5001',
      },
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
