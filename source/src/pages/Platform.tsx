import { Link } from '@tanstack/react-router'
import Icon from '../components/Icon'

export default function Platform() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Stack In A Box.</h1>
        <p className="page-subtitle">
          Five layers, one binary. REST, GraphQL, WebSocket, SSE, MQTT, MCP, gRPC. Embedded storage, auth, vector search, durable functions, observability. Pick a layer to dive in.
        </p>
      </div>

      <section className="section">
        <div className="features-grid">
          <Link to="/platform/applications" className="feature-card platform-hub-card">
            <Icon name="file-text" />
            <div className="feature-title">Applications</div>
            <div className="feature-text">
              A directory with a <code>Cargo.toml</code> manifest, a GraphQL schema, and optional Rust resource files. Drop it in; Yeti picks it up. Hot-reload on save.
            </div>
            <div className="feature-cta">Explore →</div>
          </Link>
          <Link to="/platform/databases" className="feature-card platform-hub-card">
            <Icon name="database" />
            <div className="feature-title">Databases</div>
            <div className="feature-text">
              RocksDB-backed tables shaped by seven directives — identity, storage, source, replication, exposure, access, audit. Each concern, one home.
            </div>
            <div className="feature-cta">Explore →</div>
          </Link>
          <Link to="/platform/interfaces" className="feature-card platform-hub-card">
            <Icon name="radio" />
            <div className="feature-title">Interfaces</div>
            <div className="feature-text">
              REST, GraphQL, WebSocket, SSE, MQTT, MCP, gRPC, Kafka bridge — auto-generated from your schema. Toggle protocols per table with <code>@export</code>.
            </div>
            <div className="feature-cta">Explore →</div>
          </Link>
          <Link to="/platform/plugins" className="feature-card platform-hub-card">
            <Icon name="layers" />
            <div className="feature-title">Plugins</div>
            <div className="feature-text">
              First-party plugins for auth, telemetry, AI, durable functions, and admin — all in the binary. Build your own with the plugin SDK and live-reload them too.
            </div>
            <div className="feature-cta">Explore →</div>
          </Link>
          <Link to="/platform/fabric" className="feature-card platform-hub-card">
            <Icon name="globe" />
            <div className="feature-title">Fabric</div>
            <div className="feature-text">
              Managed multi-region deployment with mTLS replication mesh, per-deployment encryption, centralized placement, and agentic monitoring. Push to main, run globally.
            </div>
            <div className="feature-cta">Explore →</div>
          </Link>
        </div>
      </section>
    </div>
  )
}
