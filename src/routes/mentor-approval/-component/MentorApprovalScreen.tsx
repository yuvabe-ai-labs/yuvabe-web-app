import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  useLeaveDetails,
  useMentorDecision,
  useUserLeaveBalance,
} from "@/hooks/useLeave";
import { formatDate } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MentorApprovalSkeleton } from "./MentorScreenSkeleton";

export default function MentorApprovalScreen() {
  const navigate = useNavigate();
  const { leaveId } = useParams({ from: "/mentor-approval/$leaveId" });

  const [rejectComment, setRejectComment] = useState("");

  // 1. Fetch Leave Details
  const {
    data: leave,
    isLoading: loadingDetails,
    isError: isLeaveError,
  } = useLeaveDetails(leaveId);

  // 2. Fetch User Balance (only runs when leave data is available)
  const { data: balance, isLoading: loadingBalance } = useUserLeaveBalance(
    leave?.user_id || "",
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

  if (isLeaveError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 font-gilroy">Invalid leave request</p>
        <button
          onClick={() => navigate({ to: "/pending-leaves" })}
          className="mt-4 text-blue-600 font-semibold"
        >
          Go back
        </button>
      </div>
    );
  }

  if (loadingDetails) {
    return <MentorApprovalSkeleton />;
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/pending-leaves" })}
          className="-ml-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={28} className="text-black" />
        </Button>

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
          {/* Sick Leave Card */}
          <Card className="flex-1 bg-[#FFF9E8] border-[#F3D395] shadow-none rounded-xl">
            <CardContent className="p-5 flex flex-col items-center">
              <span className="text-[16px] font-semibold text-center mb-1 font-gilroy text-black">
                Sick Leave
              </span>
              <span className="text-[26px] font-extrabold text-center mb-1 font-gilroy text-black">
                {loadingBalance ? "--" : balance?.sick_remaining}
              </span>
              <span className="text-[14px] text-[#777] text-center font-gilroy">
                Remaining
              </span>
            </CardContent>
          </Card>

          {/* Casual Leave Card */}
          <Card className="flex-1 bg-[#F6F1FF] border-[#C6B7F2] shadow-none rounded-xl">
            <CardContent className="p-5 flex flex-col items-center">
              <span className="text-[16px] font-semibold text-center mb-1 font-gilroy text-black">
                Casual Leave
              </span>
              <span className="text-[26px] font-extrabold text-center mb-1 font-gilroy text-black">
                {loadingBalance ? "--" : balance?.casual_remaining}
              </span>
              <span className="text-[14px] text-[#777] text-center font-gilroy">
                Remaining
              </span>
            </CardContent>
          </Card>
        </div>

        {/* DETAILS LIST */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Employee Name
            </h3>
            <p className="text-[17px] text-black/80 font-gilroy">
              {leave?.user_name}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Leave Type
            </h3>
            <p className="text-[17px] text-black/80 font-gilroy">
              {leave?.leave_type}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Reason for Leave
            </h3>
            <p className="text-[17px] text-black/80 font-gilroy">
              {leave?.reason}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Leave Date
            </h3>
            <p className="text-[17px] text-black/80 font-gilroy">
              {formatDate(leave?.from_date)}{" "}
              <span className="text-gray-400 mx-1">→</span>{" "}
              {formatDate(leave?.to_date)}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Total Days
            </h3>
            <p className="text-[17px] text-black/80 font-gilroy">
              {leave?.days}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[16px] font-semibold text-black font-gilroy">
              Reject Comment
            </h3>
            <Textarea
              placeholder="Enter reason if rejecting..."
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              className="w-full border-[#CFCFCF] bg-white rounded-xl p-3.5 text-[16px] font-gilroy focus-visible:ring-1 focus-visible:ring-primary min-h-25 resize-none"
            />
          </div>
        </div>
      </div>

      {/* FIXED FOOTER ACTIONS */}
      <div className="bg-white p-4 border-t border-gray-100 shrink-0">
        <div className="flex gap-3">
          <Button
            onClick={handleApprove}
            disabled={isPending}
            className="flex-1 bg-[#2E8B57] hover:bg-[#2E8B57]/90 text-white h-auto py-3.5 rounded-xl text-[18px] font-semibold font-gilroy transition-all"
          >
            {isPending ? <Loader2 className="animate-spin mr-2" /> : "Approve"}
          </Button>

          <Button
            onClick={handleReject}
            disabled={isPending}
            variant="destructive"
            className="flex-1 bg-[#D94343] hover:bg-[#D94343]/90 text-white h-auto py-3.5 rounded-xl text-[18px] font-semibold font-gilroy transition-all"
          >
            {isPending ? <Loader2 className="animate-spin mr-2" /> : "Reject"}
          </Button>
        </div>
      </div>
    </>
  );
}
