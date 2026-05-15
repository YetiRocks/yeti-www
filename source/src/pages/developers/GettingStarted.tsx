import { Link } from '@tanstack/react-router'
import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function GettingStarted() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">A composable toolkit for agent-assisted, agent-driven, and autonomous development.</h1>
        <p className="page-subtitle">
          Yeti gives developers — and their robots — every primitive they need to ship a production-hardened backend in one binary. The MCP server and knowledge base teach the agent. The seven-directive matrix removes most boilerplate. The compiled Rust SDK keeps the hot path fast.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Three modes of building</div>
        <h2 className="section-title">Pick how much your agent does</h2>
        <p className="section-desc">
          Yeti's MCP surface is the same in every mode. What changes is how much of the loop your agent owns.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">Agent-Assisted</div>
            <div className="feature-text">
              You drive. Cursor or Claude completes against the MCP knowledge base — schema scaffolds, directive options, FIQL syntax, plugin config. You merge every change.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Agent-Driven</div>
            <div className="feature-text">
              Agent scaffolds the whole feature: schema, resources, tests. You review the diff, request edits, merge. The MCP server prevents the agent from inventing APIs that don't exist.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">Autonomous</div>
            <div className="feature-text">
              Agent owns the repo. Issues come in, schema and resources go out, deploys ship. The knowledge base + audit log keep the loop honest. Humans review weekly, not per-PR.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Step 1</div>
        <h2 className="section-title">Define the data model</h2>
        <p className="section-desc">
          Drop a GraphQL schema in <code>schemas/schema.graphql</code>. Annotate each table with whichever directives apply — most apps need only a subset.
        </p>
        <CodeBlock label="schemas/schema.graphql">{`type Product
  @table(database: "store")
  @store(durability: "soft", evictAfter: 2592000)
  @distribute(replicationFactor: 3, residency: "full")
  @export(rest: true, graphql: true, sse: true)
  @access(public: [read], roles: { create: ["admin"], update: ["admin"], delete: ["admin"] })
  @audit(operations: ["create", "update", "delete"], retention: 365, state: true) {
    id: ID! @primaryKey
    name: String!
    price: Float!
    category: String! @indexed
    inStock: Boolean!
}`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Step 2</div>
        <h2 className="section-title">Configure the app</h2>
        <p className="section-desc">
          The app manifest lives in <code>Cargo.toml</code> under <code>[package.metadata.app]</code>. Pick the runtime profile, opt in to plugins, declare the static-file pipeline, register hooks. The compiler reads it.
        </p>
        <CodeBlock label="Cargo.toml">{`[package]
name = "store"
version = "0.1.0"
edition = "2024"

[package.metadata.app]
app_id = "store"
enabled = true
static = { path = "web", source = "source", spa = true, build = "npm install && npm run build" }

# Per-plugin opt-in via sibling tables. yeti-sdk is injected by the
# scaffolder — never add it to [dependencies] yourself.
[package.metadata.auth]
methods = ["oauth", "jwt"]

[package.metadata.telemetry]
metrics = true

[package.metadata.vectors]
model = "BAAI/bge-small-en-v1.5"

[dependencies]
serde = { version = "1.0", features = ["derive"] }`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Step 3</div>
        <h2 className="section-title">Add custom logic only when you need it</h2>
        <p className="section-desc">
          With the seven-directive matrix, you rarely have to write a custom resource at all — CRUD, joins, filters, vector search, RBAC, and audit are all data, not code. When you do need behavior beyond the schema, drop a Rust file in <code>resources/</code>. The <code>resource!()</code> macro registers handlers; the platform compiles them to a native dylib and hot-reloads on save.
        </p>
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
    },
    post(ctx) => {
        let body = ctx.require_json_body()?;
        let id = body["id"].as_str().ok_or_else(|| YetiError::Validation("id required".into()))?;
        ctx.table("Product")?
            .patch(id, json!({ "category": "highlight" }))
            .await?;
        no_content()
    }
});`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Step 4</div>
        <h2 className="section-title">Drop it in and go</h2>
        <p className="section-desc">
          Put the application directory under <code>~/yeti/applications/</code> (or auto-load it from a git URL in <code>yeti.toml</code>). Run <code>yeti start</code>. The platform discovers the app, compiles resources, applies schema directives, and serves the API.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">What you get</div>
            <div className="feature-text">
              REST + FIQL + GraphQL + WebSocket + SSE on every <code>@export</code>'d table. RBAC enforced from <code>@access</code>. Audit captured per <code>@audit</code>'s retention policy. Replication shaped by <code>@distribute</code>. Hot reload on every save.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">What you didn't write</div>
            <div className="feature-text">
              No router. No ORM. No migration scripts. No auth middleware. No message broker. No vector database. No workflow engine. No deployment YAML. Each one is a directive or a plugin opt-in.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Built-in toolkit</div>
        <h2 className="section-title">Why agents get it right the first time</h2>
        <p className="section-desc">
          Every Yeti instance ships with the agent infrastructure built in. No custom integrations. No API wrappers. The agent connects, queries, and codes.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">MCP server</div>
            <div className="feature-text">
              Standard Model Context Protocol surface over your schemas, tables, resources, and configuration. Connect any MCP-compatible agent.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Vector knowledge base</div>
            <div className="feature-text">
              Every doc page, every example, every directive option — pre-embedded at build time. Agents query before generating code.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Compiled Rust dylibs</div>
            <div className="feature-text">
              Custom logic compiles to a native dylib and hot-swaps in under a second. Native speed, no warmup, no GC pause.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Comprehensive SDK</div>
            <div className="feature-text">
              <code>yeti_sdk::prelude::*</code> exports <code>resource!</code>, <code>queue!</code>, <code>Context</code>, table abstractions, JSON helpers, and platform error types. One import covers most handlers.
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <p className="section-desc">
          See it in action — <Link to="/developers/demos">interactive demos</Link>, or dig into the building blocks on the <Link to="/platform/applications">platform overview</Link>.
        </p>
      </section>
    </div>
  )
}
