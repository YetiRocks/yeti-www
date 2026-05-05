import { createFileRoute } from '@tanstack/react-router'
import Databases from '../../pages/platform/Databases'

export const Route = createFileRoute('/platform/databases')({
  component: Databases,
})
