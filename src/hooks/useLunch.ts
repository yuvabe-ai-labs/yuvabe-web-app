import { lunchService } from "@/services/lunch.service";
import type { LunchOptOutPayload } from "@/types/lunch.types";
import { useMutation } from "@tanstack/react-query";

export const useLunchOptOut = () => {
  return useMutation({
    mutationFn: (payload: LunchOptOutPayload) =>
      lunchService.requestLunchOptOut(payload),
  });
};
