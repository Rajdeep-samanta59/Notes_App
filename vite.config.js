// vite.config.js or vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/ //temporary
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })
export default defineConfig({
  host:true,
  plugins: [react(), tailwindcss()],
  
})