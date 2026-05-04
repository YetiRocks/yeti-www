import { Link } from '@tanstack/react-router'
import Icon from '../components/Icon'
import CodeBlock from '../components/CodeBlock'

export default function PlatformFabric() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Push to main. Run globally.</h1>
        <p className="page-subtitle">
          Yeti Fabric is the managed multi-tenant tier — the same binary you run locally, deployed across regions with an mTLS replication mesh, per-deployment encryption, centralized placement, and agentic monitoring. Pay-as-you-go from $1,000/mo.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Globally distributed</div>
        <h2 className="section-title">One deployment, every region</h2>
        <p className="section-desc">
          Each Fabric deployment runs on N nodes spread across providers and regions per your SLA. Cloudflare GeoDNS resolves <code>&#123;deployment&#125;.apps.yetirocks.com</code> to the nearest healthy node. Reads land where the user lives.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Geo-routed by default</div>
            <div className="feature-text">
              GeoDNS-driven traffic steering. Failures route around dead nodes within seconds. Your customers don't notice a regional outage; the next request lands somewhere else.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">Per-deployment encryption</div>
            <div className="feature-text">
              One mTLS channel per node-pair carries every shared deployment. Application-layer envelope encryption — HKDF-derived AES-256-GCM keys per deployment — keeps tenants opaque to each other on the wire.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="map" />
            <div className="feature-title">Centralized placement</div>
            <div className="feature-text">
              <code>yeti-admin</code> owns the placement table. Inputs: server telemetry, inter-region latency, customer SLA, Studio config. Output: the canonical <code>(deployment, server)</code> mapping. Other components read; only placement decides.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Deploys</div>
        <h2 className="section-title">GitOps in two flavors</h2>
        <p className="section-desc">
          Drive deploys through the Yeti GitHub App for managed onboarding (webhook-driven, branch previews, one-click rollback) — or self-deploy from any GitHub Actions repo with a reusable workflow. Both paths land the same artifact on the same servers.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">GitHub App</div>
            <div className="feature-text">
              Install the Yeti app on a repo and pushes deploy automatically. Branch previews per pull request. One-click rollback to any prior version. Approval gates per environment.
            </div>
          </div>
          <div className="feature-card has-code">
            <Icon name="wrench" />
            <div className="feature-title">Reusable workflow</div>
            <div className="feature-text">
              Self-deploy from your own GitHub Actions. Calls <code>yetirocks/yeti-deploy@v1</code>, builds the dylib in CI, hands the artifact to Fabric. No customer code compiles on production hardware.
            </div>
            <CodeBlock label=".github/workflows/deploy.yml">{`name: Deploy
on: { push: { branches: [main] } }
jobs:
  deploy:
    uses: yetirocks/yeti-deploy@v1
    with:
      deployment: store-prod
      regions: [us-west, us-east, eu-west]
      sla: standard
    secrets: inherit`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Atomic version swaps</div>
        <h2 className="section-title">No node ahead of the cluster</h2>
        <p className="section-desc">
          New version starts alongside old, opens RocksDB as a secondary, replays the WAL, and self-validates. Once <em>every</em> target node reports ready, each node atomically flips its router → new, drains old, and stops the old process. No partial-cluster state.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Shared on-disk state</div>
            <div className="feature-text">
              RocksDB <code>OpenAsSecondary</code> lets the new version read live data while the old version is still primary. No copy. No migration window.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Coordinated cutover</div>
            <div className="feature-text">
              Drain → flush WAL → reopen as primary → flip router → stop old. The window between primary release and primary reopen is the critical section, measured and bounded.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Rollback on failure</div>
            <div className="feature-text">
              If any node fails the primary reopen, the cluster signals abort. Old version reopens as primary; the new version stays as secondary until the next attempt.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Storage</div>
        <h2 className="section-title">Replicated S3-compatible blob store</h2>
        <p className="section-desc">
          Every Fabric deployment gets named buckets backed by an S3-compatible storage layer, replicated across Fabric servers using the same replication semantics as RocksDB tables. Your <code>@distribute</code> choice shapes both.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">S3-compatible buckets</div>
            <div className="feature-text">
              Drop-in for any tool that speaks the S3 API. Per-deployment bucket scoping. Auth integrates with the same RBAC as your tables.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Same @distribute semantics</div>
            <div className="feature-text">
              Full replication, sharding, or geo-subset — buckets follow the same rules tables do. One mental model for storage topology.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Topology</div>
        <h2 className="section-title">Abstract by default. Explicit when you need it.</h2>
        <p className="section-desc">
          Most customers describe what they need (provider list, regions, tier, count) and let the placement service resolve. Customers with strict requirements pin <code>(provider, region, host_id)</code> tuples explicitly through the Studio toggle.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Abstract</div>
            <div className="feature-text">
              Declare criteria; placement resolves. Re-resolves automatically as servers come and go. The default for new deployments.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="map" />
            <div className="feature-title">Advanced</div>
            <div className="feature-text">
              Pin explicit hosts via Studio. Skip the placement algorithm. Use when residency rules require named regions and named providers.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Agentic monitoring</div>
        <h2 className="section-title">Your fleet, MCP-discoverable</h2>
        <p className="section-desc">
          The same MCP surface your apps expose is available for your operations. Agents query the placement table, telemetry stream, and alert state through MCP tools. Stuck deployments get diagnosed automatically; remediation proposals get filed before someone gets paged.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">MCP into your fleet</div>
            <div className="feature-text">
              Agents reason about your deployment topology with full schema awareness. No grafana scraping, no log spelunking — they query the source of truth.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Auto-remediation proposals</div>
            <div className="feature-text">
              Placement service detects stuck deployments and proposes corrective placements. Agents review, you approve, the cluster heals.
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <Link to="/pricing" className="btn btn-primary btn-lg">See Fabric pricing</Link>
      </section>
    </div>
  )
}
