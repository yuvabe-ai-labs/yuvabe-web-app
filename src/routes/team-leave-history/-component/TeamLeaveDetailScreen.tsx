import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLeaveDetails } from "@/hooks/useMentorLeave";
import { formatDate, getStatusTextColor } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function TeamLeaveDetailScreen() {
  const navigate = useNavigate();
  const { leaveId } = useParams({ from: "/team-leave-history/$leaveId" });
  const { data: leave, isLoading } = useLeaveDetails(leaveId);

  if (isLoading) {
    return (
      <MobileLayout className="bg-white flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-[#592AC7]" size={40} />
      </MobileLayout>
    );
  }

  if (!leave) {
    return (
      <MobileLayout className="bg-white flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 font-gilroy text-lg">Leave not found</p>
        <Button
          variant="link"
          onClick={() => navigate({ to: ".." })}
          className="mt-2 text-[#592AC7] font-bold text-[16px]"
        >
          Go Back
        </Button>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="bg-white flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0 border-gray-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: ".." })}
          className="-ml-2 hover:bg-gray-100 rounded-full h-10 w-10"
        >
          <ChevronLeft size={28} className="text-black" />
        </Button>
        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-bold text-[#000] font-gilroy">
            Leave Details
          </h1>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
        {/* We use Shadcn Card here, applying your specific bg and border colors via className */}
        <Card className="bg-[#F5F5F5] border-[#592AC7] rounded-[15px] shadow-sm">
          <CardContent className="p-5 space-y-5">
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
            <div>
              <h3 className="text-[16px] font-bold text-black font-gilroy">
                Leave Type
              </h3>
              <p className="text-[18px] mt-1 text-black font-gilroy font-normal capitalize">
                {leave.leave_type}
              </p>
            </div>

            {/* REASON */}
            <div>
              <h3 className="text-[16px] font-bold text-black font-gilroy">
                Reason for Leave
              </h3>
              <p className="text-[18px] mt-1 text-black font-gilroy font-normal break-words">
                {leave.reason}
              </p>
            </div>

            {/* DATES */}
            <div>
              <h3 className="text-[16px] font-bold text-black font-gilroy">
                From → To
              </h3>
              <p className="text-[18px] mt-1 text-black font-gilroy font-normal">
                {formatDate(leave.from_date)} ➜ {formatDate(leave.to_date)}
              </p>
            </div>

            {/* TOTAL DAYS */}
            <div>
              <h3 className="text-[16px] font-bold text-black font-gilroy">
                Total Days
              </h3>
              <p className="text-[18px] mt-1 text-black font-gilroy font-normal">
                {leave.days}
              </p>
            </div>

            {/* STATUS */}
            <div>
              <h3 className="text-[16px] font-bold text-black font-gilroy">
                Status
              </h3>
              <p
                className={`text-[18px] mt-1 font-gilroy font-bold ${getStatusTextColor(
                  leave.status,
                )}`}
              >
                {leave.status}
              </p>
            </div>

            {/* UPDATED AT */}
            <div>
              <h3 className="text-[16px] font-bold text-black font-gilroy">
                Updated At
              </h3>
              <p className="text-[14px] mt-1 text-black font-gilroy font-normal">
                {formatDate(
                  leave.updated_at ? leave.updated_at.slice(0, 10) : "",
                )}
              </p>
            </div>

            {/* REJECT REASON (Conditional) */}
            {leave.reject_reason && (
              <div>
                <h3 className="text-[16px] font-bold text-black font-gilroy">
                  Reject Reason
                </h3>
                <p className="text-[18px] mt-1 text-red-600 font-gilroy font-normal">
                  {leave.reject_reason}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
