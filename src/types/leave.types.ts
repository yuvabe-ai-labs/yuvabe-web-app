export type LeaveBalanceDTO = {
  sick_remaining: number;
  casual_remaining: number;
};

export const LeaveStatus = {
  APPROVED: "Approved",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
} as const;

export type LeaveStatus = (typeof LeaveStatus)[keyof typeof LeaveStatus];

export const MentorDecisionStatus = {
  APPROVED: LeaveStatus.APPROVED,
  REJECTED: LeaveStatus.REJECTED,
} as const;

export type MentorDecisionStatus =
  (typeof MentorDecisionStatus)[keyof typeof MentorDecisionStatus];
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

export type PendingLeaveDTO = {
  id: string;
  user_name: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  days: number;
  requested_at: string;
  updated_at: string;
};

// Add these fields if missing in your existing LeaveDetailsDTO
export type LeaveDetailsDTO = {
  id: string;
  user_id: string;
  user_name: string;
  leave_type: string;
  reason: string;
  from_date: string;
  to_date: string;
  days: number;
  status: LeaveStatus;
  updated_at: string;
  reject_reason?: string;
};

export type LeaveHistoryDTO = {
  id: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  days: number;
  status: LeaveStatus;
  mentor_name?: string;
  updated_at: string;
};

export type MentorDecisionPayload = {
  status: MentorDecisionStatus;
  comment?: string;
};
