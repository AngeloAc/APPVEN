import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  devServer: {
    allowedHosts: "all",
    client: {
      // Reference : https://webpack.js.org/configuration/dev-server/#websocketurl
      webSocketURL: "auto://0.0.0.0:0/ws",
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})