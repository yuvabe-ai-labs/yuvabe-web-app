export type LeaveBalanceDTO = {
  sick_remaining: number;
  casual_remaining: number;
};

export const LeaveType = {
  SICK: "Sick",
  CASUAL: "Casual",
} as const;
export type LeaveType = (typeof LeaveType)[keyof typeof LeaveType];

export type LeaveRequestPayload = {
  leave_type: LeaveType;
  from_date: string;
  to_date: string;
  days: number;
  reason: string;
};
