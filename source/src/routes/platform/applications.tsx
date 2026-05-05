import { createFileRoute } from '@tanstack/react-router'
import Applications from '../../pages/platform/Applications'

export const Route = createFileRoute('/platform/applications')({
  component: Applications,
})
