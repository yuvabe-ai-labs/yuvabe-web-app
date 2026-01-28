// src/lib/route-guards.ts
import { useUserStore } from "@/store/user.store";
import { redirect } from "@tanstack/react-router";

export const requireAuth = async () => {
  const isLoggedIn = useUserStore.getState().isLoggedIn;

  if (!isLoggedIn) {
    throw redirect({
      to: "/login",
    });
  }
};
