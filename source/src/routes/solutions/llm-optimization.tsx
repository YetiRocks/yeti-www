import { createFileRoute } from '@tanstack/react-router'
import LLMOptimization from '../../pages/solutions/LLMOptimization'

export const Route = createFileRoute('/solutions/llm-optimization')({
  component: LLMOptimization,
})
