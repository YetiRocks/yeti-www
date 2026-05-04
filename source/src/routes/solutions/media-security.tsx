import { createFileRoute } from '@tanstack/react-router'
import MediaSecurity from '../../pages/MediaSecurity'

export const Route = createFileRoute('/solutions/media-security')({
  component: MediaSecurity,
})
