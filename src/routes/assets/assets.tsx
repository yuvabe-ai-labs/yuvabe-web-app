import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assets/assets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/assets/assets"!</div>
}
