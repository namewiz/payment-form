import { defineConfig } from 'vite'

// Production build config that outputs non-hashed filenames
export default defineConfig({
  build: {
    outDir: 'docs',
    assetsDir: '',
    rollupOptions: {
      output: {
        // Ensure the main entry outputs as index.js without hashes
        entryFileNames: 'index.js',
        // Keep chunk names clean as well (no hashes)
        chunkFileNames: '[name].js',
        // Emit assets (e.g., CSS) without hashes
        assetFileNames: '[name][extname]'
      }
    }
  }
})

