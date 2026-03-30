export default function Company() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Built by engineers, for engineers</h1>
        <p className="page-subtitle">
          We believe backend infrastructure has too many moving parts. Yeti replaces the stack with a single binary.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Mission</div>
        <h2 className="section-title">Fewer servers. Less complexity. More shipping.</h2>
        <p className="section-desc">
          Every team we've worked with runs the same handful of services: an API server, a database, an auth layer, a message broker, a monitoring stack. Each one requires its own deployment, its own config, its own failure modes. Yeti combines all of them into one runtime so teams can focus on their product instead of their infrastructure.
        </p>
      </section>

      <section className="section">
        <div className="section-label">Product</div>
        <h2 className="section-title">One binary. Everything included.</h2>
        <p className="section-desc">
          Yeti is a composable application platform written in Rust. It provides REST, GraphQL, WebSocket, SSE, MQTT, and MCP interfaces over an embedded RocksDB storage engine. Auth, telemetry, and vector search are built-in extensions. Custom logic ships as native plugins compiled from Rust source. The result is a single process that replaces what used to take a cluster.
        </p>
      </section>

      <section className="section">
        <div className="section-label">Contact</div>
        <h2 className="section-title">Get in touch</h2>
        <p className="section-desc">
          For sales and enterprise inquiries: <a href="mailto:sales@yetirocks.com">sales@yetirocks.com</a><br />
          For general questions: <a href="mailto:hello@yetirocks.com">hello@yetirocks.com</a><br />
          Follow development on <a href="https://github.com/yetirocks" target="_blank" rel="noopener noreferrer">GitHub</a> and <a href="https://linkedin.com/company/yetirocks" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </p>
      </section>
    </div>
  )
}
