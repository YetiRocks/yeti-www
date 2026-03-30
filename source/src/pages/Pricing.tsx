import Icon from '../components/Icon'

interface PricingProps {
  onGetStarted: () => void
}

export default function Pricing({ onGetStarted }: PricingProps) {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Simple, honest pricing</h1>
        <p className="page-subtitle">
          Start free. Scale when you're ready. No surprises.
        </p>
      </div>

      <div className="pricing-grid">
        {/* Free Tier */}
        <div className="pricing-card">
          <div className="pricing-card-header">
            <div className="pricing-tier-label">
              <Icon name="bolt" />
              <span>Free</span>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount">$0</span>
              <span className="pricing-period">/ forever</span>
            </div>
          </div>
          <ul className="pricing-features">
            <li>Composable application platform</li>
            <li>All client interfaces</li>
            <li>Embedded RocksDB storage</li>
            <li>Auth, telemetry, and vector search</li>
            <li>Self-hosted deployment</li>
          </ul>
          <div className="pricing-cta">
            <button className="btn btn-lg pricing-btn pricing-btn-outline" onClick={onGetStarted}>Download</button>
          </div>
        </div>

        {/* Cloud Tier */}
        <div className="pricing-card pricing-card-center">
          <div className="pricing-card-header">
            <div className="pricing-tier-label">
              <Icon name="globe" />
              <span>Cloud</span>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount">$3,000</span>
              <span className="pricing-period">/ month</span>
            </div>
          </div>
          <table className="pricing-scale">
            <thead>
              <tr>
                <th>Capacity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="pricing-scale-included">
                <td>1,000 RPS</td>
                <td>Included</td>
              </tr>
              <tr>
                <td>10,000 RPS</td>
                <td>$5,000/mo</td>
              </tr>
              <tr>
                <td>100,000 RPS</td>
                <td>$10,000/mo</td>
              </tr>
            </tbody>
          </table>
          <ul className="pricing-features">
            <li>Everything in Free</li>
            <li>Multi-region replication</li>
            <li>Automated scaling and failover</li>
            <li>Linode, GCP, AWS, and Azure</li>
            <li>Real-time monitoring and OTLP export</li>
          </ul>
          <div className="pricing-cta">
            <button className="btn btn-primary btn-lg pricing-btn" onClick={onGetStarted}>Get Started</button>
          </div>
        </div>

        {/* Enterprise Tier */}
        <div className="pricing-card">
          <div className="pricing-card-header">
            <div className="pricing-tier-label">
              <Icon name="shield" />
              <span>Enterprise</span>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount">Custom</span>
            </div>
          </div>
          <ul className="pricing-features">
            <li>Everything in Cloud</li>
            <li>Private or hybrid cloud</li>
            <li>On-premise installation</li>
            <li>Dedicated support and SLAs</li>
            <li>Custom integrations</li>
          </ul>
          <div className="pricing-cta">
            <a href="mailto:sales@yetirocks.com" className="btn btn-lg pricing-btn pricing-btn-outline">Contact Us</a>
          </div>
        </div>
      </div>

      <p className="pricing-footnote">
        * Capacity estimates assume a read-heavy workload with ~1KB average payload on Linode infrastructure.<br />Other cloud providers are available at adjusted rates.
      </p>
    </div>
  )
}
