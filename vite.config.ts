import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "chatbot-inmobiliaria", 
  build: {
    outDir: "docs", // Cambia la carpeta de salida a "docs".
  },
})
