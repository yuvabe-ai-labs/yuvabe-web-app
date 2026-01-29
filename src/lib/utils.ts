import {
  HeadphoneIcon,
  KeyboardIcon,
  Laptop,
  LaptopStand,
  MonitoIcon,
  MouseIcon,
} from "@/lib/utils/custom-icons";
import { LeaveType } from "@/types/leave.types";
import { clsx, type ClassValue } from "clsx";
import { format, isValid, parseISO } from "date-fns";
import type { ComponentType } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AssetIconProps = {
  className?: string;
};

export const LEAVE_LABEL_MAP: Record<LeaveType, string> = {
  [LeaveType.SICK]: "Sick Leave",
  [LeaveType.CASUAL]: "Casual Leave",
};

export function getAssetIcon(type: string): ComponentType<AssetIconProps> {
  const key = type.toLowerCase().replace(/\s/g, "");

  switch (key) {
    case "laptop":
      return Laptop;
    case "mouse":
      return MouseIcon;
    case "keyboard":
      return KeyboardIcon;
    case "monitor":
      return MonitoIcon;
    case "headphone":
      return HeadphoneIcon;
    case "laptopstand":
      return LaptopStand;
    default:
      return Laptop;
  }
}

export const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const date = parseISO(dateString);
  if (!isValid(date)) return "";

  return format(date, "d MMM yyyy");
};

export const getStatusBadgeClasses = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-[#4CAF50]"; // Green
    case "Pending":
      return "bg-[#FFA000]"; // Amber
    case "Cancelled":
      return "bg-[#3F1ABF]"; // Purple
    case "Rejected":
      return "bg-[#FF3B30]"; // Red
    default:
      return "bg-[#999999]";
  }
};

export const getFontColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "text-green-600";
    case "Rejected":
      return "text-red-600";
    case "Cancelled":
      return "text-[#E53935]";
    default:
      return "text-orange-500";
  }
};
