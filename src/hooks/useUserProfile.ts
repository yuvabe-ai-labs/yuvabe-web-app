import { userService } from "@/services/user.service";
import { useUserStore } from "@/store/user.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserProfilePayslip = () => {
  const { user, setUser } = useUserStore();

  const {
    data: fetchedUser,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      console.log("Fetching user profile...");
      const res = await userService.fetchUser();

      if (res.user) {
        return res.user;
      }
      return res;
    },

    enabled: !user?.id,
    retry: 1,
  });

  useEffect(() => {
    if (fetchedUser?.id && user?.id !== fetchedUser.id) {
      console.log("Syncing user to store...");
      setUser(fetchedUser);
    }
  }, [fetchedUser, user?.id, setUser]);

  return {
    user: user || fetchedUser,
    isLoading: isLoading && !user?.id,
    isError,
    refetch,
  };
};
