import { payslipService } from "@/services/payslip.service";
import type { PayslipRequestPayload } from "@/types/payslip.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGmailConnect = () => {
  return useMutation({
    mutationFn: (userId: string) => payslipService.getGmailConnectUrl(userId),
  });
};

export const useRequestPayslip = () => {
  return useMutation({
    mutationFn: (payload: PayslipRequestPayload) =>
      payslipService.requestPayslip(payload),
    onError:(error) => {
      if(error instanceof Error){
        toast.error(error.message);
      }else{
        toast.error("Failed to request payslip");
      }
    }
  });
};
