import { useNotificationStore } from "@/store/notification.store";
import { useEffect } from "react";

export const useNotificationPermission = () => {
  const checkPermission = useNotificationStore(
    (state) => state.checkPermission,
  );

  useEffect(() => {
    checkPermission();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        checkPermission();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [checkPermission]);
};
