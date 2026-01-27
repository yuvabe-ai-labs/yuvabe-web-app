import MobileLayout from "@/components/layout/MobileLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTeamLeaveHistory } from "@/hooks/useMentorLeave";
import { formatDate, getLeaveStatusBadgeStyles } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, CloudOff, Loader2 } from "lucide-react";

export default function TeamLeaveHistoryScreen() {
  const navigate = useNavigate();
  const { data: leaves, isLoading } = useTeamLeaveHistory();

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
          <h1 className="text-[18px] font-bold text-black font-gilroy">
            Team Leave History
          </h1>
        </div>
      </div>

      {/* CONTENT LIST */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <Loader2 className="animate-spin text-[#592AC7] mb-2" size={32} />
            <p className="text-gray-500 font-gilroy">Loading history...</p>
          </div>
        ) : !leaves || leaves.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <CloudOff
              size={60}
              className="text-gray-400 mb-2"
              strokeWidth={2}
            />
            <div className="text-center text-gray-500 text-[16px] font-gilroy">
              No leave history found.
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {leaves.map((item) => {
              const statusStyle = getLeaveStatusBadgeStyles(item.status);

              return (
                <Card
                  key={item.id}
                  onClick={() =>
                    navigate({
                      to: "/team-leave-history/$leaveId",
                      params: { leaveId: item.id },
                    })
                  }
                  // Using your specific border color and width
                  className="border-[1.4px] border-[#592AC7] cursor-pointer hover:bg-gray-50 transition-colors shadow-sm rounded-[14px]"
                >
                  <CardContent className="p-4">
                    {/* Header Row: Name & Badge */}
                    <div className="flex flex-row justify-between items-center mb-1.5">
                      <span className="text-[16px] font-bold text-black font-gilroy">
                        {item.user_name}
                      </span>
                      {/* Using Shadcn Badge but injecting your custom colors via style.
                          We disable the default hover opacity slightly to keep text readable.
                       */}
                      <Badge
                        className="px-3 py-1 rounded-full text-[12px] font-bold font-gilroy border-none shadow-none hover:opacity-90 transition-opacity"
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      >
                        {item.status}
                      </Badge>
                    </div>

                    {/* Details */}
                    <p className="text-[15px] font-bold text-black font-gilroy mt-1">
                      Leave Type:{" "}
                      <span className="font-normal font-gilroy capitalize">
                        {item.leave_type} leave
                      </span>
                    </p>

                    <p className="mt-2.5 text-[15px] text-black font-gilroy">
                      {formatDate(item.from_date)} → {formatDate(item.to_date)}
                    </p>

                    <p className="mt-1.5 text-[15px] text-black font-gilroy">
                      Number of Days: {item.days}
                    </p>

                    <p className="mt-3 text-[13px] text-[#8A8A8A] font-gilroy">
                      Updated on:{" "}
                      {formatDate(
                        item.updated_at ? item.updated_at.slice(0, 10) : "",
                      )}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
