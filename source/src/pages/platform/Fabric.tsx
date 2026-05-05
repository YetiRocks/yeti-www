import { Link } from '@tanstack/react-router'
import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function Fabric() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Instant Scale. At Any Scale.</h1>
        <p className="page-subtitle">
          Yeti Fabric is the easiest way to deliver your application and its data to your end users — at any size, in any region, on any cloud. Unlimited scale, uptime built in, costs that follow your traffic. Pay-as-you-go from $1,000/mo.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Why Fabric</div>
        <h2 className="section-title">The easiest way to deliver your app to your users.</h2>
        <p className="section-desc">
          Fabric is a managed deployment tier built on the same binary you run locally. Pick your providers, your regions, and your SLA. The platform handles delivery, replication, scaling, encryption, and failover. You ship features; we keep the cluster running.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Unlimited scale</div>
            <div className="feature-text">
              Capacity follows traffic. Scale from a hundred requests a day to a billion on the same deployment — no re-architecture, no scale-out runbook, no surprise paging incident when your launch goes well.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Uptime built in</div>
            <div className="feature-text">
              Geo-distributed by default. Failures route around dead nodes within seconds. Updates don't take you down. There is no central control plane that can take Fabric out from under you.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Costs follow your traffic</div>
            <div className="feature-text">
              Pay for what you serve, not for what you reserved last quarter. No control-plane bill, no worker-node minimums, no inter-region egress surprises. Cancel any time.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Rollouts</div>
        <h2 className="section-title">Push your update. The cluster takes care of the rest.</h2>
        <p className="section-desc">
          When you push, every node loads the new version alongside the running one and tests it against your real data. Once every node is ready, the whole cluster cuts over together. If anything fails, the new version is discarded automatically. Customers don't notice — and your team doesn't lose a Tuesday night to a deploy.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">No outage windows</div>
            <div className="feature-text">
              Push during peak traffic. The new version only takes traffic when the whole cluster is ready. There's no "scheduled maintenance" dialog for your customers, and no rollout calendar for your team.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Validated against live data</div>
            <div className="feature-text">
              The new version reads from production data while it's being tested. No staging-vs-prod drift, no last-minute schema surprise, no test database that disagrees with reality.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">One-click rollback</div>
            <div className="feature-text">
              If something slips through, revert to a prior version with one click — and the cluster cuts back together the same way it cut forward. Your team gets a clean signal of what to investigate before the next push.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Scale</div>
        <h2 className="section-title">Capacity follows your traffic.</h2>
        <p className="section-desc">
          Fabric watches load on every deployment and adds nodes when traffic ramps. Idle capacity sheds when traffic drops. You pay for what you serve, not for what you reserved last quarter — and there's no autoscaling group to configure or scale-out playbook to write.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Scales up in seconds</div>
            <div className="feature-text">
              A new node joins the cluster, warms against live data, and starts serving — no deploy event, no drain-and-re-attach dance, no traffic dropped during the ramp.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Scales down automatically</div>
            <div className="feature-text">
              When traffic drops, idle nodes drain and the cluster contracts. Your bill contracts with it. There's no autoscaling-group cooldown to tune; the platform watches load directly.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">No queue dropping under spikes</div>
            <div className="feature-text">
              Workloads don't backlog while you scale. The platform absorbs the surge in-place; new nodes catch up on warm-up time, not on a cold start.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Replication</div>
        <h2 className="section-title">Your data lives where your customers do.</h2>
        <p className="section-desc">
          Tables and blob buckets replicate to every region in your deployment. Reads stay local; writes converge in the background. Pick full replication, geographic subsets, or sharded distribution per table — your <code>@distribute</code> directive shapes both.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">Tables replicate per directive</div>
            <div className="feature-text">
              Pick full, sharded, or geo-subset replication for each table. License tables stay regional; product catalogs replicate everywhere; archive tables shard across the cluster. One mental model, per-table dials.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="archive" />
            <div className="feature-title">Blob buckets follow the same rules</div>
            <div className="feature-text">
              Files are S3-compatible and replicated alongside the data they belong to. Drop in any tool that speaks the S3 API; auth integrates with the same RBAC as your tables.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">Encrypted between nodes</div>
            <div className="feature-text">
              Replication traffic is encrypted between authenticated nodes with a key unique to your deployment. Nothing else on the wire can read it. The platform manages the keys; your team never has to.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Resilience</div>
        <h2 className="section-title">Always-on, by default.</h2>
        <p className="section-desc">
          Customer requests resolve to the nearest healthy region. Failures route around dead nodes within seconds. Replicas absorb traffic for nodes that go offline. No customer ever sees a regional outage — and there is no central control plane to take Fabric down with it.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Geo-routed reads</div>
            <div className="feature-text">
              Each request lands in the region nearest the user. Going multi-region is a <code>residency</code> toggle on <code>@distribute</code> — no separate CDN contract, no inter-region egress surprises.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Automatic failover</div>
            <div className="feature-text">
              Failed nodes get pulled from rotation; replicas keep serving. Recovery is invisible to customers and to the developers shipping on top of Fabric.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">No single point of failure</div>
            <div className="feature-text">
              Each cluster is autonomous. Placement re-resolves locally when telemetry shifts; the platform keeps running through any single failure. Nothing global takes the deployment offline.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Deploys</div>
        <h2 className="section-title">Push to main. Run globally.</h2>
        <p className="section-desc">
          Drive deploys through the Yeti GitHub App for one-click onboarding — webhook-triggered, branch previews per PR, approval gates per environment — or self-deploy from your own Actions repo with a reusable workflow. Both paths land the same artifact on the same servers.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">GitHub App</div>
            <div className="feature-text">
              Install on a repo and pushes deploy automatically. Branch previews per pull request. One-click rollback to any prior version. Approval gates per environment.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="wrench" />
            <div className="feature-title">Reusable workflow</div>
            <div className="feature-text">
              Self-deploy from your own GitHub Actions. Calls <code>yetirocks/yeti-deploy@v1</code>, builds the artifact in CI, hands it to Fabric. No customer code compiles on production hardware.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Same artifact, same servers</div>
            <div className="feature-text">
              Whichever path you pick, the binary that hits production is the same one your team tested locally. There's no second build, no second runtime, no last-mile divergence to debug.
            </div>
          </div>
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
      </section>

      <section className="section">
        <div className="section-label">Monitoring</div>
        <h2 className="section-title">An on-call that diagnoses before it pages.</h2>
        <p className="section-desc">
          Fabric runs an MCP-aware monitoring layer over every deployment. Anomalies, stuck rollouts, and capacity drift get diagnosed automatically. Remediation lands as a write proposal in your console — agents review and approve before someone opens a runbook.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="monitor" />
            <div className="feature-title">Built-in observability</div>
            <div className="feature-text">
              Logs, traces, and metrics ship with every deployment. Pipe them to your existing dashboards over OpenTelemetry. The bill scales with compute, not with retained log volume — nothing in the platform encourages you to log less than you should.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">Agentic diagnosis</div>
            <div className="feature-text">
              Stuck deployments, capacity drift, replication lag — the platform proposes a fix with full topology awareness. Auto-remediation arrives as a write proposal, not a screenshot.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">MCP into your fleet</div>
            <div className="feature-text">
              Agents introspect deployments through the same tool surface they use for application data. No bespoke ops API; no out-of-band integration to maintain.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Support</div>
        <h2 className="section-title">We sit on the same side of the table.</h2>
        <p className="section-desc">
          Fabric customers get a dedicated channel into the engineering team that wrote Yeti. Tier-based response times. Architecture reviews on request. Direct access to people who know how every line of the binary you're running was written.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="broadcast" />
            <div className="feature-title">Dedicated channels</div>
            <div className="feature-text">
              A direct line to the people who maintain Yeti — not a ticket queue, not a tier-1 forwarding service. When something breaks, the engineers who shipped the feature you're using are the ones answering.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Tier-based SLAs</div>
            <div className="feature-text">
              Response and resolution times scale with your deployment tier. Production-down events get minutes. Architecture questions get a same-business-day reply. Roadmap input is included.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="clipboard-check" />
            <div className="feature-title">Architecture reviews</div>
            <div className="feature-text">
              Before a major launch, our team walks the deployment with you and flags risks before they ship. Onboarding includes a guided review; ongoing customers get them on request.
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
