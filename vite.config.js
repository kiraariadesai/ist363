import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Serve lab11 as the app root (index.html lives in lab11/, not repo root)
export default defineConfig({
  root: path.resolve(__dirname, 'lab11'),
  plugins: [react()],
})
