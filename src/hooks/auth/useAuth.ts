import { setItem, setTokens } from "@/lib/storage";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/store/user.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Login failed";
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, setIsVerified } = useUserStore();

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async (data, variables) => {
      setTokens(data.access_token, data.refresh_token);
      setItem("logged_in_email", variables.email);

      setIsLoggedIn(true);
      setIsVerified(data.user.is_verified);

      try {
        const userData = await authService.fetchUser();
        setUser(userData.user);

        if (!data.user.is_verified) {
          toast.warning("Please verify your email");
        } else {
          navigate({ to: "/" });
          toast.success("Welcome back!");
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
};
