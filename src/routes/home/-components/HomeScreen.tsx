import { cn } from "@/lib/utils";
import { Alert, HamburgerMenu, YBLogo } from "@/lib/utils/custom-icons";
import { useUserStore } from "@/store/user.store";
import { useEffect, useState } from "react";
import DrawerContent from "./DrawerContent";

// Shadcn Sheet Imports
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useDailyQuote, useUserProfile } from "@/hooks/useHomeQueries";
import { useRegisterDevice } from "@/hooks/useNotifications";

export default function HomeScreen() {
  const { user, setUser } = useUserStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: quoteData } = useDailyQuote();

  const { data: profileData } = useUserProfile();

  const { mutate: registerDevice } = useRegisterDevice();

  useEffect(() => {
    if (profileData?.data) {
      setUser(profileData.data);
    }
  }, [profileData, setUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      registerDevice();
      console.log("Registering device for notifications");
    });

    return () => clearTimeout(timer);
  }, [registerDevice]);

  const TRANSITION_CLASSES = "duration-300 ease-in-out";

  return (
    <div className="overflow-hidden ">
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen} modal={true}>
        <SheetContent
          side="left"
          className={cn(
            "w-[75%] p-0 border-none shadow-none [&>button]:hidden bg-transparent",
            "data-[state=open]:duration-300 data-[state=closed]:duration-300",
            TRANSITION_CLASSES,
          )}
        >
          <DrawerContent onClose={() => setIsDrawerOpen(false)} />
        </SheetContent>
      </Sheet>

      <div
        className={cn(
          "flex flex-col h-full bg-white transition-transform will-change-transform",
          TRANSITION_CLASSES,
          isDrawerOpen ? "translate-x-[75%]" : "translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 mt-6 mb-4">
          <button className="p-1" onClick={() => setIsDrawerOpen(true)}>
            <HamburgerMenu className="text-text-primary" />
          </button>

          <div className="h-8 flex items-center">
            <YBLogo className="h-full w-auto" />
          </div>

          <button className="p-1">
            <Alert className="text-text-primary" />
          </button>
        </div>

        <div className="px-5 pb-8">
          <h1 className="text-[22px] font-bold text-text-primary mt-4 mb-4 font-gilroy">
            Welcome, {user?.name?.split(" ")[0] || "User"} !
          </h1>

          <div className="bg-[#FFFBF0] border border-[#FFCA2D] rounded-xl p-4 mt-4 mb-6 flex flex-col items-center">
            <h3 className="text-[18px] font-bold text-text-primary mb-2 font-gilroy">
              Thought of the Day
            </h3>
            <p className="text-[16px] font-semibold text-center leading-6 text-text-primary mb-2 font-gilroy">
              “
              {quoteData?.quote ||
                "The only way to do great work is to love what you do."}
              “
            </p>
            <p className="self-end italic text-[14px] text-text-primary font-gilroy">
              — {quoteData?.author || "Steve Jobs"}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-0 bg-black/10 z-50 pointer-events-none transition-opacity",
            TRANSITION_CLASSES,
            isDrawerOpen ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Click listener to close drawer if tapping the pushed content */}
        {isDrawerOpen && (
          <div
            className="absolute inset-0 z-50 cursor-pointer"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
