import Icon from '../components/Icon'
import CodeBlock from '../components/CodeBlock'

export default function MediaSecurity() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Millions of access decisions per second.</h1>
        <p className="page-subtitle">
          Content platforms verify licenses, enforce geo-restrictions, and log every access at scale. <a href="https://streamlock.ai" target="_blank" rel="noopener noreferrer">StreamLock</a> collapses the typical five-service stack into one Yeti binary with single-digit-millisecond response times.
        </p>
      </div>

      <section className="section">
        <div className="section-label">The problem</div>
        <h2 className="section-title">Five services, one decision</h2>
        <p className="section-desc">
          A typical media-security stack chains an API gateway, an auth service, a rules engine, a message broker for audit trails, and a monitoring stack — five services, five failure modes, five bills. StreamLock uses Yeti to do all five in-process: every license check is a directive in the schema, every audit event is a PubSub fanout, every replication choice is one keyword in <code>@distribute</code>.
        </p>
      </section>

      <section className="section">
        <div className="section-label">How StreamLock builds it</div>
        <h2 className="section-title">Schema-driven license enforcement</h2>
        <p className="section-desc">
          Licenses, geo-rules, and access logs are tables. RBAC is a directive. Audit is a directive. Real-time replication is a directive. The five-service stack collapses to one schema file.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">Inline auth at wire speed</div>
            <div className="feature-text">
              JWT validation and per-operation RBAC run in-process via <code>@access</code>. No network hop to a separate auth service. Token verification happens in microseconds.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="clipboard-check" />
            <div className="feature-title">@audit on every decision</div>
            <div className="feature-text">
              Add <code>@audit(operations: ["read", "write"], retention: 365, state: true)</code> to the License table. Every access decision is journaled with before/after state for compliance review.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Live audit streams over SSE</div>
            <div className="feature-text">
              Every audit event fires a PubSub event. Internal dashboards subscribe to the audit table over SSE. No separate broker, no separate database, no polling.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="map" />
            <div className="feature-title">Geo-residency built in</div>
            <div className="feature-text">
              <code>@distribute(residency: "geo-subset")</code> keeps license tables in the regions where they belong. Reads stay local. Geo-restrictions enforce at the edge without a round-trip to a central database.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">In code</div>
        <CodeBlock label="schemas/schema.graphql">{`type License
  @table(database: "streamlock")
  @store(durability: "strong")
  @distribute(replicationFactor: 3, residency: "geo-subset", regions: ["us-east", "eu-west"])
  @export(rest: true, graphql: true, sse: true)
  @access(roles: { read: ["partner", "admin"], write: ["admin"] })
  @audit(operations: ["read", "write", "delete"], retention: 2555, state: true) {
    id: ID! @primaryKey
    contentId: ID! @indexed
    territory: String! @indexed
    expiresAt: Int!
    holder: String!
}

type AccessEvent
  @table(database: "streamlock")
  @store(durability: "soft", evictAfter: "365d")
  @distribute(replicationFactor: 2)
  @export(sse: true)
  @access(roles: { read: ["admin", "auditor"], write: ["partner"] })
  @audit(operations: ["write"], retention: 365) {
    id: ID! @primaryKey
    licenseId: ID! @indexed
    contentId: ID! @indexed
    decision: String!
    requesterIp: String
    occurredAt: Int!
}`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Aggregation and decisioning</div>
        <h2 className="section-title">From a stream of access events to a banned-tokens table</h2>
        <p className="section-desc">
          StreamLock subscribes to the high-volume <code>AggregatedTokens</code> stream over MQTT, evaluates each row against the customer's <code>StreamConfig</code> policy, and upserts <code>BannedTokens</code> on violation. The ingress hot path consults the in-RAM ban mirror — the table on disk is the source of truth, the RAM mirror is the cache, and the schema directives wire all of it.
        </p>
        <CodeBlock label="resources/evaluator.rs">{`use yeti_sdk::prelude::*;

// Subscribe to AggregatedTokens; evaluate each row against the customer's
// policy; upsert BannedTokens + append a TokenAuditLog entry on violation.
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
    let cfg = ctx.table("StreamConfig")
        .get(&format!("{}|{}", row["customerId"], row["contentId"]))
        .await?
        .or(ctx.table("StreamConfig")
            .get(&format!("{}|*", row["customerId"]))
            .await?);

    let Some(policy) = cfg else { return Ok(()); };

    if let Some(violation) = rules::evaluate(&row, &policy) {
        let id = format!("{}:{}", row["customerId"], row["tokenId"]);
        ctx.table("BannedTokens").upsert(&id, &json!({
            "id": id,
            "customerId": row["customerId"],
            "contentId": row["contentId"],
            "tokenId": row["tokenId"],
            "blocked": violation.blocking,
            "flagged": true,
            "reason": violation.rule_name,
            "evidenceJson": violation.evidence_json(),
            "ipCountObserved": row["uniqIpCount"],
            "countryCountObserved": row["uniqCountryCount"],
            "lastUpdatedAt": now_secs(),
            "lastUpdatedBy": "evaluator",
            "manualOverride": false,
        })).await?;

        ctx.table("TokenAuditLog").create(&json!({
            "tokenId": row["tokenId"],
            "action": if violation.blocking { "ban" } else { "flag" },
            "rule": violation.rule_name,
            "occurredAt": now_secs(),
        })).await?;
    }
    Ok(())
}`}</CodeBlock>
      </section>

      <section className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <a className="btn btn-lg" href="https://streamlock.ai" target="_blank" rel="noopener noreferrer">Visit StreamLock →</a>
      </section>
    </div>
  )
}
