export type PayslipMode = "3_months" | "6_months" | "manual";

export interface PayslipRequestPayload {
  mode: PayslipMode;
  start_month?: string;
  end_month?: string;
}

export interface GmailConnectResponse {
  auth_url: string;
}

export interface PayslipRequestResponse {
  status: string;
  requested_at: string;
}

export type ModeType = "preset" | "manual";
export type PresetType = "3_months" | "6_months";
