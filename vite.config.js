import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/to-do-list/",
  css: {
    postcss: './postcss.config.js'
  }
})