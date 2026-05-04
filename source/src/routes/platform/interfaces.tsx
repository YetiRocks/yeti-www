import { createFileRoute } from '@tanstack/react-router'
import PlatformInterfaces from '../../pages/PlatformInterfaces'

export const Route = createFileRoute('/platform/interfaces')({
  component: PlatformInterfaces,
})
