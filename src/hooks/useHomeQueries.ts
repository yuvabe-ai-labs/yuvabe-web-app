import { quoteService } from "@/services/quote.service";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useDailyQuote = () => {
  return useQuery({
    queryKey: ["daily-quote"],
    queryFn: quoteService.fetchDailyQuote,
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: userService.fetchProfileDetails,
  });
};
