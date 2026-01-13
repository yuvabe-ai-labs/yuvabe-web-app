import { useUserStore } from "@/store/user.store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import AssetsScreen from "./-components/AssetsScreen";

export const Route = createFileRoute("/assets/")({
  component: AssetsScreen,
  beforeLoad: async () => {
    const isLoggedIn = useUserStore.getState().isLoggedIn;
    if (!isLoggedIn) {
      throw redirect({ to: "/login" });
    }
  },
});
