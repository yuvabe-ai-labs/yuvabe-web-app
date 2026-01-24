import { create } from "zustand";

type NotificationStore = {
  permission: NotificationPermission; 
  checkPermission: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  permission: "default", 

  checkPermission: () => {
    if (!("Notification" in window)) return;
    set({ permission: Notification.permission });
  },
}));
