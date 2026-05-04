import { createFileRoute } from '@tanstack/react-router'
import PlatformFabric from '../../pages/PlatformFabric'

export const Route = createFileRoute('/platform/fabric')({
  component: PlatformFabric,
})
