import MobileLayout from "@/components/layout/MobileLayout";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  // 1. Fetch Data
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
      <div
        className="relative h-40 w-full shrink-0 px-5 pb-6"
        style={{
          background: "linear-gradient(180deg, #592AC7 0%, #CCB6FF 100%)",
        }}
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: ".." })}
          className="absolute top-4 left-4 z-10 hover:bg-white/20 text-white rounded-full h-10 w-10"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </Button>
      </div>

      <div className="flex-1 pb-10 flex flex-col">
        {/* PROFILE CARD */}
        <Card className="mx-5 -mt-12.5 border-[#592AC7] bg-white shadow-sm relative z-20 rounded-2xl">
          <CardContent className="p-5 flex items-center">
            {/* Shadcn Avatar */}
            <Avatar className="w-16.25 h-16.25 mr-5 border border-gray-100 bg-[#e6e6e6]">
              <AvatarImage
                src={profileSrc || undefined}
                className="object-cover"
              />
              <AvatarFallback className="bg-[#e6e6e6]">
                <UserIcon
                  size={34}
                  className="text-[#592AC7]"
                  strokeWidth={2.5}
                />
              </AvatarFallback>
            </Avatar>

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
          </CardContent>
        </Card>

        {/* ⚙️ EDIT PROFILE BUTTON */}
        <div className="mx-5 mt-5 bg-white rounded-xl border border-[#592AC7] overflow-hidden">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/profile/edit-profile" })}
            className="w-full flex items-center justify-between px-5 py-6 h-auto hover:bg-gray-50 rounded-none group"
          >
            <div className="flex items-center">
              <Pencil size={20} className="text-black mr-3" strokeWidth={2} />
              <span className="text-[17px] font-bold text-[#1A1A1A] font-gilroy">
                Edit Profile
              </span>
            </div>
            <ChevronRight size={22} className="text-black" strokeWidth={2} />
          </Button>
        </div>

        {/* 🔴 LOGOUT BUTTON */}
        {/* Using mt-auto to push to bottom, or stick with mt-90 if specific spacing needed */}
        <div className="px-5 mt-auto mb-5 pt-20">
          <Button
            onClick={handleLogout}
            className="w-full h-12 rounded-xl bg-[#FF383C] hover:bg-[#FF383C]/90 shadow-sm text-[16px] font-semibold font-gilroy"
          >
            <LogOut
              size={18}
              className="transform -scale-x-100 mr-2"
              strokeWidth={2}
            />
            Logout
          </Button>
        </div>

        {/* LOGOUT OVERLAY */}
        {isLogoutLoading && (
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center z-50">
            <Card className="p-6 shadow-xl flex flex-col items-center w-37.5 border-none">
              <Loader2 className="animate-spin text-primary mb-3" size={32} />
              <span className="text-black text-[16px] font-gilroy">
                Logging out...
              </span>
            </Card>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
