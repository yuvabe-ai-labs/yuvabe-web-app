import { create } from "zustand";

type NotificationStore = {
  permission: NotificationPermission;
  checkPermission: () => void;
  promptAttempted: boolean;
  markPromptAttempted: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  permission: "default",
  promptAttempted: false,

  checkPermission: () => {
    if (!("Notification" in window)) return;
    set({ permission: Notification.permission });
  },

  markPromptAttempted: () => {
    set({ promptAttempted: true });
  },
}));
