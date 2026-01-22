import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/payslip/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/payslip/"!</div>
}
