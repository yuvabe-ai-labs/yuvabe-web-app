import { useRegisterDevice } from "@/hooks/useNotifications";
import { useNotificationStore } from "@/store/notification.store";
import { Bell } from "lucide-react";
import { toast } from "sonner";

const NotificationIndicator = () => {
  const { permission, checkPermission, promptAttempted } =
    useNotificationStore();
  const { mutate: registerDevice } = useRegisterDevice();

  // 1. If Granted: Always Hide
  if (permission === "granted") return null;

  // 2. If Default: Only show IF we have already tried to ask (promptAttempted is true)
  //    This prevents it from showing behind the native browser prompt on load.
  if (permission === "default" && !promptAttempted) return null;

  const handlePress = async () => {
    if (permission === "default") {
      const result = await Notification.requestPermission();
      checkPermission();

      if (result === "granted") {
        registerDevice();
      }
    } else if (permission === "denied") {
      toast.warning("Notifications are blocked", {
        description:
          "Click the Left side icon in your URL bar to reset permissions.",
        duration: 5000,
      });
    }
  };

  return (
    <div
      onClick={handlePress}
      className="bg-[#FFF4CC] border-b border-[#FFAA00] py-2 px-3 flex flex-row items-center justify-center cursor-pointer hover:bg-[#ffeebb] transition-colors w-full"
    >
      <Bell size={18} color="#CC7A00" />
      <span className="ml-2 text-[#CC7A00] font-semibold text-sm">
        {permission === "denied"
          ? "Notifications are Blocked — Tap for Help"
          : "Notifications are Off — Tap to Enable"}
      </span>
    </div>
  );
};

export default NotificationIndicator;
