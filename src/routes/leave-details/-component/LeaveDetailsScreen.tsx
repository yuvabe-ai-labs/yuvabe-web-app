import { useLeaveDetails } from "@/hooks/useMentorLeave";
import { cn, formatDate, getFontColor } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function LeaveDetailsScreen() {
  const navigate = useNavigate();
  // Get the ID from the URL params
  const { leaveId } = useParams({ from: "/leave-details/$leaveId" });

  const { data: leave, isLoading } = useLeaveDetails(leaveId);

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="animate-spin text-gray-400 mb-2" size={32} />
          <p className="text-gray-500 font-gilroy">Loading leave details...</p>
        </div>
      </>
    );
  }

  if (!leave) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-[16px] text-gray-500 font-gilroy">
            Leave not found
          </p>
          <button
            onClick={() => navigate({ to: "/leave-history" })}
            className="mt-4 text-blue-600 font-semibold font-gilroy hover:underline"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0 border-b border-gray-100">
        <button
          onClick={() => navigate({ to: "/leave-history" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>

        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-semibold text-black font-gilroy">
            Leave Details
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="bg-[#F5F5F5] p-5 rounded-[15px] border border-[#592AC7]">
          {/* Leave Type */}
          <div className="mb-5">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Leave Type
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy">
              {leave.leave_type}
            </p>
          </div>

          {/* Reason */}
          <div className="mb-5">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Reason for Leave
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy">
              {leave.reason}
            </p>
          </div>

          {/* Dates */}
          <div className="mb-5">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              From → To
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy">
              {formatDate(leave.from_date)} ➜ {formatDate(leave.to_date)}
            </p>
          </div>

          {/* Days */}
          <div className="mb-5">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Total Days
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy">
              {leave.days}
            </p>
          </div>

          {/* Status */}
          <div className="mb-5">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Status
            </h3>
            <p
              className={cn(
                "text-[18px] mt-1 font-bold font-gilroy",
                getFontColor(leave.status),
              )}
            >
              {leave.status}
            </p>
          </div>

          {/* Updated At */}
          <div className="mb-5">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Updated At
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy">
              {formatDate(leave.updated_at?.slice(0, 10))}
            </p>
          </div>

          {/* Reject Reason (Conditional) */}
          {leave.reject_reason && (
            <div>
              <h3 className="text-[16px] font-semibold text-black font-gilroy">
                Reject Reason
              </h3>
              <p className="text-[18px] mt-1 text-red-600 font-gilroy">
                {leave.reject_reason}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
