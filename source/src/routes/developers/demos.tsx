import { createFileRoute } from '@tanstack/react-router'
import Demos from '../../pages/developers/Demos'

export const Route = createFileRoute('/developers/demos')({
  component: Demos,
})
