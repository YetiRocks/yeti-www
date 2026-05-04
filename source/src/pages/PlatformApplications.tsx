import Icon from '../components/Icon'
import CodeBlock from '../components/CodeBlock'

export default function PlatformApplications() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Schema in. App out.</h1>
        <p className="page-subtitle">
          Three files describe a Yeti app: a <code>Cargo.toml</code> manifest, a GraphQL schema, and (optionally) Rust resources. Drop the directory in <code>applications/</code>, and Yeti picks it up — REST, GraphQL, MQTT, MCP, audit, and replication all wired from the schema.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Anatomy</div>
        <h2 className="section-title">Three files, no scaffolding</h2>
        <p className="section-desc">
          The manifest declares the app's identity and runtime profile. The schema declares the data model and every directive that shapes its behavior. Resources are optional — for most apps the seven-directive matrix removes the need to write any Rust at all.
        </p>
        <div className="features-grid">
          <div className="feature-card has-code">
            <Icon name="clipboard" />
            <div className="feature-title">Cargo.toml manifest</div>
            <div className="feature-text">
              Apps live in <code>Cargo.toml</code> under <code>[package.metadata.app]</code> — version, runtime profile, hooks, static-file pipeline, allow-listed plugins. One file, the canonical source.
            </div>
            <CodeBlock label="Cargo.toml">{`[package]
name = "store"
version = "0.1.0"
edition = "2024"

[package.metadata.app]
enabled = true
runtime = "production"
plugins = ["yeti-auth", "yeti-telemetry", "yeti-ai"]
static = { path = "web", source = "source", spa = true, build = "npm install && npm run build" }

[package.metadata.app.hooks]
pre_request = ["./hooks/validate.sh"]
post_request_failure = ["./hooks/alert.sh"]`}</CodeBlock>
          </div>
          <div className="feature-card has-code">
            <Icon name="file-text" />
            <div className="feature-title">Schema-driven everything</div>
            <div className="feature-text">
              The schema doesn't just describe data — it describes how data is stored, replicated, exposed, gated, and audited. Seven directives cover every concern.
            </div>
            <CodeBlock label="schemas/schema.graphql">{`type Product
  @table(database: "store")
  @store(durability: "soft", evictAfter: "30d")
  @distribute(replicationFactor: 3, residency: "full")
  @export(rest: true, graphql: true, sse: true, mqtt: true)
  @access(roles: { read: ["*"], write: ["admin"] })
  @audit(operations: ["write", "delete"], retention: 365, state: true) {
    id: ID! @primaryKey
    name: String!
    price: Float!
    category: String! @indexed
    inStock: Boolean!
}`}</CodeBlock>
          </div>
          <div className="feature-card has-code">
            <Icon name="wrench" />
            <div className="feature-title">Custom resources, when needed</div>
            <div className="feature-text">
              Drop Rust files in <code>resources/</code>. The <code>resource!()</code> macro registers HTTP handlers; Yeti compiles them to native dylibs and hot-reloads on save.
            </div>
            <CodeBlock label="resources/featured.rs">{`use yeti_sdk::prelude::*;

resource!(Featured {
    name = "featured",
    get(ctx) => {
        let products = ctx.table("Product")
            .filter("inStock=eq=true,category=eq=highlight")
            .limit(10)
            .fetch().await?;
        ok(json!({ "products": products }))
    }
});`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Hot reload</div>
        <h2 className="section-title">Save the file. The platform updates.</h2>
        <p className="section-desc">
          Schema changes regenerate routes and storage layout. Resource changes recompile to a new dylib and swap in under a second. Static files rebuild via the configured pipeline. There is no restart.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Schema reloads</div>
            <div className="feature-text">
              Add a column or change a directive and the routing table, table layout, and validation refresh in-place. In-flight requests complete on the old version.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Dylib swaps</div>
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
          <div className="feature-card has-code">
            <Icon name="layers" />
            <div className="feature-title">Multi-app composability</div>
            <div className="feature-text">
              Mount a marketing site, an admin app, and a public API in the same binary. Shared auth, shared telemetry, isolated storage. One process to operate.
            </div>
            <CodeBlock label="yeti.toml">{`environment = "production"
rootDirectory = "/opt/yeti"

[http]
port = 443

[logging]
level = "info"

[applications]
autoLoad = [
    "https://github.com/yetirocks/www",
    "https://github.com/yetirocks/documentation",
    "/opt/yeti/applications/store",
]`}</CodeBlock>
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
              Pre-request validation, post-request audit, failure alerting — shell commands declared in the manifest run at the resource boundary without touching handler code.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
