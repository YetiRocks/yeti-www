import { Link } from 'react-router-dom'
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
            src={`${import.meta.env.BASE_URL}logo_white.svg`}
            alt="Yeti Platform Architecture"
            className="hero-logo"
          />
          <h1 className="hero-title">Distributed Rust + Data<br />For Agentic Development</h1>
          <p className="hero-subtitle">
            Ship production APIs in minutes. Scale without rewriting.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Request Early Access
            </button>
            <Link className="btn btn-lg" to="/demos">
              See Demos
            </Link>
          </div>
        </div>
      </div>

      <section className="section" id="building-blocks">
        <div className="container">
          <div className="section-label">SIMPLE</div>
          <h2 className="section-title">From Prototype to Production</h2>
          <p className="section-desc">
            Most teams start with SQLite, rewrite to Postgres, bolt on Redis, add Kafka, then hire two people to run Kubernetes. That's six months gone before you ship anything real. Yeti skips the whole cycle. Define your schema and business logic. Yeti compiles it to a production backend that grows with your app - week one through year three, same codebase.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">Same Runtime, Every Stage</div>
              <div className="feature-text">
                Your prototype runs on the same compiled Rust, zero-copy HTTP, and RocksDB storage as your production deployment. 187K req/s and sub-millisecond p95 on day one. No "it was fast in dev" surprises.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="clipboard" />
              <div className="feature-title">Schema + Config = Application</div>
              <div className="feature-text">
                A GraphQL schema defines your data model. A YAML config declares extensions, permissions, and seed data. That's the whole application. No framework boilerplate, no ORM, no migration scripts. Need custom logic? Write it in Rust and it hot-reloads on save.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faster">
        <div className="container">
          <div className="section-label">FASTER</div>
          <h2 className="section-title">Build At The Speed of Thought</h2>
          <p className="section-desc">
            Yeti is built for agentic development. Connect Claude, Cursor, or Copilot through the built-in MCP server and your AI agent introspects schemas, queries data, and builds entire applications through a standardized protocol. Under the hood, compiled Rust delivers 50-100x the throughput of Node.js or Python. You never write a line of systems code.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="brain" />
              <div className="feature-title">Agent-Native Platform</div>
              <div className="feature-text">
                Every Yeti instance ships with an MCP server that knows the platform deeply - architecture, APIs, constraints, and your installed applications. Agents don't just hit endpoints. They understand your schema and generate correct code on the first try.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">Rust Performance, Zero Effort</div>
              <div className="feature-text">
                187K req/s with sub-millisecond latency. Not because you tuned anything, but because Yeti compiles to native Rust. One Yeti instance handles traffic that would need a fleet of Node.js servers. The gap between prototype and production performance? Gone.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="easier">
        <div className="container">
          <div className="section-label">EASIER</div>
          <h2 className="section-title">Rust That Feels Like JavaScript</h2>
          <p className="section-desc">
            Yeti's SDK gives you high-level abstractions - <code>json!()</code>, <code>resource!()</code>, <code>async/await</code> - that compile to zero-cost Rust. No lifetimes, no borrow checker fights, no unsafe blocks. If you can write Express, you can write Yeti. Auth, telemetry, vector search, and MQTT are single-line config entries. Not external services with separate SDKs and separate failure modes.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="clipboard" />
              <div className="feature-title">Batteries Included</div>
              <div className="feature-text">
                JWT, OAuth, and RBAC auth. Logs, spans, metrics, and OTLP export. Vector search with auto-embedding. MQTT broker with WebSocket proxy. Each one is a single line in config.yaml, runs in-process, and keeps the same performance profile. No external services. No integration weekends.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="wrench" />
              <div className="feature-title">Concise By Design</div>
              <div className="feature-text">
                <code>resource!()</code> macros, <code>json!()</code> responses, <code>ctx.get_table()</code> data access. A complete REST endpoint is five lines. Custom business logic hot-reloads on save. You write the interesting parts. Yeti handles the plumbing.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="cheaper">
        <div className="container">
          <div className="section-label">CHEAPER</div>
          <h2 className="section-title">Do More With Less</h2>
          <p className="section-desc">
            Rust's efficiency means one Yeti instance replaces a cluster of Node.js servers. Fewer servers, fewer services, fewer on-call pages at 3am. When you're ready to go global, Yeti Cloud's pricing scales with actual usage, not worst-case capacity planning.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="trending-up" />
              <div className="feature-title">One Server, Not Ten</div>
              <div className="feature-text">
                A typical Node.js stack needs separate processes for the API, database, cache, message broker, and background workers. Yeti is a single binary that handles all of it. One process to deploy, monitor, and scale. 50-100x better resource utilization per dollar.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="globe" />
              <div className="feature-title">Pay As You Grow</div>
              <div className="feature-text">
                Yeti Cloud charges for the compute and storage you actually use. No reserved instances, no minimum commits, no surprise egress fees. Start on a single region for pennies. Scale to multi-cloud global deployment as traffic grows. Your bill tracks your revenue, not your anxiety.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
