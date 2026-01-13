export type LeaveBalanceDTO = {
  sick_remaining: number;
  casual_remaining: number;
};

export type LeaveRequestPayload = {
  leave_type: "Sick" | "Casual";
  from_date: string;
  to_date: string;
  days: number;
  reason: string;
};
