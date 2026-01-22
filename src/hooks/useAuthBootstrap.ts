// useAuthBootstrap.ts
import { userService } from "@/services/user.service";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";

export const useAuthBootstrap = () => {
  const { setUser, resetUser, setAuthChecked } = useUserStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await userService.fetchUser();
        setUser(user);
      } catch {
        resetUser();
      } finally {
        setAuthChecked(true);
      }
    };

    initAuth();
  }, [resetUser, setAuthChecked, setUser]);
};
