import MobileLayout from "@/components/layout/MobileLayout";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { useCancelLeave, useMyLeaveHistory } from "@/hooks/useLeaveHistory";
import { formatDate } from "@/lib/utils";
import type { LeaveHistoryDTO } from "@/types/leave.types";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, CloudOff } from "lucide-react";
import { useState } from "react";

export default function LeaveHistoryScreen() {
  const navigate = useNavigate();
  const { data: leaves, isLoading } = useMyLeaveHistory();
  const { mutate: cancelLeave, isPending: isCancelling } = useCancelLeave();

  // State for the custom alert/modal
  const [selectedLeave, setSelectedLeave] = useState<LeaveHistoryDTO | null>(
    null
  );

  const handleCancelClick = (e: React.MouseEvent, leave: LeaveHistoryDTO) => {
    e.stopPropagation(); // Prevent card click
    setSelectedLeave(leave);
  };

  const confirmCancel = () => {
    if (selectedLeave) {
      cancelLeave(selectedLeave.id);
      setSelectedLeave(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "#4CAF50"; // Green
      case "Pending":
        return "#FFA000"; // Amber
      case "Cancelled":
        return "#3F1ABF"; // Purple
      case "Rejected":
        return "#FF3B30"; // Red
      default:
        return "#999999";
    }
  };

  return (
    <MobileLayout className="bg-white flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>

        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-semibold text-black font-gilroy">
            Leave History
          </h1>
        </div>
      </div>

      {/* LIST CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <SplashScreen />
          </div>
        ) : !leaves || leaves.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <CloudOff
              size={60}
              className="text-gray-400 mb-2"
              strokeWidth={2}
            />
            <p className="text-[16px] text-gray-500 font-gilroy">
              No leave history found
            </p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {leaves.map((item) => {
              const leaveDate = new Date(item.from_date);
              const today = new Date();
              // Can cancel if Approved/Pending AND date is in future
              const canCancel =
                (item.status === "Approved" || item.status === "Pending") &&
                leaveDate > today;

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate({
                      to: "/leave-details/$leaveId",
                      params: { leaveId: item.id },
                    })
                  }
                  className="bg-white p-[18px] rounded-[14px] border border-[#592AC7] shadow-sm mb-4 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  {/* TITLE + STATUS */}
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="text-[17px] font-bold text-black font-gilroy">
                      {item.leave_type} Leave
                    </h3>
                    <div
                      style={{ backgroundColor: getStatusColor(item.status) }}
                      className="px-3.5 py-1 rounded-[20px]"
                    >
                      <span className="text-white text-[13px] font-semibold font-gilroy">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* DATES */}
                  <p className="mt-2.5 text-[14px] text-black font-gilroy">
                    {formatDate(item.from_date)} → {formatDate(item.to_date)}
                  </p>

                  {/* DAYS */}
                  <p className="mt-2.5 text-[14px] text-black font-gilroy">
                    Number of Days: {item.days}
                  </p>

                  {/* APPROVED BY */}
                  <p className="mt-2.5 text-[14px] text-black font-gilroy">
                    Approved by: {item.mentor_name || "—"}
                  </p>

                  {/* UPDATED ON */}
                  <p className="mt-3 text-[13px] text-[#8A8A8A] font-gilroy">
                    Updated on: {formatDate(item.updated_at)}
                  </p>

                  {/* CANCEL BUTTON */}
                  {canCancel && (
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={(e) => handleCancelClick(e, item)}
                        className="bg-[#E53935] text-white text-[13px] font-bold px-[18px] py-[7px] rounded-[20px] hover:bg-red-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      {selectedLeave && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-[320px] rounded-xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-[18px] font-bold text-black mb-2 font-gilroy">
              Cancel Leave
            </h3>
            <p className="text-[15px] text-gray-600 mb-6 font-gilroy">
              Are you sure you want to cancel this leave request?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setSelectedLeave(null)}
                className="px-4 py-2 text-[15px] font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-gilroy"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                disabled={isCancelling}
                className="px-4 py-2 text-[15px] font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-gilroy disabled:opacity-70"
              >
                {isCancelling ? "Cancelling..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
}
