import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import { useUserStore } from "@/store/user.store";
import { RouterProvider } from "@tanstack/react-router";
import NotificationIndicator from "./components/layout/NotificationIndicator";
import { SplashScreen } from "./components/layout/SplashScreen";
import { useForegroundNotifications } from "./hooks/useForegroundNotifications";
import { useNotificationPermission } from "./hooks/useNotificationPermission";
import { router } from "./main";

export function App() {
  useAuthBootstrap();
  useForegroundNotifications();
  useNotificationPermission();

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
      <div>
        <div className="z-50 shrink-0">
          <NotificationIndicator />
        </div>

        <RouterProvider router={router} />
      </div>
    </>
  );
}
