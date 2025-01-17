import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  server: {
    host: 'localhost',
    port: 9999,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/imgs': {
        target: 'http://localhost:8000/imgs',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/imgs/, ''),
      },
    },
  },
})
