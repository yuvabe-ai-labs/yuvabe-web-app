import MobileLayout from "@/components/layout/MobileLayout";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { useUserProfile } from "@/hooks/useHomeQueries";
import { useLogout } from "@/hooks/useLogout";
import { MentorIcon, TeamIcon } from "@/lib/utils/custom-icons";
import { useUserStore } from "@/store/user.store";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
  Pencil,
  User as UserIcon,
} from "lucide-react";
import { useEffect } from "react";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, setUser, isLogoutLoading } = useUserStore();
  const { mutate: logout } = useLogout();

  // 1. Fetch Data (Ensures data exists even if user refreshes page)
  const { data: profileData, isLoading } = useUserProfile();

  // 2. Sync to Store
  useEffect(() => {
    if (profileData?.data) {
      setUser(profileData.data);
    }
  }, [profileData, setUser]);

  const name = user?.name || "User";
  const email = user?.email || "example@yuvabe.com";
  const nickname = user?.nickname;
  const teamName = user?.team_name || "—";
  const leadLabel = user?.lead_label || "Mentor";
  const leadName = user?.lead_name || user?.mentor_name || "—";
  const profileSrc = user?.profile_picture;

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <MobileLayout className="bg-white flex items-center justify-center h-full">
        <SplashScreen />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="bg-[#F2F5F9] flex flex-col h-full overflow-y-auto">
      {/* 🔵 GRADIENT HEADER */}
      {/* Replaces <Svg> gradient */}
      <div
        className="relative h-40 w-full shrink-0 px-5 pb-6"
        style={{
          background: "linear-gradient(180deg, #592AC7 0%, #CCB6FF 100%)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate({ to: ".." })}
          className="absolute top-4 left-4 p-1 z-10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronLeft size={32} color="#fff" strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 pb-10">
        <div className="mx-5 -mt-12.5 bg-white rounded-2xl p-5 border border-[#592AC7] shadow-sm flex items-center relative z-20">
          <div className="w-16.25 h-16.25 rounded-full bg-[#e6e6e6] flex items-center justify-center mr-5 overflow-hidden border border-gray-100 shrink-0">
            {profileSrc ? (
              <img
                src={profileSrc}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon
                size={34}
                className="text-[#592AC7]"
                strokeWidth={2.5}
              />
            )}
          </div>

          {/* Text Details */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[22px] font-bold text-[#1A1A1A] font-gilroy truncate">
              {name}
              {nickname && (
                <span className="text-gray-500 font-normal text-lg">
                  {" "}
                  ({nickname})
                </span>
              )}
            </h2>
            <p className="text-[15px] text-[#6C757D] font-medium font-gilroy mt-1 truncate">
              {email}
            </p>

            {/* Team */}
            <div className="flex items-center mt-2.5">
              <TeamIcon className="text-black mr-2 shrink-0" />
              <span className="text-[14px] font-medium text-[#555] font-gilroy w-17.5">
                Team:
              </span>
              <span className="text-[14px] font-semibold text-black font-gilroy truncate flex-1">
                {teamName}
              </span>
            </div>

            {/* Mentor / Lead */}
            <div className="flex items-center mt-1.5">
              <MentorIcon className="text-black mr-2 shrink-0" />
              <span className="text-[14px] font-medium text-[#555] font-gilroy w-17.5">
                {leadLabel}:
              </span>
              <span className="text-[14px] font-semibold text-black font-gilroy truncate flex-1">
                {leadName}
              </span>
            </div>
          </div>
        </div>

        {/* ⚙️ SECTIONS (Edit Profile) */}
        <div className="mx-5 mt-5 bg-white rounded-xl border border-[#592AC7] overflow-hidden">
          <button
            onClick={() => navigate({ to: "/profile/edit-profile" })}
            className="w-full flex items-center px-5 py-5.5 border-b border-[#EEE] active:bg-gray-50 transition-colors"
          >
            <Pencil size={20} className="text-black mr-3" strokeWidth={2} />
            <span className="flex-1 text-left text-[17px] font-bold text-[#1A1A1A] font-gilroy">
              Edit Profile
            </span>
            <ChevronRight size={22} className="text-black" strokeWidth={2} />
          </button>
        </div>

        {/* 🔴 LOGOUT BUTTON */}
        <div className="px-5 mt-90">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-3.75 bg-[#FF383C] rounded-xl active:bg-red-600 transition-colors shadow-sm"
          >
            {/* Flip icon horizontally to match RN design */}
            <LogOut
              size={18}
              className="text-white transform -scale-x-100 mr-2"
              strokeWidth={2}
            />
            <span className="text-[16px] font-semibold text-white font-gilroy">
              Logout
            </span>
          </button>
        </div>
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
    </MobileLayout>
  );
}
