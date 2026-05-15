import Icon from '../../components/Icon'
import CodeBlock from '../../components/CodeBlock'

export default function AgenticHarness() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">An LLM is the engine. The harness is the car.</h1>
        <p className="page-subtitle">
          A frontier model is a probability distribution over tokens. <a href="https://agentdaddy.io" target="_blank" rel="noopener noreferrer">AgentDaddy</a> is the control layer that turns it into a reliable, audited, 24/7 agent — built on Yeti's per-agent isolation, capability manifests, durable functions, and MCP-driven tool discovery.
        </p>
      </div>

      <section className="section">
        <div className="section-label">The scale</div>
        <h2 className="section-title">Production agents need a runtime, not a prompt.</h2>
        <p className="section-desc">
          The shift in 2026 isn't bigger models — it's reliable execution. Long-running, multi-step tasks demand stability, error recovery, controlled tool use, and an auditable decision trail. The harness is what supplies them.
        </p>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">60–70%</div>
            <div className="stat-label">Cost reduction in agentic workflows from caching and smaller-model routing</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Autonomous operation per agent, no human-in-the-loop required for routine tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">100%</div>
            <div className="stat-label">Audit-trail coverage on every tool call and memory write via <code>@audit</code></div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">Implicit privileges. Every capability is declared, gated, and revocable</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Six pillars of the harness</div>
        <h2 className="section-title">What turns an LLM into an agent</h2>
        <p className="section-desc">
          AgentDaddy maps every concern of a production-grade harness to a concrete Yeti primitive — a directive in the schema, a plugin in the binary, or a runtime guarantee from the platform. No bolted-on services, no glue.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Reliability via durable execution</div>
            <div className="feature-text">
              <code>queue!()</code> registers each turn as a durable workflow. Heartbeat leases prove worker liveness; if a worker dies mid-execution, the supervisor reassigns and resumes from the journal. Long-running, multi-step tasks survive crashes.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="key" />
            <div className="feature-title">Tool use via capability manifests</div>
            <div className="feature-text">
              Every agent declares what it can reach: <code>memory.read</code>, <code>http_egress</code>, <code>gmail.send</code>. The turn engine checks the manifest before every tool call. Undeclared capabilities are invisible to the LLM — not denied, nonexistent. Prompt-injection blast radius bounded by data, not code.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">Model agnosticism</div>
            <div className="feature-text">
              The agent loop is data, not code path. Swap GPT-5 for Claude or route routine turns to a local Llama through <code>yeti-ai</code> without re-engineering the harness. Switching models is a config change, not a migration.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Security via sandboxed access</div>
            <div className="feature-text">
              Per-agent RocksDB isolation. <code>@access</code> RBAC per resource. Agents never see infrastructure credentials, never SSH, never run shell commands. Human-in-the-loop checkpoints pause the queue at sensitive operations until an operator approves.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Cost control with caching + local inference</div>
            <div className="feature-text">
              <code>yeti-ai</code> runs Candle embeddings and inference in-process for sensitive workloads. Semantic-cache integrations (see <a href="https://promptresponse.io" target="_blank" rel="noopener noreferrer">PromptResponse</a>) cut frontier-API spend 60–70% on repetitive workflows. Smaller-model routing is one directive away.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Scale via Yeti Fabric</div>
            <div className="feature-text">
              One Yeti binary hosts dozens of agents in isolated namespaces. <a href="/platform/fabric">Yeti Fabric</a> scales horizontally across regions with mTLS mesh, per-deployment encryption, and centralized placement. Thousands of concurrent agent runs, no linear headcount growth.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">How AgentDaddy uses Yeti</div>
        <h2 className="section-title">Per-agent isolation, declaratively</h2>
        <p className="section-desc">
          Each agent gets its own database, its own RBAC matrix, its own capability grants. The turn engine consults the matrix before every tool call. The schema directives wire all of it — no perimeter logic in user code.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">Per-agent database isolation</div>
            <div className="feature-text">
              Each agent template gets its own RocksDB instance with its own column families. Memory, sessions, execution logs, and credentials are physically separated. Agent A cannot query Agent B's tables — there is no shared database to misconfigure.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="clipboard-check" />
            <div className="feature-title">Capability grants as data</div>
            <div className="feature-text">
              <code>CapabilityGrant</code> is a table. Operators add, revoke, and time-bound grants per agent. The runtime checks the manifest on every tool call. <code>@audit</code> on the table captures every grant change with before/after state.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">Per-agent OAuth + RBAC</div>
            <div className="feature-text">
              <code>@access</code> directives wire RBAC per agent table. The auth loader seeds roles at deploy time. Development mode does not bypass internal auth.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">MCP harness for tools</div>
            <div className="feature-text">
              Agents discover their available tools through Yeti's MCP server. The MCP surface filters by the active capability manifest — agents only see tools they're allowed to call.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">In code</div>
        <h2 className="section-title">From schema to durable turn handler</h2>
        <p className="section-desc">
          Three tables describe the model: <code>AgentTemplate</code> defines the agent, <code>AgentRun</code> records every execution, <code>CapabilityGrant</code> is the manifest. The turn handler is a durable function that consults the manifest before every tool call and survives crashes via <code>queue!()</code>.
        </p>
        <p className="code-caption">
          Three tables, four directives each. The schema is the perimeter — the runtime enforces what the directives declare.
        </p>
        <CodeBlock label="schemas/schema.graphql">{`type AgentTemplate
  @table(database: "agentdaddy")
  @store(durability: "strong")
  @export(rest: true, graphql: true, mcp: true)
  @access(roles: { read: ["operator"], create: ["operator"], update: ["operator"], delete: ["operator"] })
  @audit(operations: ["create", "update", "delete"], retention: 365, state: true) {
    id: ID! @primaryKey
    slug: String! @indexed
    name: String!
    brain: String!
    capabilities: [String!]!
}

type AgentRun
  @table(database: "agentdaddy")
  @store(durability: "soft", evictAfter: 7776000)
  @export(rest: true, sse: true, mcp: true)
  @access(roles: { read: ["operator", "auditor"], create: ["agent"], update: ["agent"] })
  @audit(operations: ["create", "update", "delete"], retention: 365) {
    id: ID! @primaryKey
    agentId: ID! @indexed
    status: String! @indexed
    startedAt: Int!
    completedAt: Int
    summary: String
}

type CapabilityGrant
  @table(database: "agentdaddy")
  @store(durability: "strong")
  @export(rest: true)
  @access(roles: { read: ["operator", "agent"], create: ["operator"], update: ["operator"], delete: ["operator"] })
  @audit(operations: ["create", "update", "delete"], retention: 2555, state: true) {
    id: ID! @primaryKey
    agentId: ID! @indexed
    capability: String! @indexed
    grantedBy: String!
    expiresAt: Int
}`}</CodeBlock>
        <p className="code-caption">
          The turn handler. <code>queue!()</code> makes it durable — the lease auto-renews while the handler runs, and the manifest check happens before every tool call. Crashes resume from the journal.
        </p>
        <CodeBlock label="resources/run_turn.rs">{`use yeti_sdk::prelude::*;

queue!(RunTurn {
    name = "run_turn",
    timeout = "10m",
    handler(ctx, input: TurnInput) => {
        let agent = ctx.table("AgentTemplate")?.get_or_404(&input.agent_id).await?;
        for capability in &input.required_capabilities {
            let grant = ctx.table("CapabilityGrant")?
                .query()
                .where_eq("agentId", agent["id"].clone())
                .where_eq("capability", capability.clone())
                .first().await?;
            if grant.is_none() {
                return Err(YetiError::Forbidden(format!(
                    "missing capability: {capability}"
                )));
            }
        }
        // ... drive the LLM turn ...
        Ok(())
    }
});`}</CodeBlock>
      </section>

      <section className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <a className="btn btn-lg" href="https://agentdaddy.io" target="_blank" rel="noopener noreferrer">Visit AgentDaddy →</a>
      </section>
    </div>
  )
}
