import { lunchService } from "@/services/lunch.service";
import type { LunchOptOutPayload } from "@/types/lunch.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLunchOptOut = () => {
  return useMutation({
    mutationFn: (payload: LunchOptOutPayload) =>
      lunchService.requestLunchOptOut(payload),
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to opt out of lunch");
      }
    },
  });
};
