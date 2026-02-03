import api from "@/lib/axios-client";
import type {
  LunchOptOutPayload,
  LunchOptOutResponse,
} from "@/types/lunch.types";

export const lunchService = {
  requestLunchOptOut: async (
    payload: LunchOptOutPayload
  ): Promise<LunchOptOutResponse> => {
    const res = await api.post("/lunch/notify", payload);
    return res.data;
  },
};
