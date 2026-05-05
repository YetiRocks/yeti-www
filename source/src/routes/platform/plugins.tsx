import { createFileRoute } from '@tanstack/react-router'
import Plugins from '../../pages/platform/Plugins'

export const Route = createFileRoute('/platform/plugins')({
  component: Plugins,
})
