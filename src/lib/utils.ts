import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "#4CAF50"; // Green
      case "Pending":
        return "#FFA000"; // Amber
      case "Cancelled":
        return "#3F1ABF"; // Purple
      case "Rejected":
        return "#FF3B30"; // Red
      default:
        return "#999999";
    }
  };
