import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/leaverequest/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/leaverequest/"!</div>
}
