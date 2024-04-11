import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path' // 关键代码
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsxPlugin(),nodePolyfills()],
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
