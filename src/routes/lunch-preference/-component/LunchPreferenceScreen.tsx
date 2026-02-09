import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronLeft, Loader2 } from "lucide-react";
import { ConfirmLunchDialog } from "./ConfirmLunchDialog";
import { ConnectGmailSheet } from "./ConnectGmailSheet";
import { useLunchPreferenceLogic } from "./useLunchPreferenceLogic";

export default function LunchPreferenceScreen() {
  const { state, actions, form } = useLunchPreferenceLogic();

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col h-full bg-white relative">
          {/* HEADER */}
          <div className="flex items-center px-4 py-4 sticky top-0 z-10 bg-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => actions.navigate({ to: "/" })}
            >
              <ChevronLeft size={28} />
            </Button>
            <h1 className="flex-1 text-center pr-7 text-[18px] font-bold font-gilroy text-[#374151]">
              Lunch Preference
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-24">
            <p className="text-[16px] text-[#374151] mb-6 font-gilroy mt-2">
              Planning a leave or working remotely?
              <br />
              Make sure to opt out of lunch — let’s reduce food waste 🌱
            </p>

            <Card
              onClick={actions.handleTomorrowSelect}
              className={cn(
                "cursor-pointer mb-6 transition-all border",
                state.selectedMode === "tomorrow"
                  ? "bg-[#F3E8FF] border-[#5B21B6]"
                  : "bg-white border-[#E5E7EB]",
              )}
            >
              <CardContent className="p-4">
                <span
                  className={cn(
                    "font-semibold font-gilroy",
                    state.selectedMode === "tomorrow"
                      ? "text-[#5B21B6]"
                      : "text-[#374151]",
                  )}
                >
                  I don’t want lunch tomorrow
                </span>
              </CardContent>
            </Card>

            <Label className="text-[14px] text-[#6B7280] mb-2 block font-gilroy">
              I don’t want lunch from
            </Label>
            <div className="flex gap-4">
              {/* START DATE */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="date"
                          className="h-12 text-[16px] border-[#E5E7EB] focus:ring-[#5B21B6] block w-full appearance-none bg-transparent"
                          value={
                            field.value ? format(field.value, "yyyy-MM-dd") : ""
                          }
                          min={format(new Date(), "yyyy-MM-dd")}
                          onChange={(e) => {
                            const date = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            field.onChange(date);
                            form.setValue("selectedMode", "range");
                          }}
                        />
                        {/* Visual Overlay for Start Date */}
                        {field.value && (
                          <div className="absolute inset-0 left-3 flex items-center pointer-events-none bg-white w-[calc(100%-40px)]">
                            <span className="text-[16px] text-[#374151]">
                              {format(field.value, "dd/MM/yyyy")}
                            </span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Label className="text-[14px] text-[#6B7280] font-gilroy">
                To
              </Label>

              {/* END DATE (To) */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="date"
                          className="h-12 text-[16px] border-[#E5E7EB] focus:ring-[#5B21B6] block w-full appearance-none bg-transparent"
                          value={
                            field.value ? format(field.value, "yyyy-MM-dd") : ""
                          }
                          min={
                            form.getValues("startDate")
                              ? format(
                                  form.getValues("startDate") as Date,
                                  "yyyy-MM-dd",
                                )
                              : format(new Date(), "yyyy-MM-dd")
                          }
                          onChange={(e) => {
                            const date = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            field.onChange(date);
                            form.setValue("selectedMode", "range");
                          }}
                        />
                        {/* Visual Overlay for End Date - ADDED THIS PART */}
                        {field.value && (
                          <div className="absolute inset-0 left-3 flex items-center pointer-events-none bg-white w-[calc(100%-40px)]">
                            <span className="text-[16px] text-[#374151]">
                              {format(field.value, "dd/MM/yyyy")}
                            </span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Footer Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <Button
              type="button"
              onClick={() => actions.setShowConfirmDialog(true)}
              disabled={!state.isRangeValid || state.submitting}
              className={cn(
                "w-full py-6 rounded-xl font-semibold font-gilroy",
                !state.isRangeValid
                  ? "bg-[#D1D5DB]"
                  : "bg-[#592AC7] text-white",
              )}
            >
              {state.submitting ? <Loader2 className="animate-spin" /> : "Send"}
            </Button>
          </div>
        </div>
      </Form>

      <ConfirmLunchDialog
        open={state.showConfirmDialog}
        onOpenChange={actions.setShowConfirmDialog}
        confirmText={actions.getConfirmText()}
        onConfirm={() => {
          actions.setShowConfirmDialog(false);
          actions.handleSubmit();
        }}
      />

      {/* GMAIL SHEET (Added back from old code) */}
      <ConnectGmailSheet
        open={state.showGmailSheet}
        onOpenChange={actions.setShowGmailSheet}
        onConnect={actions.handleConnectGmail}
        loading={state.connectingGmail}
      />
    </>
  );
}
