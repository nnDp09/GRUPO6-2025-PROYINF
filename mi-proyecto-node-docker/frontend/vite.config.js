import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://app:3000',  // Aquí cambias localhost por el nombre del servicio backend
        changeOrigin: true,
        secure: false,
      }
    },
    host: true,
    port: 5173
  }
})
