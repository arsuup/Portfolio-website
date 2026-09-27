import { fileURLToPath, URL } from 'node:url'
import { CDN_URL } from './src/utils/constants.js'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import fs from 'node:fs'

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
    Markdown(),{
      name: 'vite-md-last-modified',
      transform(code, id) {
        if (id.endsWith('.md')) {
          const stats = fs.statSync(id);
          const date = stats.mtime.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          return `${code}\nexport const lastModifiedDate = ${JSON.stringify(date)};`;
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})