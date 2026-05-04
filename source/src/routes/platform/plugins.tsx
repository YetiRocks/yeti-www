import { createFileRoute } from '@tanstack/react-router'
import PlatformPlugins from '../../pages/PlatformPlugins'

export const Route = createFileRoute('/platform/plugins')({
  component: PlatformPlugins,
})
