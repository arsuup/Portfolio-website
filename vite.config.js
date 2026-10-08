import { fileURLToPath, URL } from 'node:url'
import { CDN_URL, API_ORIGIN } from './src/utils/constants.js'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/%CDN_URL%/g, CDN_URL)
      }
    },
    Markdown({ exportFrontmatter: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    chunkSizeWarningLimit: 600,
  },
})
