import { useTeamLeaveHistory } from "@/hooks/useMentorLeave";
import { cn, formatDate, getLeaveStatusBadgeStyles } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";

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
          <div className="flex justify-center mt-10">
            <Loader2 className="animate-spin text-[#592AC7]" size={32} />
          </div>
        ) : leaves?.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 font-gilroy">
            No leave history found.
          </div>
        ) : (
          <div className="space-y-4.5">
            {leaves?.map((item) => {
              const statusStyle = getLeaveStatusBadgeStyles(item.status); // ✅ Uses Utils

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
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[12px] font-bold font-gilroy",
                        `bg-[${statusStyle.bg}]`,
                        `text-[${statusStyle.color}]`,
                      )}
                    >
                      {item.status}
                    </span>
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
