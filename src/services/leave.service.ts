import type {
  LeaveBalanceDTO,
  LeaveDetailsDTO,
  LeaveHistoryDTO,
  LeaveRequestPayload,
  MentorDecisionPayload,
  PendingLeaveDTO,
} from "@/types/leave.types";
import { AxiosError } from "axios";
import api from "../lib/axios-client";

const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    const backendMessage =
      error.response.data.detail ||
      error.response.data.message ||
      "Request failed";
    throw new Error(backendMessage);
  }
  throw error;
};

export const leaveService = {
  fetchBalance: async (): Promise<LeaveBalanceDTO> => {
    try {
      const res = await api.get("/profile/balance");
      return res.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Submit Leave Request
  requestLeave: async (payload: LeaveRequestPayload) => {
    try {
      const res = await api.post("/profile/request", payload);
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  fetchPendingLeaves: async (): Promise<PendingLeaveDTO[]> => {
    try {
      const res = await api.get("/profile/mentor/pending");
      return res.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  fetchLeaveDetails: async (leaveId: string): Promise<LeaveDetailsDTO> => {
    try {
      const res = await api.get(`/profile/leave/${leaveId}`);
      return res.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  submitMentorDecision: async (
    leaveId: string,
    payload: MentorDecisionPayload,
  ) => {
    try {
      const res = await api.post(
        `/profile/${leaveId}/mentor-decision`,
        payload,
      );
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  fetchUserBalance: async (userId: string): Promise<LeaveBalanceDTO> => {
    try {
      const res = await api.get(`/profile/balance/${userId}`);
      return res.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  fetchMyLeaveHistory: async (): Promise<LeaveHistoryDTO[]> => {
    try {
      const res = await api.get("/profile/my-leaves");
      return res.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  cancelLeave: async (leaveId: string) => {
    try {
      const res = await api.post(`/profile/leave/${leaveId}/cancel`);
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
