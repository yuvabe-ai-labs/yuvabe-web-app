import { createFileRoute, redirect } from "@tanstack/react-router";
import { useUserStore } from "../store/user.store";
import HomeScreen from "./home/-components/HomeScreen";

export const Route = createFileRoute("/")({
  component: HomeScreen,
  beforeLoad: () => {
    // Check if user is logged in
    const isLoggedIn = useUserStore.getState().isLoggedIn;
    if (!isLoggedIn) {
      throw redirect({
        to: "/login",
      });
    }
  },
});
