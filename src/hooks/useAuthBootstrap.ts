// useAuthBootstrap.ts
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";

export const useAuthBootstrap = () => {
  const { setUser, resetUser, setAuthChecked } = useUserStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.fetchUser(); 
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
