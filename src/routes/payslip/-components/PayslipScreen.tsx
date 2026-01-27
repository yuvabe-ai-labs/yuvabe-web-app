import MobileLayout from "@/components/layout/MobileLayout";
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
import type { PresetType } from "@/types/payslip.types";
import { ChevronLeft, Loader2, RefreshCw } from "lucide-react";
import { usePayslipLogic } from "./usePaslipLogic";

export default function PayslipScreen() {
  const { state, actions } = usePayslipLogic();

  if (state.isLoading) {
    return (
      <MobileLayout className="bg-white flex items-center justify-center h-full">
        <SplashScreen />
      </MobileLayout>
    );
  }

  if (state.isError || !state.user?.id) {
    return (
      <MobileLayout className="bg-white flex flex-col items-center justify-center h-full p-6">
        <SplashScreen />
        <Button
          onClick={() => {
            actions.refetch();
            window.location.reload();
          }}
          className="mt-4 bg-[#592AC7] hover:bg-[#592AC7]/90"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Retry
        </Button>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="bg-white flex flex-col h-full relative">
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
          <h1 className="text-[18px] font-bold text-[#475569] font-gilroy">
            Request Payslip
          </h1>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* PRESET SECTION */}
        <h2 className="text-[18px] font-bold text-[#1F2937] mt-2 mb-3 font-gilroy">
          Choose Duration
        </h2>
        <div className="space-y-3">
          {(["3_months", "6_months"] as PresetType[]).map((opt) => {
            const isActive =
              state.presetMode === opt && state.mode === "preset";

            return (
              <Card
                key={opt}
                onClick={() => {
                  actions.setMode("preset");
                  actions.setPresetMode(opt);
                  actions.setFromMonth("");
                  actions.setToMonth("");
                }}
                className={`cursor-pointer transition-all border-[1.5px] shadow-sm ${
                  isActive
                    ? "bg-[#F3E8FF] border-[#5B21B6]"
                    : "bg-white border-[#E5E7EB] hover:border-gray-300"
                }`}
              >
                <CardContent className="p-4">
                  <p
                    className={`text-[15px] font-bold font-gilroy ${
                      isActive ? "text-[#5B21B6]" : "text-[#1F2937]"
                    }`}
                  >
                    {opt === "3_months" ? "Last 3 Months" : "Last 6 Months"}
                  </p>
                  <p className="text-[12px] text-[#6B7280] mt-1 font-gilroy font-medium">
                    {actions.getPresetDateRange(opt)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* SEPARATOR */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-[#E5E7EB]"></div>
          <span className="mx-3 text-[14px] text-[#6B7280] font-medium font-gilroy">
            or
          </span>
          <div className="flex-1 h-px bg-[#E5E7EB]"></div>
        </div>

        {/* CUSTOM DATE SECTION */}
        <h2 className="text-[16px] font-bold text-[#1F2937] mb-3 font-gilroy">
          Choose custom date
        </h2>
        <div className="flex gap-3.5">
          <div className="flex-1">
            <Label className="block text-[13px] font-semibold text-[#6B7280] mb-1.5 font-gilroy">
              From
            </Label>
            <Input
              type="month"
              value={state.fromMonth}
              onChange={(e) => {
                actions.setMode("manual");
                actions.setFromMonth(e.target.value);
              }}
              className={`h-11 px-3 rounded-xl text-[15px] font-gilroy transition-colors ${
                state.mode === "manual" && state.fromMonth
                  ? "border-[#5B21B6] ring-1 ring-[#5B21B6]"
                  : "border-[#E5E7EB]"
              }`}
            />
          </div>
          <div className="flex-1">
            <Label className="block text-[13px] font-semibold text-[#6B7280] mb-1.5 font-gilroy">
              To
            </Label>
            <Input
              type="month"
              value={state.toMonth}
              onChange={(e) => {
                actions.setMode("manual");
                actions.setToMonth(e.target.value);
              }}
              className={`h-11 px-3 rounded-xl text-[15px] font-gilroy transition-colors ${
                state.mode === "manual" && state.toMonth
                  ? "border-[#5B21B6] ring-1 ring-[#5B21B6]"
                  : "border-[#E5E7EB]"
              }`}
            />
          </div>
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E7EB]">
        <Button
          onClick={actions.handleRequest}
          disabled={state.isButtonDisabled}
          className={`w-full py-6 rounded-xl text-[16px] font-semibold font-gilroy ${
            state.isButtonDisabled
              ? "bg-[#BDA0FF] hover:bg-[#BDA0FF]"
              : "bg-[#592AC7] hover:bg-[#592AC7]/90"
          }`}
        >
          {state.requesting ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            "Request Payslip"
          )}
        </Button>
      </div>

      {/* GMAIL SHEET (Replaces Custom Modal) */}
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
              To request payslips, we need to connect your Gmail account
              securely.
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
              onClick={() => actions.setShowGmailSheet(false)}
              className="w-full py-6 rounded-[10px] bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200 text-[15px] font-gilroy"
            >
              Cancel
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </MobileLayout>
  );
}
