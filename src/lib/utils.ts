import { LeaveType } from "@/types/leave.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LEAVE_LABEL_MAP: Record<LeaveType, string> = {
  [LeaveType.SICK]: "Sick Leave",
  [LeaveType.CASUAL]: "Casual Leave",
};
