import MobileLayout from "@/components/layout/MobileLayout";
import {
  useLeaveDetails,
  useMentorDecision,
  useUserLeaveBalance,
} from "@/hooks/useMentorLeave";
import { formatDate } from "@/lib/utils"; 
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MentorApprovalScreen() {
  const navigate = useNavigate();
  const { leaveId } = useParams({ from: "/mentor-approval/$leaveId" });

  const [rejectComment, setRejectComment] = useState("");

  const { data: leave, isLoading: loadingDetails } = useLeaveDetails(leaveId);
  const { data: balance, isLoading: loadingBalance } = useUserLeaveBalance(
    leave?.user_id,
  );
  const { mutate: submitDecision, isPending } = useMentorDecision();

  const handleApprove = () => {
    submitDecision(
      { leaveId, payload: { status: "Approved" } },
      { onSuccess: () => navigate({ to: "/pending-leaves" }) },
    );
  };

  const handleReject = () => {
    if (!rejectComment.trim()) {
      toast.error("Comment required to reject");
      return;
    }
    submitDecision(
      { leaveId, payload: { status: "Rejected", comment: rejectComment } },
      { onSuccess: () => navigate({ to: "/pending-leaves" }) },
    );
  };

  if (loadingDetails || !leave) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="animate-spin text-gray-400 mb-2" size={32} />
          <p className="text-gray-500 font-gilroy">Loading details...</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="bg-white flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0">
        <button
          onClick={() => navigate({ to: "/pending-leaves" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>

        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-semibold text-black font-gilroy">
            Mentor Approval
          </h1>
        </div>
      </div>

      {/* CONTENT SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {/* LEAVE BALANCE CARDS */}
        <div className="flex gap-4 mb-8 pt-5">
          {/* Sick Leave */}
          <div className="flex-1 bg-[#FFF9E8] border border-[#F3D395] p-5 rounded-xl flex flex-col items-center">
            <span className="text-[16px] font-semibold text-center mb-1 font-gilroy">
              Sick Leave
            </span>
            <span className="text-[26px] font-extrabold text-center mb-1 font-gilroy">
              {loadingBalance ? "--" : balance?.sick_remaining}
            </span>
            <span className="text-[14px] text-[#777] text-center font-gilroy">
              Remaining
            </span>
          </div>

          {/* Casual Leave */}
          <div className="flex-1 bg-[#F6F1FF] border border-[#C6B7F2] p-5 rounded-xl flex flex-col items-center">
            <span className="text-[16px] font-semibold text-center mb-1 font-gilroy">
              Casual Leave
            </span>
            <span className="text-[26px] font-extrabold text-center mb-1 font-gilroy">
              {loadingBalance ? "--" : balance?.casual_remaining}
            </span>
            <span className="text-[14px] text-[#777] text-center font-gilroy">
              Remaining
            </span>
          </div>
        </div>

        {/* DETAILS LIST */}
        <div className="space-y-5 mb-10">
          <div>
            <h3 className="text-[16px] font-semibold text-black mb-1 font-gilroy">
              Employee Name
            </h3>
            <p className="text-[17px] text-black font-gilroy">
              {leave.user_name}
            </p>
          </div>

          <div>
            <h3 className="text-[16px] font-semibold text-black mb-1 font-gilroy">
              Leave Type
            </h3>
            <p className="text-[17px] text-black font-gilroy">
              {leave.leave_type}
            </p>
          </div>

          <div>
            <h3 className="text-[16px] font-semibold text-black mb-1 font-gilroy">
              Reason for Leave
            </h3>
            <p className="text-[17px] text-black font-gilroy">{leave.reason}</p>
          </div>

          <div>
            <h3 className="text-[16px] font-semibold text-black mb-1 font-gilroy">
              Leave Date
            </h3>
            <p className="text-[17px] text-black font-gilroy">
              {formatDate(leave.from_date)} 
              <span className="text-gray-400 mx-1">→</span>{" "}
              {formatDate(leave.to_date)} 
            </p>
          </div>

          <div>
            <h3 className="text-[16px] font-semibold text-black mb-1 font-gilroy">
              Total Days
            </h3>
            <p className="text-[17px] text-black font-gilroy">{leave.days}</p>
          </div>

          <div>
            <h3 className="text-[16px] font-semibold text-black mb-2 font-gilroy">
              Reject Comment
            </h3>
            <textarea
              placeholder="Enter reason if rejecting..."
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              className="w-full border border-[#CFCFCF] rounded-xl p-3.5 text-[16px] font-gilroy outline-none focus:border-primary resize-none min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* FIXED FOOTER ACTIONS */}
      <div className="bg-white p-4 border-t border-gray-100 shrink-0">
        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            disabled={isPending}
            className="flex-1 bg-[#2E8B57] text-white py-3.5 rounded-xl text-[18px] font-semibold font-gilroy hover:opacity-90 disabled:opacity-70 transition-opacity"
          >
            {isPending ? "Processing..." : "Approve"}
          </button>

          <button
            onClick={handleReject}
            disabled={isPending}
            className="flex-1 bg-[#D94343] text-white py-3.5 rounded-xl text-[18px] font-semibold font-gilroy hover:opacity-90 disabled:opacity-70 transition-opacity"
          >
            {isPending ? "Processing..." : "Reject"}
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
