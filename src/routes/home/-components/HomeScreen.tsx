import AppDrawer from "@/components/layout/AppDrawer";
import MobileLayout from "@/components/layout/MobileLayout";
import { Alert, HamburgerMenu, YBLogo } from "@/lib/utils/custom-Icons";
import { userService } from "@/services/user.service";
import { useUserStore } from "@/store/user.store";
import { useEffect, useState } from "react";
import DrawerContent from "./DrawerContent";

export default function HomeScreen() {
  const { user, setUser } = useUserStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Quote State
  const [quote, setQuote] = useState(
    "The only way to do great work is to love what you do."
  );
  const [author, setAuthor] = useState("Steve Jobs");

  // Fetch Quote Logic
  useEffect(() => {
    const fetchQuote = async () => {
      const today = new Date().toISOString().split("T")[0];
      const stored = localStorage.getItem("daily_quote");

      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today) {
          setQuote(parsed.quote);
          setAuthor(parsed.author);
          return;
        }
      }

      try {
        const res = await fetch(
          "https://motivational-spark-api.vercel.app/api/quotes/random"
        );
        const data = await res.json();

        setQuote(data.quote);
        setAuthor(data.author);

        localStorage.setItem(
          "daily_quote",
          JSON.stringify({
            quote: data.quote,
            author: data.author,
            date: today,
          })
        );
      } catch (err) {
        console.log("Quote fetch error", err);
      }
    };

    fetchQuote();
  }, []);

  // Fetch Profile Details on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await userService.fetchProfileDetails();
        if (res.data) setUser(res.data);
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    };
    loadProfile();
  }, [setUser]);

  return (
    <MobileLayout>
      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        drawerContent={<DrawerContent onClose={() => setIsDrawerOpen(false)} />}
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
          {/* Welcome Text */}
          <h1 className="text-[22px] font-bold text-text-primary mt-4 mb-4 font-gilroy">
            Welcome, {user?.name?.split(" ")[0] || "User"} !
          </h1>

          {/* Thought of the Day */}
          <div className="bg-[#FFFBF0] border border-[#FFCA2D] rounded-xl p-4 mt-4 mb-6 flex flex-col items-center">
            <h3 className="text-[18px] font-bold text-text-primary mb-2 font-gilroy">
              Thought of the Day
            </h3>
            <p className="text-[16px] font-semibold text-center leading-6 text-text-primary mb-2 font-gilroy">
              “{quote}“
            </p>
            <p className="self-end italic text-[14px] text-text-primary font-gilroy">
              — {author}
            </p>
          </div>

          {/* Calming Audio Section */}
          {/* <CalmingAudio /> */}
        </div>
      </AppDrawer>
    </MobileLayout>
  );
}
