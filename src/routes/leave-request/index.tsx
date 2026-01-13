import { createFileRoute, redirect } from "@tanstack/react-router";
import LeaveRequestScreen from "./-components/LeaveRequestScreen";
import { useUserStore } from "@/store/user.store";

export const Route = createFileRoute("/leave-request/")({
  component: LeaveRequestScreen,
  beforeLoad: async () => {
    const isLoggedIn = useUserStore.getState().isLoggedIn;
    if (!isLoggedIn) {
      throw redirect({ to: "/login" });
    }
  },
});
