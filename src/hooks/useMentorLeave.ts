import { leaveService } from "@/services/leave.service";
import {
  MentorDecisionStatus,
  type MentorDecisionPayload,
} from "@/types/leave.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong";
}

export const usePendingLeaves = () => {
  return useQuery({
    queryKey: ["pending-leaves"],
    queryFn: async () => {
      const data = await leaveService.fetchPendingLeaves();
      // Sort by updated_at descending (newest first)
      return data.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
    },
  });
};

export const useLeaveDetails = (leaveId: string) => {
  const isValidId = !!leaveId && leaveId !== "undefined" && leaveId !== "null";
  return useQuery({
    queryKey: ["leave-details", leaveId],
    queryFn: () => leaveService.fetchLeaveDetails(leaveId),
    enabled: isValidId,
  });
};

export const useUserLeaveBalance = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user-leave-balance", userId],
    queryFn: () => leaveService.fetchUserBalance(userId!),
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
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
};
