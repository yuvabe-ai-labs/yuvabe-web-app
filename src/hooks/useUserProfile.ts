import { userService } from "@/services/user.service";
import { useUserStore } from "@/store/user.store";
import type { UpdateProfilePayload } from "@/types/profile.types";
import type { User } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

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

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      userService.updateProfile(payload),
    onSuccess: (updatedUser: User) => {
      setUser(updatedUser);

      // Update Cache
      queryClient.setQueryData(
        ["user-profile"],
        (old: UpdateProfilePayload) => {
          if (!old) return updatedUser;
          return { ...old, ...updatedUser };
        },
      );

      toast.success("Profile updated successfully!");
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      const msg = error.response?.data?.detail || "Update failed";
      toast.error("Error", { description: msg });
    },
  });
};
