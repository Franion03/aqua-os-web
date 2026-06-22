import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/calendar': 'http://localhost:8082',
      '/api': 'http://localhost:8080',
      '/crew': 'http://localhost:8001'
    }
  }
})