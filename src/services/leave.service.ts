import type {
  LeaveBalanceDTO,
  LeaveDetailsDTO,
  LeaveHistoryDTO,
  LeaveRequestPayload,
  MentorDecisionPayload,
  PendingLeaveDTO,
} from "@/types/leave.types";
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

  fetchPendingLeaves: async (): Promise<PendingLeaveDTO[]> => {
    const res = await api.get("/profile/mentor/pending");
    return res.data.data;
  },
  fetchLeaveDetails: async (leaveId: string): Promise<LeaveDetailsDTO> => {
    const res = await api.get(`/profile/leave/${leaveId}`);
    return res.data.data;
  },

  submitMentorDecision: async (
    leaveId: string,
    payload: MentorDecisionPayload
  ) => {
    const res = await api.post(`/profile/${leaveId}/mentor-decision`, payload);
    return res.data;
  },

  fetchUserBalance: async (userId: string): Promise<LeaveBalanceDTO> => {
    const res = await api.get(`/profile/balance/${userId}`);
    return res.data.data;
  },

  fetchMyLeaveHistory: async (): Promise<LeaveHistoryDTO[]> => {
    const res = await api.get("/profile/my-leaves");
    return res.data.data;
  },

  cancelLeave: async (leaveId: string) => {
    const res = await api.post(`/profile/leave/${leaveId}/cancel`);
    return res.data;
  },

  
};
