import { useEffect, useRef } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

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

interface BenchmarkChartProps {
  snapshots: Snapshot[]
  mode: 'ramp' | 'stability'
  width?: number
  height?: number
}

const COLORS = {
  rps: '#ff00ff',
  p95: '#569cd6',
  p999: '#d16969',
  vus: 'rgba(255, 255, 255, 0.3)',
  grid: 'rgba(255, 255, 255, 0.06)',
  axis: 'rgba(255, 255, 255, 0.4)',
  bg: 'transparent',
}

export default function BenchmarkChart({ snapshots, mode, width = 700, height = 280 }: BenchmarkChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<uPlot | null>(null)

  useEffect(() => {
    if (!containerRef.current || snapshots.length < 2) return

    const xs = snapshots.map(s => s.second)
    const rps = snapshots.map(s => s.rps)

    if (mode === 'ramp') {
      // Dual-axis: RPS (left) + latency (right)
      const p95 = snapshots.map(s => s.p95_ms)
      const p999 = snapshots.map(s => s.p999_ms)
      const vus = snapshots.map(s => s.active_vus)

      const data: uPlot.AlignedData = [xs, rps, p95, p999, vus]

      const opts: uPlot.Options = {
        width,
        height,
        cursor: { show: true },
        legend: { show: true },
        scales: {
          x: {},
          y: { auto: true },
          lat: { auto: true },
          vus: { auto: true },
        },
        axes: [
          {
            stroke: COLORS.axis,
            grid: { stroke: COLORS.grid, width: 1 },
            ticks: { stroke: COLORS.grid, width: 1 },
            font: '11px monospace',
            label: 'Seconds',
            labelFont: '11px monospace',
            labelSize: 20,
          },
          {
            scale: 'y',
            stroke: COLORS.rps,
            grid: { stroke: COLORS.grid, width: 1 },
            ticks: { stroke: COLORS.grid, width: 1 },
            font: '11px monospace',
            label: 'req/s',
            labelFont: '11px monospace',
            labelSize: 40,
            side: 3,
          },
          {
            scale: 'lat',
            stroke: COLORS.p95,
            grid: { show: false },
            ticks: { stroke: COLORS.grid, width: 1 },
            font: '11px monospace',
            label: 'Latency (ms)',
            labelFont: '11px monospace',
            labelSize: 40,
            side: 1,
          },
        ],
        series: [
          { label: 'Time (s)' },
          {
            label: 'RPS',
            scale: 'y',
            stroke: COLORS.rps,
            width: 2,
          },
          {
            label: 'p95',
            scale: 'lat',
            stroke: COLORS.p95,
            width: 1.5,
            dash: [4, 2],
          },
          {
            label: 'p99.9',
            scale: 'lat',
            stroke: COLORS.p999,
            width: 1.5,
            dash: [2, 2],
          },
          {
            label: 'VUs',
            scale: 'vus',
            stroke: COLORS.vus,
            width: 1,
            dash: [6, 3],
            show: false,
          },
        ],
      }

      chartRef.current?.destroy()
      chartRef.current = new uPlot(opts, data, containerRef.current)
    } else {
      // Stability: RPS with p95/p99.9 bands
      const p95 = snapshots.map(s => s.p95_ms)
      const p999 = snapshots.map(s => s.p999_ms)

      const data: uPlot.AlignedData = [xs, rps, p95, p999]

      const opts: uPlot.Options = {
        width,
        height,
        cursor: { show: true },
        legend: { show: true },
        scales: {
          x: {},
          y: { auto: true },
          lat: { auto: true },
        },
        axes: [
          {
            stroke: COLORS.axis,
            grid: { stroke: COLORS.grid, width: 1 },
            ticks: { stroke: COLORS.grid, width: 1 },
            font: '11px monospace',
            label: 'Seconds',
            labelFont: '11px monospace',
            labelSize: 20,
          },
          {
            scale: 'y',
            stroke: COLORS.rps,
            grid: { stroke: COLORS.grid, width: 1 },
            ticks: { stroke: COLORS.grid, width: 1 },
            font: '11px monospace',
            label: 'req/s',
            labelFont: '11px monospace',
            labelSize: 40,
            side: 3,
          },
          {
            scale: 'lat',
            stroke: COLORS.p95,
            grid: { show: false },
            ticks: { stroke: COLORS.grid, width: 1 },
            font: '11px monospace',
            label: 'Latency (ms)',
            labelFont: '11px monospace',
            labelSize: 40,
            side: 1,
          },
        ],
        series: [
          { label: 'Time (s)' },
          {
            label: 'RPS',
            scale: 'y',
            stroke: COLORS.rps,
            width: 2,
          },
          {
            label: 'p95',
            scale: 'lat',
            stroke: COLORS.p95,
            width: 1.5,
            dash: [4, 2],
          },
          {
            label: 'p99.9',
            scale: 'lat',
            stroke: COLORS.p999,
            width: 1.5,
            dash: [2, 2],
          },
        ],
      }

      chartRef.current?.destroy()
      chartRef.current = new uPlot(opts, data, containerRef.current)
    }

    return () => {
      chartRef.current?.destroy()
      chartRef.current = null
    }
  }, [snapshots, mode, width, height])

  if (snapshots.length < 2) {
    return <div className="bench-chart-container"><em style={{ color: 'var(--color-grey)' }}>Waiting for snapshot data...</em></div>
  }

  return (
    <div className="bench-chart-container">
      <div ref={containerRef} />
    </div>
  )
}
