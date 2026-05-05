import { createFileRoute } from '@tanstack/react-router'
import Benchmarks from '../../pages/developers/Benchmarks'

export const Route = createFileRoute('/developers/benchmarks')({
  component: Benchmarks,
})
