import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_PROXY_TARGET || 'https://inventry-backend-3zc8.onrender.com'
  const allowedHosts = (env.VITE_DEV_ALLOWED_HOSTS || '')
    .split(',')
    .map(h => h.trim())
    .filter(Boolean)

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      allowedHosts: allowedHosts.length > 0 ? allowedHosts : undefined,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
