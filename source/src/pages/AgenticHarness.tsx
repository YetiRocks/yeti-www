import Icon from '../components/Icon'
import CodeBlock from '../components/CodeBlock'

export default function AgenticHarness() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">A safe runtime for autonomous agents.</h1>
        <p className="page-subtitle">
          Agents need data, tools, and constraints. Most platforms hand all three over with no isolation. <a href="https://agentdaddy.io" target="_blank" rel="noopener noreferrer">AgentDaddy</a> uses Yeti to keep agents productive without giving them the keys to the cluster.
        </p>
      </div>

      <section className="section">
        <div className="section-label">The problem</div>
        <h2 className="section-title">Productive without privileged</h2>
        <p className="section-desc">
          Running an agent in production means giving it tools, memory, and an audit trail — without giving it root. The hard part isn't building the agent loop; it's enforcing the perimeter every time the agent reaches for a capability. AgentDaddy delegates that perimeter to Yeti's directive surface.
        </p>
      </section>

      <section className="section">
        <div className="section-label">How AgentDaddy uses Yeti</div>
        <h2 className="section-title">Per-agent isolation, declaratively</h2>
        <p className="section-desc">
          Each agent gets its own database, its own column families, its own RBAC matrix. Capability manifests are tables. The turn engine reads the matrix before every tool call.
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
            <Icon name="key" />
            <div className="feature-title">Capability manifests as data</div>
            <div className="feature-text">
              Every agent template declares the capabilities it needs — <code>memory.read</code>, <code>memory.write</code>, <code>http_egress</code>, <code>gmail.read</code>. The turn engine checks the manifest before every tool call. Undeclared capabilities are invisible to the LLM — not denied, nonexistent.
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
        <div className="section-label">Agent + run + capability tables</div>
        <CodeBlock label="schemas/schema.graphql">{`type AgentTemplate
  @table(database: "agentdaddy")
  @store(durability: "strong")
  @export(rest: true, graphql: true, mcp: true)
  @access(roles: { read: ["operator"], write: ["operator"] })
  @audit(operations: ["write", "delete"], retention: 365, state: true) {
    id: ID! @primaryKey
    slug: String! @indexed
    name: String!
    brain: String!
    capabilities: [String!]!
}

type AgentRun
  @table(database: "agentdaddy")
  @store(durability: "soft", evictAfter: "90d")
  @export(rest: true, sse: true, mcp: true)
  @access(roles: { read: ["operator", "auditor"], write: ["agent"] })
  @audit(operations: ["write"], retention: 365) {
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
  @access(roles: { read: ["operator", "agent"], write: ["operator"] })
  @audit(operations: ["write", "delete"], retention: 2555, state: true) {
    id: ID! @primaryKey
    agentId: ID! @indexed
    capability: String! @indexed
    grantedBy: String!
    expiresAt: Int
}`}</CodeBlock>
      </section>

      <section className="section">
        <div className="section-label">Durable turns</div>
        <h2 className="section-title">Crashes don't drop half-finished agent runs</h2>
        <p className="section-desc">
          Agent runs are durable functions. <code>queue!()</code> handles retry, heartbeat, and resume-from-journal so a crashed worker doesn't lose context. Capability grants are checked before every tool call — if the manifest changes mid-run, the next turn enforces the new constraints.
        </p>
        <CodeBlock label="resources/run_turn.rs">{`use yeti_sdk::prelude::*;

queue!(RunTurn {
    name = "run_turn",
    timeout = "10m",
    handler(ctx, input: TurnInput) => {
        let agent = ctx.table("AgentTemplate").get(&input.agent_id).await?;
        ctx.heartbeat().await?;
        for capability in &input.required_capabilities {
            ctx.table("CapabilityGrant")
                .filter(&format!("agentId=eq={};capability=eq={}", agent.id, capability))
                .require_one().await?;
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
