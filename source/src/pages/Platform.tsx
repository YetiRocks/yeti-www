import Icon from '../components/Icon'
import Code from '../components/Code'

export default function Platform() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Faster Applications, Faster.</h1>
        <p className="page-subtitle">
          Agent-friendly building blocks that look like NodeJS, but run like Rust.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Agents</div>
        <h2 className="section-title">Designed For Agent-Driven Development</h2>
        <p className="section-desc">
          Every table gets REST, GraphQL, SSE, and WebSocket endpoints with consistent naming and filtering. Connect an MCP-compatible agent - Claude, Cursor, Copilot - and it introspects your schema, queries live data, and builds applications through a standardized protocol. Agents understand your app the same way a senior developer would.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">Built-In MCP Server</div>
            <div className="feature-text">
              Every Yeti instance ships with a Model Context Protocol server. Connect any MCP-compatible agent and it gets deep platform context - architecture, APIs, constraints, and your installed applications. Agents query a semantic knowledge base to build and maintain apps with full context.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Guided Skills System</div>
            <div className="feature-text">
              Pre-built multi-step workflows guide agents through common tasks: creating applications, adding authentication, setting up vector search, migrating from other platforms. Agents follow proven patterns with full context at every step.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Applications</div>
        <h2 className="section-title">Declare, Don't Code</h2>
        <p className="section-desc">
          An application is a directory with three files: a GraphQL schema, a YAML config, and optional Rust code. Drop it into the applications folder. Yeti picks it up, hot-reloads code changes, and compiles on save. No restart needed.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="file-text" />
            <div className="feature-title">Declarative Configuration</div>
            <div className="feature-text">
              Define your data model in GraphQL with custom directives for tables, indexes, relationships, and export paths. Yeti generates CRUD operations, query filtering, pagination, and real-time subscriptions from that schema.
            </div>
            <Code label="schema.graphql">{`type Product @table @export {
    id: ID! @primaryKey
    name: String!
    price: Float!
    category: String! @indexed
    inStock: Boolean!
}`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="wrench" />
            <div className="feature-title">Custom Resources</div>
            <div className="feature-text">
              When you need logic beyond CRUD, add a resource file. Yeti compiles it to a native dynamic library and hot-reloads on every save. Full access to the request context, storage backends, and extension APIs.
            </div>
            <Code label="greeting.rs">{`/// Import Yeti's JS-like abstractions (!)
use yeti_sdk::prelude::*;

/// Simple custom resource using concise syntax
resource!(Greeting {
  get => json!({"greeting": "Hello, World!"})
});`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="browser" />
            <div className="feature-title">Static Files</div>
            <div className="feature-text">
              Bundle a React, Vue, or any frontend alongside your API. Point Yeti at a static files directory and it serves with proper caching headers and SPA fallback.
            </div>
            <Code label="config.yaml">{`static_files:
  path: web
  route: /
  index: index.html
  notFound:
    file: index.html
    statusCode: 200
  build:
    sourceDir: source
    command: npm run build`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Multi-App Composability</div>
            <div className="feature-text">
              Each app runs in its own namespace with isolated storage, routing, and permissions. A single Yeti instance hosts dozens of applications, scaling each independently.
            </div>
            <Code label="config.yaml">{`environment: production
rootDirectory: /opt/yeti
http:
  port: 443
logging:
  level: info
applications:
  - https://github.com/yetirocks/www
  - https://github.com/yetirocks/documentation
  - https://github.com/yetirocks/demos
`}</Code>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Data</div>
        <h2 className="section-title">Two Storage Engines. One API.</h2>
        <p className="section-desc">
          An ACID database with NoSQL and FIQL query capabilities, plus a streaming message queue that scales past 200M writes/sec for high-throughput event pipelines. Same schema, same API surface. Pick the backend that fits the access pattern.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">ACID Database</div>
            <div className="feature-text">
              Globally replicated, eventually consistent, ACID compliant at the node. Built on RocksDB, scales horizontally across regions with configurable replication and conflict resolution.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Streaming Message Queue</div>
            <div className="feature-text">
              Append-only streaming for event sourcing, CDC, and high-throughput pipelines. Kafka-compatible protocol in pure Rust with zero-copy overhead. Built for audit logs, telemetry, and event-driven architectures.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Vectors</div>
        <h2 className="section-title">Fast, Dynamic, Composable Search</h2>
        <p className="section-desc">
          Not all searches are the same. Yeti supports multi-table joins, full-text search, and vector search with auto-embedding. Combine any search type with logical operators for precision and speed.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">Declarative Relationships</div>
            <div className="feature-text">
              Define relationships with <code>@relationship</code> directives - Yeti
              resolves joins automatically in REST and GraphQL.

              <Code label="schema.graphql">{`type Author @table @export {
    id: ID! @primaryKey
    name: String!
    bio: String
    books: [Book] @relationship(to: "authorId")
}

type Book @table @export {
    id: ID! @primaryKey
    title: String!
    authorId: ID! @indexed
    author: Author @relationship(from: "authorId")
}`}</Code>
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">REST + FIQL + GraphQL Queries</div>
            <div className="feature-text">
              Filter, sort, select, order. Key-value, full-text, vector. URL-safe, composable, and auto-generated from your schema.
            </div>
            <Code label="query.graphql">{`{
  Author(id: "author-1") {
    name
    books {
      title
    }
  }
}`}</Code>
            <Code label="query.fiql">{` GET /Author/author-1?select=name,books{title} `}</Code>
          </div>
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">Vector Index Declaration</div>
            <div className="feature-text">
              Mark a field as <code>Vector @indexed</code> to generate and search using default or custom embedding models.
            </div>
            <Code label="schema.graphql">{`type Article @table @export {
  id: ID! @primaryKey
  title: String!
  author: String!
  category: String!
  tags: String
  text: String!
  embedding: Vector @indexed(source: "text")
}`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Simple Vector Searches</div>
            <div className="feature-text">
              Query with FIQL or JSON. Combine with other logical operators for better precision.

              <Code label="query.json">{`{
  "table": "Article",
  "conditions": [
    {
      "field": "embedding",
      "op": "vector",
      "value": "african swallow airspeed"
    }
  ]
}`}</Code>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Interfaces</div>
        <h2 className="section-title">Real-Time Out of the Box</h2>
        <p className="section-desc">
          Every table change fires a PubSub event. Subscribe via SSE, WebSocket, MQTT, or MCP to get live updates with zero config. Dashboards, chat, AI agents, collaborative tools - all natively real-time.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Server-Sent Events</div>
            <div className="feature-text">
              Append <code>?stream=sse</code> to any table endpoint for a persistent event
              stream. Automatic reconnection, last-event-ID support, and per-table or global
              subscription scoping.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">WebSocket + PubSub</div>
            <div className="feature-text">
              Full WebSocket support for bidirectional communication. Internal PubSub bus
              coordinates events across tables, extensions, and connected clients with
              topic-based routing.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="broadcast" />
            <div className="feature-title">MQTT Broker</div>
            <div className="feature-text">
              Built-in MQTT broker with native MQTTS on port 8883 and WebSocket proxy
              at <code>/mqtt</code>. Publish and subscribe to table changes over standard
              MQTT topics with integrated auth.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">MCP Server</div>
            <div className="feature-text">
              Model Context Protocol support lets AI agents discover and interact with
              your tables and resources as tools. Connect Claude, GPT, or any MCP-compatible
              client directly to your running application.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Extensions</div>
        <h2 className="section-title">Production Building Blocks</h2>
        <p className="section-desc">
          Extensions are shared services that apps opt into. Each one provides tables, API endpoints, and lifecycle hooks. Declare them in config.yaml and configure per-app behavior inline. Yeti ships with four built-in extensions and supports custom ones for specialized needs.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">yeti-auth</div>
            <div className="feature-text">
              Basic, JWT, and OAuth authentication with RBAC. Argon2id
              password hashing, configurable token TTLs, email-pattern role mapping, CSRF
              protection, and per-attribute field-level permissions.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">yeti-telemetry</div>
            <div className="feature-text">
              Log, span, and metric collection with a built-in dashboard. OTLP export to
              Grafana, Datadog, or any OpenTelemetry collector. File rotation, real-time
              SSE streaming, and REST query API.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">yeti-vectors</div>
            <div className="feature-text">
              Automatic text and image embedding on every insert and update. Five models
              from BAAI and Sentence Transformers. Persistent embedding cache shared across
              apps. HNSW vector indexing with configurable distance metrics.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="monitor" />
            <div className="feature-title">yeti-applications</div>
            <div className="feature-text">
              Web-based app manager. Browse, create, edit, and delete applications
              through a React UI. File browser, schema parsing, Git integration, and SSH
              deploy key management.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
