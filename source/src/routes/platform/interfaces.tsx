import { createFileRoute } from '@tanstack/react-router'
import Interfaces from '../../pages/platform/Interfaces'

export const Route = createFileRoute('/platform/interfaces')({
  component: Interfaces,
})
