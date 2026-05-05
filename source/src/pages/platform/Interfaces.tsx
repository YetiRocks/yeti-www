import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function Interfaces() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">The Right Messenger For Every Message.</h1>
        <p className="page-subtitle">
          REST, GraphQL, WebSocket, SSE, MQTT, MCP, gRPC, Kafka bridge. Auto-generated from your schema. Toggle protocols per table with the <code>@export</code> directive — the binary regenerates the surface on hot-reload.
        </p>
      </div>

      <section className="section">
        <div className="section-label">The schema is the contract</div>
        <h2 className="section-title">Eight protocols. Same schema. Toggled per table.</h2>
        <p className="section-desc">
          A traditional service picks a protocol up front, builds the framework around it, ships an SDK, then writes a translator the day a second client needs a different protocol. Yeti generates every protocol from the schema and toggles them per table. You don't decide REST-or-GraphQL on day one; you flip a boolean on day eighty when an agent shows up wanting MCP.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">REST + FIQL aren't a framework</div>
            <div className="feature-text">
              Auto-generated CRUD on every <code>@export(rest: true)</code> table. URL-safe filter DSL with eq, gt, ct, in, vector. Pageable, sortable, composable. Add a column to the schema; the endpoint refreshes. No Express scaffolding, no <code>express-validator</code> middleware, no OpenAPI-spec drift.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Real-time isn't an architecture</div>
            <div className="feature-text">
              The PubSub bus runs in-process. <code>?stream=sse</code> on any endpoint streams live updates with last-event-ID resumption. WebSocket fanout costs a function call, not a broker hop. There's no Socket.io service, no Ably bill, no "real-time architecture" review.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">MCP is your agent's native tongue</div>
            <div className="feature-text">
              Every Yeti instance ships an MCP server. Schemas, exports, RBAC, and audit policy are introspectable as MCP tools. Claude, Cursor, Copilot, and Windsurf all connect with zero custom integration. The protocol your agent already speaks is a first-class output, not an afterthought.
            </div>
          </div>
        </div>
        <CodeBlock label="schemas/schema.graphql">{`type Telemetry
  @table(database: "fleet")
  @store(durability: "lossy", evictAfter: "30d")
  @distribute(replicationFactor: 1, residency: "regional")
  @export(rest: true, graphql: true, sse: true, ws: true, mqtt: true, mcp: true, grpc: true, kafka: true)
  @access(roles: { read: ["operator", "admin"], write: ["device"] }) {
    id: ID! @primaryKey
    deviceId: ID! @indexed
    metric: String! @indexed
    value: Float!
    recordedAt: Int! @indexed
}`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Synchronous</div>
        <h2 className="section-title">Request paths from one schema</h2>
        <p className="section-desc">
          The schema defines the data; Yeti generates the endpoints. REST + FIQL for browsers and tools. GraphQL for typed clients. gRPC for service-to-service. No router code. No serialization glue.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">REST + FIQL</div>
            <div className="feature-text">
              Auto-generated CRUD on every table. URL-safe filter DSL with eq, gt, ge, lt, le, ct, sw, ew, ft, in, vector. Composable. Pageable. Sortable.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">GraphQL</div>
            <div className="feature-text">
              Typed queries, mutations, subscriptions from the same schema. <code>@relationship</code> joins resolve automatically. Subscriptions piggyback on the PubSub bus.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">gRPC</div>
            <div className="feature-text">
              Strict typed RPC for service-to-service paths where every microsecond counts. Generated stubs match the schema; no IDL drift.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Real-time</div>
        <h2 className="section-title">Subscriptions, broadcast, and brokers</h2>
        <p className="section-desc">
          Every table change fires a PubSub event. Subscribe over the protocol that fits the client. Browser dashboards take SSE. Bidirectional UIs take WebSocket. Devices take MQTT. External streams bridge to Kafka. All from one config knob.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Server-Sent Events</div>
            <div className="feature-text">
              Append <code>?stream=sse</code> to any table endpoint. Persistent stream with auto-reconnect, last-event-ID resumption, and per-table or global subscription scoping.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">WebSocket + PubSub</div>
            <div className="feature-text">
              Bidirectional channels. Call <code>table.subscribe_all()</code> or <code>table.publish()</code> from any resource handler. Internal PubSub bus coordinates events with topic-based routing.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="broadcast" />
            <div className="feature-title">Native MQTT broker</div>
            <div className="feature-text">
              No Mosquitto, no managed broker. Built-in MQTT broker on port 8883 with WebSocket proxy at <code>/mqtt</code>. Auth integrates with the same RBAC system as your REST endpoints.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Kafka bridge</div>
            <div className="feature-text">
              Fan PubSub events to and from Kafka topics for upstream analytics or external consumers. The bridge is config; the topic mapping is data.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Agent surface</div>
        <h2 className="section-title">MCP-first, by default</h2>
        <p className="section-desc">
          Every Yeti instance ships with a Model Context Protocol server. Schemas, queries, resources, and the knowledge base are exposed as MCP tools. Connect any MCP-compatible agent — Claude, Cursor, Copilot, Windsurf — and it discovers your platform without custom integration.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">MCP server</div>
            <div className="feature-text">
              Live introspection over schemas, exports, RBAC, and audit policy. Agents query with full context — they don't guess your API shape.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Vector-indexed knowledge base</div>
            <div className="feature-text">
              Every doc page, every example, every directive option — pre-embedded at build time. Agents query before generating code.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Webhook ingress</div>
            <div className="feature-text">
              Built-in webhook delivery, retries, signature validation. Subscribe other systems to your tables without writing handlers.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Per-table exposure</div>
        <h2 className="section-title">@export shapes the surface</h2>
        <p className="section-desc">
          Protocol exposure is data, not code. Toggle per table. The binary regenerates routes, subscriptions, and broker bindings on save.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="clipboard" />
            <div className="feature-title">Toggle protocols per table</div>
            <div className="feature-text">
              Public read-only resource? <code>rest: true, graphql: true</code>. IoT telemetry? Add <code>mqtt: true, sse: true</code>. Internal compute table? Omit <code>@export</code> entirely — no surface, no leakage.
            </div>
          </div>
        </div>
        <CodeBlock label="schemas/schema.graphql">{`type Order
  @table(database: "store")
  @store(durability: "strong")
  @distribute(replicationFactor: 3)
  @export(rest: true, graphql: true, sse: true, mqtt: false)
  @access(roles: { read: ["customer", "admin"], write: ["admin"] })
  @audit(operations: ["write", "delete"], retention: 2555, state: true) {
    id: ID! @primaryKey
    customerId: ID! @indexed
    total: Float!
    status: String! @indexed
    placedAt: Int!
}`}</CodeBlock>
      </section>
    </div>
  )
}
