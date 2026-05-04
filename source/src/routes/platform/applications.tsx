import { createFileRoute } from '@tanstack/react-router'
import PlatformApplications from '../../pages/PlatformApplications'

export const Route = createFileRoute('/platform/applications')({
  component: PlatformApplications,
})
