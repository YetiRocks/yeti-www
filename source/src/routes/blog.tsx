import { createFileRoute, Outlet, useMatch } from '@tanstack/react-router'
import Blog from '../pages/Blog'

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
})

function BlogLayout() {
  const childMatch = useMatch({ from: '/blog/$slug', shouldThrow: false })
  if (childMatch) return <Outlet />
  return <Blog />
}
