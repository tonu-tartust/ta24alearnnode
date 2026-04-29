import vue from '@vitejs/plugin-vue'
// vue.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [vue()],
})