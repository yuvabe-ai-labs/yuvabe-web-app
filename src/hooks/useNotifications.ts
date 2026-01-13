import { notificationService } from "@/services/notification.service";
import { useMutation } from "@tanstack/react-query";

export const useRegisterDevice = () => {
  return useMutation({
    mutationFn: notificationService.registerDevice,
    onSuccess: (data) => {
      // Only log success if the backend actually returned data
      if (data) {
        console.log("Device successfully registered with backend");
      } else {
        console.log("Registration skipped (No permission or token)");
      }
    },
    onError: (error) => {
      console.error("Device registration failed:", error);
    },
  });
};
