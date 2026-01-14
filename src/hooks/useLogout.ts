import { clearTokens } from "@/lib/storage";
import { notificationService } from "@/services/notification.service";
import { useUserStore } from "@/store/user.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const navigate = useNavigate();
  const { resetUser, setLogoutLoading } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      setLogoutLoading(true);
      try {
        await notificationService.logoutDevice();
        console.log("Device token removed from backend");
      } catch (error) {
        console.error(
          "Failed to remove device token (continuing logout):",
          error
        );
      }
    },
    onSettled: () => {
      setTimeout(() => {
        clearTokens();
        resetUser();
        setLogoutLoading(false);
        navigate({ to: "/login" });
      }, 500); 
    },
  });
};
