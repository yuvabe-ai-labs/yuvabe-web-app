import { leaveService } from "@/services/leave.service";
import {
  MentorDecisionStatus,
  type LeaveRequestPayload,
  type MentorDecisionPayload,
} from "@/types/leave.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useLeaveBalance = () => {
  return useQuery({
    queryKey: ["leave-balance"],
    queryFn: leaveService.fetchBalance,
  });
};

export const useRequestLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LeaveRequestPayload) => leaveService.requestLeave(data),
    onSuccess: () => {
      toast.success("Leave request submitted!");

      queryClient.invalidateQueries({ queryKey: ["leave-balance"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(msg);
    },
  });
};

export const useMyLeaveHistory = () => {
  return useQuery({
    queryKey: ["my-leave-history"],
    queryFn: leaveService.fetchMyLeaveHistory,
  });
};

export const useCancelLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveService.cancelLeave,
    onSuccess: () => {
      toast.success("Leave cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["my-leave-history"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to cancel leave");
      }
    },
  });
};

export const usePendingLeaves = () => {
  return useQuery({
    queryKey: ["pending-leaves"],
    queryFn: () => leaveService.fetchPendingLeaves(),
  });
};

export const useLeaveDetails = (leaveId: string) => {
  return useQuery({
    queryKey: ["leave-details", leaveId],
    queryFn: () => leaveService.fetchLeaveDetails(leaveId),
  });
};

export const useUserLeaveBalance = (userId: string) => {
  return useQuery({
    queryKey: ["user-leave-balance", userId],
    queryFn: () => leaveService.fetchUserBalance(userId),
    enabled: !!userId,
  });
};

export const useMentorDecision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      leaveId,
      payload,
    }: {
      leaveId: string;
      payload: MentorDecisionPayload;
    }) => leaveService.submitMentorDecision(leaveId, payload),
    onSuccess: (_, variables) => {
      const action =
        variables.payload.status === MentorDecisionStatus.APPROVED
          ? "approved"
          : "rejected";
      toast.success(`Leave request ${action}`);
      queryClient.invalidateQueries({ queryKey: ["pending-leaves"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};

export const useTeamLeaveHistory = () => {
  return useQuery({
    queryKey: ["team-leave-history"],
    queryFn: leaveService.fetchTeamLeaveHistory,
  });
};

export const useTeamLeaveDetails = (leaveId: string) => {
  return useQuery({
    queryKey: ["leave-details", leaveId],
    queryFn: () => leaveService.getLeaveDetails(leaveId),
    enabled: !!leaveId,
  });
};
