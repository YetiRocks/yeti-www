import Icon from '../components/Icon'

interface PricingProps {
  onGetStarted: () => void
}

export default function Pricing({ onGetStarted }: PricingProps) {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Free To Self Host. Pay-As-You-Go Cloud.</h1>
        <p className="page-subtitle">
          Yeti's compiled binary with open source SDK is free to download and run on your hardware. When you're ready to scale, Yeti Fabric offers the exact same binary as a managed deployment. Yeti Sovereign allows you to extend Yeti Cloud into your VPC.
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
            <li>Compiled binary — Linux, macOS, Windows</li>
            <li>Open-source SDK</li>
            <li>Auth, telemetry, AI, queues, admin</li>
            <li>REST, GraphQL, WS, SSE, MQTT, gRPC</li>
            <li>RocksDB storage, seven-directive matrix</li>
            <li>MCP server + vector knowledge base</li>
            <li>Run on your hardware</li>
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
              <span className="pricing-amount">$1,000</span>
              <span className="pricing-period">/ month</span>
            </div>
          </div>
          <table className="pricing-scale">
            <thead>
              <tr>
                <th>Throughput</th>
                <th>Monthly</th>
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
            <li>Same binary, managed for you</li>
            <li>Geo, Load, and Predictive Scaling</li>
            <li>Configurable global replication</li>
            <li>Live updates with zero downtime</li>
            <li>Agentic monitoring/remediation feed</li>
            <li>GitHub deploys with branch previews</li>
            <li>Deployment-specific encryption</li>
            <li>S3-compatible blob storage, replicated</li>
          </ul>
          <div className="pricing-cta">
            <button className="btn btn-primary btn-lg pricing-btn" onClick={onGetStarted}>Get Started</button>
          </div>
        </div>

        <div className="pricing-card">
          <div className="pricing-card-header">
            <div className="pricing-tier-label">
              <Icon name="shield" />
              <span>Yeti Sovereign</span>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount">Custom</span>
              <span className="pricing-period">/ call for pricing</span>
            </div>
          </div>
          <ul className="pricing-features">
            <li>Yeti Cloud, in your environment</li>
            <li>Private cloud in your VPC, any provider</li>
            <li>On-prem or air-gapped data center</li>
            <li>White-label "cloud in a box"</li>
            <li>Dedicated implementation team</li>
            <li>Custom SLA, contract, and support hours</li>
            <li>Direct line to Yeti engineering</li>
            <li>Roadmap input on the features you need</li>
          </ul>
          <div className="pricing-cta">
            <a href="mailto:sales@yetirocks.com" className="btn btn-lg pricing-btn pricing-btn-outline">Talk to Sales</a>
          </div>
        </div>
      </div>

      <p className="pricing-footnote">
        * Fabric capacity scales linearly. No reserved instances. No minimum commits beyond the tier minimum. No surprise egress fees. Cancel anytime.<br />
        Sovereign deployments, custom SLAs, and partner programs — <a href="mailto:sales@yetirocks.com">sales@yetirocks.com</a>.
      </p>

      <section className="section">
        <h2 className="section-title">Common questions</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">What's the difference between the three tiers?</div>
            <div className="feature-text">
              Same binary, different operator. Self-Hosted means you run the binary on your hardware. Fabric is the same binary running on YetiRocks-managed infrastructure with auto-scaling and global replication. Sovereign is the same binary deployed inside your environment — your VPC, your data center, or shipped to your customers under your brand.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Can I move between tiers?</div>
            <div className="feature-text">
              Yes. Your <code>Cargo.toml</code> manifest and schema work as-is. Self-Hosted apps deploy to Fabric by pointing at the Yeti GitHub App. Fabric customers move to Sovereign with the same artifact and a different operating environment. The runtime profile changes; the application doesn't.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">How is my data isolated on Fabric?</div>
            <div className="feature-text">
              Each deployment runs behind its own keys. Replication traffic is encrypted between authenticated nodes — nothing else on the wire can read it. The platform manages the keys for you; your team never touches a key vault or rotation runbook. Agents query through MCP, scoped to your deployment's role context.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
