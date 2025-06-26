import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
          vendors: ['axios'],
          chat: [
            './src/components/App.jsx',
            './src/components/MessagesList.jsx',
            './src/components/MessageInputForm.jsx',
            './src/components/ChannelsList.jsx',
            './src/components/ChatHeader.jsx',
            './src/components/Header.jsx',
            './src/components/ModalsManager.jsx',
            './src/pages/ChatPage.jsx',
            './src/pages/Login.jsx',
            './src/pages/SignUp.jsx',
          ],
        },
      },
    },
  },
  server: {
    port: 5002,
    proxy: {
      '/api': { target: 'http://localhost:5001' },
      '/socket.io': { target: 'ws://localhost:5001', ws: true, rewriteWsOrigin: true },
    },
  },
})
