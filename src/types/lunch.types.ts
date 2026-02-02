export interface LunchOptOutPayload {
  start_date: Date | null | string;
  end_date: Date | null | string;
}

export interface LunchOptOutResponse {
  message: string;
  status: string;
}

export type ModeType = "tomorrow" | "range" | null;

export type LunchFormValues = {
  startDate: Date | null;
  endDate: Date | null;
  selectedMode: "tomorrow" | "range" | null;
};
