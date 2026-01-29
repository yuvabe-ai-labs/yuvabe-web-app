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

        if (data && data.user) {
          console.log("User value", data.user);
          setUser(data.user);
        } else {
          setUser(data);
        }
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
