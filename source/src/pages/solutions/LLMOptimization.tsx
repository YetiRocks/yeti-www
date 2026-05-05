import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function LLMOptimization() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">You are the subject matter expert.</h1>
        <p className="page-subtitle">
          Frontier LLMs are extraordinary at general reasoning and merely competent at your business. <a href="https://promptresponse.io" target="_blank" rel="noopener noreferrer">PromptResponse</a> captures every prompt and completion from your live traffic, fine-tunes a LoRA hat that knows your domain, and routes the hot path to it. Frontier quality on the nuances only you understand — at a fraction of the spend.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Competent vs excellent</div>
        <h2 className="section-title">General intelligence is a commodity. Your domain is the moat.</h2>
        <p className="section-desc">
          Every frontier model can write a competent first draft about your business. None of them can write the second one without your nuance — the policies, the product names, the edge cases your customers actually care about. The way to bake that nuance into a model is to use the corpus you already produce: every prompt and completion served on your traffic. LoRA fine-tuning at 4-bit precision (QLoRA) turns that corpus into a specialized model on a single consumer GPU, with quality that rivals GPT-4 on the tasks your customers ask about most.
        </p>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">~80%</div>
            <div className="stat-label">Frontier-API spend eliminated by semantic cache hits on production traffic</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">&lt;1%</div>
            <div className="stat-label">Of model parameters trainable with LoRA — fine-tune without a cluster</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">4-bit</div>
            <div className="stat-label">QLoRA precision (NF4) — a 7B base model fits one consumer GPU</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">+34 pts</div>
            <div className="stat-label">Targeted-task gain over base model after LoRA fine-tuning on clean domain data</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Six pillars of the cache + tune + route stack</div>
        <h2 className="section-title">What turns frontier-grade quality into a per-customer commodity</h2>
        <p className="section-desc">
          Every concern in PromptResponse's pipeline maps to a Yeti primitive — a directive in the schema, a plugin in the binary, or a runtime guarantee from the platform. The cache is data. The pipeline is a directive. The training corpus is an audit trail. The model swap is a config change.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Semantic vector cache</div>
            <div className="feature-text">
              <code>embedding: Vector @indexed(source: "prompt")</code> on <code>CachedResponse</code>. <code>yeti-ai</code> auto-embeds on insert; HNSW match runs in &lt;5 ms. Identical and semantically-similar prompts hit cache; the frontier never sees them.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Durable inference pipeline</div>
            <div className="feature-text">
              Cache misses run through <code>queue!()</code>. Heartbeat leases, queryable request IDs, journal-backed resume — retries + circuit breakers never lose a request, even when frontier providers throttle or 5xx mid-stream.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="clipboard-check" />
            <div className="feature-title">Inline training-pair capture</div>
            <div className="feature-text">
              <code>@audit(state: true)</code> on the inference table journals every prompt-completion pair with before/after state. The training pipeline reads the audit stream — no parallel logging service, no data leak surface, no drift.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">LoRA fine-tuning loop</div>
            <div className="feature-text">
              Captured pairs feed periodic LoRA training jobs. Update only the adapters — under 1% of base parameters — using QLoRA at 4-bit precision. A 7B model fine-tunes on a single 4090; quality matches frontier on the customer's domain.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Local LoRA serving via yeti-ai</div>
            <div className="feature-text">
              <code>yeti-ai</code> hosts the base model and swaps LoRA hats per customer. Adapters are tens of megabytes. Hot-load a new hat without restarting the model. Inference stays in-process — your data never leaves the binary.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">Tier-aware routing</div>
            <div className="feature-text">
              <code>@access</code> per route decides whether a customer hits cache, frontier, RAG, or their LoRA hat. Tier upgrades are role grants. The agent picks the cheapest path that meets the customer's quality SLA.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">In code</div>
        <h2 className="section-title">From schema to inference handler</h2>
        <p className="section-desc">
          Two tables describe the model: <code>CachedResponse</code> is the read-heavy semantic cache; <code>TrainingPair</code> is the captured corpus that feeds the LoRA loop. The handler ties them together as a single durable function.
        </p>
        <p className="code-caption">
          Two tables, vector-indexed cache + training corpus. The audit directive on <code>CachedResponse</code> captures every prompt/completion pair without a separate logging path.
        </p>
        <CodeBlock label="schemas/schema.graphql">{`type CachedResponse
  @table(database: "promptresponse")
  @store(durability: "soft", evictAfter: "30d")
  @distribute(replicationFactor: 3, residency: "full")
  @export(rest: true, graphql: true, mcp: true)
  @access(roles: { read: ["customer"], write: ["pipeline"] })
  @audit(operations: ["write"], retention: 90, state: true) {
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
        <p className="code-caption">
          Vector lookup → cache miss → frontier call → cache write. The <code>@audit</code> directive on <code>CachedResponse</code> handles training-pair capture invisibly; the <code>queue!()</code> macro makes the path durable.
        </p>
        <CodeBlock label="resources/infer.rs">{`use yeti_sdk::prelude::*;

queue!(Inference {
    name = "infer",
    timeout = "60s",
    handler(ctx, req: InferRequest) => {
        // 1. Semantic cache lookup against the customer's vector index.
        let hit = ctx.table("CachedResponse")
            .vector_search("embedding", &req.prompt)
            .filter(&format!("customerId=eq={}", req.customer_id))
            .min_similarity(0.92)
            .first().await?;
        if let Some(c) = hit {
            return Ok(json!({ "completion": c["completion"], "from": "cache" }));
        }

        // 2. Cache miss — route to frontier API or local LoRA hat.
        ctx.heartbeat().await?;
        let completion = match req.tier.as_str() {
            "lora" => ctx.ai().complete(&req.lora_hat, &req.prompt).await?,
            _      => ctx.fetch().post_json(&req.frontier_url, &req.payload).await?,
        };

        // 3. Write back to cache. Auto-embedding fires on insert; @audit captures the pair.
        ctx.table("CachedResponse").create(&json!({
            "customerId": req.customer_id,
            "prompt": req.prompt,
            "completion": completion,
            "model": req.model,
            "occurredAt": now_secs(),
        })).await?;

        Ok(json!({ "completion": completion, "from": req.tier }))
    }
});`}</CodeBlock>
      </section>

      <section className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <a className="btn btn-lg" href="https://promptresponse.io" target="_blank" rel="noopener noreferrer">Visit PromptResponse →</a>
      </section>
    </div>
  )
}
