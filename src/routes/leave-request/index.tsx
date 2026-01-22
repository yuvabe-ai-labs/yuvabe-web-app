import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/leave-request/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/leaverequest/"!</div>
}
