import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'slick-carousel': 'slick-carousel/slick'
    }
  },
  build: {
    rollupOptions: {
      external: ['slick-carousel/slick/fonts/slick.ttf'],
    }
  }
})
