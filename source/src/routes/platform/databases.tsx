import { createFileRoute } from '@tanstack/react-router'
import PlatformDatabases from '../../pages/PlatformDatabases'

export const Route = createFileRoute('/platform/databases')({
  component: PlatformDatabases,
})
