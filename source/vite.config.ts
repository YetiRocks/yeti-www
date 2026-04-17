import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import seoPlugin from './vite-plugin-seo'

// Single source of truth. Must match this app's config.yaml and ~/yeti/yeti-config.yaml.
//   STATIC_ROOT    = '' for root_app, otherwise '/' + app_id
//   RESOURCES_ROOT = resources.route (no slashes)
const STATIC_ROOT = ''
const RESOURCES_ROOT = 'api'

// Read yeti server port from ~/yeti/yeti-config.yaml (3 levels up from this file)
const __dir = dirname(fileURLToPath(import.meta.url))
const yetiYaml = readFileSync(resolve(__dir, '../../../yeti-config.yaml'), 'utf-8')
const YETI_PORT = parseInt(yetiYaml.match(/^port:\s*(\d+)/m)?.[1] ?? '9996', 10)

export default defineConfig({
  base: `${STATIC_ROOT}/`,
  define: {
    __STATIC_ROOT__: JSON.stringify(STATIC_ROOT),
    __RESOURCES_ROOT__: JSON.stringify(RESOURCES_ROOT),
  },
  server: {
    proxy: {
      [`${STATIC_ROOT}/${RESOURCES_ROOT}`]: {
        target: `https://localhost:${YETI_PORT}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react(),
    seoPlugin(),
  ],
  build: { outDir: '../web', emptyOutDir: true },
})
