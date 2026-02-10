import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCancelLeave, useMyLeaveHistory } from "@/hooks/useLeave";
import { cn, formatDate } from "@/lib/utils";
import type { LeaveHistoryDTO } from "@/types/leave.types";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, CloudOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { LeaveHistorySkeleton } from "./LeaveHistorySkeleton";

export default function LeaveHistoryScreen() {
  const navigate = useNavigate();
  const { data: leaves, isLoading } = useMyLeaveHistory();
  const { mutate: cancelLeave, isPending: isCancelling } = useCancelLeave();

  // State handles the selected leave for the dialog
  const [selectedLeave, setSelectedLeave] = useState<LeaveHistoryDTO | null>(
    null,
  );

  const confirmCancel = () => {
    if (selectedLeave) {
      cancelLeave(selectedLeave.id);
      setSelectedLeave(null);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
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
          <LeaveHistorySkeleton />
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
                <Card
                  key={item.id}
                  onClick={() =>
                    navigate({
                      to: "/leave-details/$leaveId",
                      params: { leaveId: item.id },
                    })
                  }
                  // Applied your custom purple border here
                  className="border-[#592AC7] shadow-sm mb-4 cursor-pointer active:scale-[0.98] transition-transform overflow-hidden rounded-[14px]"
                >
                  <CardContent className="p-4.5">
                    {/* TITLE + STATUS */}
                    <div className="flex justify-between items-center mb-2.5">
                      <h3 className="text-[17px] font-bold text-black font-gilroy">
                        {item.leave_type} Leave
                      </h3>
                      {/* Using Badge with dynamic color injection */}
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
                      Reviewed by: {item.mentor_name || "—"}
                    </p>

                    {/* UPDATED ON */}
                    <p className="mt-3 text-[13px] text-[#8A8A8A] font-gilroy">
                      Updated on: {formatDate(item.updated_at)}
                    </p>

                    {/* CANCEL BUTTON */}
                    {canCancel && (
                      <div className="flex justify-end mt-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            setSelectedLeave(item);
                          }}
                          className="bg-[#E53935] hover:bg-red-700 text-[13px] font-bold px-4.5 h-8 rounded-[20px]"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* CONFIRMATION DIALOG (Replaces custom Modal) */}
      <AlertDialog
        open={!!selectedLeave}
        onOpenChange={(open) => {
          if (!open) setSelectedLeave(null);
        }}
      >
        <AlertDialogContent className="w-[90%] rounded-xl font-gilroy">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Leave</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this leave request? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault(); // Prevent auto-close to handle loading state
                confirmCancel();
              }}
              disabled={isCancelling}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Yes, Cancel"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
