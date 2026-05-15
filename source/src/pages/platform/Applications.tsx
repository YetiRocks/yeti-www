import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function Applications() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">High-performance building blocks.<br />Bulletproof applications.</h1>
        <p className="page-subtitle">
          Yeti compiles everything your application requires into a single, production-grade binary that delivers superior performance and unparalleled efficiency in just a few lines of code.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Why Yeti for new apps</div>
        <h2 className="section-title">The power of Rust. The syntax of NodeJS.</h2>
        <p className="section-desc">
          Compiled performance without the build-system tax. Hot-reload feel without the runtime overhead. Less code than an Express + ORM + broker stack — and what you do write, your agent can draft against the built-in MCP knowledge base.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Native by default</div>
            <div className="feature-text">
              Every layer is compiled Rust — the runtime, the resource handlers you write, the storage engine. No GC pause, no interpreter warmup, no driver hop. Sub-millisecond p95 latency on a single core; throughput scales linearly with hardware.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Save-to-reload ergonomics</div>
            <div className="feature-text">
              The dev loop feels like Node: edit a schema and the routing table refreshes; edit a resource and the dylib hot-swaps in under a second; edit a frontend file and the configured pipeline rebuilds. No process restart, no warmup, no <code>nodemon</code>.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">Configure first. Code less.</div>
            <div className="feature-text">
              The seven-directive matrix collapses CRUD, joins, filters, vector search, RBAC, replication, and audit into schema annotations. Most apps write zero handlers. Agents read the live MCP surface to draft what's left, against your actual schema and plugin config.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Why teams pick this over the traditional stack</div>
        <h2 className="section-title">From PoC to production without a rewrite</h2>
        <p className="section-desc">
          A traditional app starts as a script and ends up as a polyrepo with three runtimes, four frameworks, and a deployment pipeline that takes a quarter to build. With Yeti the prototype is the production binary: same Rust runtime, same RocksDB storage, same compiled dylibs, same schema. The architecture you sketch in week one is the architecture you ship in year three.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="archive" />
            <div className="feature-title">From prototype to production</div>
            <div className="feature-text">
              Same <code>Cargo.toml</code>, same schema, same resources you sketched on day one. There's no "we'll rewrite this in Go for performance" milestone, no second team picking up a finished prototype to "harden it for prod." The architecture you reasoned about in week one is the architecture you ship in year three.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">Day-one productive</div>
            <div className="feature-text">
              Save the schema; the routing table refreshes. Save a resource; the dylib swaps in. New apps are a directory drop. The MCP server makes the platform self-documenting — agents draft the schema and resource boilerplate from the same knowledge base humans read. Most contributors push code on their first day.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">One process. Zero overhead.</div>
            <div className="feature-text">
              The API server, the ORM, the migration runner, the message broker, the cache, the worker pool — all collapsed into one binary. When something breaks, there's one place to investigate. When the bill arrives, it's compute, not five managed services with separate growth curves.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Hot reload</div>
        <h2 className="section-title">Update production, instantly</h2>
        <p className="section-desc">
          Schema changes regenerate routes and storage layout. Resource changes recompile to a new dylib and swap in under a second. Static files rebuild via the configured pipeline. There is no restart.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Seamless schema migration</div>
            <div className="feature-text">
              Add a column or change a directive and the routing table, table layout, and validation refresh in-place. In-flight requests complete on the old version.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Dynamic dylib swaps</div>
            <div className="feature-text">
              Resource source changes trigger an incremental cargo build. New dylib loads, old dylib unloads after its requests drain. No process restart, no warmup.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="browser" />
            <div className="feature-title">Static-file pipeline</div>
            <div className="feature-text">
              Bundle a React, Vue, or vanilla frontend. Declare the build command in the manifest. Yeti runs it on save and serves the output with proper caching + SPA fallback.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Composition</div>
        <h2 className="section-title">One Yeti instance, dozens of apps</h2>
        <p className="section-desc">
          Each app runs in its own namespace with isolated storage, routing, and permissions. Auto-load apps from local paths or git URLs in <code>yeti.toml</code> — the platform-level config that selects environment, ports, plugins, and the apps that load on boot.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Multi-app composability</div>
            <div className="feature-text">
              Mount a marketing site, an admin app, and a public API in the same binary. Shared auth, shared telemetry, isolated storage. One process to operate.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">MCP-discoverable</div>
            <div className="feature-text">
              Every app's schemas, exports, RBAC, and audit policy are visible through the built-in MCP server. Your agent introspects each app the same way.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Resource hooks</div>
            <div className="feature-text">
              Pre-request validation, post-request audit, failure alerting — in-process Rust hooks declared on the <code>Service</code> and <code>Resource</code> traits run at the resource boundary without touching handler code.
            </div>
          </div>
        </div>
        <CodeBlock label="yeti-config.yaml">{`environment: production

http:
  port: 443

logging:
  level: info

applications:
  autoLoad:
    - "https://github.com/yetirocks/www"
    - "https://github.com/yetirocks/documentation"`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Anatomy</div>
        <h2 className="section-title">Three files, no scaffolding</h2>
        <p className="section-desc">
          The manifest declares the app's identity and runtime profile. The schema declares the data model and every directive that shapes its behavior. Resources are optional — for most apps the seven-directive matrix removes the need to write any Rust at all.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="clipboard" />
            <div className="feature-title">Cargo.toml manifest</div>
            <div className="feature-text">
              Apps live in <code>Cargo.toml</code> under <code>[package.metadata.app]</code> — version, runtime profile, hooks, static-file pipeline, allow-listed plugins. One file, the canonical source.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="file-text" />
            <div className="feature-title">Schema-driven everything</div>
            <div className="feature-text">
              The schema doesn't just describe data — it describes how data is stored, replicated, exposed, gated, and audited. Seven directives cover every concern.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="wrench" />
            <div className="feature-title">Custom resources on demand</div>
            <div className="feature-text">
              Drop Rust files in <code>resources/</code>. The <code>resource!()</code> macro registers HTTP handlers; Yeti compiles them to native dylibs and hot-reloads on save.
            </div>
          </div>
        </div>
        <CodeBlock label="Cargo.toml">{`[package]
name = "store"
version = "0.1.0"
edition = "2024"

[package.metadata.app]
app_id = "store"
enabled = true
static = { path = "web", source = "source", spa = true, build = "npm install && npm run build" }

# Per-plugin opt-in via sibling metadata tables
[package.metadata.auth]
methods = ["jwt", "oauth"]

[package.metadata.telemetry]
metrics = true

[dependencies]
serde = { version = "1", features = ["derive"] }`}</CodeBlock>
        <CodeBlock label="schemas/schema.graphql">{`type Product
  @table(database: "store")
  @store(durability: "soft", evictAfter: 2592000)
  @distribute(replicationFactor: 3, residency: "full")
  @export(rest: true, graphql: true, sse: true, mqtt: true)
  @access(public: [read], roles: { create: ["admin"], update: ["admin"], delete: ["admin"] })
  @audit(operations: ["create", "update", "delete"], retention: 365, state: true) {
    id: ID! @primaryKey
    name: String!
    price: Float!
    category: String! @indexed
    inStock: Boolean!
}`}</CodeBlock>
        <CodeBlock label="resources/featured.rs">{`use yeti_sdk::prelude::*;

resource!(Featured {
    name = "featured",
    get(ctx) => {
        let products = ctx.table("Product")?
            .query()
            .where_eq("inStock", true)
            .where_eq("category", "highlight")
            .limit(10)
            .execute().await?;
        ok(json!({ "products": products }))
    }
});`}</CodeBlock>
      </section>
    </div>
  )
}
