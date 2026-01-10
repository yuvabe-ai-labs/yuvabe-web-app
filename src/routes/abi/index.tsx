import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/abi/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/abi/"!</div>
}
