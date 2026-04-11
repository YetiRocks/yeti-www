import { readFileSync } from 'fs'
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import seoPlugin from './vite-plugin-seo'

/** Derive RESOURCE_ROUTE and STATIC_ROUTE from ../config.yaml so that
 *  `npm run build` and `npx vite` work without yeti injecting env vars.
 *  Env vars set by yeti's Rust launcher or CI still take precedence. */
function loadYetiRoutes() {
  if (process.env.RESOURCE_ROUTE && process.env.STATIC_ROUTE) {
    return { RESOURCE_ROUTE: process.env.RESOURCE_ROUTE, STATIC_ROUTE: process.env.STATIC_ROUTE }
  }
  const yaml = readFileSync('../config.yaml', 'utf8')
  const appId = yaml.match(/^app_id:\s*"?([^"\s]+)"?/m)?.[1] ?? ''
  // Extract resources.route — look for route: under the resources: section
  const resourcesBlock = yaml.match(/^resources:\s*\n((?:\s+.+\n?)*)/m)?.[1] ?? ''
  const resRoute = resourcesBlock.match(/^\s+route:\s*"?([^"\s]+)"?/m)?.[1] ?? '/'

  // Check if this app is the root_app (served at /)
  let isRoot = false
  try {
    const global = readFileSync('../../../yeti-config.yaml', 'utf8')
    const rootApp = global.match(/^root_app:\s*"?([^"\s]+)"?/m)?.[1]
    isRoot = rootApp === appId
  } catch (_) { /* no yeti-config.yaml — use prefix */ }

  const prefix = isRoot ? '' : `/${appId}`
  const STATIC_ROUTE = `${prefix}/`
  const RESOURCE_ROUTE = resRoute === '/' ? (prefix || '/') : `${prefix}${resRoute}`
  return { RESOURCE_ROUTE, STATIC_ROUTE }
}

const routes = loadYetiRoutes()

export default defineConfig({
  base: routes.STATIC_ROUTE,
  define: {
    RESOURCE_ROUTE: JSON.stringify(routes.RESOURCE_ROUTE),
    STATIC_ROUTE: JSON.stringify(routes.STATIC_ROUTE),
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
  server: {
    proxy: {
      [routes.RESOURCE_ROUTE]: {
        target: 'https://localhost:9996',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
