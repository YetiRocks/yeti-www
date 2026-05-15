import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function Plugins() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Composable and Extensible.<br />Performant and Secure.</h1>
        <p className="page-subtitle">
          Auth, telemetry, AI, durable functions, admin — all in the binary. Every plugin opts in via the app manifest. Build your own with the plugin SDK and live-reload them too.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Already running</div>
        <h2 className="section-title">Auth0, Datadog, Pinecone, Temporal, Retool. Replaced.</h2>
        <p className="section-desc">
          The cross-cutting concerns every backend reaches for — identity, observability, AI, durable workflows, ops UI — ship inside Yeti as named plugins. They wire to your <code>@access</code> matrix, your <code>Vector @indexed</code> fields, and your MCP surface. Five vendor decisions become one line in <code>yeti.toml</code>.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">yeti-auth replaces Auth0</div>
            <div className="feature-text">
              Modern password hashing, OAuth, JWT, email-pattern role mapping, CSRF protection. Wires straight into the <code>@access</code> directive — the same matrix that gates REST, MQTT, and MCP. Zero round-trips to a third-party domain. Zero per-MAU surcharges.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">yeti-ai replaces Pinecone + OpenAI embeddings</div>
            <div className="feature-text">
              Embeddings and inference run natively on whatever hardware you have — your laptop, your servers, your customer's edge box. Auto-embed on <code>Vector @indexed</code> insert; semantic search is a query parameter. Your content never crosses a network boundary, and there's no token-level invoice to forecast.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="archive" />
            <div className="feature-title">yeti-jobs replaces Temporal</div>
            <div className="feature-text">
              Durable workflows that survive crashes. The <code>queue!()</code> macro registers a job; if a worker dies mid-execution, another picks it up where the first left off. No separate cluster to operate, no SDK version to keep aligned across services.
            </div>
          </div>
        </div>
        <CodeBlock label="applications/store/Cargo.toml">{`[package]
name = "store"
edition = "2024"

[package.metadata.app]
app_id = "store"

# Each plugin opts in via its own sibling table on the app manifest.
[package.metadata.auth]
methods = ["oauth", "jwt"]

[package.metadata.telemetry]
metrics = true

[package.metadata.vectors]
model = "BAAI/bge-small-en-v1.5"

[package.metadata.audit]
state = true`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">What stops being a vendor decision</div>
        <h2 className="section-title">Cross-cutting concerns become config</h2>
        <p className="section-desc">
          The infrastructure your team would normally negotiate contracts and integrate SDKs for — identity, embeddings, queues, telemetry — sits in the same process as your handlers. Configure them in TOML; introspect them through MCP; write a plugin of your own when none of the bundled five fit.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">Identity without an SDK install</div>
            <div className="feature-text">
              <code>yeti-auth</code> lives inside the binary. JWT validation is a function call. OAuth callbacks land on the same process that owns your tables. There's no auth-vendor SDK to upgrade, no callback-domain rotation, no "the SAML library was the only thing not on Node 20."
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">Embeddings without a network hop</div>
            <div className="feature-text">
              <code>yeti-ai</code> embeds a string in the same process that just persisted the row. The bytes never leave the binary. Compliance teams sign off without asking where the model is hosted, because the model is right here. The latency budget for "auto-embed on insert" is a CPU spike, not a round-trip.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Queues without a separate cluster</div>
            <div className="feature-text">
              <code>yeti-jobs</code> claims work from RocksDB. The journal is the same engine that holds your data. There's no Redis to replicate, no SQS to provision, no Temporal cluster to scale. Ops teams stop having "the queue is full" as a separate paging tier.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Telemetry without a vendor invoice</div>
            <div className="feature-text">
              <code>yeti-telemetry</code> emits OTLP to Grafana, Datadog, Honeycomb, or any collector. Picking one isn't an integration project — it's an endpoint URL. The bill scales with compute, not with retained log volume; nothing in the platform encourages you to log less than you should.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Built-in</div>
        <h2 className="section-title">Five plugins, one binary</h2>
        <p className="section-desc">
          Each plugin provides tables, resources, and lifecycle hooks. Apps opt in by listing them in the manifest. No package to install, no service to run — they're already there.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">yeti-auth</div>
            <div className="feature-text">
              Basic, JWT, and OAuth authentication. Modern password hashing, configurable token lifetimes, email-pattern role mapping, CSRF protection. Wires straight into the <code>@access</code> directive.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">yeti-telemetry</div>
            <div className="feature-text">
              Logs, spans, and metrics with a built-in dashboard. OpenTelemetry-compatible — point it at any collector you already use. File rotation, real-time streaming, and a query API for live data.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">yeti-ai</div>
            <div className="feature-text">
              Embeddings and inference that run natively in-process — no external API calls. Auto-embedding on insert/update for <code>Vector @indexed</code> fields. Chat completion. Model management. Uses your machine's accelerators automatically.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">yeti-jobs</div>
            <div className="feature-text">
              Durable workflows. The <code>queue!()</code> macro registers a job that survives crashes; if a worker dies, another picks it up where it left off. Status is queryable from any node. Temporal-style guarantees, in-process.
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
        <CodeBlock label="yeti.toml">{`[plugins.yeti-auth]
methods = ["oauth", "basic"]

[plugins.yeti-auth.oauth.google]
clientId = "\${GOOGLE_CLIENT_ID}"
clientSecret = "\${GOOGLE_CLIENT_SECRET}"

[[plugins.yeti-auth.oauth.rules]]
strategy = "email"
pattern = "*@mycompany.com"
role = "admin"

[plugins.yeti-telemetry]
metrics = true
serviceName = "store"
otlpEndpoint = "http://otel-collector:4317"
metricsIntervalSecs = 10`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Durable functions</div>
        <h2 className="section-title">Workflows that survive crashes</h2>
        <p className="section-desc">
          The <code>queue!()</code> macro registers a durable workflow. Inputs are persisted before any work starts. If a worker dies mid-execution, the platform hands its work to a live one and the run resumes from where it stopped. Stuck workflows are impossible by design.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="archive" />
            <div className="feature-title">Define once, run forever</div>
            <div className="feature-text">
              The macro registers a handler keyed by request ID. Inputs are persisted on entry; runs are idempotent by construction. The same handler resumes after a crash, a deploy, or a restart.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Automatic worker recovery</div>
            <div className="feature-text">
              Long-running handlers periodically signal that they're still alive. If they stop, another worker picks up the job. There are no stuck workflows because there's no way to leave one stuck.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Queryable request IDs</div>
            <div className="feature-text">
              Every queued job has a stable request ID. Poll status from any node — current step, last activity, retry count, final result. Works as a backbone for status APIs and webhooks.
            </div>
          </div>
        </div>
        <CodeBlock label="resources/process_order.rs">{`use yeti_sdk::prelude::*;

queue!(ProcessOrder {
    name = "process_order",
    timeout = "5m",
    handler(ctx, input: OrderInput) => {
        // Persisted input is journal-backed. The lease auto-renews while
        // the handler is running; if the worker dies, another picks up.
        let order = ctx.table("Order")?.create(json!(input)).await?;
        ctx.queue("ChargeCard").enqueue(order["id"].clone()).await?;
        Ok(())
    }
});`}</CodeBlock>
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
              <code>yeti_sdk::plugins::*</code> exposes the <code>Plugin</code> trait, registration context, and config validation — the same primitives the built-in plugins use.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Live reload</div>
            <div className="feature-text">
              Plugin source change triggers a recompile and hot-swap. In-flight requests finish on the old version; new requests use the new one. No process restart, no warmup.
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
