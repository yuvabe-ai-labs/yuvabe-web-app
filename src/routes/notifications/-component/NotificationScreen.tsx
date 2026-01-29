import MobileLayout from "@/components/layout/MobileLayout";
import {
  useMarkNotificationRead,
  useNotificationsQuery,
} from "@/hooks/useNotifications";
import { useUserStore } from "@/store/user.store";
import type { NotificationItem } from "@/types/notification.types";
import { UserRole } from "@/types/user.types";
import { useNavigate } from "@tanstack/react-router";
import { BellOff, ChevronLeft, Loader2 } from "lucide-react";

interface NotificationScreenProps {
  onClose?: () => void;
}

export default function NotificationScreen({
  onClose,
}: NotificationScreenProps) {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const isSheetMode = !!onClose;

  const { data: notifications, isLoading } = useNotificationsQuery();
  const { mutate: markRead } = useMarkNotificationRead();

  const handleNotificationClick = (item: NotificationItem) => {
    if (!item.is_read) {
      markRead(item.id);
    }

    if (user?.role === UserRole.MENTOR || user?.role === UserRole.SUB_MENTOR) {
      navigate({
        to: "/team-leave-history/$leaveId",
        params: { leaveId: item.id },
      });
    } else {
      navigate({
        to: "/leave-details/$leaveId",
        params: { leaveId: item.id },
      });
    }
    if (isSheetMode && onClose) onClose();
  };

  const handleBack = () => {
    if (isSheetMode && onClose) {
      onClose(); // Close the sheet
    } else {
      navigate({ to: "/" }); // Go back to home URL
    }
  };

  const Container = isSheetMode ? "div" : MobileLayout;

  return (
    <Container className="bg-white flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0  border-gray-100">
        <button
          onClick={handleBack}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>
        <div className="flex-1 text-center pr-7">
          <h1 className="text-[20px] font-bold text-black font-gilroy">
            Notifications
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center mt-20">
            <Loader2 className="animate-spin text-[#007BFF]" size={40} />
          </div>
        ) : !notifications || notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <BellOff size={50} className="text-gray-300 mb-4" />
            <p className="text-[16px] font-medium text-black mb-1 font-gilroy">
              No new notifications
            </p>
            <p className="text-[13px] text-gray-500 font-gilroy">
              You’re all caught up.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`
                  p-4.5 rounded-xl cursor-pointer transition-colors duration-300 border
                  ${
                    item.is_read
                      ? "bg-white border-transparent hover:bg-gray-50"
                      : "bg-[#E6F0FF] border-blue-100 hover:bg-[#dce9fc]"
                  }
                `}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-[16px] font-bold text-black font-gilroy">
                    {item.title}
                  </h3>
                  {!item.is_read && (
                    <span className="w-2.5 h-2.5 bg-[#007BFF] rounded-full shrink-0 mt-1.5" />
                  )}
                </div>

                <p className="mt-1.5 text-[14px] text-gray-700 font-gilroy leading-relaxed">
                  {item.body}
                </p>

                {/* Optional: Separator line if needed, though card style is usually better on web */}
                {/* <div className="h-[1px] bg-[#E0E0E0] mt-4" /> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
