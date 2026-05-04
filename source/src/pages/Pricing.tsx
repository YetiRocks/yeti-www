import Icon from '../components/Icon'

interface PricingProps {
  onGetStarted: () => void
}

export default function Pricing({ onGetStarted }: PricingProps) {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Run it free, run it global, same binary.</h1>
        <p className="page-subtitle">
          The full Yeti platform is free to download and run. When you're ready to scale across regions, Yeti Fabric runs the same binary as a managed multi-tenant deployment with auto-scaling, agentic monitoring, and pay-as-you-go pricing.
        </p>
      </div>

      <div className="pricing-grid">
        <div className="pricing-card">
          <div className="pricing-card-header">
            <div className="pricing-tier-label">
              <Icon name="bolt" />
              <span>Self-Hosted</span>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount">$0</span>
              <span className="pricing-period">/ forever</span>
            </div>
          </div>
          <ul className="pricing-features">
            <li>Single-binary download — Linux, macOS, Windows</li>
            <li>Every plugin: auth, telemetry, AI, durable functions, admin UI</li>
            <li>All client interfaces: REST, GraphQL, WebSocket, SSE, MQTT, MCP, gRPC</li>
            <li>Embedded RocksDB storage with the seven-directive matrix</li>
            <li>Built-in MCP server + vector-indexed knowledge base</li>
            <li>Local development + production deployment, same binary</li>
            <li>Self-hosted on your infrastructure</li>
          </ul>
          <div className="pricing-cta">
            <button className="btn btn-lg pricing-btn pricing-btn-outline" onClick={onGetStarted}>Download</button>
          </div>
        </div>

        <div className="pricing-card pricing-card-center">
          <div className="pricing-card-header">
            <div className="pricing-tier-label">
              <Icon name="globe" />
              <span>Yeti Fabric</span>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount">From $1,000</span>
              <span className="pricing-period">/ month</span>
            </div>
          </div>
          <table className="pricing-scale">
            <thead>
              <tr>
                <th>Sustained throughput</th>
                <th>Monthly minimum</th>
              </tr>
            </thead>
            <tbody>
              <tr className="pricing-scale-included">
                <td>1,000 RPS</td>
                <td>$1,000</td>
              </tr>
              <tr>
                <td>10,000 RPS</td>
                <td>$5,000</td>
              </tr>
              <tr>
                <td>100,000 RPS</td>
                <td>$10,000</td>
              </tr>
            </tbody>
          </table>
          <ul className="pricing-features">
            <li>Everything in Self-Hosted</li>
            <li>Auto-scaling — placement service responds to telemetry in seconds</li>
            <li>Global data replication via <code>@distribute</code> (full / shard / geo-subset)</li>
            <li>Dynamic application placement managed by yeti-admin</li>
            <li>Agentic monitoring — MCP-driven incident detection + remediation proposals</li>
            <li>GitHub App-driven deploys with branch previews</li>
            <li>mTLS replication mesh + per-deployment encryption keys</li>
            <li>Replicated S3-compatible blob storage per deployment</li>
          </ul>
          <div className="pricing-cta">
            <button className="btn btn-primary btn-lg pricing-btn" onClick={onGetStarted}>Get Started</button>
          </div>
        </div>
      </div>

      <p className="pricing-footnote">
        * Capacity scales linearly. No reserved instances. No minimum commits beyond the tier minimum. No surprise egress fees. Cancel anytime.<br />
        Enterprise SLAs, private deployment, and dedicated support — <a href="mailto:sales@yetirocks.com">sales@yetirocks.com</a>.
      </p>

      <section className="section">
        <h2 className="section-title">Common questions</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">What's the difference between Self-Hosted and Fabric?</div>
            <div className="feature-text">
              Same binary, different operator. Self-Hosted means you run the binary on your hardware (or VM, or Kubernetes pod). Fabric is the same binary running on YetiRocks-managed infrastructure with multi-region replication and centralized placement.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Can I move from Self-Hosted to Fabric?</div>
            <div className="feature-text">
              Yes. Your <code>Cargo.toml</code> manifest and schema work as-is. Point your repo at the Yeti GitHub App or call the deploy workflow from your existing CI. The runtime profile changes; the application doesn't.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">Do agents have access to my data on Fabric?</div>
            <div className="feature-text">
              Agents query through MCP, scoped to your tenancy. Per-deployment encryption (HKDF + AES-256-GCM) keeps tenants opaque on the wire even though replication multiplexes across a shared mTLS channel. Your data never decrypts in another tenant's process.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
