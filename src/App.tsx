// src/App.tsx
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import { useUserStore } from "@/store/user.store";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SplashScreen } from "./components/layout/SplashScreen";
import { useForegroundNotifications } from "./hooks/useForegroundNotifications";
import { router } from "./main";

export function App() {
  useAuthBootstrap();
  useForegroundNotifications();

  const { authChecked } = useUserStore();

  if (!authChecked) {
    return (
      <div>
        <SplashScreen />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  );
}
