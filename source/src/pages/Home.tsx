import { Link } from '@tanstack/react-router'
import Icon from '../components/Icon'

interface HomeProps {
  onGetStarted: () => void
}

export default function Home({ onGetStarted }: HomeProps) {
  return (
    <>
      <div className="container">
        <div className="hero">
          <img
            src={"/logo_white.svg"}
            alt="Yeti Platform Architecture"
            className="hero-logo"
            fetchPriority="high"
          />
          <h1 className="hero-title">Faster Applications, Faster.</h1>
          <p className="hero-subtitle">
            An agent-friendly performance application toolkit for Rust that improves velocity, reduces drift, and lowers costs.<br />
            <p className="feature-list"><span className="text-white">Applications</span> | <span className="text-white">Databases</span> | <span className="text-white">Interfaces</span> |  <span className="text-white">Auth</span> | <span className="text-white">Plugins</span></p>
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Request Early Access
            </button>
            <Link className="btn btn-lg" to="/developers/demos">
              See Demos
            </Link>
          </div>
        </div>
      </div>

      <section className="section logo-strip">
        <div className="container">
          <p className="logo-strip-label">Built on Yeti</p>
          <div className="logo-strip-row">
            <img src={"/images/logos/agentdaddy.svg"} alt="AgentDaddy" className="logo-strip-img logo-agentdaddy" />
            <img src={"/images/logos/promptresponse.svg"} alt="PromptResponse" className="logo-strip-img logo-promptresponse" />
            <img src={"/images/logos/streamlock.avif"} alt="StreamLock" className="logo-strip-img logo-streamlock" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Schema, config, ship.</h2>
          <p className="section-desc">
            A Yeti application is a directory: a <code>Cargo.toml</code> manifest, a GraphQL schema, and optional Rust resource files. Drop it into the <code>applications/</code> folder and Yeti picks it up. Schema directives generate every endpoint, choose the storage tier, declare replication, set RBAC, capture audits — all without writing infrastructure code.
          </p>
          <div className="features-grid features-grid-3">
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">Same Runtime, Every Stage</div>
              <div className="feature-text">
                Local dev runs the same compiled Rust + RocksDB as production. Sub-millisecond p95 on day one. No "fast in dev, slow in prod" surprises.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="clipboard" />
              <div className="feature-title">Schema Is the Application</div>
              <div className="feature-text">
                Seven directives (<code>@table</code>, <code>@store</code>, <code>@source</code>, <code>@distribute</code>, <code>@export</code>, <code>@access</code>, <code>@audit</code>) cover storage, replication, protocols, auth, and compliance. No ORM, no migrations, no boilerplate.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="wrench" />
              <div className="feature-title">Custom Logic Hot-Reloads</div>
              <div className="feature-text">
                Need behavior beyond CRUD? Drop a Rust resource file in. Yeti compiles it to a native dylib and reloads on save. Five-line endpoints. Native speed.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Your AI agent's favorite backend</h2>
          <p className="section-desc">
            Every Yeti instance ships with an MCP server and a vector-indexed knowledge base. Claude, Cursor, Copilot, and Windsurf connect, introspect schemas, query live data, and generate correct code on the first try. Whether your agent assists, drives, or runs autonomously, it has full context on the platform.
          </p>
          <div className="features-grid features-grid-3">
            <div className="feature-card">
              <Icon name="brain" />
              <div className="feature-title">Built-In MCP Server</div>
              <div className="feature-text">
                Standard Model Context Protocol surface over your schemas, tables, resources, and configuration. No custom integrations. Connect any MCP-compatible agent and it understands the platform.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="search" />
              <div className="feature-title">Knowledge Base, Pre-Embedded</div>
              <div className="feature-text">
                Every doc page, every example, every directive option — vector-indexed at build time. Agents query before generating code, not after.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="layers" />
              <div className="feature-title">Composable Toolkit</div>
              <div className="feature-text">
                Agent-assisted development (you drive, agent completes). Agent-driven (agent scaffolds, you review the diff). Autonomous (agent owns the repo and ships). Same MCP surface, three modes.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Auth, streaming, search, durable functions — one binary</h2>
          <p className="section-desc">
            No API gateway. No message broker. No separate workflow engine. RBAC and OAuth, OTLP telemetry, vector search with auto-embedding, native MQTT broker, durable functions with heartbeat leases — every piece runs in-process and shares the same performance profile.
          </p>
          <div className="features-grid features-grid-3">
            <div className="feature-card">
              <Icon name="lock" />
              <div className="feature-title">Auth + RBAC, Schema-Driven</div>
              <div className="feature-text">
                Add <code>@access(roles:&#123; ... &#125;)</code> to a table. JWT, OAuth, and per-operation gating wired up. No middleware to install, no auth code to write.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="radio" />
              <div className="feature-title">Real-Time Built In</div>
              <div className="feature-text">
                Every table fires PubSub events. Subscribe via SSE, WebSocket, MQTT, or MCP. Kafka bridge for external streams. Zero config.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="refresh" />
              <div className="feature-title">Durable Functions</div>
              <div className="feature-text">
                <code>queue!()</code> macro registers a workflow. Heartbeat leases prove worker liveness. Queryable request IDs. Crashes resume from journal. Temporal patterns, in-process.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">One binary runs what used to take a cluster</h2>
          <p className="section-desc">
            A 49 MB binary replaces your API server, database, cache, message broker, and background workers. Run it free on a laptop. Run it managed on Yeti Fabric across a global mesh — same binary, same code path. Your infrastructure bill drops by an order of magnitude.
          </p>
          <div className="features-grid features-grid-3">
            <div className="feature-card">
              <Icon name="trending-up" />
              <div className="feature-title">Fewer Servers, Fewer 3am Pages</div>
              <div className="feature-text">
                One Yeti instance replaces a cluster of application servers. Fewer moving parts. Fewer failure modes. When something does go wrong, there's one process to investigate.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="globe" />
              <div className="feature-title">Pay-As-You-Go Fabric</div>
              <div className="feature-text">
                Yeti Fabric charges per transaction. No reserved instances. No minimum commits. No surprise egress fees. <Link to="/pricing">See pricing →</Link>
              </div>
            </div>
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">Same Binary, Self-Host or Managed</div>
              <div className="feature-text">
                Run free on a laptop, then run the exact same binary on Yeti Fabric across a global mesh. No rewrites, no migrations, no surprises when you scale.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
