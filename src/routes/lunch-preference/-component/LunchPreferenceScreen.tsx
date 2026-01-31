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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useLunchPreferenceLogic } from "./useLunchPreferenceLogic";

export default function LunchPreferenceScreen() {
  const { state, actions } = useLunchPreferenceLogic();

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => actions.navigate({ to: "/" })}
          className="-ml-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={28} className="text-black" />
        </Button>
        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-bold text-[#374151] font-gilroy">
            Lunch Preference
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <p className="text-[16px] text-[#374151] mb-6 leading-6 font-gilroy mt-2">
          Planning a leave or working remotely?
          <br />
          Make sure to opt out of lunch — let’s reduce food waste 🌱
        </p>

        {/* Tomorrow Option Card */}
        <Card
          onClick={actions.handleTomorrowSelect}
          className={cn(
            "cursor-pointer transition-all border shadow-sm mb-6 ",
            state.selectedMode === "tomorrow"
              ? "bg-[#F3E8FF] border-[#5B21B6]"
              : "bg-white border-[#E5E7EB] hover:border-gray-300",
          )}
        >
          <CardContent className="p-4 flex items-center">
            <span
              className={cn(
                "font-semibold text-[16px] font-gilroy",
                state.selectedMode === "tomorrow"
                  ? "text-[#5B21B6]"
                  : "text-[#374151]",
              )}
            >
              I don’t want lunch tomorrow
            </span>
          </CardContent>
        </Card>

        {/* Range Options */}
        <Label className="text-[14px] text-[#6B7280] mb-2 font-gilroy block">
          I don’t want lunch from
        </Label>

        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              type="date"
              placeholder="Start Date"
              value={state.startDate}
              onChange={(e) => {
                actions.setSelectedMode("range");
                actions.setStartDate(e.target.value);
              }}
              className="h-12 px-3 text-[15px] font-gilroy text-[#111827] uppercase focus-visible:ring-[#5B21B6]"
            />
          </div>

          <div className="flex-1">
            <Input
              type="date"
              placeholder="End Date"
              value={state.endDate}
              min={state.startDate}
              onChange={(e) => {
                actions.setSelectedMode("range");
                actions.setEndDate(e.target.value);
              }}
              className="h-12 px-3 text-[15px] font-gilroy text-[#111827] uppercase focus-visible:ring-[#5B21B6]"
            />
          </div>
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E7EB]">
        <Button
          onClick={() => actions.setShowConfirmDialog(true)}
          disabled={!state.isRangeValid || state.submitting}
          className={cn(
            "w-full py-6 rounded-xl text-[16px] font-semibold font-gilroy transition-all",
            !state.isRangeValid || state.submitting
              ? "bg-[#D1D5DB] hover:bg-[#D1D5DB] cursor-not-allowed"
              : "bg-[#592AC7] hover:bg-[#592AC7]/90 text-white",
          )}
        >
          {state.submitting ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            "Send"
          )}
        </Button>
      </div>

      {/* CONFIRMATION DIALOG */}
      <AlertDialog
        open={state.showConfirmDialog}
        onOpenChange={actions.setShowConfirmDialog}
      >
        <AlertDialogContent className="w-[90%] rounded-xl font-gilroy">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Confirm Lunch Opt-Out
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-[15px] text-[#374151]">
              {actions.getConfirmText()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-3 sm:gap-3">
            <AlertDialogCancel className="flex-1 mt-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                actions.setShowConfirmDialog(false);
                actions.handleSubmit();
              }}
              disabled={state.submitting}
              className="flex-1 bg-[#592AC7] hover:bg-[#592AC7]/90 text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* GMAIL SHEET */}
      <Sheet
        open={state.showGmailSheet}
        onOpenChange={actions.setShowGmailSheet}
      >
        <SheetContent side="bottom" className="rounded-t-[20px] pb-8">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-[18px] font-bold text-[#1F2937] font-gilroy">
              Connect Gmail Account
            </SheetTitle>
            <SheetDescription className="text-[14px] text-[#6B7280] font-gilroy">
              To notify the lunch manager, we need to connect your Gmail
              account.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-3">
            <Button
              onClick={actions.handleConnectGmail}
              disabled={state.connectingGmail}
              className="w-full py-6 rounded-[10px] bg-[#5B21B6] hover:bg-[#5B21B6]/90 text-[15px] font-gilroy"
            >
              {state.connectingGmail ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Connect Gmail"
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                actions.setShowGmailSheet(false);
              }}
              className="w-full py-6 rounded-[10px] bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200 text-[15px] font-gilroy"
            >
              Cancel
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
