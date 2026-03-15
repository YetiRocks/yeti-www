import Icon from '../components/Icon'

export default function Hosting() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Run Everywhere. Optimize Everything.</h1>
        <p className="page-subtitle">
          Yeti Cloud runs across AWS, GCP, and Azure - or all three at once. Pick your clouds to meet spend commitments, or let Yeti optimize across providers for the best performance and lowest cost.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Multi-Cloud</div>
        <h2 className="section-title">Your Clouds, Your Rules</h2>
        <p className="section-desc">
          Pin workloads to a single provider when you need to hit your AWS or Azure commit. Or run across all three clouds and let Yeti route traffic to wherever latency is lowest and cost makes sense. Add or remove clouds without redeploying. Your applications don't notice.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Resilience Across Clouds</div>
            <div className="feature-text">
              A full cloud provider outage becomes a routing change, not a crisis. Yeti reroutes to healthy clouds in seconds. No single provider is a single point of failure. The platform self-heals and tells you about it after.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="clock" />
            <div className="feature-title">Millisecond Startup, Anywhere</div>
            <div className="feature-text">
              Spin up a node on any cloud and it starts serving traffic immediately. Region-local replicas are already consistent. No data migration, no warm-up period. First request, full speed.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Global Presence</div>
        <h2 className="section-title">{"<100ms Replication, Worldwide"}</h2>
        <p className="section-desc">
          Global replication completes in under 100 milliseconds across regions and clouds. Every customer gets the right data, right away, regardless of continent. Geo-aware routing puts each request on the nearest healthy node for local-feeling latency everywhere.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Latency-Optimized Routing</div>
            <div className="feature-text">
              Requests land at the nearest healthy node based on geography and real-time performance. If the closest region is on AWS and the next is on GCP, Yeti routes across both without blinking. Edge caching and DDoS protection come built in.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">Every Region, All Data</div>
            <div className="feature-text">
              Every region holds a complete copy of all data, replicated across clouds in under 100ms via cross-region WAL shipping. A node failure - or an entire cloud outage - triggers automatic rerouting to the nearest healthy replica.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Environments</div>
        <h2 className="section-title">Dev, Stage, Production - One Platform</h2>
        <p className="section-desc">
          Push to a branch and get a staging environment. Merge to main and promote to production. Each environment is fully isolated with its own data, secrets, and custom domains. No YAML surgery required.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Git-Driven Promotion</div>
            <div className="feature-text">
              Branch-based environments with promotion on merge. Dev and staging share a non-production cluster. Production runs on dedicated high-performance infrastructure with full multi-cloud replication.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">Tenant Isolation</div>
            <div className="feature-text">
              Each customer's apps run in process-isolated Kubernetes pods, not shared dylib co-tenancy. Separate namespaces, network policies, and storage prefixes. Your data stays yours.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Operations</div>
        <h2 className="section-title">Zero-Ops, Any Cloud</h2>
        <p className="section-desc">
          Yeti Cloud handles provisioning, scaling, monitoring, and recovery across every cloud you use. Auto-scaling adjusts compute per provider. Telemetry gives you one unified view. You ship features. Yeti runs them wherever makes the most sense.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Auto-Scaling</div>
            <div className="feature-text">
              Horizontal pod autoscaling adjusts capacity on CPU, memory, and request rate. Scale from one pod to hundreds without config changes. Storage scales independently from compute.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="monitor" />
            <div className="feature-title">Built-In Monitoring</div>
            <div className="feature-text">
              Real-time dashboards, log aggregation, and OTLP export ship standard. Automatic alerts on latency spikes, error rate changes, and resource exhaustion. 99.99% uptime target backed by multi-cloud redundancy.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
