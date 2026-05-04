import Icon from '../components/Icon'
import CodeBlock from '../components/CodeBlock'

export default function LLMOptimization() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Pay your LLM bill once.</h1>
        <p className="page-subtitle">
          Most teams pay frontier prices for repeated questions. <a href="https://promptresponse.io" target="_blank" rel="noopener noreferrer">PromptResponse</a> caches semantically, fine-tunes on the cached pairs, and routes the hot path to a tuned model. ~80% cost reduction. Zero UX change.
        </p>
      </div>

      <section className="section">
        <div className="section-label">The pitch</div>
        <h2 className="section-title">Paste an API key. Get a URL. Drop your bill 80%.</h2>
        <p className="section-desc">
          PromptResponse sits in front of frontier LLM APIs. The first time a user asks a question, the proxy forwards it to the model and caches the response embedding-keyed. The second time anyone asks anything semantically similar, it returns from cache in milliseconds at zero cost. The cache feeds a training pipeline; eventually a fine-tuned LoRA hat takes over the hot path.
        </p>
      </section>

      <section className="section">
        <div className="section-label">How PromptResponse uses Yeti</div>
        <h2 className="section-title">Cache, queue, and route — all schema-driven</h2>
        <p className="section-desc">
          The cache is a vector-indexed table. The retry pipeline is a durable function. The training-pair capture is an audit policy. The tier-routing decision is an RBAC matrix. PromptResponse barely writes Rust.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Vector cache</div>
            <div className="feature-text">
              <code>@store(durability: "soft")</code> + <code>embedding: Vector @indexed(source: "prompt")</code> = semantic similarity match in under 5 ms. Cache hits never hit the frontier API.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Durable inference pipeline</div>
            <div className="feature-text">
              Cache misses run through <code>queue!()</code>. Heartbeat leases, queryable request IDs, and journal-backed resume mean retries and circuit breakers never lose a request.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="clipboard-check" />
            <div className="feature-title">Inline training-pair capture</div>
            <div className="feature-text">
              <code>@audit(state: true)</code> on the inference table captures the full prompt-completion pair. The training pipeline reads from the audit stream — no separate logging path.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">Tier-aware routing</div>
            <div className="feature-text">
              <code>@access</code> per route decides whether a customer gets the smart cache, RAG, or the LoRA hat. Tier upgrades are role grants — no special-case code.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">In code</div>
        <h2 className="section-title">A semantic cache, end to end</h2>
        <p className="section-desc">
          Two tables describe the entire system: cached responses and training pairs. The pipeline that ties them is a single durable function.
        </p>
        <div className="features-grid">
          <div className="feature-card has-code">
            <Icon name="file-text" />
            <div className="feature-title">Cache + training tables</div>
            <div className="feature-text">
              The CachedResponse table is read-heavy and embedding-indexed. TrainingPair captures the prompt/completion pair on every miss, regardless of cache state — that's the corpus for the LoRA hat.
            </div>
            <CodeBlock label="schemas/schema.graphql">{`type CachedResponse
  @table(database: "promptresponse")
  @store(durability: "soft", evictAfter: "30d")
  @distribute(replicationFactor: 3, residency: "full")
  @export(rest: true, graphql: true, mcp: true)
  @access(roles: { read: ["customer"], write: ["pipeline"] })
  @audit(operations: ["write"], retention: 90) {
    id: ID! @primaryKey
    customerId: ID! @indexed
    prompt: String!
    completion: String!
    model: String! @indexed
    embedding: Vector @indexed(source: "prompt", model: "BAAI/bge-small-en-v1.5")
    occurredAt: Int!
}

type TrainingPair
  @table(database: "promptresponse")
  @store(durability: "soft", evictAfter: "365d")
  @distribute(replicationFactor: 2)
  @export(rest: true)
  @access(roles: { read: ["trainer"], write: ["pipeline"] })
  @audit(operations: ["write"], retention: 730) {
    id: ID! @primaryKey
    customerId: ID! @indexed
    prompt: String!
    completion: String!
    model: String!
    quality: Float
    capturedAt: Int!
}`}</CodeBlock>
          </div>
          <div className="feature-card has-code">
            <Icon name="refresh" />
            <div className="feature-title">Durable retry pipeline</div>
            <div className="feature-text">
              Vector lookup first; on miss, <code>queue!()</code> drives the frontier call with retry + circuit-breaker. Heartbeats prove progress; if a worker dies, the next worker resumes.
            </div>
            <CodeBlock label="query.json">{`{
  "table": "CachedResponse",
  "conditions": [
    { "field": "embedding", "op": "vector", "value": "How do I cancel my subscription?" },
    { "field": "customerId", "op": "eq", "value": "cust-471" }
  ],
  "limit": 1,
  "minSimilarity": 0.92
}`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <a className="btn btn-lg" href="https://promptresponse.io" target="_blank" rel="noopener noreferrer">Visit PromptResponse →</a>
      </section>
    </div>
  )
}
