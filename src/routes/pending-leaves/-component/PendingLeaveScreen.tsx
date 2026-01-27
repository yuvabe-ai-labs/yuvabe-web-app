import MobileLayout from "@/components/layout/MobileLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePendingLeaves } from "@/hooks/useMentorLeave";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, CloudOff, Loader2 } from "lucide-react";

export default function PendingLeavesScreen() {
  const navigate = useNavigate();
  const { data: leaves, isLoading } = usePendingLeaves();

  // Helper Functions
  const formatLeaveType = (leaveType: string): string => {
    if (!leaveType) return "";
    const type = leaveType.trim().toLowerCase();
    if (type === "sick") return "Sick Leave";
    if (type === "casual") return "Casual Leave";
    return leaveType;
  };

  const badgeColor = (leaveType: string): string => {
    if (!leaveType) return "#6C757D";
    const type = leaveType.trim().toLowerCase();
    if (type === "sick") return "#C89C00"; // yellow
    if (type === "casual") return "#005DBD"; // blue
    return "#6C757D";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <MobileLayout className="bg-white flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/" })}
          className="-ml-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={28} className="text-black" />
        </Button>

        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-semibold text-black font-gilroy">
            Pending Leave Requests
          </h1>
        </div>
      </div>

      {/* CONTENT LIST */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <Loader2 className="animate-spin text-gray-400 mb-2" size={32} />
            <p className="text-gray-500 font-gilroy">
              Loading pending leaves...
            </p>
          </div>
        ) : !leaves || leaves.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <CloudOff
              size={60}
              className="text-gray-400 mb-2"
              strokeWidth={2}
            />
            <p className="text-[16px] text-gray-500 font-gilroy">
              No pending requests
            </p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {leaves.map((item) => (
              <Card
                key={item.id}
                onClick={() =>
                  navigate({
                    to: "/mentor-approval/$leaveId",
                    params: { leaveId: item.id },
                  })
                }
                // Applied your specific border color and width here
                className="border-[1.6px] border-[#C9A0FF] cursor-pointer active:scale-[0.98] transition-transform shadow-sm overflow-hidden"
              >
                <CardContent className="p-[18px]">
                  {/* TOP ROW */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-[17px] text-[#2C3E50] font-gilroy">
                      {item.user_name}
                    </h3>

                    {/* LEAVE TYPE BADGE */}
                    <Badge
                      className="px-3 py-1 rounded-[20px] text-[12px] font-semibold font-gilroy capitalize text-white hover:opacity-90 transition-opacity border-none shadow-none"
                      style={{ backgroundColor: badgeColor(item.leave_type) }}
                    >
                      {formatLeaveType(item.leave_type)}
                    </Badge>
                  </div>

                  {/* DATE RANGE */}
                  <div className="mt-3">
                    <p className="text-[14px] text-[#333] font-gilroy">
                      {formatDate(item.from_date)} ➜ {formatDate(item.to_date)}
                    </p>
                  </div>

                  {/* NUMBER OF DAYS */}
                  <div className="mt-3">
                    <p className="text-[14px] text-[#333] font-gilroy">
                      Number of Days: {item.days || 0}
                    </p>
                  </div>

                  {/* REQUEST SENT DATE */}
                  <div className="mt-1.5">
                    <p className="text-[12px] text-gray-500 font-gilroy">
                      Request sent:{" "}
                      {formatDate(item.requested_at?.slice(0, 10))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
