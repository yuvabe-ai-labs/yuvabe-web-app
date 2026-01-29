import {
  notificationFetchService,
  notificationService,
} from "@/services/notification.service";
import { useNotificationStore } from "@/store/notification.store";
import { useUserStore } from "@/store/user.store";
import type { NotificationItem } from "@/types/notification.types";
import { UserRole } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useNotificationsQuery = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationFetchService.fetchNotifications,
    select: (data) => {
      const isMentorOrSub =
        user?.role === UserRole.MENTOR || user?.role === UserRole.SUB_MENTOR;

      const filtered = isMentorOrSub
        ? data.filter((n) => n.type === "Pending")
        : data;

      // 2. Sort Logic (Unread first, then new to old)
      return filtered.sort((a, b) => {
        if (a.is_read === b.is_read) {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        }
        return a.is_read ? 1 : -1;
      });
    },
  });
};
export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationFetchService.markAsRead,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousNotifications = queryClient.getQueryData<
        NotificationItem[]
      >(["notifications"]);

      queryClient.setQueryData<NotificationItem[]>(["notifications"], (old) => {
        if (!old) return [];
        return old.map((n) =>
          n.id === notificationId ? { ...n, is_read: true } : n,
        );
      });

      return { previousNotifications };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["notifications"],
        context?.previousNotifications,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
