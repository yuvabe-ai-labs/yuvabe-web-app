// src/App.tsx
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import { useUserStore } from "@/store/user.store";
import { RouterProvider } from "@tanstack/react-router";
import { SplashScreen } from "./components/layout/SplashScreen";
import { router } from "./main";

export function App() {
  useAuthBootstrap();

  const { authChecked } = useUserStore();

  if (!authChecked) {
    return (
      <div>
        <SplashScreen />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
