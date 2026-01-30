import { leaveService } from "@/services/leave.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
