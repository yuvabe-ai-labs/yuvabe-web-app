import { useLeaveDetails } from "@/hooks/useMentorLeave";
import { cn, formatDate, getStatusTextColor } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function TeamLeaveDetailScreen() {
  const navigate = useNavigate();
  const { leaveId } = useParams({ from: "/team-leave-history/$leaveId" });
  const { data: leave, isLoading } = useLeaveDetails(leaveId);

  if (isLoading) {
    return (
      <div className="bg-white flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-[#592AC7]" size={40} />
      </div>
    );
  }

  if (!leave) {
    return (
      <div className="items-center justify-center ">
        <p className="text-gray-500 font-gilroy text-lg">Leave not found</p>
        <button
          onClick={() => navigate({ to: ".." })}
          className="mt-4 text-[#592AC7] font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0 border-gray-100">
        <button
          onClick={() => navigate({ to: ".." })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>
        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-bold text-[#000] font-gilroy">
            Leave Details
          </h1>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
        <div className="bg-[#F5F5F5] p-5 rounded-[15px] border border-[#592AC7]">
          {/* EMPLOYEE NAME */}
          <div>
            <h3 className="text-[16px] font-bold text-black font-gilroy">
              Employee Name
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy font-normal">
              {leave.user_name}
            </p>
          </div>

          {/* LEAVE TYPE */}
          <div className="mt-5">
            <h3 className="text-[16px] font-bold text-black font-gilroy">
              Leave Type
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy font-normal">
              {leave.leave_type}
            </p>
          </div>

          {/* REASON */}
          <div className="mt-5">
            <h3 className="text-[16px] font-bold text-black font-gilroy">
              Reason for Leave
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy font-normal break-words">
              {leave.reason}
            </p>
          </div>

          {/* DATES */}
          <div className="mt-5">
            <h3 className="text-[16px] font-bold text-black font-gilroy">
              From → To
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy font-normal">
              {formatDate(leave.from_date)} ➜ {formatDate(leave.to_date)}{" "}
            </p>
          </div>

          {/* TOTAL DAYS */}
          <div className="mt-5">
            <h3 className="text-[16px] font-bold text-black font-gilroy">
              Total Days
            </h3>
            <p className="text-[18px] mt-1 text-black font-gilroy font-normal">
              {leave.days}
            </p>
          </div>

          {/* STATUS */}
          <div className="mt-5">
            <h3 className="text-[16px] font-bold text-black font-gilroy">
              Status
            </h3>
            <p
              className={cn(
                "text-[18px] mt-1 font-gilroy font-bold",
                getStatusTextColor(leave.status),
              )}
            >
              {leave.status}
            </p>
          </div>

          {/* UPDATED AT */}
          <div className="mt-5">
            <h3 className="text-[16px] font-bold text-black font-gilroy">
              Updated At
            </h3>
            <p className="text-[14px] mt-1 text-black font-gilroy font-normal">
              {formatDate(leave.updated_at?.slice(0, 10))} {/* ✅ Uses Utils */}
            </p>
          </div>

          {/* REJECT REASON (Conditional) */}
          {leave.reject_reason && (
            <div className="mt-5">
              <h3 className="text-[16px] font-bold text-black font-gilroy">
                Reject Reason
              </h3>
              <p className="text-[18px] mt-1 text-red-600 font-gilroy font-normal">
                {leave.reject_reason}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
