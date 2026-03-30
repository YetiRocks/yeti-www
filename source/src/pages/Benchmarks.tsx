import { useState } from 'react'
import BenchmarkChart from '../components/BenchmarkChart'
import benchmarkData from '../data/bestresults.json'

interface BestResult {
  id: string
  name: string
  binary: string
  duration: number
  vus: number
  category: string
  order: number
  best?: {
    throughput?: number
    p50?: number
    p95?: number
    p99?: number
    p999?: number
    total?: number
    errors?: number
    cv?: number
    peakConnections?: number
    snapshots?: string
  }
}

interface Snapshot {
  second: number
  rps: number
  p50_ms: number
  p95_ms: number
  p99_ms: number
  p999_ms: number
  errors: number
  active_vus: number
}

function formatNumber(n: number): string {
  if (n >= 1000000) { const v = n / 1000000; return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + 'M' }
  if (n >= 10000) return Math.round(n / 1000) + 'k'
  if (n >= 1000) { const v = n / 1000; const s = v.toFixed(1); return (s.endsWith('.0') ? s.slice(0, -2) : s) + 'k' }
  return n.toFixed(0)
}

function formatLatency(ms: number | undefined): string {
  if (ms == null) return '—'
  if (ms === 0) return '<1'
  if (ms < 0.01) return '<1'
  if (ms >= 100) return ms.toFixed(0)
  if (ms >= 10) return ms.toFixed(1)
  return ms.toFixed(2)
}

function formatThroughput(n: number | undefined): string {
  if (n == null) return '—'
  return formatNumber(n)
}

