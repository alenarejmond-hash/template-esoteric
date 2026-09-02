import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ВАЖНО! Если у тебя СВОЙ ДОМЕН (sotnikova.pro), пиши base: '/',
  // Если у тебя БЕСПЛАТНАЯ ссылка Гитхаба, пиши base: '/НазваниеРепозитория/', 
  base: '/', 
})