import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import seoPlugin from './vite-plugin-seo'

export default defineConfig({
  base: process.env.STATIC_ROUTE || './',
  define: {
    RESOURCE_ROUTE: JSON.stringify(process.env.RESOURCE_ROUTE || '/api'),
    STATIC_ROUTE: JSON.stringify(process.env.STATIC_ROUTE || '/'),
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
