import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/content-list/',
  build: {
    rollupOptions: {
      external: ['/content-list/assets/index-T3C7dc7k.js']
    }
  },
  plugins: [react()],
})
