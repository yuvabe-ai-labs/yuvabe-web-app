import { leaveService } from "@/services/leave.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Failed to cancel leave";
}

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
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
};
