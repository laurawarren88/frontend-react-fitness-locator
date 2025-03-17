import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  const backendUrl = isProduction 
    ? process.env.VITE_BACKEND_URL || 'https://api.lmw-fitness.com' 
    : 'http://localhost:8081';

  return {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    plugins : [react()],
    server: {
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
        '/images': {
          target: backendUrl,
          changeOrigin: true,
        }
      },
      port: 5050,
      host: '0.0.0.0',
      strictPort: true,
    },
    build: {
      outDir: "dist",
      sourcemap: isProduction ? false : true,
      chunkSizeWarningLimit: 500,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    base: isProduction ? "/" : "/", 
  };
});


