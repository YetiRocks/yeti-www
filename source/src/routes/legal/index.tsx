import { createFileRoute } from '@tanstack/react-router'
import Legal from '../../pages/legal/Legal'

export const Route = createFileRoute('/legal/')({
  component: Legal,
})
