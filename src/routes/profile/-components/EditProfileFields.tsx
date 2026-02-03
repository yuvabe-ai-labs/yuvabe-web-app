import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { EditProfileForm } from "@/schemas/user.schema";
import { Eye, EyeOff } from "lucide-react";
import type { Control } from "react-hook-form";

interface ShadcnPasswordFieldProps {
  control: Control<EditProfileForm>;
  name: keyof EditProfileForm;
  label: string;
  show: boolean;
  setShow: (show: boolean) => void;
  placeholder?: string;
}

export function PasswordField({
  control,
  name,
  label,
  show,
  setShow,
  placeholder,
}: ShadcnPasswordFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                {...field}
                className="h-12.5 rounded-xl border-[#E5E7EB] bg-[#F9FAFB] focus-visible:ring-[#592AC7] font-gilroy pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1"
              >
                {show ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </FormControl>
          <FormMessage className="text-xs font-gilroy" />
        </FormItem>
      )}
    />
  );
}
