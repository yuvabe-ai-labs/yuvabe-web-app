import type { LeaveBalanceDTO, LeaveRequestPayload } from "@/types/leave.types";
import api from "../lib/axios-client";

export const leaveService = {
  fetchBalance: async (): Promise<LeaveBalanceDTO> => {
    const res = await api.get("/profile/balance");
    return res.data.data;
  },

  // Submit Leave Request
  requestLeave: async (payload: LeaveRequestPayload) => {
    const res = await api.post("/profile/request", payload);
    return res.data;
  },
};
