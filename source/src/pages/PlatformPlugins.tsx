import Icon from '../components/Icon'
import CodeBlock from '../components/CodeBlock'

export default function PlatformPlugins() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">First-party plugins. Composable extension points. No marketplaces.</h1>
        <p className="page-subtitle">
          Auth, telemetry, AI, durable functions, admin — all in the binary. Every plugin opts in via the app manifest. Build your own with the plugin SDK and live-reload them too.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Built-in</div>
        <h2 className="section-title">Five plugins, one binary</h2>
        <p className="section-desc">
          Each plugin provides tables, resources, and lifecycle hooks. Apps opt in by listing them in the manifest. No package to install, no service to run — they're already there.
        </p>
        <div className="features-grid">
          <div className="feature-card has-code">
            <Icon name="lock" />
            <div className="feature-title">yeti-auth</div>
            <div className="feature-text">
              Basic, JWT, and OAuth authentication. Argon2id password hashing, configurable token TTLs, email-pattern role mapping, CSRF protection. Wires straight into the <code>@access</code> directive.
            </div>
            <CodeBlock label="yeti.toml">{`[plugins.yeti-auth]
methods = ["oauth", "basic"]

[plugins.yeti-auth.oauth.google]
clientId = "\${GOOGLE_CLIENT_ID}"
clientSecret = "\${GOOGLE_CLIENT_SECRET}"

[[plugins.yeti-auth.oauth.rules]]
strategy = "email"
pattern = "*@mycompany.com"
role = "admin"`}</CodeBlock>
          </div>
          <div className="feature-card has-code">
            <Icon name="trending-up" />
            <div className="feature-title">yeti-telemetry</div>
            <div className="feature-text">
              Logs, spans, metrics with a built-in dashboard. OTLP export to Grafana, Datadog, or any OpenTelemetry collector. File rotation, real-time SSE streaming, and a REST query API.
            </div>
            <CodeBlock label="yeti.toml">{`[plugins.yeti-telemetry]
metrics = true
serviceName = "store"
otlpEndpoint = "http://otel-collector:4317"
metricsIntervalSecs = 10`}</CodeBlock>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">yeti-ai</div>
            <div className="feature-text">
              Local Candle embeddings and inference — no external API calls. Auto-embedding on insert/update for <code>Vector @indexed</code> fields. Chat completion. Model management. MKL on Intel, Metal on Apple Silicon.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">yeti-jobs</div>
            <div className="feature-text">
              Durable functions. <code>queue!()</code> macro registers a workflow with timeouts, heartbeat leases, and queryable request IDs. Workers survive crashes; runs resume from journal. Temporal patterns, in-process.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="monitor" />
            <div className="feature-title">yeti-admin</div>
            <div className="feature-text">
              Web UI for app browsing, file editing, schema management, deploy keys, Git integration. The same surface that drives Yeti Fabric's centralized placement service.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Durable functions</div>
        <h2 className="section-title">Workflows that survive crashes</h2>
        <p className="section-desc">
          The <code>queue!()</code> macro registers a durable workflow. Inputs persist to the journal. Workers claim records with heartbeat leases — if a worker dies mid-execution, the supervisor reassigns the lease and resumes from where the journal left off. Queryable request IDs let callers poll status from anywhere in the cluster.
        </p>
        <div className="features-grid">
          <div className="feature-card has-code">
            <Icon name="archive" />
            <div className="feature-title">Define once, run forever</div>
            <div className="feature-text">
              The macro registers a handler keyed by request ID. Yeti journals every input and resumes on restart. Idempotent by construction.
            </div>
            <CodeBlock label="resources/process_order.rs">{`use yeti_sdk::prelude::*;

queue!(ProcessOrder {
    name = "process_order",
    timeout = "5m",
    handler(ctx, input: OrderInput) => {
        // Persisted input is journal-backed.
        let order = ctx.table("Order").create(&input).await?;
        ctx.heartbeat().await?;
        ctx.queue("ChargeCard").enqueue(order.id).await?;
        Ok(())
    }
});`}</CodeBlock>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Heartbeat leases</div>
            <div className="feature-text">
              Long-running handlers call <code>ctx.heartbeat()</code> to prove liveness. The supervisor reassigns dead leases to live workers. No stuck workflows.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Queryable request IDs</div>
            <div className="feature-text">
              Every queued record has a stable request ID. Poll status from any node — current step, last heartbeat, retry count, terminal result. Works as a backbone for status APIs and webhooks.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Custom</div>
        <h2 className="section-title">Build your own plugins</h2>
        <p className="section-desc">
          The plugin SDK gives you the same extension points the built-in plugins use: register resources, table types, lifecycle hooks, and config schema. Plugins live-reload independently of apps.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="wrench" />
            <div className="feature-title">Plugin SDK</div>
            <div className="feature-text">
              <code>yeti_sdk::plugin::*</code> exposes resource registration, hook surfaces, and config validation. Same primitives the built-in plugins use.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Live reload</div>
            <div className="feature-text">
              Per-plugin file watcher with an async-load gate. Plugin source change triggers a recompile and swap; in-flight requests drain on the old version.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Composable scope</div>
            <div className="feature-text">
              Plugins declare their config under <code>[plugins.&lt;name&gt;]</code> in <code>yeti.toml</code>. Apps opt in via the manifest. Scope is explicit, never global.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
