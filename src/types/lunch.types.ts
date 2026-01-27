export interface LunchOptOutPayload {
  start_date: string;
  end_date: string;
}

export interface LunchOptOutResponse {
  message: string;
  status: string;
}

export type ModeType = "tomorrow" | "range" | null;
