import { Badge } from "@/components/ui/badge";
import { useTeamLeaveHistory } from "@/hooks/useLeave";
import { cn, formatDate } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { TeamLeaveHistorySkeleton } from "./TeamLeaveHistorySkeleton";

export default function TeamLeaveHistoryScreen() {
  const navigate = useNavigate();
  const { data: leaves, isLoading } = useTeamLeaveHistory();

  return (
    <>
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0 border-gray-100">
        <button
          onClick={() => navigate({ to: ".." })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>
        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-bold text-black font-gilroy">
            Team Leave History
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {isLoading ? (
          <TeamLeaveHistorySkeleton />
        ) : leaves?.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 font-gilroy">
            No leave history found.
          </div>
        ) : (
          <div className="space-y-4.5">
            {leaves?.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate({
                      to: "/team-leave-history/$leaveId",
                      params: { leaveId: item.id },
                    })
                  }
                  className="bg-white p-4 rounded-[14px] border-[1.4px] border-[#592AC7] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-row justify-between items-center mb-1.5">
                    <span className="text-[16px] font-bold text-black font-gilroy">
                      {item.user_name}
                    </span>
                    <Badge
                      className={cn(
                        "px-3.5 py-1 rounded-[20px] text-[13px] font-semibold font-gilroy text-white hover:opacity-90 border-none shadow-none",
                        {
                          "bg-[#4CAF50]": item.status === "Approved",
                          "bg-[#FFA000]": item.status === "Pending",
                          "bg-[#3F1ABF]": item.status === "Cancelled",
                          "bg-[#FF3B30]": item.status === "Rejected",
                          "bg-[#999999]": ![
                            "Approved",
                            "Pending",
                            "Cancelled",
                            "Rejected",
                          ].includes(item.status),
                        },
                      )}
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <p className="text-[15px] font-bold text-black font-gilroy mt-1">
                    Leave Type:{" "}
                    <span className="font-normal font-gilroy">
                      {item.leave_type} leave
                    </span>
                  </p>

                  <p className="mt-2.5 text-[15px] text-black font-gilroy">
                    {formatDate(item.from_date)} → {formatDate(item.to_date)}{" "}
                    {/* ✅ Uses Utils */}
                  </p>

                  <p className="mt-1.5 text-[15px] text-black font-gilroy">
                    Number of Days: {item.days}
                  </p>

                  <p className="mt-3 text-[13px] text-[#8A8A8A] font-gilroy">
                    Updated on:{" "}
                    {formatDate(
                      item.updated_at ? item.updated_at.slice(0, 10) : "",
                    )}{" "}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
