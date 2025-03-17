import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

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
          target: isProduction 
            ? 'http://localhost:8081' 
            : 'http://localhost:8081',
          changeOrigin: true,
        },
        '/images': {
          target: isProduction 
            ? 'http://localhost:8081' 
            : 'http://localhost:8081',
        }
      },
      port: 5050,
      host: '0.0.0.0',
      strictPort: true,
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      chunkSizeWarningLimit: 500,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    base: isProduction ? "/" : "/", 
  };
});


