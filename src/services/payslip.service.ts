import api from "@/lib/axios-client";
import type {
  GmailConnectResponse,
  PayslipRequestPayload,
  PayslipRequestResponse,
} from "@/types/payslip.types";

export const payslipService = {
  /**
   * Fetches the Google OAuth URL from the backend.
   * @param userId - The UUID of the current user
   */
  getGmailConnectUrl: async (userId: string): Promise<GmailConnectResponse> => {
    // We hardcode platform='web' here since this is the web app
    const res = await api.get<GmailConnectResponse>(
      "/payslips/gmail/connect-url",
      {
        params: {
          user_id: userId,
          platform: "web",
        },
      }
    );
    return res.data;
  },

  /**
   * Sends the payslip request payload to the backend.
   */
  requestPayslip: async (
    payload: PayslipRequestPayload
  ): Promise<PayslipRequestResponse> => {
    const res = await api.post<PayslipRequestResponse>(
      "/payslips/request",
      payload
    );
    return res.data;
  },
};
