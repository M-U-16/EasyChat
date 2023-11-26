import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: true,
      },
      "/socket": {
        target:"ws://localhost:3000",
        ws: true
      }
    }
  },
  plugins: [react()],
})
