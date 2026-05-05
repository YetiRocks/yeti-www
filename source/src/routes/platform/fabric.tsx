import { createFileRoute } from '@tanstack/react-router'
import Fabric from '../../pages/platform/Fabric'

export const Route = createFileRoute('/platform/fabric')({
  component: Fabric,
})
