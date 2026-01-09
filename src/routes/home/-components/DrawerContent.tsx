import { clearTokens } from "@/lib/storage"; // Adjust path if needed
import {
  Asset,
  ChatBot,
  Journaling,
  LeaveHistory,
  PaySlip,
  PendingIcon,
  RequestLeave,
  TeamLeaveHistoryIcon,
  WaterTracker,
} from "@/lib/utils/customIcons";
import { useUserStore } from "@/store/user.store";
import { useNavigate } from "@tanstack/react-router";
import { CookingPot, Footprints, Loader2, LogOut, User } from "lucide-react";

interface DrawerContentProps {
  onClose: () => void;
}

export default function DrawerContent({ onClose }: DrawerContentProps) {
  const navigate = useNavigate();
  const { user, resetUser, isLogoutLoading, setLogoutLoading } = useUserStore();
  const role = user?.role || "user";
  const isMentor = role === "mentor" || role === "sub mentor";

  const handleNavigation = (path: string) => {
    onClose();
    // navigate({ to: path }); // Uncomment when routes exist
    console.log("Navigating to:", path);
  };

  const handleLogout = () => {
    setLogoutLoading(true);

    // Simulate delay like Native
    setTimeout(() => {
      clearTokens();
      resetUser();
      setLogoutLoading(false);
      onClose();
      navigate({ to: "/login" });
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* 1. Profile Section */}
      <div
        className="flex items-center mb-2 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => handleNavigation("/profile")}
      >
        <div className="w-13.75 h-13.75 rounded-full bg-[#e6e6e6] flex items-center justify-center mr-3 overflow-hidden shrink-0">
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={28} className="text-[#555]" strokeWidth={2} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[18px] font-bold text-text-primary font-gilroy">
            {user?.name || "User"}
          </span>
          <span className="text-[14px] font-semibold text-[#3F83F8] font-gilroy">
            View Profile
          </span>
        </div>
      </div>

      {/* 2. Menu Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-5 pb-5 no-scrollbar">
        <DrawerItem
          label="Assets"
          icon={<Asset className="text-[#444]" />}
          onClick={() => handleNavigation("/assets")}
        />
        <DrawerItem
          label="Journaling"
          icon={<Journaling className="text-[#444]" />}
          onClick={() => handleNavigation("/journaling")}
        />
        <DrawerItem
          label="Lunch Preference"
          icon={<CookingPot size={20} className="text-[#444]" />}
          onClick={() => handleNavigation("/lunch-preference")}
        />
        <DrawerItem
          label="Water Track"
          icon={<WaterTracker className="text-[#444]" />}
          onClick={() => handleNavigation("/water-track")}
        />
        <DrawerItem
          label="Payslip"
          icon={<PaySlip className="text-[#444]" />}
          onClick={() => handleNavigation("/payslip")}
        />

        {isMentor ? (
          <>
            <DrawerItem
              label="Pending Leaves"
              icon={<PendingIcon className="text-[#444]" />}
              onClick={() => handleNavigation("/pending-leaves")}
            />
            <DrawerItem
              label="Team Leave History"
              icon={<TeamLeaveHistoryIcon className="text-[#444]" />}
              onClick={() => handleNavigation("/team-leave-history")}
            />
          </>
        ) : (
          <>
            <DrawerItem
              label="Request Leave"
              icon={<RequestLeave className="text-[#444]" />}
              onClick={() => handleNavigation("/request-leave")}
            />
            <DrawerItem
              label="Leave History"
              icon={<LeaveHistory className="text-[#444]" />}
              onClick={() => handleNavigation("/leave-history")}
            />
          </>
        )}

        <DrawerItem
          label="Chatbot"
          icon={<ChatBot className="text-[#444]" />}
          onClick={() => handleNavigation("/chat")}
        />
        <DrawerItem
          label="Steps count"
          icon={<Footprints size={20} className="text-[#444]" />}
          onClick={() => handleNavigation("/steps")}
        />
      </div>

      {/* 3. Logout Footer */}
      <div className="p-5 border-t border-[#eee]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full py-2"
        >
          <LogOut size={20} className="text-[#d9534f]" strokeWidth={2} />
          <span className="ml-3 text-[18px] font-semibold text-[#d9534f] font-gilroy">
            Logout
          </span>
        </button>
      </div>

      {/* 4. Logout Loading Overlay */}
      {isLogoutLoading && (
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center w-37.5">
            <Loader2 className="animate-spin text-primary mb-3" size={32} />
            <span className="text-text-primary text-[16px]">
              Logging out...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Component for List Items
function DrawerItem({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full mb-4 hover:opacity-70 transition-opacity"
    >
      <div className="w-6 flex justify-center">{icon}</div>
      <span className="text-[18px] ml-3 text-text-primary font-gilroy">
        {label}
      </span>
    </button>
  );
}
