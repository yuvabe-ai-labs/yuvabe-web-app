import {
  HeadphoneIcon,
  KeyboardIcon,
  Laptop,
  LaptopStand,
  MonitoIcon,
  MouseIcon,
} from "@/lib/utils/custom-icons";
import { clsx, type ClassValue } from "clsx";
import type { ComponentType } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AssetIconProps = {
  className?: string;
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
