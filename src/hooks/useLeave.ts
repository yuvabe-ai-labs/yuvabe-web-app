import { leaveService } from "@/services/leave.service";
import type { LeaveRequestPayload } from "@/types/leave.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useLeaveBalance = () => {
  return useQuery({
    queryKey: ["leave-balance"],
    queryFn: leaveService.fetchBalance,
    staleTime: 1000 * 60 * 5, // 5 minutes
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
