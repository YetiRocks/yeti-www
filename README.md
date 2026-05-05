<p align="center">
  <img src="https://cdn.prod.website-files.com/68e09cef90d613c94c3671c0/697e805a9246c7e090054706_logo_horizontal_grey.png" alt="Yeti" width="200" />
</p>

---

# yeti-www

[![Yeti](https://img.shields.io/badge/Yeti-Application-blue)](https://yetirocks.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff)](https://vitejs.dev)

> **[Yeti](https://yetirocks.com)** - The Performance Platform for Agent-Driven Development.
> Schema-driven APIs, real-time streaming, and vector search. From prompt to production.

**The marketing website for yetirocks.com.** A React multi-page application served by Yeti, showcasing platform features, architecture, application development, hosting tiers, solutions, demos, and benchmark data. Ships with a server-side beta signup table for collecting early access requests.

---

## Why yeti-www

Most marketing sites are deployed on a separate CMS or static host, disconnected from the product they describe. yeti-www runs on the same Yeti instance it markets — the site itself is a working demonstration of the platform. A GraphQL schema defines the beta signup table, Yeti serves the SPA with client-side routing, and the Vite build pipeline produces optimized bundles with automatic SEO metadata generation. One `Cargo.toml` (`[package.metadata.app]`), one schema file, zero external services.

- **Dogfooding the platform** — the site runs as a yeti application with schema-driven data collection, proving the workflow it describes to visitors.
- **Single-process deployment** — no separate web server, no CDN configuration, no CMS. Yeti serves the built React app and handles form submissions.
- **Public beta signup** — the `BetaSignup` table uses `@export(public: [create])` so visitors can submit their information without authentication.
- **SPA routing** — `spa = true` in the `static = { ... }` table of `[package.metadata.app]` returns `index.html` for all unmatched routes, enabling TanStack Router client-side navigation.
- **SEO-optimized** — custom Vite plugin generates per-route meta tags, Open Graph images, and a sitemap for search engine indexing.
- **Responsive design** — mobile-first layouts with hamburger menu, stacked grids, and touch-friendly targets across all pages.

---

## Quick Start

### 1. Clone

```bash
cd ~/yeti/applications
git clone https://github.com/yetirocks/yeti-www.git
```

### 2. Build the UI

```bash
cd ~/yeti/applications/yeti-www/source
npm install
npm run build
```

This compiles TypeScript, bundles the React app with Vite, and outputs production files to `../web/`.

### 3. Start Yeti

```bash
cd ~/yeti
/Users/jrepp/Developer/yeti/target/debug/yeti
```

The site loads automatically. No plugin compilation needed — yeti-www is a static-only application with a single schema table.

### 4. Open in browser

```
https://localhost:9996/
```

The site is served at the root path (`route_prefix: "/"`). Navigate between pages using the top navigation bar.

---

## Architecture

```
Browser (yetirocks.com)
    |
    +-- GET / -----------------> Yeti (static file handler)
    |                                |
    |                                +-- SPA mode: returns index.html
    |                                |   for all unmatched routes
    |                                |
    |                                +-- /assets/* served from web/
    |                                |
    +-- POST /yeti-www/BetaSignup -> Yeti (schema-driven REST)
    |                                |
    |                                +-- Public create (no auth)
    |                                +-- Stored in RocksDB ("www" db)
    |
    +-- TanStack Router (client-side, file-based)
         |
         +-- /                            Home
         +-- /pricing                     Self-Hosted / Fabric / Sovereign tiers
         +-- /platform/applications       Schema-driven apps
         +-- /platform/databases          Storage + queries + vectors
         +-- /platform/interfaces         REST/GraphQL/SSE/MQTT
         +-- /platform/plugins            Auth, telemetry, vectors
         +-- /platform/fabric             Yeti Fabric managed hosting
         +-- /solutions/agentic-harness   Agentic compute fabric
         +-- /solutions/llm-optimization  LLM optimization use case
         +-- /solutions/media-security    Media + security use case
         +-- /developers/getting-started  Quickstart
         +-- /developers/demos            Live demos
         +-- /developers/benchmarks       Performance data
         +-- /blog, /blog/$slug           Blog index + posts
         +-- /legal/*                     Terms, privacy, cookies, etc.
```

**Static serving:** Yeti serves pre-built files from the `web/` directory. The `spa = true` flag in `[package.metadata.app]`'s `static = { ... }` table returns `index.html` for any route that does not match a static file, enabling TanStack Router to handle client-side navigation.

**Data collection:** The `BetaSignup` table is the only server-side data model. It accepts public POST requests with name, email, company, title, and idea fields. Records are stored in the embedded RocksDB database under the "www" namespace.

**Build pipeline:** Vite compiles TypeScript, bundles React components, code-splits vendor libraries (React, highlight.js), and runs a custom SEO plugin that generates per-route HTML with Open Graph metadata and a sitemap.

---

## Features

### Homepage (/)

Hero section with the Yeti logo, headline ("Faster Applications, Faster."), subtitle, and call-to-action buttons for early access and demos. Four content sections below:

| Section | Headline | Key Points |
|---------|----------|------------|
| **Building Blocks** | From schema to production API in minutes | Same runtime every stage; schema + config = application |
| **Faster** | Rust speed without writing Rust | AI agent MCP integration; single-instance fleet throughput |
| **Easier** | Auth, streaming, search - one config line each | Everything ships in the binary; five lines to a production endpoint |
| **Cheaper** | One binary runs what used to take a cluster | Fewer servers, fewer pages; pay-as-you-go pricing |

### Platform (/platform/*)

Architecture diagram (SVG) showing the full Yeti stack. Five deep-dive subpages, one per URL section:

- **/platform/applications** — schema-driven development, statically-linked Rust resources, static file serving. Interactive code examples with syntax highlighting (schema → API, auth, vector search).
- **/platform/databases** — RocksDB storage, FIQL queries, relationships, HNSW vector search, GraphQL
- **/platform/interfaces** — REST, GraphQL, SSE, MQTT, WebSocket; one schema, every transport
- **/platform/plugins** — yeti-auth, yeti-telemetry, yeti-vectors, yeti-applications
- **/platform/fabric** — Yeti Fabric managed hosting overview

### Solutions (/solutions/*)

Use-case-driven landing pages:

- **/solutions/agentic-harness** — agent compute fabric powered by Yeti
- **/solutions/llm-optimization** — LLM cost / latency / quality optimization
- **/solutions/media-security** — media and security workloads

### Pricing (/pricing)

Three tiers covering the full deployment spectrum:

| Tier | Audience | Description |
|------|----------|-------------|
| **Self-Hosted** | Free / open source | Run the Yeti binary anywhere — zero cost, full feature set |
| **Yeti Fabric** | Managed | Yeti-hosted multi-tenant fabric with scaling, telemetry, and SLAs |
| **Yeti Sovereign** | Enterprise | On-prem, private-cloud, or whitelabel deployments with dedicated support |

### Developers (/developers/*)

- **/developers/getting-started** — quickstart and onboarding
- **/developers/demos** — live demo applications running on the Yeti platform
- **/developers/benchmarks** — comprehensive performance data (see below)

### Blog (/blog, /blog/$slug)

Blog index plus individual post pages, content sourced from `src/data/posts.ts`.

### Benchmarks (/developers/benchmarks)

Comprehensive performance data from the load-test suite with charts and tables:

| Test | Throughput | p50 | p99 |
|------|-----------|-----|-----|
| Raw Reads | 77,045 req/s | <1ms | <5ms |
| Raw Writes | 35,062 req/s | <1ms | <5ms |
| REST CRUD | 1,607 req/s | 1-12ms | 16-42ms |
| GraphQL | 390 req/s | 3-30ms | 21-64ms |
| Relationships | 6,782 req/s | 1-5ms | 8-21ms |
| Blob Storage | 1,826 req/s | 4-5ms | 12-27ms |

Includes resource consumption, write amplification, scalability narrative, and test methodology. The `BenchmarkChart` component renders performance data using uPlot.

### Legal (/legal/*)

Full legal documentation suite:

| Route | Page |
|-------|------|
| `/legal` | Legal index |
| `/legal/terms-of-service` | Terms of Service |
| `/legal/privacy-policy` | Privacy Policy |
| `/legal/software-license` | Software License |
| `/legal/cookie-policy` | Cookie Policy |
| `/legal/acceptable-use` | Acceptable Use Policy |
| `/legal/support-policy` | Support Policy |

### Beta Signup Modal

Click "Request Early Access" in the navigation or hero section to open the beta signup modal. The form collects name, email, company, title, and idea. Submissions are POSTed to the `BetaSignup` table endpoint (`POST /yeti-www/BetaSignup`) which is publicly accessible via `@export(public: [create])`.

---

## Data Model

### BetaSignup Table

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | ID! | Yes | Auto-generated unique identifier |
| `name` | String! | Yes | Contact name |
| `email` | String! | Yes | Contact email address |
| `company` | String | No | Company or organization |
| `title` | String | No | Job title |
| `idea` | String | No | What they want to build with Yeti |
| `created_at` | String! | Auto | Timestamp set automatically via `@createdTime` |

**Schema directives:**
- `@table(database: "www")` — stores records in the "www" RocksDB database
- `@export(public: [create])` — generates REST endpoints with public create access (no authentication required for POST)
- `@primaryKey` on `id` — auto-generated unique key
- `@createdTime` on `created_at` — server-side timestamp on record creation

**REST endpoints (auto-generated):**

| Endpoint | Methods | Auth Required |
|----------|---------|---------------|
| `/yeti-www/BetaSignup` | GET, POST | GET: yes, POST: no (public) |
| `/yeti-www/BetaSignup/{id}` | GET, PUT, DELETE | Yes |

---

## Configuration

### Cargo.toml

App configuration lives in the app's `Cargo.toml` under `[package.metadata.app]` — there is no `config.yaml` or `services.yaml`.

```toml
[package]
name = "yeti-www"
version = "1.0.0"
description = "yetirocks.com marketing site + demos"

[package.metadata.app]
customer_id = "yeti"
route_prefix = "/"
schemas = "schemas/schema.graphql"
static = { path = "web", source = "source", spa = true, build = "npm install && npm run build" }
```

**Key settings:**

| Field | Value | Purpose |
|-------|-------|---------|
| `[package].name` | `yeti-www` | Application identifier used in table endpoints |
| `route_prefix` | `/` | Serves at the root path (not `/yeti-www/`) |
| `static.path` | `web` | Directory containing built React app |
| `static.spa` | `true` | Returns `index.html` for unmatched routes (SPA mode) |
| `static.source` | `source` | Vite project directory |
| `static.build` | `npm install && npm run build` | Build command executed by Yeti |

### schema.graphql

```graphql
type BetaSignup @table(database: "www") @export(public: [create]) {
    id: ID! @primaryKey
    name: String!
    email: String!
    company: String
    title: String
    idea: String
    created_at: String! @createdTime
}
```

No resources, no extensions, no plugins. This is a static-first application with a single server-side table.

---

## Project Structure

yeti-www is the canonical model for multi-page Yeti UI apps. Pages are organized into subfolders by URL section (`pages/platform/`, `pages/solutions/`, `pages/developers/`, `pages/blog/`, `pages/legal/`). The TanStack Router file tree under `routes/` mirrors the URL paths exactly — each route file is a thin wrapper that imports the corresponding page and sets it as `component`.

```
yeti-www/
├── Cargo.toml                  # App config in [package.metadata.app]
├── README.md                   # This file
├── schemas/
│   └── schema.graphql          # BetaSignup table definition
├── source/                     # React/Vite source code
│   ├── package.json
│   ├── vite.config.ts          # Vite config (reads base path from Cargo.toml)
│   ├── vite-plugin-seo.ts      # Custom SEO plugin (meta tags, sitemap, OG images)
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── index.html
│   ├── public/                 # Static assets (favicon, logo, architecture.svg, og-image, install.sh,
│   │                           # install.ps1, robots.txt, sitemap.xml, screenshots/)
│   └── src/
│       ├── main.tsx            # React DOM entry point
│       ├── router.tsx          # TanStack Router setup
│       ├── routeTree.gen.ts    # Auto-generated by TanStack Router vite plugin
│       ├── vite-env.d.ts
│       ├── hooks/
│       │   └── useSEO.ts       # Per-route SEO meta tags
│       ├── data/               # Static data modules
│       │   ├── benchmarks.json
│       │   ├── bestresults.json
│       │   └── posts.ts        # Blog post content
│       ├── components/         # Shared UI (Nav, Footer, BetaModal, BenchmarkChart, Code, Icon, ...)
│       ├── styles/
│       │   ├── _vars.css       # Per-app brand colors / CSS variables
│       │   ├── yeti.css        # Canonical Yeti stylesheet (shared across all apps)
│       │   └── index.css       # App-specific overrides
│       ├── pages/              # Page components organized by URL section
│       │   ├── Home.tsx
│       │   ├── Pricing.tsx     # Self-Hosted / Fabric / Sovereign tiers
│       │   ├── NotFound.tsx
│       │   ├── platform/
│       │   │   ├── Applications.tsx
│       │   │   ├── Databases.tsx
│       │   │   ├── Interfaces.tsx
│       │   │   ├── Plugins.tsx
│       │   │   └── Fabric.tsx
│       │   ├── solutions/
│       │   │   ├── AgenticHarness.tsx
│       │   │   ├── LLMOptimization.tsx
│       │   │   └── MediaSecurity.tsx
│       │   ├── developers/
│       │   │   ├── GettingStarted.tsx
│       │   │   ├── Demos.tsx
│       │   │   └── Benchmarks.tsx
│       │   ├── blog/
│       │   │   ├── Blog.tsx
│       │   │   └── BlogPost.tsx
│       │   └── legal/
│       │       ├── Legal.tsx
│       │       ├── TermsOfService.tsx
│       │       ├── PrivacyPolicy.tsx
│       │       ├── SoftwareLicense.tsx
│       │       ├── CookiePolicy.tsx
│       │       ├── AcceptableUse.tsx
│       │       └── SupportPolicy.tsx
│       └── routes/             # TanStack Router file-based routes (mirror URL paths)
│           ├── __root.tsx
│           ├── index.tsx                       → pages/Home
│           ├── pricing.tsx                     → pages/Pricing
│           ├── blog.tsx                        → pages/blog/Blog
│           ├── blog/$slug.tsx                  → pages/blog/BlogPost
│           ├── platform/
│           │   ├── applications.tsx            → pages/platform/Applications
│           │   ├── databases.tsx               → pages/platform/Databases
│           │   ├── interfaces.tsx              → pages/platform/Interfaces
│           │   ├── plugins.tsx                 → pages/platform/Plugins
│           │   └── fabric.tsx                  → pages/platform/Fabric
│           ├── solutions/
│           │   ├── agentic-harness.tsx         → pages/solutions/AgenticHarness
│           │   ├── llm-optimization.tsx        → pages/solutions/LLMOptimization
│           │   └── media-security.tsx          → pages/solutions/MediaSecurity
│           ├── developers/
│           │   ├── getting-started.tsx
│           │   ├── demos.tsx
│           │   └── benchmarks.tsx
│           └── legal/
│               ├── index.tsx
│               ├── terms-of-service.tsx
│               ├── privacy-policy.tsx
│               ├── software-license.tsx
│               ├── cookie-policy.tsx
│               ├── acceptable-use.tsx
│               └── support-policy.tsx
└── web/                        # Built output (gitignored)
    └── ...                     # Production-ready static files
```

**Style conventions (canonical across Yeti apps):** `styles/yeti.css` is the canonical stylesheet that ships unchanged across every Yeti UI app. `styles/_vars.css` holds per-app brand colors. `styles/index.css` holds app-specific overrides. Recent canonical additions include `.directive-header` for inline directive-name layouts (orange via `--color-primary`), a 3-up `features-grid` default, and `.has-code` cards that span full width with responsive breakpoints (2-col at ≤960px, 1-col at ≤600px).

---

## Development

### UI Development (Hot Reload)

```bash
cd ~/yeti/applications/yeti-www/source

# Install dependencies
npm install

# Start Vite dev server with HMR
npm run dev
# Accessible at http://localhost:5180
```

The development server reads `route_prefix` from `../Cargo.toml` (under `[package.metadata.app]`) to set the correct base path automatically. Override with `YETI_BASE_PATH` environment variable if needed.

### Production Build

```bash
cd ~/yeti/applications/yeti-www/source

# TypeScript check + Vite production build
npm run build
```

Output goes to `../web/` (configured in `vite.config.ts` via `build.outDir`). Vite code-splits into three chunks:

| Chunk | Contents |
|-------|----------|
| `react-vendor` | react, react-dom, react-router-dom |
| `highlight` | highlight.js, prism-react-renderer |
| `index` | Application code |

### Adding a New Page

1. Create the page component in the appropriate section folder, e.g. `source/src/pages/platform/NewPage.tsx`
2. Create a TanStack Router route file at the matching URL path, e.g. `source/src/routes/platform/new-page.tsx` — import the page and set it as `component`. The TanStack Router vite plugin regenerates `routeTree.gen.ts` automatically.
3. Add navigation link in `source/src/components/Nav.tsx`
4. Rebuild: `cd source && npm run build`
5. Restart Yeti to pick up new static files

### SEO Plugin

The custom Vite plugin at `source/vite-plugin-seo.ts` runs during the build and generates:

- Per-route `<meta>` tags (title, description, Open Graph)
- `sitemap.xml` for search engine indexing
- Open Graph image references for social media previews

### Styling

The site uses the canonical Yeti dark theme:

| Property | Value |
|----------|-------|
| Background | `#121212` |
| Font | Ubuntu |
| Layout | CSS Grid + Flexbox |
| Responsive | Mobile-first breakpoints |

Styles are split across three CSS files in `src/styles/`: `yeti.css` is the canonical stylesheet shared across every Yeti UI app, `_vars.css` holds the per-app brand colors and CSS variables, and `index.css` holds yeti-www-specific overrides. yeti-www is the canonical model — the same `yeti.css` ships in `yeti-admin`, `yeti-studio`, and `app-agentdaddy`.

---

## Deployment

yeti-www is deployed as part of any Yeti instance. In production:

1. Build the UI: `cd source && npm run build`
2. Ensure `web/` directory contains the built output
3. Start Yeti — the application loads automatically from `Cargo.toml` (`[package.metadata.app]`)

The `route_prefix: "/"` means this application claims the root path. Only one application per Yeti instance can use `/` as its prefix.

For yetirocks.com, Yeti serves the site directly over TLS with certificates managed via `mkcert` or a production certificate authority. No reverse proxy required.

---

## Learn More

- [Yeti Documentation](https://yetirocks.com/docs)
- [GitHub](https://github.com/yetirocks)
- [Application Template](https://github.com/yetirocks/application-template)

---

Built with [Yeti](https://yetirocks.com) | The Performance Platform for Agent-Driven Development
