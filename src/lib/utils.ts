
import { clsx, type ClassValue } from "clsx";

import {
  HeadphoneIcon,
  KeyboardIcon,
  Laptop,
  LaptopStand,
  MonitoIcon,
  MouseIcon,
} from "@/lib/utils/custom-icons";
import { LeaveType } from "@/types/leave.types";
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
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
