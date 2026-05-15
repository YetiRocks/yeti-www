import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function MediaSecurity() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Millions of access decisions per second.</h1>
        <p className="page-subtitle">
          A single legitimate subscription, leaked once, generates hundreds or thousands of unauthorized concurrent streams. <a href="https://streamlock.ai" target="_blank" rel="noopener noreferrer">StreamLock</a> uses Yeti to detect the abuse, ban the token at the edge, and journal the decision — all in one binary with single-digit-millisecond response times.
        </p>
      </div>

      <section className="section">
        <div className="section-label">The scale</div>
        <h2 className="section-title">Token sharing now consumes a quarter of streaming traffic.</h2>
        <p className="section-desc">
          When a session token leaks to a forum or piracy site, every viewer in the chain charges to the original CDN account. Bills go up; revenue goes down; viewer experience degrades. Industry research from <a href="https://www.harper.fast/resources/understanding-live-stream-token-sharing-and-how-to-prevent-it" target="_blank" rel="noopener noreferrer">harper.fast</a> and others puts the impact in plain numbers:
        </p>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">45%</div>
            <div className="stat-label">Of CDN traffic on high-profile live events traced to token sharing</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">30%</div>
            <div className="stat-label">Of CDN traffic on streaming platforms consumed by unauthorized users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">$113B</div>
            <div className="stat-label">Cumulative streaming-piracy revenue losses projected through 2027</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">1,000s</div>
            <div className="stat-label">Of concurrent unauthorized streams from a single shared token</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">The mitigation playbook</div>
        <h2 className="section-title">Standard mitigations are the floor, not the ceiling.</h2>
        <p className="section-desc">
          Every CDN already does signed URLs and edge validation. Sharing still happens because attackers move faster than per-request checks. StreamLock layers anomaly detection, device tracking, and CTA-WAVE-friendly identity on top — at the aggregation layer where evidence accumulates.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">Signed URLs &amp; cookies</div>
            <div className="feature-text">
              Time-limited tokens embedded in the request URL or cookie, validated by the CDN at the edge. Necessary baseline; not sufficient when one valid token is in 10,000 hands at once.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">Dual-token authentication</div>
            <div className="feature-text">
              Short-lived auth token bootstraps a session-specific long-lived segment token. Raises the bar but doesn't catch a session that's been cloned across continents.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">IP &amp; device anomaly detection</div>
            <div className="feature-text">
              Track unique IPs and country counts per token within a window. A token with thirty IPs in five countries in ten minutes is shared, full stop. StreamLock thresholds and bans inline.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">CTA-WAVE common access tokens</div>
            <div className="feature-text">
              Industry-standard token format with cryptographically bound identity claims. StreamLock issues, validates, and revokes CTA-WAVE tokens through the same <code>@access</code> + <code>@audit</code> path as native JWT.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">How StreamLock builds it on Yeti</div>
        <h2 className="section-title">Schema-driven license enforcement</h2>
        <p className="section-desc">
          Licenses, geo-rules, access events, and ban decisions are all tables. RBAC is a directive. Audit is a directive. Real-time replication is a directive. The five-service stack collapses to one schema file with one runtime.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Inline auth at wire speed</div>
            <div className="feature-text">
              JWT and CTA-WAVE token validation plus per-operation RBAC run in-process via <code>@access</code>. No network hop to a separate auth service. Verification happens in microseconds.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="clipboard-check" />
            <div className="feature-title">@audit on every decision</div>
            <div className="feature-text">
              <code>@audit(operations: ["read", "create", "update", "delete"], retention: 2555, state: true)</code> on the License and BannedTokens tables. Every allow, deny, and ban journaled with before/after state for compliance review and forensics.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Live audit streams over SSE</div>
            <div className="feature-text">
              Every audit event fires a PubSub event. Internal dashboards subscribe over SSE; downstream systems pull from MQTT. No separate broker, no separate database, no polling.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="map" />
            <div className="feature-title">Geo-residency built in</div>
            <div className="feature-text">
              <code>@distribute(residency: "sharded")</code> with a region-scoped shard key keeps license tables in the regions where they belong. Reads stay local. Geo-restrictions enforce at the edge without a round-trip to a central database.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Aggregation and decisioning</div>
        <h2 className="section-title">From a stream of access events to a banned-tokens table</h2>
        <p className="section-desc">
          StreamLock subscribes to the high-volume <code>AggregatedTokens</code> stream over MQTT, evaluates each row against the customer's <code>StreamConfig</code> policy, and upserts <code>BannedTokens</code> on violation. The ingress hot path consults the in-RAM ban mirror — the table on disk is the source of truth, the RAM mirror is the cache, and the schema directives wire all of it.
        </p>
        <p className="code-caption">
          Three tables describe the loop. <code>StreamConfig</code> is the per-customer policy; <code>AggregatedTokens</code> is the per-window evidence; <code>BannedTokens</code> is the decision the edge enforces.
        </p>
        <CodeBlock label="schemas/schema.graphql">{`type StreamConfig
  @table(database: "streamlock")
  @store(durability: "strong")
  @export(rest: true, graphql: true)
  @access(roles: { read: ["admin", "evaluator"], create: ["admin"], update: ["admin"], delete: ["admin"] }) {
    id: ID! @primaryKey                # "{customerId}|{contentId}" or "{customerId}|*"
    customerId: String! @indexed
    contentId: String                  # null = applies to all content
    maxIpsPerWindow: Int!
    maxCountriesPerWindow: Int!
    windowSec: Int!
}

type AggregatedTokens
  @table(database: "streamlock")
  @store(durability: "soft", evictAfter: 3600)
  @export(mqtt: true)
  @access(roles: { read: ["evaluator"], create: ["aggregator"], update: ["aggregator"] }) {
    id: ID! @primaryKey
    customerId: String! @indexed
    contentId: String @indexed
    tokenId: String! @indexed
    uses: Int!
    uniqIpCount: Int!
    uniqCountryCount: Int!
}

type BannedTokens
  @table(database: "streamlock")
  @store(durability: "strong")
  @distribute(replicationFactor: 3, residency: "full")
  @export(rest: true, sse: true, mqtt: true)
  @access(roles: { read: ["edge", "admin"], create: ["evaluator", "admin"], update: ["evaluator", "admin"], delete: ["admin"] })
  @audit(operations: ["create", "update", "delete"], retention: 365, state: true) {
    id: ID! @primaryKey                # "{customerId}:{tokenId}"
    customerId: String! @indexed
    tokenId: String! @indexed
    blocked: Boolean!
    reason: String!
    lastUpdatedAt: Int!
}`}</CodeBlock>
        <p className="code-caption">
          Subscribe → evaluate → upsert. Two functions, no broker, no separate workflow engine. <code>@audit</code> on <code>BannedTokens</code> handles the decision trail; the schema does the rest.
        </p>
        <CodeBlock label="resources/evaluator.rs">{`use yeti_sdk::prelude::*;

// Subscribe to AggregatedTokens; evaluate each row against the customer's
// StreamConfig policy; upsert BannedTokens on violation.
pub fn start_evaluator() -> Option<Subscription> {
    subscribe_table("AggregatedTokens", |msg| {
        if !matches!(msg.message_type, MessageType::Update | MessageType::Publish) {
            return;
        }
        spawn(async move {
            if let Err(e) = evaluate_row(msg.data).await {
                tracing::warn!("[streamlock] evaluator: {e}");
            }
        });
    })
}

async fn evaluate_row(row: Value) -> Result<()> {
    let ctx = Context::current();
    let customer_id = row["customerId"].as_str().unwrap_or_default();
    let content_id = row["contentId"].as_str().unwrap_or_default();
    let token_id = row["tokenId"].as_str().unwrap_or_default();

    // Per-content policy first; fall back to per-customer default.
    let policy = ctx.table("StreamConfig")
        .get(&format!("{customer_id}|{content_id}")).await?
        .or(ctx.table("StreamConfig")
            .get(&format!("{customer_id}|*")).await?);

    let Some(p) = policy else { return Ok(()); };

    let ip_count = row["uniqIpCount"].as_i64().unwrap_or(0);
    let country_count = row["uniqCountryCount"].as_i64().unwrap_or(0);
    let max_ips = p["maxIpsPerWindow"].as_i64().unwrap_or(i64::MAX);
    let max_countries = p["maxCountriesPerWindow"].as_i64().unwrap_or(i64::MAX);

    let reason = if ip_count > max_ips {
        "ip_count_exceeded"
    } else if country_count > max_countries {
        "country_count_exceeded"
    } else {
        return Ok(()); // within policy
    };

    let id = format!("{customer_id}:{token_id}");
    ctx.table("BannedTokens").upsert(&id, &json!({
        "id": id,
        "customerId": customer_id,
        "tokenId": token_id,
        "blocked": true,
        "reason": reason,
        "lastUpdatedAt": now_secs(),
    })).await?;

    Ok(())
}`}</CodeBlock>
      </section>

      <section className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <a className="btn btn-lg" href="https://streamlock.ai" target="_blank" rel="noopener noreferrer">Visit StreamLock →</a>
      </section>
    </div>
  )
}
