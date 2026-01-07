import Header from "@/components/ui/header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <Header />

      

      <Outlet />

      <TanStackRouterDevtools />
    </div>
  );
}
