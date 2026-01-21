import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Date Formatter
export const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

// 2. Text Color for Status (Used in Detail Screens)
export const getStatusTextColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "text-[#166534]"; // Green
    case "Rejected":
      return "text-[#DC2626]"; // Red
    case "Cancelled":
      return "text-[#E53935]"; // Dark Red
    default:
      return "text-[#EA580C]"; // Orange
  }
};

// 3. Badge Style for Status (Used in History List)
export const getLeaveStatusBadgeStyles = (status: string) => {
  switch (status) {
    case "Approved":
      return { bg: "#17A42A", color: "#FFFFFF" };
    case "Cancelled":
      return { bg: "#1C0E96", color: "#FFFFFF" };
    case "Rejected":
      return { bg: "#FF383C", color: "#FFFFFF" };
    case "Pending":
    default:
      return { bg: "#F9A91E", color: "#FFFFFF" };
  }
};

// 4. Leave Type Formatter (sick -> Sick Leave)
export const formatLeaveType = (leaveType: string): string => {
  if (!leaveType) return "";
  const type = leaveType.trim().toLowerCase();
  if (type === "sick") return "Sick Leave";
  if (type === "casual") return "Casual Leave";
  return leaveType;
};

// 5. Leave Type Badge Color (Sick=Yellow, Casual=Blue)
export const getLeaveTypeBadgeColor = (leaveType: string): string => {
  if (!leaveType) return "#6C757D";
  const type = leaveType.trim().toLowerCase();
  if (type === "sick") return "#C89C00"; // yellow
  if (type === "casual") return "#005DBD"; // blue
  return "#6C757D";
};
