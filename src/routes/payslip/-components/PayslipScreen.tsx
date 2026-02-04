import { SplashScreen } from "@/components/layout/SplashScreen";
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
import { ChevronLeft, Loader2, RefreshCw } from "lucide-react";
import { PayslipSkeleton } from "./PayslipSkeleton";
import { usePayslipLogic } from "./usePaslipLogic";

export default function PayslipScreen() {
  const { state, actions, form } = usePayslipLogic();

  if (state.isLoading) return <PayslipSkeleton />;

  if (state.isError) {
    return (
      <div className="flex flex-col items-center p-6">
        <SplashScreen />
        <Button onClick={() => actions.refetch()} className="mt-4 bg-[#592AC7]">
          <RefreshCw className="mr-2 h-4 w-4" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 sticky top-0 z-10 bg-white">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => actions.navigate({ to: "/" })}
        >
          <ChevronLeft size={28} />
        </Button>
        <h1 className="flex-1 text-center pr-7 text-[18px] font-bold text-[#475569]">
          Request Payslip
        </h1>
      </div>

      <div className="flex-1  px-4 pb-32">
        <h2 className="text-[18px] font-bold text-[#1F2937] mt-2 mb-3">
          Choose Duration
        </h2>

        {/* PRESET CARDS */}
        <div className="space-y-3">
          {(["3_months", "6_months"] as const).map((opt) => {
            const isActive = state.currentMode === opt;
            return (
              <Card
                key={opt}
                onClick={() =>
                  form.setValue("mode", opt, { shouldValidate: true })
                }
                className={cn(
                  "cursor-pointer border-[1.5px] transition-all",
                  isActive
                    ? "bg-[#F3E8FF] border-[#5B21B6]"
                    : "bg-white border-[#E5E7EB]",
                )}
              >
                <CardContent className="p-4">
                  <p
                    className={cn(
                      "text-[15px] font-bold",
                      isActive ? "text-[#5B21B6]" : "text-[#1F2937]",
                    )}
                  >
                    {opt === "3_months" ? "Last 3 Months" : "Last 6 Months"}
                  </p>
                  <p className="text-[12px] text-[#6B7280]">
                    {actions.getPresetDateRange(opt)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex items-center my-8 text-[#6B7280]">
          <div className="flex-1 h-px bg-[#E5E7EB]" />
          <span className="mx-3 text-sm">or</span>
          <div className="flex-1 h-px bg-[#E5E7EB]" />
        </div>

        {/* CUSTOM DATE SECTION */}
        <h2 className="text-[16px] font-bold text-[#1F2937] mb-3">
          Choose custom date
        </h2>
        <div className="flex gap-3.5">
          <div className="flex-1">
            <Label className="text-[13px] text-[#6B7280]">From</Label>
            <Input
              type="month"
              {...form.register("start_month", {
                onChange: () => form.setValue("mode", "manual"),
              })}
              className={cn(
                state.currentMode === "manual" &&
                  "border-[#5B21B6] ring-1 ring-[#5B21B6]",
              )}
            />
          </div>
          <div className="flex-1">
            <Label className="text-[13px] text-[#6B7280]">To</Label>
            <Input
              type="month"
              {...form.register("end_month", {
                onChange: () => form.setValue("mode", "manual"),
              })}
              className={cn(
                state.currentMode === "manual" &&
                  "border-[#5B21B6] ring-1 ring-[#5B21B6]",
              )}
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className=" bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button
          onClick={actions.handleRequest}
          disabled={state.requesting}
          className="w-full py-6 bg-[#592AC7] hover:bg-[#592AC7]/90 rounded-xl"
        >
          {state.requesting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Request Payslip"
          )}
        </Button>
      </div>

      {/* GMAIL SHEET */}
      <Sheet
        open={state.showGmailSheet}
        onOpenChange={actions.setShowGmailSheet}
      >
        <SheetContent side="bottom" className="rounded-t-[20px]">
          <SheetHeader className="text-left mb-6">
            <SheetTitle>Connect Gmail Account</SheetTitle>
            <SheetDescription>
              To request payslips, we need to connect your Gmail account
              securely.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-3">
            <Button
              onClick={actions.handleConnectGmail}
              disabled={state.connectingGmail}
              className="w-full py-6 bg-[#5B21B6]"
            >
              {state.connectingGmail ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Connect Gmail"
              )}
            </Button>
            <Button
              variant="secondary"
              onClick={() => actions.setShowGmailSheet(false)}
              className="w-full py-6"
            >
              Cancel
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
