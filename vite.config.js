// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.', // raiz do seu projeto
  build: {
    outDir: 'dist', // saída do build
    emptyOutDir: true,
  },
})
// Define aliases for easier imports