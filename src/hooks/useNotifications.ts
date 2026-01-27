import { notificationService } from "@/services/notification.service";
import { useNotificationStore } from "@/store/notification.store";
import { useMutation } from "@tanstack/react-query";

export const useRegisterDevice = () => {
  const { markPromptAttempted, checkPermission } = useNotificationStore();
  return useMutation({
    mutationFn: notificationService.registerDevice,
    onSuccess: (data) => {
      checkPermission();
      // Only log success if the backend actually returned data
      if (data) {
        console.log("Device successfully registered with backend");
      } else {
        console.log("Registration skipped (No permission or token)");
      }
    },
    onError: (error) => {
      console.error("Device registration failed:", error);
      checkPermission();
    },
    onSettled: () => {
      markPromptAttempted();
    },
  });
};
