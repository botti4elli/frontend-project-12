import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const chunkHandler = (id) => {
  if (id.includes('node_modules')) {
    if (id.includes('react')) return 'react-vendor'
    if (id.includes('formik') || id.includes('yup')) return 'formik-vendor'
    if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n-vendor'
    if (id.includes('react-bootstrap')) return 'bootstrap-vendor'
    if (id.includes('react-toastify')) return 'toastify-vendor'
    return 'vendor'
  }
}

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
        manualChunks: chunkHandler,
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
