import { payslipService } from "@/services/payslip.service";
import type { PayslipRequestPayload } from "@/types/payslip.types";
import { useMutation } from "@tanstack/react-query";

export const useGmailConnect = () => {
  return useMutation({
    mutationFn: ({ userId, fromPath }: { userId: string; fromPath: string }) =>
      payslipService.getGmailConnectUrl(userId, fromPath),
  });
};

export const useRequestPayslip = () => {
  return useMutation({
    mutationFn: (payload: PayslipRequestPayload) =>
      payslipService.requestPayslip(payload),
  });
};