function parseSnapshots(result: BestResult): Snapshot[] {
  try {
    const raw = result.best?.snapshots
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

interface WorkloadGroup {
  label: string
  id: string
  description: string
  tests: { id: string; name: string }[]
}

const WORKLOADS: WorkloadGroup[] = [
  {
    label: 'Transactional API',
    id: 'rest',
    description: 'Core platform workload — REST CRUD operations over HTTPS with JSON payloads.',
    tests: [
      { id: 'rest-read', name: 'REST Read' },
      { id: 'rest-write', name: 'REST Write' },
      { id: 'rest-batch-write', name: 'REST Batch Write' },
      { id: 'rest-update', name: 'REST Update' },
      { id: 'rest-join', name: 'REST Join' },
    ],
  },
  {
    label: 'Graph API',
    id: 'graphql',
    description: 'GraphQL query planner and execution engine — reads, mutations, and relationship joins.',
    tests: [
      { id: 'graphql-read', name: 'GraphQL Read' },
      { id: 'graphql-mutation', name: 'GraphQL Write' },
      { id: 'graphql-batch-write', name: 'GraphQL Batch Write' },
      { id: 'graphql-update', name: 'GraphQL Update' },
      { id: 'graphql-join', name: 'GraphQL Join' },
    ],
  },
  {
    label: 'Realtime & Streaming',
    id: 'realtime',
    description: 'Persistent connections — fan-out (many subscribers), fan-in (many publishers), and MQTT broker throughput.',
    tests: [
      { id: 'ws-publish', name: 'WS Fan-In' },
      { id: 'ws', name: 'WS Fan-Out' },
      { id: 'sse', name: 'SSE Fan-Out' },
      { id: 'mqtt', name: 'MQTT Fan-Out' },
    ],
  },
  {
    label: 'Vector & AI Workloads',
    id: 'vector',
    description: 'Compute-intensive workloads — embedding generation and approximate nearest-neighbor search.',
    tests: [
      { id: 'vector-embed', name: 'Vector Embed' },
      { id: 'vector-search', name: 'Vector Search' },
    ],
  },
  {
    label: 'Large Object Handling',
    id: 'blob',
    description: 'Retrieval of 150 KB binary payloads through the REST interface.',
    tests: [
      { id: 'blob-retrieval', name: '150k Blob Retrieval' },
    ],
  },
]

const RAMP_TESTS = [
  { id: 'rest-read-ramp', name: 'REST Read Ramp' },
  { id: 'rest-write-ramp', name: 'REST Write Ramp' },
  { id: 'graphql-read-ramp', name: 'GraphQL Read Ramp' },
  { id: 'ws-ramp', name: 'WebSocket Ramp' },
]

const SUSTAINED_TESTS = [
  { id: 'rest-read-sustained', name: 'REST Read Sustained' },
  { id: 'rest-write-sustained', name: 'REST Write Sustained' },
  { id: 'graphql-read-sustained', name: 'GraphQL Read Sustained' },
]

export default function Benchmarks() {
  // Load results from static JSON (no API call)
  const [results] = useState<Record<string, BestResult>>(() => {
    const tests = benchmarkData.tests || {}
    const map: Record<string, BestResult> = {}
    for (const [id, test] of Object.entries(tests)) {
      map[id] = test as BestResult
    }
    return map
  })

  const hasResults = Object.values(results).some(r => r.best)
  // Check for ramp/sustained data
  const hasRampData = RAMP_TESTS.some(t => results[t.id])
  const hasSustainedData = SUSTAINED_TESTS.some(t => results[t.id])

  return (
    <div className="container" style={{ padding: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Benchmarks, not Bullshit</h1>
      </div>

      {hasResults && (
        <>
          {WORKLOADS.map(group => {
            const groupHasData = group.tests.some(t => results[t.id]?.best)
            if (!groupHasData) return null

            return (
              <section className="bench-section" key={group.id}>
                <table className="bench-perf-table">
                  <thead>
                    <tr>
                      <th style={{ color: 'var(--color-primary)' }}>{group.label}</th>
                      <th className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>RPS</th>
                      <th className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>ms P95</th>
                      <th className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>ms P99</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.tests.map(test => {
                      const r = results[test.id]
                      const best = r?.best
                      return (
                        <tr key={test.id}>
                          <td>{test.name}</td>
                          <td className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>
                            <span className="bench-highlight">
                              {best ? formatThroughput(best.throughput) : '—'}
                            </span>
                          </td>
                          <td className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>
                            <span className="bench-highlight">
                              {formatLatency(best?.p95)}
                            </span>
                          </td>
                          <td className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>{formatLatency(best?.p99)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </section>
            )
          })}

          {hasRampData && (
            <section className="bench-section">
              <div className="bench-section-header">
                <h2 className="bench-section-title">Scalability Under Load</h2>
                <p className="bench-section-desc">
                  Progressive VU ramp from 10 to 200 over 120 seconds. Shows throughput scaling and latency knee point.
                </p>
              </div>
              {RAMP_TESTS.map(test => {
                const r = results[test.id]
                if (!r) return null
                const snaps = parseSnapshots(r)
                return (
                  <div key={test.id} style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 400, color: '#fff', marginBottom: '0.5rem' }}>{test.name}</h3>
                    {snaps.length > 0 ? (
                      <BenchmarkChart snapshots={snaps} mode="ramp" />
                    ) : (
                      <table className="bench-perf-table">
                        <thead>
                          <tr>
                            <th>Operation</th>
                            <th className="bench-col-num">Throughput</th>
                            <th className="bench-col-num">p95</th>
                            <th className="bench-col-num">p99.9</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{test.name}</td>
                            <td className="bench-col-num"><span className="bench-highlight">{formatThroughput(r.best?.throughput)}</span></td>
                            <td className="bench-col-num">{formatLatency(r.best?.p95)}</td>
                            <td className="bench-col-num">{formatLatency(r.best?.p999)}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                )
              })}
            </section>
          )}

          {hasSustainedData && (
            <section className="bench-section">
              <div className="bench-section-header">
                <h2 className="bench-section-title">Sustained Throughput Stability</h2>
                <p className="bench-section-desc">
                  5-minute continuous load at 50 VUs. Low coefficient of variation proves zero-GC jitter and predictable performance.
                </p>
              </div>
              {SUSTAINED_TESTS.map(test => {
                const r = results[test.id]
                if (!r) return null
                const snaps = parseSnapshots(r)
                const cv = r.best?.cv
                return (
                  <div key={test.id} style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 400, color: '#fff', margin: 0 }}>{test.name}</h3>
                      {cv != null && (
                        <span className={`bench-cv-badge ${cv < 3 ? 'good' : 'warn'}`}>
                          CV: {cv.toFixed(1)}%
                        </span>
                      )}
                    </div>
                    {snaps.length > 0 ? (
                      <BenchmarkChart snapshots={snaps} mode="stability" />
                    ) : (
                      <table className="bench-perf-table">
                        <thead>
                          <tr>
                            <th>Operation</th>
                            <th className="bench-col-num">Throughput</th>
                            <th className="bench-col-num">p95</th>
                            <th className="bench-col-num">p99.9</th>
                            <th className="bench-col-num">CV</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{test.name}</td>
                            <td className="bench-col-num"><span className="bench-highlight">{formatThroughput(r.best?.throughput)}</span></td>
                            <td className="bench-col-num">{formatLatency(r.best?.p95)}</td>
                            <td className="bench-col-num">{formatLatency(r.best?.p999)}</td>
                            <td className="bench-col-num">{cv != null ? cv.toFixed(1) + '%' : '—'}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                )
              })}
            </section>
          )}
        </>
      )}

      <section className="bench-section">
        <table className="bench-perf-table">
          <thead>
            <tr>
              <th style={{ color: 'var(--color-primary)' }}>Methodology</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hardware</td>
              <td style={{ textAlign: 'right' }}>Single Node / 8 Cores / 16 GB RAM / 320 GB NVMe</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td style={{ textAlign: 'right' }}>Embedded RocksDB (no replication)</td>
            </tr>
            <tr>
              <td>Transport</td>
              <td style={{ textAlign: 'right' }}>HTTPS / TLS 1.3, HTTP/1.1 with connection reuse</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td style={{ textAlign: 'right' }}>30 seconds per test (5s warmup)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
