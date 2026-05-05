import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function Databases() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Stop Defining Your Data's Shape.<br />Start Defining Its Life.</h1>
        <p className="page-subtitle">
          Data is the lifeblood of your application. Yeti makes it easy to define how daat exists, grows, and moves around your topology. Identity, durability, origin, placement, protocol, auth, and audit each get directives to help you craft that lifecycle — orthogonal axes to suit any purpose.
        </p>
      </div>

      <section className="section">
        <div className="section-label">SO. MANY. CHOICES.</div>
        <h2 className="section-title">Relational, Document, Vector... Oh My!</h2>
        <p className="section-desc">
          A typical product's storage layer is a dependency graph of five engines, three SDKs, two ORMs, and a migration runner. Yeti collapses all of it onto one RocksDB-backed table type. You don't pick a database — you pick directives. Walk a typical shopping list and watch each requirement become an annotation on the same schema.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="file-text" />
            <div className="feature-title">Schema diffs &gt; SQL migrations</div>
            <div className="feature-text">
              Add a column or change a directive. The routing table, the table layout, and the validation refresh in-place; in-flight requests complete on the old version. Alembic, Flyway, and the "migration freeze" Slack thread go away. The schema is the source of truth — including its history.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">From RAM to Iceberg</div>
            <div className="feature-text">
              <code>@store(durability: "memory", evictAfter: "1h")</code>. With Yeti, data stops living in a fragile web of disk and network and cache. Where data resides is a function of how its used — from geo-replication to tiered media, it's exactly where it needs to be.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Vector data, not databases</div>
            <div className="feature-text">
              <code>embedding: Vector @indexed(source: "content")</code>. <code>yeti-ai</code> auto-embeds on insert; the HNSW index builds incrementally. Query similarity with the same FIQL you use for filters. Vector representations stay right where they belong.
            </div>
          </div>
        </div>
        <CodeBlock label="schemas/schema.graphql">{`type Order
  @table(database: "store")
  @store(durability: "strong", evictAfter: "10y")
  @source(url: "https://erp.example.com/orders/{id}", staleAfter: 30, swr: true)
  @distribute(replicationFactor: 3, residency: "us")
  @export(rest: true, graphql: true, sse: true, mqtt: true, mcp: true)
  @access(roles: { read: ["customer", "admin"], write: ["admin"] })
  @audit(operations: ["write", "delete"], retention: 2555, state: true) {
    id: ID! @primaryKey
    customerId: ID! @indexed
    total: Float!
    status: String! @indexed
    placedAt: Int!
}`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Things that disappear</div>
        <h2 className="section-title">What collapses when storage moves into the binary</h2>
        <p className="section-desc">
          A traditional stack reaches for Postgres for transactional data, Redis for caches, Pinecone for vectors, Mongo for docs, Elasticsearch for full-text — each with its own driver, its own auth, its own migration ceremony, its own bill. Move all of it inside the binary and the surrounding scaffolding stops being necessary.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="archive" />
            <div className="feature-title">The connection pool</div>
            <div className="feature-text">
              RocksDB is in-process. There's no driver, no pool config, no "the limit was 100 and we hit 99 in production" thread. Reads and writes never cross a network boundary; the latency floor is what RocksDB itself can do — measured in microseconds.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">The migration runner</div>
            <div className="feature-text">
              Schema diffs apply on save. No Alembic, no Flyway, no shadow database, no "downtime window for the migration." In-flight requests complete on the previous schema; the next ones see the new one. CI doesn't block on a migration step because there isn't one.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">The cache invalidation problem</div>
            <div className="feature-text">
              Cache state IS table state, dialed to <code>durability: "memory"</code>. There's no separate Redis to keep in sync, no TTL to forget, no two-tier eviction strategy to design. "The two hard problems" become one — naming things.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">The matrix</div>
        <h2 className="section-title">Seven directives, seven concerns</h2>
        <p className="section-desc">
          Older platforms cram every concern into one overloaded annotation. Yeti separates them so you can dial each axis independently. Add a directive for the concern you need; omit the rest and inherit sensible defaults.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="directive-header">
              <Icon name="file-text" />
              <code className="directive-name">@table</code>
            </div>
            <div className="feature-title">Identity</div>
            <div className="feature-text">
              Names the table and the database it lives in. Everything else is optional.
            </div>
          </div>
          <div className="feature-card">
            <div className="directive-header">
              <Icon name="database" />
              <code className="directive-name">@store</code>
            </div>
            <div className="feature-title">Storage engine</div>
            <div className="feature-text">
              Four-tier durability (memory / lossy / soft / strong), volume placement, eviction, compression — picked per table.
            </div>
          </div>
          <div className="feature-card">
            <div className="directive-header">
              <Icon name="cloud-download" />
              <code className="directive-name">@source</code>
            </div>
            <div className="feature-title">Cache-aside</div>
            <div className="feature-text">
              Declare an upstream URL or function. Yeti caches with <code>staleAfter</code> + stale-while-revalidate. No glue code.
            </div>
          </div>
          <div className="feature-card">
            <div className="directive-header">
              <Icon name="globe" />
              <code className="directive-name">@distribute</code>
            </div>
            <div className="feature-title">Replication</div>
            <div className="feature-text">
              Full, sharded, or geo-subset replication; replication factor; consistency mode. Per table.
            </div>
          </div>
          <div className="feature-card">
            <div className="directive-header">
              <Icon name="radio" />
              <code className="directive-name">@export</code>
            </div>
            <div className="feature-title">Protocol exposure</div>
            <div className="feature-text">
              Toggle REST, GraphQL, WebSocket, SSE, MQTT, MCP, gRPC. The binary regenerates the surface on save.
            </div>
          </div>
          <div className="feature-card">
            <div className="directive-header">
              <Icon name="lock" />
              <code className="directive-name">@access</code>
            </div>
            <div className="feature-title">Authorization</div>
            <div className="feature-text">
              Per-operation RBAC matrix. Public ops, role-gated ops, field-level overrides. Wired to <code>yeti-auth</code>.
            </div>
          </div>
          <div className="feature-card">
            <div className="directive-header">
              <Icon name="shield" />
              <code className="directive-name">@audit</code>
            </div>
            <div className="feature-title">Compliance</div>
            <div className="feature-text">
              Per-operation audit trails with optional before/after state capture. Retention configurable per table.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Storage tiers</div>
        <h2 className="section-title">Pick durability per table</h2>
        <p className="section-desc">
          The four-tier <code>@store(durability:)</code> scale lets you trade write latency for crash safety without changing engines or providers.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">memory</div>
            <div className="feature-text">
              Pure RAM, no WAL. Fastest. Use for caches, session state, transient indexes. Lost on restart.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">lossy</div>
            <div className="feature-text">
              RAM with periodic snapshots. Bounded crash-loss. Good for high-volume telemetry where dropping a few seconds is acceptable.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="archive" />
            <div className="feature-title">soft (default)</div>
            <div className="feature-text">
              WAL with bounded <code>flushIntervalMs</code>. Crash-safe to within milliseconds. The right choice for most workloads.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">strong</div>
            <div className="feature-text">
              WAL + fsync per write. Financial-grade. Use for ledgers, money movement, regulatory state.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Replication</div>
        <h2 className="section-title">Per-table topology</h2>
        <p className="section-desc">
          <code>@distribute</code> chooses the shape: full, sharded, or geo-subset. The replication mesh handles WAL shipping with hybrid logical clocks; you choose the consistency knob per table.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">full</div>
            <div className="feature-text">
              Every node, every record. Default for tables under a configurable size threshold. Reads always local.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="share-2" />
            <div className="feature-title">shard</div>
            <div className="feature-text">
              HRW-placed across N nodes. Automatic. Use for large tables where full replication is wasteful.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="map" />
            <div className="feature-title">geo-subset</div>
            <div className="feature-text">
              Constrain to specific regions for residency rules. License tables, regional inventory, jurisdiction-locked data.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Cache-aside</div>
        <h2 className="section-title">Federate upstream sources, declaratively</h2>
        <p className="section-desc">
          Cache-aside used to mean writing a service. With <code>@source</code>, you declare the upstream in the schema. Yeti handles fetch, cache, freshness, and stale-while-revalidate.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">URL-backed sources</div>
            <div className="feature-text">
              Point at an HTTP endpoint with <code>&#123;id&#125;</code> substitution. Yeti caches responses, refreshes on <code>staleAfter</code>, and serves stale results during background revalidation.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">Function-backed sources</div>
            <div className="feature-text">
              Point at a Rust function for derived tables — aggregates, scoring, transforms. Same caching semantics; no glue code.
            </div>
          </div>
        </div>
        <CodeBlock label="schemas/schema.graphql">{`type Catalog
  @table(database: "store")
  @store(durability: "soft", evictAfter: "1h")
  @source(url: "https://upstream.example.com/products/{id}", staleAfter: 60, swr: true)
  @export(rest: true, graphql: true)
  @access(roles: { read: ["*"] }) {
    id: ID! @primaryKey
    name: String!
    description: String!
}`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Vector search</div>
        <h2 className="section-title">Semantic queries without a second database</h2>
        <p className="section-desc">
          Mark a field as <code>Vector @indexed</code> with an embedding source. Yeti generates embeddings on insert/update via the <code>yeti-ai</code> plugin. Combine vector similarity with FIQL filters in one query.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Embedding-as-a-field</div>
            <div className="feature-text">
              Add <code>embedding: Vector @indexed(source: "content")</code> and Yeti auto-embeds on write. HNSW index built incrementally. Query by similarity with a single URL parameter.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">Combine vector with filters</div>
            <div className="feature-text">
              Vector similarity is one operator among many. Compose with category, tags, time windows, joins — everything else FIQL/GraphQL gives you.
            </div>
          </div>
        </div>
        <CodeBlock label="schemas/schema.graphql">{`type Article
  @table(database: "knowledge")
  @store(durability: "soft")
  @export(rest: true)
  @access(roles: { read: ["*"], write: ["editor"] }) {
    id: ID! @primaryKey
    title: String!
    content: String!
    tags: String
    embedding: Vector @indexed(source: "content", model: "BAAI/bge-small-en-v1.5")
}`}</CodeBlock>
        <CodeBlock label="query.json">{`{
  "table": "Article",
  "conditions": [
    { "field": "embedding", "op": "vector", "value": "african swallow airspeed" },
    { "field": "tags", "op": "contains", "value": "biology" }
  ],
  "limit": 10
}`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Queries</div>
        <h2 className="section-title">REST + FIQL + GraphQL — same schema</h2>
        <p className="section-desc">
          Pick the surface that fits the client. Browsers and curl get REST + FIQL. Application code gets GraphQL. Streaming clients get SSE/WS. The schema is the source of truth.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">GraphQL</div>
            <div className="feature-text">
              Typed queries, mutations, subscriptions. Yeti resolves <code>@relationship</code> joins automatically.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">REST + FIQL</div>
            <div className="feature-text">
              URL-safe filter DSL. Composable. Auto-generated. Stream live updates with <code>?stream=sse</code>.
            </div>
          </div>
        </div>
        <CodeBlock label="query.graphql">{`{
  Author(id: "author-1") {
    name
    books {
      title
      publishedYear
    }
  }
}`}</CodeBlock>
        <CodeBlock label="query.fiql">{`GET /Author/author-1?select=name,books{title}
GET /Article?embedding=vector="machine learning";tags=in=("ai","ml")&stream=sse`}</CodeBlock>
      </section>
    </div>
  )
}
