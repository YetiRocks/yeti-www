import { Plugin } from 'vite'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const SITE_URL = 'https://yetirocks.com'
const OG_IMAGE = `${SITE_URL}/og-image.png`

interface RouteMeta {
  path: string
  title: string
  description: string
}

const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'Yeti | Faster Applications, Faster',
    description: 'A distributed application platform that ships as a single binary. Database, APIs, streaming, auth, AI, durable functions — one runtime. Build faster with Yeti.',
  },
  {
    path: '/platform/applications',
    title: 'Applications | Yeti',
    description: 'A Yeti app is three files: Cargo.toml manifest, GraphQL schema, optional Rust resources. Drop it in, hot-reload on save.',
  },
  {
    path: '/platform/databases',
    title: 'Databases | Yeti',
    description: 'RocksDB-backed tables shaped by the seven-directive matrix — @table, @store, @source, @distribute, @export, @access, @audit.',
  },
  {
    path: '/platform/interfaces',
    title: 'Interfaces | Yeti',
    description: 'REST, GraphQL, WebSocket, SSE, MQTT, MCP, gRPC, Kafka bridge — auto-generated from your schema.',
  },
  {
    path: '/platform/plugins',
    title: 'Plugins | Yeti',
    description: 'Auth, telemetry, AI, durable functions, admin — first-party plugins in the binary. Plugin SDK for custom extensions.',
  },
  {
    path: '/platform/fabric',
    title: 'Fabric | Yeti',
    description: 'Managed multi-region deployment with mTLS replication mesh, per-deployment encryption, centralized placement, and agentic monitoring.',
  },
  {
    path: '/developers/getting-started',
    title: 'Getting Started | Yeti',
    description: 'A composable toolkit for agent-assisted, agent-driven, and autonomous development. Schema, manifest, optional Rust — ship in minutes.',
  },
  {
    path: '/solutions/media-security',
    title: 'Media Security | Yeti',
    description: 'Millions of access decisions per second. License verification, geo-restriction, real-time audit streams — all in one binary.',
  },
  {
    path: '/solutions/agentic-harness',
    title: 'Agentic Harness | Yeti',
    description: 'A safe runtime for autonomous agents. Per-agent database isolation, capability manifests, MCP-driven tool discovery.',
  },
  {
    path: '/solutions/llm-optimization',
    title: 'LLM Optimization | Yeti',
    description: 'Semantic cache + durable inference pipeline + LoRA hat fine-tuning. Pay your LLM bill once.',
  },
  {
    path: '/pricing',
    title: 'Pricing | Yeti',
    description: 'Self-hosted free forever. Yeti Fabric pay-as-you-go from $1,000/mo with auto-scaling, global replication, and agentic monitoring.',
  },
  {
    path: '/developers/demos',
    title: 'Demos | Yeti',
    description: 'Interactive examples: REST APIs, GraphQL, real-time streaming, vector search, and authentication — all powered by Yeti.',
  },
  {
    path: '/developers/benchmarks',
    title: 'Benchmarks | Yeti',
    description: 'Performance benchmarks: 77K req/s REST, sub-millisecond p50 latency, 3ms vector search across Yeti\'s API surface.',
  },
  {
    path: '/legal',
    title: 'Legal | Yeti',
    description: 'Policies and legal documents for Yeti software and Yeti Fabric, including terms of service, privacy policy, and software license.',
  },
  {
    path: '/blog',
    title: 'Blog | Yeti',
    description: 'Engineering deep-dives, product updates, and the story behind the distributed application platform.',
  },
]

const JSON_LD_HOME = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Yeti",
  "description": "One server where ten used to be. API server, message broker, vector database, auth service, and monitoring stack in a single binary.",
  "url": "https://yetirocks.com",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Linux, macOS, Windows",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "Yeti", "url": "https://yetirocks.com" }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Yeti",
  "url": "https://yetirocks.com"
}
</script>`

function generateMetaTags(route: RouteMeta): string {
  const url = route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`
  return `
    <!-- SEO Meta Tags -->
    <meta name="description" content="${route.description}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:site_name" content="Yeti" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />`
}

function stripExistingMetaTags(html: string): string {
  let result = html
  // Remove existing description, robots, canonical, OG, Twitter tags and their comments
  result = result.replace(/\s*<meta name="description" content="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<meta name="robots" content="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<meta property="og:[^"]*" content="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<meta name="twitter:[^"]*" content="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<!-- Open Graph[^>]*-->\s*/g, '\n')
  result = result.replace(/\s*<!-- Twitter Card[^>]*-->\s*/g, '\n')
  result = result.replace(/\s*<!-- Canonical[^>]*-->\s*/g, '\n')
  result = result.replace(/\s*<!-- SEO Meta Tags[^>]*-->\s*/g, '\n')
  // Collapse multiple blank lines
  result = result.replace(/\n{3,}/g, '\n\n')
  return result
}

function injectMetaTags(html: string, route: RouteMeta): string {
  let result = stripExistingMetaTags(html)

  // Replace title
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  )

  // Inject meta tags before </head>
  const metaTags = generateMetaTags(route)
  const jsonLd = route.path === '/' ? JSON_LD_HOME : ''
  result = result.replace('</head>', `${metaTags}${jsonLd}\n  </head>`)

  return result
}

export default function seoPlugin(): Plugin {
  return {
    name: 'vite-plugin-seo',
    closeBundle() {
      const outDir = resolve(__dirname, '../web')
      const indexPath = resolve(outDir, 'index.html')
      const html = readFileSync(indexPath, 'utf-8')

      // Generate per-route HTML files
      for (const route of routes) {
        const routeHtml = injectMetaTags(html, route)

        if (route.path === '/') {
          // Overwrite root index.html with home-specific meta
          writeFileSync(indexPath, routeHtml)
        } else {
          // Create subdirectory with index.html (e.g., web/platform/index.html)
          const routeDir = resolve(outDir, route.path.slice(1))
          mkdirSync(routeDir, { recursive: true })
          writeFileSync(resolve(routeDir, 'index.html'), routeHtml)
        }
      }

      console.log(`[seo] Generated HTML for ${routes.length} routes`)
    },
  }
}
