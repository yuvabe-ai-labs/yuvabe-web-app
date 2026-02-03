import type { FormFieldProps, PasswordFieldProps } from "@/types/user.types";
import { Eye, EyeOff } from "lucide-react";

export function FormField({ label, children, error }: FormFieldProps) {
  return (
    <div>
      <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1 font-gilroy">{error}</p>
      )}
    </div>
  );
}

export function PasswordField({
  label,
  show,
  setShow,
  registration,
  error,
}: PasswordFieldProps) {
  return (
    <FormField label={label} error={error}>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...registration}
          className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-[#1A1A1A] outline-none focus:border-[#592AC7] font-gilroy pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1"
        >
          {show ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    </FormField>
  );
}
