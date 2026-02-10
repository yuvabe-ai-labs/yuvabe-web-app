import MobileLayout from "@/components/layout/MobileLayout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <MobileLayout className="bg-white flex flex-col h-full">
        <Outlet />
      </MobileLayout>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  );
}
