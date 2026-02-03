// src/hooks/useAuthBootstrap.ts
import { userService } from "@/services/user.service";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";

export const useAuthBootstrap = () => {
  const { setUser, resetUser, setAuthChecked } = useUserStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await userService.fetchUser();
        setUser(data.user);
      } catch (error) {
        console.error("Auth Bootstrap", error);
        resetUser();
      } finally {
        setAuthChecked(true);
      }
    };

    initAuth();
  }, [resetUser, setAuthChecked, setUser]);
};
