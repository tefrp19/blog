import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path' // 关键代码
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      vueJsxPlugin(),
      nodePolyfills(),
      AutoImport({
          // 自动导入vue相关的Api
          imports: [
              'vue',
              ],
          // 生成auto-import.d.ts声明文件
          dts: 'src/auto-import.d.ts',
      }),
  ],
  server:{
    port: 5000
  },
  resolve: {
    alias: {
      // 关键代码
      '@': path.resolve(__dirname, './src')
    }
  }
})
