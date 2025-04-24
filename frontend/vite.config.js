// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
//
// export default defineConfig({
//   plugins: [react()],
//   esbuild: {
//     loader: {
//       '.js': 'jsx',
//     },
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
  server: {
    proxy: {
      '/api/v1': 'http://localhost:5001',
    },
  },
});
