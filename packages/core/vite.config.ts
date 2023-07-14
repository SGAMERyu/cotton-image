import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Pinceau from 'pinceau/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pinceau(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: resolve(__dirname)
      }
    ]
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'cotton',
      fileName: 'cotton'
    },
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
