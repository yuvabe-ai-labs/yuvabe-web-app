import MobileLayout from "@/components/layout/MobileLayout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <MobileLayout className="bg-white flex flex-col h-full">
        <Outlet />
        <Toaster position="top-center" richColors />
      </MobileLayout>
      <TanStackRouterDevtools />
    </div>
  );
}
