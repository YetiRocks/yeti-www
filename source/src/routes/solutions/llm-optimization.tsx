import { createFileRoute } from '@tanstack/react-router'
import LLMOptimization from '../../pages/LLMOptimization'

export const Route = createFileRoute('/solutions/llm-optimization')({
  component: LLMOptimization,
})
