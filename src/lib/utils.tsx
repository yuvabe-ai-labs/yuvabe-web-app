import {
  HeadphoneIcon,
  KeyboardIcon,
  Laptop,
  LaptopStand,
  MonitoIcon,
  MouseIcon,
} from "@/lib/utils/custom-icons";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AssetIconProps = {
  className?: string;
};

export function getAssetIcon(
  type: string,
  props: AssetIconProps = { className: "text-[#333]" },
) {
  const key = type.toLowerCase().replace(/\s/g, "");

  switch (key) {
    case "laptop":
      return <Laptop {...props} />;
    case "mouse":
      return <MouseIcon {...props} />;
    case "keyboard":
      return <KeyboardIcon {...props} />;
    case "monitor":
      return <MonitoIcon {...props} />;
    case "headphone":
      return <HeadphoneIcon {...props} />;
    case "laptopstand":
      return <LaptopStand {...props} />;
    default:
      return <Laptop {...props} />;
  }
}
