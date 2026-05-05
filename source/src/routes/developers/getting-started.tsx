import { createFileRoute } from '@tanstack/react-router'
import GettingStarted from '../../pages/developers/GettingStarted'

export const Route = createFileRoute('/developers/getting-started')({
  component: GettingStarted,
})
