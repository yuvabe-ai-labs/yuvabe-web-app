import MobileLayout from "@/components/layout/MobileLayout";
import { useLeaveBalance, useRequestLeave } from "@/hooks/useLeave";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LeaveRequestScreen() {
  const navigate = useNavigate();

  // Queries & Mutations
  const { data: balance, isLoading: balanceLoading } = useLeaveBalance();
  const { mutate: submitLeave, isPending: submitLoading } = useRequestLeave();

  // Form State
  const [leaveType, setLeaveType] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Dates (Formatted as YYYY-MM-DD for HTML inputs)
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  const [reason, setReason] = useState("");

  const isSubmitDisabled = !leaveType || !reason.trim();

  const handleSubmit = () => {
    if (!reason.trim()) {
      toast.error("Please enter a reason.");
      return;
    }

    if (new Date(toDate) < new Date(fromDate)) {
      toast.error('"To date" must be after "From date".');
      return;
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    submitLeave(
      {
        leave_type: leaveType === "Sick Leave" ? "Sick" : "Casual",
        from_date: fromDate,
        to_date: toDate,
        days,
        reason,
      },
      {
        onSuccess: () => {
          // Reset form on success
          setReason("");
          setLeaveType("");
          navigate({ to: "/" }); // Go back home
        },
      }
    );
  };

  return (
    <MobileLayout>
      {/* HEADER */}
      <div className="flex items-center px-4 py-6 bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>

        <div className="flex-1 text-center pr-7">
          {" "}
          {/* pr-7 balances the left icon width */}
          <h1 className="text-[18px] font-bold text-black font-gilroy">
            Request Leave
          </h1>
        </div>
      </div>

      <div className="px-4 pb-10">
        {/* LEAVE BALANCE CARDS */}
        <div className="flex gap-3 mb-8">
          {/* Sick Leave Card */}
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

          {/* Casual Leave Card */}
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

        {/* LEAVE TYPE DROPDOWN */}
        <div className="mb-5 relative">
          <label className="block text-[15px] font-semibold text-black mb-2 font-gilroy">
            Leave Type
          </label>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full border border-[#E5E5E5] rounded-xl py-[14px] px-3 bg-white flex justify-between items-center text-left"
          >
            <span
              className={`text-[15px] font-gilroy ${
                leaveType ? "text-black" : "text-[#A0A0A0]"
              }`}
            >
              {leaveType || "Select leave type"}
            </span>
            <ChevronDown size={20} className="text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E5E5] rounded-xl shadow-lg z-20 overflow-hidden">
              {["Sick Leave", "Casual Leave"].map((type) => (
                <button
                  key={type}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 text-[15px] font-gilroy text-black border-b border-gray-50 last:border-none"
                  onClick={() => {
                    setLeaveType(type);
                    setShowDropdown(false);
                  }}
                >
                  {type}
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
              value={fromDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-[#E5E5E5] rounded-xl py-[14px] px-3 bg-white text-[15px] font-gilroy text-black outline-none focus:border-primary"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[15px] font-semibold text-black mb-2 font-gilroy">
              To
            </label>
            <input
              type="date"
              value={toDate}
              min={fromDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-[#E5E5E5] rounded-xl py-[14px] px-3 bg-white text-[15px] font-gilroy text-black outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* REASON INPUT */}
        <div className="mb-10">
          <label className="block text-[15px] font-semibold text-black mb-2 font-gilroy">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason..."
            className="w-full border border-[#E5E5E5] rounded-xl p-4 bg-white text-[15px] font-gilroy text-black min-h-[120px] outline-none focus:border-primary resize-none placeholder:text-[#A0A0A0]"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={submitLoading || isSubmitDisabled}
          className={`
            w-full py-4 rounded-xl flex items-center justify-center transition-all
            ${
              isSubmitDisabled
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
      </div>
    </MobileLayout>
  );
}
