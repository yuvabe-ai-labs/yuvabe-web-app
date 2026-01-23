import MobileLayout from "@/components/layout/MobileLayout";
import { useLeaveBalance, useRequestLeave } from "@/hooks/useLeave";
import { LEAVE_LABEL_MAP } from "@/lib/utils";
import type { LeaveRequestFormValues } from "@/schemas/leave.schema";
import { leaveRequestSchema } from "@/schemas/leave.schema";
import { LeaveType } from "@/types/leave.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LeaveRequestScreen() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Queries & Mutations
  const { data: balance, isLoading: balanceLoading } = useLeaveBalance();
  const { mutate: submitLeave, isPending: submitLoading } = useRequestLeave();

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    mode: "onChange", // Validates as you type
    defaultValues: {
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date().toISOString().split("T")[0],
      reason: "",
    },
  });

  const selectedLeaveType = watch("leave_type");
  const fromDateValue = watch("from_date");

  const onSubmit = (data: LeaveRequestFormValues) => {
    // Calculate days
    const start = new Date(data.from_date);
    const end = new Date(data.to_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    submitLeave(
      {
        leave_type: data.leave_type,
        from_date: data.from_date,
        to_date: data.to_date,
        days,
        reason: data.reason,
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    );
  };

  return (
    <MobileLayout>
      {/* HEADER */}
      <div className="flex items-center px-4 py-6 bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>

        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-bold text-black font-gilroy">
            Request Leave
          </h1>
        </div>
      </div>

      <div className="px-4 pb-10">
        {/* LEAVE BALANCE CARDS */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 bg-[#FFF8E6] border border-[#F6DFA8] py-5 rounded-[14px] flex flex-col items-center">
            <span className="text-[15px] font-semibold text-[#333] mb-1 font-gilroy">
              Sick Leave
            </span>
            <span className="text-[28px] font-bold text-black mb-0.5 font-gilroy">
              {balanceLoading ? "--" : balance?.sick_remaining}
            </span>
            <span className="text-[12px] text-[#777] font-gilroy">
              Remaining
            </span>
          </div>

          <div className="flex-1 bg-[#F4EDFF] border border-[#C9B8F5] py-5 rounded-[14px] flex flex-col items-center">
            <span className="text-[15px] font-semibold text-[#333] mb-1 font-gilroy">
              Casual Leave
            </span>
            <span className="text-[28px] font-bold text-black mb-0.5 font-gilroy">
              {balanceLoading ? "--" : balance?.casual_remaining}
            </span>
            <span className="text-[12px] text-[#777] font-gilroy">
              Remaining
            </span>
          </div>
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* LEAVE TYPE DROPDOWN */}
          <div className="mb-5 relative">
            <label className="block text-[15px] font-semibold text-black mb-2 font-gilroy">
              Leave Type
            </label>

            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className={`w-full border rounded-xl py-3.5 px-3 bg-white flex justify-between items-center text-left transition-colors
                ${errors.leave_type ? "border-red-500" : "border-[#E5E5E5]"}
              `}
            >
              <span
                className={`text-[15px] font-gilroy ${
                  selectedLeaveType ? "text-black" : "text-[#A0A0A0]"
                }`}
              >
                {selectedLeaveType
                  ? LEAVE_LABEL_MAP[selectedLeaveType]
                  : "Select leave type"}
              </span>
              <ChevronDown size={20} className="text-gray-400" />
            </button>

            {errors.leave_type && (
              <span className="text-red-500 text-xs mt-1 font-gilroy pl-1">
                {errors.leave_type.message}
              </span>
            )}

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E5E5] rounded-xl shadow-lg z-20 overflow-hidden">
                {[LeaveType.SICK, LeaveType.CASUAL].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-[15px] font-gilroy text-black border-b border-gray-50 last:border-none"
                    onClick={() => {
                      setValue("leave_type", type, { shouldValidate: true });
                      setShowDropdown(false);
                    }}
                  >
                    {LEAVE_LABEL_MAP[type]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DATES ROW */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <label className="block text-[15px] font-semibold text-black mb-2 font-gilroy">
                From
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border rounded-xl py-3.5 px-3 bg-white text-[15px] font-gilroy text-black outline-none focus:border-primary
                  ${errors.from_date ? "border-red-500" : "border-[#E5E5E5]"}
                `}
                {...register("from_date")}
              />
              {errors.from_date && (
                <span className="text-red-500 text-xs mt-1 font-gilroy pl-1">
                  {errors.from_date.message}
                </span>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-[15px] font-semibold text-black mb-2 font-gilroy">
                To
              </label>
              <input
                type="date"
                // Ensure min date is at least the selected from_date
                min={fromDateValue}
                className={`w-full border rounded-xl py-3.5 px-3 bg-white text-[15px] font-gilroy text-black outline-none focus:border-primary
                  ${errors.to_date ? "border-red-500" : "border-[#E5E5E5]"}
                `}
                {...register("to_date")}
              />
              {errors.to_date && (
                <span className="text-red-500 text-xs mt-1 font-gilroy pl-1">
                  {errors.to_date.message}
                </span>
              )}
            </div>
          </div>

          {/* REASON INPUT */}
          <div className="mb-10">
            <label className="block text-[15px] font-semibold text-black mb-2 font-gilroy">
              Reason
            </label>
            <textarea
              placeholder="Enter your reason..."
              className={`w-full border rounded-xl p-4 bg-white text-[15px] font-gilroy text-black min-h-30 outline-none focus:border-primary resize-none placeholder:text-[#A0A0A0]
                ${errors.reason ? "border-red-500" : "border-[#E5E5E5]"}
              `}
              {...register("reason")}
            />
            {errors.reason && (
              <span className="text-red-500 text-xs mt-1 font-gilroy pl-1">
                {errors.reason.message}
              </span>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={submitLoading || !isValid}
            className={`
              w-full py-4 rounded-xl flex items-center justify-center transition-all
              ${
                !isValid || submitLoading
                  ? "bg-[#BDA0FF] cursor-not-allowed"
                  : "bg-[#592AC7] hover:opacity-90"
              }
            `}
          >
            {submitLoading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <span className="text-white text-[16px] font-semibold font-gilroy">
                Submit Leave Request
              </span>
            )}
          </button>
        </form>
      </div>
    </MobileLayout>
  );
}
