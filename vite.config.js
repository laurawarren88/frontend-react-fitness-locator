import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/images': {
        target: 'http://localhost:8081',
      }
    },
    port: 5051,
    host: '0.0.0.0',
    strictPort: true,
  },
})

